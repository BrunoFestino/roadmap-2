package com.example.roadmap.gantt.application.analytics;
import com.example.roadmap.config.*;
import com.example.roadmap.jira.*;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.ui.*;
import com.example.roadmap.gantt.ui.style.*;
import com.example.roadmap.gantt.ui.widget.*;
import com.example.roadmap.ui.*;

import com.fasterxml.jackson.annotation.*;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.applayout.*;
import com.vaadin.flow.component.button.*;
import com.vaadin.flow.component.checkbox.*;
import com.vaadin.flow.component.combobox.*;
import com.vaadin.flow.component.datepicker.*;
import com.vaadin.flow.component.dependency.*;
import com.vaadin.flow.component.dialog.*;
import com.vaadin.flow.component.grid.*;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.component.notification.*;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.select.*;
import com.vaadin.flow.component.sidenav.*;
import com.vaadin.flow.component.textfield.*;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.*;
import com.vaadin.flow.component.page.*;
import com.vaadin.flow.component.details.*;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.theme.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.web.client.*;
import java.net.*;
import java.net.http.*;
import java.nio.charset.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

/**
 * Builds the workload report behind the roadmap's resource views, following Microsoft
 * Project's scheduling model rather than reading a bar's length as occupancy.
 *
 * <h2>How a number here is produced</h2>
 * <ol>
 *   <li>Each task is expanded into a work contour: its {@code MD × 8} effort hours spread
 *       over the working days of its committed calendar window, skipping weekends and that
 *       assignee's stored absences.</li>
 *   <li>That expansion is {@linkplain LevelledContour levelled per person}, not per task:
 *       the tightest task claims its days first and the rest settle into the days that still
 *       have room, always inside their own window.</li>
 *   <li>Those daily hours are summed per person per week. Overlapping tasks therefore add
 *       up, which is the only way an overallocation can be detected at all.</li>
 *   <li>Capacity for the same week is {@code available working days × 6 productive hours}.
 *       Utilization is assigned ÷ capacity.</li>
 * </ol>
 *
 * <p>Consequently a two-week, two-MD task reports 1.6 h/day and roughly 27% utilization
 * instead of blocking its owner for two weeks — the distortion that made the previous effort
 * roadmap unreadable.
 *
 * <h2>What is deliberately excluded</h2>
 * <ul>
 *   <li><strong>Epics and User Stories</strong> carry no capacity of their own: their effort
 *       is delivered by their children, so counting both would double-book everyone. They
 *       stay visible as context bands in the roadmap only.</li>
 *   <li><strong>Overallocation is detected per person</strong>, never per role. A role total
 *       is only ever a summary of the people inside it.</li>
 * </ul>
 *
 * <p>Nothing here is rescheduled or written back. Effort is levelled <em>inside</em> each
 * task's committed window, so an overallocation that survives is a real one — the work does
 * not fit in the dates it was promised in — but no date the team agreed on is ever moved.
 * The roadmap bars keep showing those committed windows untouched.
 */
@Service
public class BuildWorkloadReportUseCase {

    /** Weeks of look-ahead. Long enough to plan a next commitment, short enough to be real. */
    static final int HORIZON_WEEKS = 8;

    /** At or above this utilization a person is considered unable to absorb new work. */
    public static final double BUSY_THRESHOLD_PCT = 80.0;

    /** Above this a week is overallocated: more effort is booked than hours exist. */
    public static final double OVERALLOCATION_PCT = 100.0;

    /** Role bucket ordering, shared with the roadmap's "por rol" view. */
    private static final List<Role> ROLE_BUCKETS = List.of(Role.BACKEND, Role.FRONTEND, Role.MOBILE, Role.DEVOPS);

    private final GanttDataProvider dataProvider;
    private final TeamAbsenceRepository absenceRepository;
    private final JiraProperties jiraProperties;

    public BuildWorkloadReportUseCase(GanttDataProvider dataProvider, TeamAbsenceRepository absenceRepository,
                                      JiraProperties jiraProperties) {
        this.dataProvider = dataProvider;
        this.absenceRepository = absenceRepository;
        this.jiraProperties = jiraProperties;
    }

    /** Builds the report as of today. The entry point used by the view. */
    public WorkloadReport build() {
        return build(LocalDate.now());
    }

    /**
     * Builds the report as of an arbitrary date, so the calculation can be exercised
     * deterministically in tests without depending on the real current date.
     */
    public WorkloadReport build(LocalDate asOf) {
        List<LocalDate> weekStarts = weekStarts(asOf);
        LocalDate horizonStart = weekStarts.get(0);
        LocalDate horizonEnd = weekStarts.get(weekStarts.size() - 1).plusDays(6);

        List<GanttTask> allTasks = dataProvider.tasks();
        List<GanttTask> executableTasks = allTasks.stream().filter(task -> !task.isContextWork()).toList();

        Map<String, List<GanttTask>> tasksByUsername = new LinkedHashMap<>();
        for (GanttTask task : executableTasks) {
            tasksByUsername.computeIfAbsent(task.assignee().username(), key -> new ArrayList<>()).add(task);
        }

        Map<Role, List<PersonWorkload>> peopleByBucket = new LinkedHashMap<>();
        for (TeamMember member : GanttTeamRoster.members()) {
            PersonWorkload person = buildPerson(member, tasksByUsername.getOrDefault(member.username(), List.of()),
                    weekStarts, asOf);
            peopleByBucket.computeIfAbsent(member.role().bucket(), bucket -> new ArrayList<>()).add(person);
        }

        List<RoleWorkload> roles = new ArrayList<>();
        for (Role bucket : ROLE_BUCKETS) {
            List<PersonWorkload> people = peopleByBucket.getOrDefault(bucket, List.of());
            if (people.isEmpty()) {
                continue;
            }
            roles.add(new RoleWorkload(bucket.label(), bucket.color(), people,
                    RoleWorkload.aggregate(people, weekStarts), earliestFreeFrom(people)));
        }

        return new WorkloadReport(asOf, horizonStart, horizonEnd, weekStarts, roles, unplannedTasks(allTasks));
    }

    /** One bucket per week, aligned to Monday so weeks read the way the team talks about them. */
    private List<LocalDate> weekStarts(LocalDate asOf) {
        LocalDate firstMonday = asOf.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        List<LocalDate> starts = new ArrayList<>(HORIZON_WEEKS);
        for (int week = 0; week < HORIZON_WEEKS; week++) {
            starts.add(firstMonday.plusWeeks(week));
        }
        return starts;
    }

    private PersonWorkload buildPerson(TeamMember member, List<GanttTask> tasks, List<LocalDate> weekStarts,
                                       LocalDate asOf) {
        Predicate<LocalDate> absent = date -> absenceRepository.isAbsent(member.username(), date);
        // Levelled once for the whole person, because a task's share of a week can only be
        // decided in the company of the other tasks competing for the same days.
        LevelledContour plan = LevelledContour.plan(tasks, absent);
        LevelledContour remaining = LevelledContour.remaining(tasks, absent, asOf);
        List<WeekLoad> weeks = new ArrayList<>(weekStarts.size());

        for (LocalDate weekStart : weekStarts) {
            LocalDate weekEnd = weekStart.plusDays(6);
            // The whole week feeds the percentage; the tail that is still ahead of us feeds
            // every claim of free capacity. Today itself counts as still available.
            LocalDate remainingFrom = weekStart.isBefore(asOf) ? asOf : weekStart;
            double capacityHours = WorkContour.capacityHours(weekStart, weekEnd, absent);
            double remainingCapacityHours = remainingFrom.isAfter(weekEnd)
                    ? 0
                    : WorkContour.capacityHours(remainingFrom, weekEnd, absent);
            long remainingWorkingDays = remainingFrom.isAfter(weekEnd)
                    ? 0
                    : WorkingDays.countBetween(remainingFrom, weekEnd);

            List<TaskLoad> breakdown = new ArrayList<>();
            double assignedHours = 0;
            double remainingAssignedHours = 0;
            double plannedTail = 0;
            for (GanttTask task : tasks) {
                double hours = plan.hoursIn(task, weekStart, weekEnd);
                if (hours <= 0) {
                    continue;
                }
                assignedHours += hours;
                if (!remainingFrom.isAfter(weekEnd)) {
                    // What is genuinely left to do, from Jira's logged hours — not the slice of
                    // the original plan that happens to fall on the days still ahead.
                    remainingAssignedHours += remaining.hoursIn(task, remainingFrom, weekEnd);
                    plannedTail += plan.hoursIn(task, remainingFrom, weekEnd);
                }
                breakdown.add(new TaskLoad(task.key(), task.summary(), hours,
                        plan.dailyHoursIn(task, weekStart, weekEnd), task.status(),
                        task.start(), task.end(), task.md(), task.effectiveEpicKey()));
            }
            breakdown.sort(Comparator.comparingDouble(TaskLoad::hours).reversed());

            weeks.add(new WeekLoad(weekStart, weekEnd, assignedHours, capacityHours,
                    percentage(assignedHours, capacityHours), remainingWorkingDays,
                    remainingCapacityHours, remainingAssignedHours,
                    Math.max(0, remainingAssignedHours - plannedTail), List.copyOf(breakdown)));
        }

        LocalDate freeFrom = freeFrom(weeks, asOf);
        return new PersonWorkload(member.username(), member.name(), member.role().label(), member.role().color(),
                member.role().bucket().label(), List.copyOf(weeks), freeFrom, totalFreeHours(weeks, freeFrom));
    }

    /**
     * First date the person drops below {@link #BUSY_THRESHOLD_PCT} with capacity to spare.
     * A fully absent week does not count as availability, and neither does a week already
     * booked to the brim — which is exactly what "libre desde" has to mean to be useful.
     *
     * <p>The answer is never a date in the past: when the current week still has room, the
     * date reported is today, not the Monday that started it.
     */
    private LocalDate freeFrom(List<WeekLoad> weeks, LocalDate asOf) {
        return weeks.stream()
                .filter(week -> !week.unavailable())
                .filter(WeekLoad::hasTimeLeft)
                .filter(week -> week.utilizationPct() < BUSY_THRESHOLD_PCT)
                .map(week -> week.weekStart().isBefore(asOf) ? asOf : week.weekStart())
                .findFirst()
                .orElse(null);
    }

    /**
     * Hours left unassigned <em>from {@code freeFrom} onwards</em>, never across the whole
     * horizon. Summing every week would count the leftovers of weeks the person is already
     * booked in as if they were available, which is exactly the number a manager cannot use.
     * When the person never drops below the busy threshold this is zero, not a total.
     */
    private double totalFreeHours(List<WeekLoad> weeks, LocalDate freeFrom) {
        if (freeFrom == null) {
            return 0;
        }
        return weeks.stream()
                .filter(week -> !week.weekEnd().isBefore(freeFrom))
                .mapToDouble(WeekLoad::freeHours)
                .sum();
    }

    private LocalDate earliestFreeFrom(List<PersonWorkload> people) {
        return people.stream()
                .map(PersonWorkload::freeFrom)
                .filter(java.util.Objects::nonNull)
                .min(Comparator.naturalOrder())
                .orElse(null);
    }

    /**
     * Tasks whose dedication had to be assumed because the database schedule has no end date for
     * them. Ordered by owner and start date so the tray reads as a per-person to-do list.
     */
    private List<UnplannedTask> unplannedTasks(List<GanttTask> tasks) {
        return tasks.stream()
                .filter(GanttTask::missingCalendarWindow)
                .sorted(Comparator.comparing((GanttTask task) -> task.assignee().name())
                        .thenComparing(GanttTask::start)
                        .thenComparing(GanttTask::key))
                .map(task -> new UnplannedTask(task.key(), task.summary(), task.issueType(),
                        task.assignee().name(), task.assignee().role().label(), task.assignee().role().color(),
                        task.status(), task.start(), task.end(), task.md(), task.mdEstimated(),
                        jiraUrl(task.key())))
                .toList();
    }

    /** Absolute Jira link for an issue key, tolerating a base URL with or without a trailing slash. */
    private String jiraUrl(String key) {
        String baseUrl = jiraProperties.baseUrl() == null ? "" : jiraProperties.baseUrl().trim();
        if (baseUrl.isEmpty()) {
            return null;
        }
        return baseUrl.endsWith("/") ? baseUrl + "browse/" + key : baseUrl + "/browse/" + key;
    }

    /** {@code numerator / denominator × 100}, and {@code 0} when there is no capacity at all. */
    private double percentage(double numerator, double denominator) {
        return denominator <= 0 ? 0 : numerator * 100.0 / denominator;
    }
}