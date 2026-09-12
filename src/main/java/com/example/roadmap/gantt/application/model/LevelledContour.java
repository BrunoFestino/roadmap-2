package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;
import java.util.function.Function;
import java.util.function.Predicate;
import java.util.function.ToDoubleFunction;

/** Levels effort within committed windows. A fractional max-flow check repairs avoidable overload. */
public final class LevelledContour {

    /** Bisection steps for the water level. Converges far below a minute of precision. */
    private static final int LEVEL_ITERATIONS = 60;

    private final Map<String, NavigableMap<LocalDate, Double>> byTask;
    private final Map<String, Double> unallocated = new HashMap<>();

    public double unallocatedHours(GanttTask task) { return unallocated.getOrDefault(task.key(), 0.0); }

    private LevelledContour(Map<String, NavigableMap<LocalDate, Double>> byTask) {
        this.byTask = byTask;
    }

    /**
     * Levels the full committed estimate of every task - what the team promised to deliver,
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
        if (load.values().stream().anyMatch(hours -> hours > WorkContour.PRODUCTIVE_HOURS_PER_DAY + 0.000001)) {
            byTask = CapacityAllocation.allocate(ordered.stream()
                    .map(scheduled -> new CapacityAllocation.Demand(scheduled.task().key(), scheduled.days(), scheduled.work())).toList());
        }
        LevelledContour result = new LevelledContour(byTask);
        for (Scheduled scheduled : ordered) {
            if (scheduled.days().isEmpty() && scheduled.work() > 0) result.unallocated.put(scheduled.task().key(), scheduled.work());
        }
        return result;
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