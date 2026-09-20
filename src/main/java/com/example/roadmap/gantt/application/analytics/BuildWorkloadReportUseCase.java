package com.example.roadmap.gantt.application.analytics;

import com.example.roadmap.gantt.application.data.GanttDataProvider;
import com.example.roadmap.gantt.application.data.CompletedSubtaskEffort;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.LevelledContour;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.application.model.SubtaskBudget;
import com.example.roadmap.gantt.application.model.WorkContour;
import com.example.roadmap.gantt.application.model.WorkingDays;
import com.example.roadmap.config.JiraProperties;
import org.springframework.stereotype.Service;

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
 * instead of blocking its owner for two weeks - the distortion that made the previous effort
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
 * task's committed window, so an overallocation that survives is a real one - the work does
 * not fit in the dates it was promised in - but no date the team agreed on is ever moved.
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
    private static final List<Role> ROLE_BUCKETS = List.of(
            Role.FRONTEND, Role.BACKEND, Role.MOBILE, Role.DEVOPS, Role.PO, Role.SQC);

    private final GanttDataProvider dataProvider;
    private final TeamAbsenceRepository absenceRepository;
    private final JiraProperties jiraProperties;
    private final GanttTeamRoster teamRoster;

    public BuildWorkloadReportUseCase(GanttDataProvider dataProvider, TeamAbsenceRepository absenceRepository,
                                      JiraProperties jiraProperties, GanttTeamRoster teamRoster) {
        this.dataProvider = dataProvider;
        this.absenceRepository = absenceRepository;
        this.jiraProperties = jiraProperties;
        this.teamRoster = teamRoster;
    }

    /** Builds the report as of today. The entry point used by the view. */
    public WorkloadReport build() {
        return build(LocalDate.now());
    }

    /**
     * Builds the report as of an arbitrary date, so the calculation can be exercised
     * deterministically in tests without depending on the real current date.
     */
    public RoadmapSnapshot loadSnapshot() {
        return dataProvider.snapshot(absenceRepository.findAll());
    }

    public WorkloadReport build(LocalDate asOf) {
        return build(loadSnapshot(), asOf);
    }

    public WorkloadReport build(RoadmapSnapshot snapshot, LocalDate asOf) {
        List<LocalDate> weekStarts = weekStarts(asOf);
        LocalDate horizonStart = weekStarts.get(0);
        LocalDate horizonEnd = weekStarts.get(weekStarts.size() - 1).plusDays(6);

        List<GanttTask> allTasks = snapshot.tasks();
        Map<String, List<TeamAbsence>> calendars = snapshot.absencesByPerson();
        List<GanttTask> executableTasks = allTasks.stream().filter(task -> !task.isContextWork()).toList();

        List<PlanningWarning> subtaskOverrunWarnings = new ArrayList<>();
        List<GanttTask> loadTasks = applySubtaskEffortDiscount(
                executableTasks, snapshot.completedSubtasks(), subtaskOverrunWarnings, snapshot.subtaskBudget());

        Map<String, List<GanttTask>> tasksByUsername = new LinkedHashMap<>();
        for (GanttTask task : loadTasks) {
            tasksByUsername.computeIfAbsent(task.assignee().username(), key -> new ArrayList<>()).add(task);
        }

        Map<Role, List<PersonWorkload>> peopleByBucket = new LinkedHashMap<>();
        for (TeamMember member : teamRoster.members()) {
            PersonWorkload person = buildPerson(member, tasksByUsername.getOrDefault(member.username(), List.of()),
                    weekStarts, asOf, calendars.getOrDefault(member.username(), List.of()));
            peopleByBucket.computeIfAbsent(member.role(), role -> new ArrayList<>()).add(person);
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

        List<UnplannedTask> unplanned = new ArrayList<>(snapshot.unplannedTasks());
        unplanned.addAll(unplannedTasks(allTasks));
        List<PlanningWarning> warnings = new ArrayList<>();
        for (GanttTask task : executableTasks) {
            Predicate<LocalDate> absent = RoadmapSnapshot.calendar(snapshot.absences(), task.assignee().username());
            String reason = null;
            if (task.end().isBefore(asOf)) reason = "Overdue: rescheduling required";
            else if (WorkContour.capacityHours(task.start().isAfter(asOf) ? task.start() : asOf, task.end(), absent) <= 0)
                reason = "Window has no available days";
            if (reason != null) warnings.add(new PlanningWarning(task.key(), task.summary(), task.assignee().name(), task.remainingWorkHours(), reason));
        }
        return new WorkloadReport(asOf, horizonStart, horizonEnd, List.copyOf(weekStarts), List.copyOf(roles),
                List.copyOf(unplanned), List.copyOf(warnings), List.copyOf(subtaskOverrunWarnings));
    }

    /** Uses the same budget allocation as the provider, including reservations for undated subtasks. */
    private List<GanttTask> applySubtaskEffortDiscount(List<GanttTask> executableTasks,
                                                        List<CompletedSubtaskEffort> completedSubtasks,
                                                        List<PlanningWarning> overruns,
                                                        SubtaskBudget.Allocation budget) {
        if (budget == null) {
            Map<String, Double> consumed = new LinkedHashMap<>();
            completedSubtasks.forEach(task -> consumed.merge(task.parentKey(), task.consumedMd(), Double::sum));
            budget = SubtaskBudget.allocate(executableTasks.stream()
                    .map(task -> new SubtaskBudget.Entry(task.key(), task.parentKey(), task.issueType(),
                            task.inheritedEffort() ? null : task.md())).toList(), consumed);
        }
        List<GanttTask> adjusted = new ArrayList<>();
        for (GanttTask task : executableTasks) {
            double overrun = budget.overrunsMd().getOrDefault(task.key(), 0.0);
            if (overrun > 0.000001) {
                overruns.add(new PlanningWarning(task.key(), task.summary(), task.assignee().name(),
                        task.remainingWorkHours(), "Subtasks exceed the parent estimate: "
                        + formatMd(task.md() + overrun) + " MD consumed/estimated vs "
                        + formatMd(task.md()) + " parent MD (+" + formatMd(overrun) + " MD)"));
            }
            double effectiveMd = budget.effectiveMd().getOrDefault(task.key(), task.md());
            if (effectiveMd > 0.000001) adjusted.add(task.withEffectiveMd(effectiveMd));
        }
        return adjusted;
    }
    /** One decimal place is enough precision for an MD figure shown to a human. */
    private String formatMd(double md) {
        return String.format(java.util.Locale.ROOT, "%.1f", md);
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
                                       LocalDate asOf, List<TeamAbsence> absences) {
        Predicate<LocalDate> absent = date -> absences.stream().anyMatch(a -> a.covers(date));
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
                    : WorkingDays.countBetween(remainingFrom, weekEnd, absent);

            List<TaskLoad> breakdown = new ArrayList<>();
            double assignedHours = 0;
            double remainingAssignedHours = 0;
            double plannedTail = 0;
            for (GanttTask task : tasks) {
                double hours = plan.hoursIn(task, weekStart, weekEnd);
                double pending = remainingFrom.isAfter(weekEnd) ? 0 : remaining.hoursIn(task, remainingFrom, weekEnd);
                assignedHours += hours;
                if (!remainingFrom.isAfter(weekEnd)) {
                    // What is genuinely left to do, from Jira's logged hours - not the slice of
                    // the original plan that happens to fall on the days still ahead.
                    remainingAssignedHours += pending;
                    plannedTail += plan.hoursIn(task, remainingFrom, weekEnd);
                }
                if (hours <= 0 && pending <= 0) continue;
                breakdown.add(new TaskLoad(task.key(), task.summary(), hours,
                        plan.dailyHoursIn(task, weekStart, weekEnd), task.status(),
                        task.start(), task.end(), task.md(), task.loggedSeconds() / 3600.0,
                        task.initiativeKey(), pending));
            }
            breakdown.sort(Comparator.comparingDouble(TaskLoad::hours).reversed());

            weeks.add(new WeekLoad(weekStart, weekEnd, assignedHours, capacityHours,
                    percentage(assignedHours, capacityHours), remainingWorkingDays,
                    remainingCapacityHours, remainingAssignedHours,
                    Math.max(0, remainingAssignedHours - plannedTail), List.copyOf(breakdown)));
        }

        LocalDate freeFrom = freeFrom(weeks, asOf, tasks, remaining, absent);
        return new PersonWorkload(member.username(), member.name(), member.role().label(), member.role().color(),
                member.role().label(), List.copyOf(weeks), freeFrom, totalFreeHours(weeks, freeFrom, tasks, remaining, absent));
    }

    /**
     * First date the person drops below {@link #BUSY_THRESHOLD_PCT} with capacity to spare.
     * A fully absent week does not count as availability, and neither does a week already
     * booked to the brim - which is exactly what "libre desde" has to mean to be useful.
     *
     * <p>The answer is never a date in the past: when the current week still has room, the
     * date reported is today, not the Monday that started it.
     */
    private LocalDate freeFrom(List<WeekLoad> weeks, LocalDate asOf, List<GanttTask> tasks,
                               LevelledContour remaining, Predicate<LocalDate> absent) {
        for (WeekLoad week : weeks) {
            if (week.freeHours() <= 0.000001 || week.remainingCapacityHours() <= 0) continue;
            LocalDate first = week.weekStart().isBefore(asOf) ? asOf : week.weekStart();
            for (LocalDate day = first; !day.isAfter(week.weekEnd()); day = day.plusDays(1)) {
                if (WorkingDays.isWeekend(day) || absent.test(day)) continue;
                double assigned = 0;
                for (GanttTask task : tasks) assigned += remaining.hoursIn(task, day, day);
                if (assigned < WorkContour.PRODUCTIVE_HOURS_PER_DAY * BUSY_THRESHOLD_PCT / 100.0 - 0.000001) return day;
            }
        }
        return null;
    }

    /**
     * Hours left unassigned <em>from {@code freeFrom} onwards</em>, never across the whole
     * horizon. Summing every week would count the leftovers of weeks the person is already
     * booked in as if they were available, which is exactly the number a manager cannot use.
     * When the person never drops below the busy threshold this is zero, not a total.
     */
    private double totalFreeHours(List<WeekLoad> weeks, LocalDate freeFrom, List<GanttTask> tasks,
                                  LevelledContour remaining, Predicate<LocalDate> absent) {
        if (freeFrom == null) {
            return 0;
        }
        return weeks.stream()
                .filter(week -> !week.weekEnd().isBefore(freeFrom))
                .mapToDouble(week -> {
                    LocalDate from = week.weekStart().isBefore(freeFrom) ? freeFrom : week.weekStart();
                    double work = tasks.stream().mapToDouble(task -> remaining.hoursIn(task, from, week.weekEnd())).sum();
                    return Math.max(0, WorkContour.capacityHours(from, week.weekEnd(), absent) - work);
                })
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
                        task.status(), task.start(), task.end(), task.md(),
                        jiraUrl(task.key()), UnplannedReason.NO_DATE))
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
