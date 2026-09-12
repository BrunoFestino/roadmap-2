package com.example.roadmap.gantt.application.model;
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
/**
 * One person's tasks scheduled <em>together</em>, so effort settles on the days that still
 * have room instead of being smeared evenly over every window.
 *
 * <h2>Why this exists</h2>
 * <p>{@link WorkContour} spreads a task flatly across its own window, and it does so knowing
 * nothing about the person's other tasks — its entry point takes a single {@code GanttTask}.
 * Independently computed contours are only summed afterwards, so a task with three weeks of
 * slack contributes the same hours to a week that is already at 160% as to the two half-empty
 * weeks beside it. The plan it describes is one nobody would ever actually work.
 *
 * <p>This class replaces that per-task view with a per-person one. It is Microsoft Project's
 * <em>Level Only Within Available Slack</em>: work moves inside its own window, and nothing
 * else moves at all.
 *
 * <h2>The two rules</h2>
 * <ol>
 *   <li><strong>Committed dates are untouchable.</strong> A task's hours never land outside
 *       the window the database schedule gave it, and its total effort never changes. Only the
 *       distribution <em>within</em> that window is decided here, so no date the team agreed
 *       on is ever quietly rewritten.</li>
 *   <li><strong>The tightest task is served first.</strong> Tasks are ordered by slack —
 *       the productive hours their window offers, minus the hours they need. A task that
 *       barely fits, or does not fit at all, has nowhere else to go and therefore claims its
 *       days before a flexible one gets to choose.</li>
 * </ol>
 *
 * <h2>How the hours land: water-filling</h2>
 * <p>Each task is poured into its window like water into an uneven container, settling into
 * the lowest days first until the surface is level. That single rule covers the cases that
 * matter, without any of them being special-cased:
 * <ul>
 *   <li>An empty window fills evenly, reproducing the familiar flat contour exactly.</li>
 *   <li>A window with a partly used day still uses <em>the room that day has left</em>
 *       rather than skipping it — a day holding 5.5 h of a 6 h capacity contributes its
 *       remaining half hour whenever that helps flatten the result.</li>
 *   <li>Work that cannot fit anywhere in its window is <em>not</em> discarded and not pushed
 *       into a later week. It is spread over the window's days as overflow, so the
 *       overallocation stays visible exactly where it was committed.</li>
 * </ul>
 *
 * <p>The result is that an overallocation reported by the workload report is now a real one:
 * it means the work genuinely does not fit in the window it was promised in, not merely that
 * it was shared out badly.
 */
public final class LevelledContour {

    /** Bisection steps for the water level. Converges far below a minute of precision. */
    private static final int LEVEL_ITERATIONS = 60;

    private final Map<String, NavigableMap<LocalDate, Double>> byTask;

    private LevelledContour(Map<String, NavigableMap<LocalDate, Double>> byTask) {
        this.byTask = byTask;
    }

    /**
     * Levels the full committed estimate of every task — what the team promised to deliver,
     * arranged the way it could actually be worked.
     */
    public static LevelledContour plan(List<GanttTask> tasks, Predicate<LocalDate> absent) {
        return build(tasks, absent, GanttTask::workHours, GanttTask::start);
    }

    /**
     * Levels only the work Jira says is still owed, over the days that are still ahead.
     * The counterpart of {@link WorkContour#remainingHoursIn}, and the basis of every
     * free-capacity figure.
     */
    public static LevelledContour remaining(List<GanttTask> tasks, Predicate<LocalDate> absent, LocalDate asOf) {
        return build(tasks, absent, GanttTask::remainingWorkHours,
                task -> task.start().isAfter(asOf) ? task.start() : asOf);
    }

    /** Effort this task demands inside the inclusive window {@code [from, to]} once levelled. */
    public double hoursIn(GanttTask task, LocalDate from, LocalDate to) {
        NavigableMap<LocalDate, Double> contour = byTask.get(task.key());
        if (contour == null || to.isBefore(from)) {
            return 0;
        }
        double total = 0;
        for (double hours : contour.subMap(from, true, to, true).values()) {
            total += hours;
        }
        return total;
    }

    /**
     * Average hours per day this task demands on the days it actually occupies inside
     * {@code [from, to]}. Under a levelled contour a task no longer has one daily rate for
     * its whole life, so the rate is only meaningful relative to a bucket.
     */
    public double dailyHoursIn(GanttTask task, LocalDate from, LocalDate to) {
        NavigableMap<LocalDate, Double> contour = byTask.get(task.key());
        if (contour == null || to.isBefore(from)) {
            return 0;
        }
        double total = 0;
        int days = 0;
        for (double hours : contour.subMap(from, true, to, true).values()) {
            if (hours > 0) {
                total += hours;
                days++;
            }
        }
        return days == 0 ? 0 : total / days;
    }

    private static LevelledContour build(List<GanttTask> tasks, Predicate<LocalDate> absent,
                                         ToDoubleFunction<GanttTask> work, Function<GanttTask, LocalDate> windowStart) {
        Map<String, NavigableMap<LocalDate, Double>> byTask = new HashMap<>();
        Map<LocalDate, Double> load = new HashMap<>();

        List<Scheduled> ordered = new ArrayList<>();
        for (GanttTask task : tasks) {
            List<LocalDate> days = workingDays(windowStart.apply(task), task.end(), absent);
            ordered.add(new Scheduled(task, days, Math.max(0, work.applyAsDouble(task))));
        }
        // Least slack first: a task that barely fits its window claims its days before a
        // flexible one, because the flexible one still has somewhere else to go.
        ordered.sort(Comparator.comparingDouble(Scheduled::slack)
                .thenComparing(scheduled -> scheduled.task().end())
                .thenComparing(scheduled -> scheduled.task().key()));

        for (Scheduled scheduled : ordered) {
            byTask.put(scheduled.task().key(), pour(scheduled, load));
        }
        return new LevelledContour(byTask);
    }

    /** Pours one task's hours into its window, lowest days first, updating the shared load. */
    private static NavigableMap<LocalDate, Double> pour(Scheduled scheduled, Map<LocalDate, Double> load) {
        NavigableMap<LocalDate, Double> contour = new TreeMap<>();
        List<LocalDate> days = scheduled.days();
        if (scheduled.work() <= 0 || days.isEmpty()) {
            return contour;
        }

        double room = 0;
        for (LocalDate day : days) {
            room += headroom(load, day);
        }

        if (scheduled.work() >= room) {
            // Does not fit anywhere in its own window. Take every free hour and spread the
            // rest as overflow across the same days: pushing it later would invent dates.
            double overflow = (scheduled.work() - room) / days.size();
            for (LocalDate day : days) {
                add(contour, load, day, headroom(load, day) + overflow);
            }
            return contour;
        }

        double level = waterLevel(days, load, scheduled.work());
        for (LocalDate day : days) {
            add(contour, load, day, Math.min(Math.max(0, level - load.getOrDefault(day, 0.0)), headroom(load, day)));
        }
        return contour;
    }

    /**
     * The surface height at which pouring {@code work} hours over these days stops. Bisected
     * because the poured volume is monotone in the level but not invertible in closed form
     * once days start out at different heights.
     */
    private static double waterLevel(List<LocalDate> days, Map<LocalDate, Double> load, double work) {
        double low = 0;
        double high = WorkContour.PRODUCTIVE_HOURS_PER_DAY;
        for (int iteration = 0; iteration < LEVEL_ITERATIONS; iteration++) {
            double mid = (low + high) / 2;
            double poured = 0;
            for (LocalDate day : days) {
                poured += Math.min(Math.max(0, mid - load.getOrDefault(day, 0.0)), headroom(load, day));
            }
            if (poured < work) {
                low = mid;
            } else {
                high = mid;
            }
        }
        return (low + high) / 2;
    }

    private static double headroom(Map<LocalDate, Double> load, LocalDate day) {
        return Math.max(0, WorkContour.PRODUCTIVE_HOURS_PER_DAY - load.getOrDefault(day, 0.0));
    }

    private static void add(NavigableMap<LocalDate, Double> contour, Map<LocalDate, Double> load,
                            LocalDate day, double hours) {
        if (hours <= 0) {
            return;
        }
        contour.merge(day, hours, Double::sum);
        load.merge(day, hours, Double::sum);
    }

    private static List<LocalDate> workingDays(LocalDate from, LocalDate to, Predicate<LocalDate> absent) {
        List<LocalDate> days = new ArrayList<>();
        LocalDate cursor = from;
        while (!cursor.isAfter(to)) {
            if (!WorkingDays.isWeekend(cursor) && !absent.test(cursor)) {
                days.add(cursor);
            }
            cursor = cursor.plusDays(1);
        }
        return days;
    }

    /** A task paired with the days it may use and the hours it has to place on them. */
    private record Scheduled(GanttTask task, List<LocalDate> days, double work) {

        /** Productive hours the window offers minus the hours needed; negative when it cannot fit. */
        double slack() {
            return days.size() * WorkContour.PRODUCTIVE_HOURS_PER_DAY - work;
        }
    }
}