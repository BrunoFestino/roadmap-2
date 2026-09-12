package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.function.Predicate;

/**
 * Spreads a task's effort across its calendar window - Microsoft Project calls this the
 * task's <em>timephased work</em>, or work contour.
 *
 * <p>This is the single place the roadmap turns "2 MD between the 3rd and the 14th" into
 * "1.6 hours on each of those ten working days". Every capacity number in the application is
 * built on top of this expansion rather than on averages over a window, which is what makes
 * overlapping tasks add up correctly and makes a person's real daily occupancy visible.
 *
 * <h2>The model</h2>
 * <ul>
 *   <li>One MD is {@value #HOURS_PER_MD} hours of effort - {@link GanttTask#workHours()}.</li>
 *   <li>A person contributes {@value #PRODUCTIVE_HOURS_PER_DAY} productive hours on an
 *       available working day; the rest of the day goes to meetings, breaks and context
 *       switching. That is the capacity every load is measured against.</li>
 *   <li>Effort is spread evenly (a <em>flat contour</em>, Microsoft Project's default) over
 *       the working days of the task's window, skipping weekends and the assignee's stored
 *       absences.</li>
 *   <li>Every contour exists in two versions: the <em>plan</em> ({@link #hoursIn}), which
 *       spreads the full estimate and answers what was committed, and the <em>remaining
 *       work</em> ({@link #remainingHoursIn}), which spreads only what Jira says is still
 *       owed and answers what is actually left to do.</li>
 * </ul>
 *
 * <p>A task whose daily demand exceeds {@value #PRODUCTIVE_HOURS_PER_DAY} hours is asking a
 * person for more than a day: with several such tasks overlapping, that is exactly the
 * overallocation the workload views highlight.
 */
public final class WorkContour {

    /** Effort hours represented by one man-day. */
    public static final double HOURS_PER_MD = 8.0;

    /** Hours a person can actually deliver on an available working day. */
    public static final double PRODUCTIVE_HOURS_PER_DAY = 6.0;

    private WorkContour() {
    }

    /**
     * Effort hours this task demands on each working day of its window, keyed by date and
     * ordered chronologically. Weekends and days matched by {@code absent} are left out, and
     * their share is redistributed over the remaining days.
     */
    public static Map<LocalDate, Double> hoursByDay(GanttTask task, Predicate<LocalDate> absent) {
        Map<LocalDate, Double> contour = new LinkedHashMap<>();
        double perDay = dailyHours(task, absent);
        if (perDay <= 0) {
            return contour;
        }
        LocalDate cursor = task.start();
        while (!cursor.isAfter(task.end())) {
            if (isAvailable(cursor, absent)) {
                contour.put(cursor, perDay);
            }
            cursor = cursor.plusDays(1);
        }
        return contour;
    }

    /**
     * Effort hours per available working day: the task's total work divided by the working
     * days in its window. This is the numerator of Microsoft Project's assignment units.
     */
    public static double dailyHours(GanttTask task, Predicate<LocalDate> absent) {
        long days = WorkingDays.countBetween(task.start(), task.end(), absent);
        return days <= 0 ? 0 : task.workHours() / days;
    }

    /**
     * Assignment units: the share of a person's productive day this task consumes, as a
     * fraction where {@code 1.0} means full dedication. A 2-MD task spread over ten working
     * days needs 1.6 h/day, which against 6 productive hours is {@code 0.27}.
     */
    public static double units(GanttTask task, Predicate<LocalDate> absent) {
        return dailyHours(task, absent) / PRODUCTIVE_HOURS_PER_DAY;
    }

    /**
     * Effort hours this task demands inside the inclusive window {@code [from, to]}. A
     * multi-week task therefore charges each week only the share it actually needs there,
     * instead of its whole estimate to every bucket it touches.
     */
    public static double hoursIn(GanttTask task, LocalDate from, LocalDate to, Predicate<LocalDate> absent) {
        LocalDate start = task.start().isAfter(from) ? task.start() : from;
        LocalDate end = task.end().isBefore(to) ? task.end() : to;
        if (end.isBefore(start)) {
            return 0;
        }
        return dailyHours(task, absent) * WorkingDays.countBetween(start, end, absent);
    }

    /**
     * Effort still owed by this task on each remaining working day, seen from {@code asOf}.
     *
     * <p>The plain {@link #dailyHours} contour answers "what was the plan". This one answers
     * "what is actually left", and the two stop agreeing the moment a week is under way: the
     * plan assumes Monday's share was delivered on Monday, while this spreads whatever Jira
     * says is still owed over the days that genuinely remain. A task that is behind therefore
     * gets denser as its deadline approaches, exactly as it does in real life.
     *
     * <p>Zero once the window has run out - work owed past its own end date is late, not
     * scheduled, and silently pushing it into next week would invent a plan nobody made.
     */
    public static double remainingDailyHours(GanttTask task, Predicate<LocalDate> absent, LocalDate asOf) {
        LocalDate from = task.start().isAfter(asOf) ? task.start() : asOf;
        if (from.isAfter(task.end())) {
            return 0;
        }
        long days = WorkingDays.countBetween(from, task.end(), absent);
        return days <= 0 ? 0 : task.remainingWorkHours() / days;
    }

    /**
     * Effort still owed inside {@code [from, to]}, seen from {@code asOf}. The remaining-work
     * counterpart of {@link #hoursIn}, and the basis of every free-capacity figure.
     */
    public static double remainingHoursIn(GanttTask task, LocalDate from, LocalDate to,
                                          Predicate<LocalDate> absent, LocalDate asOf) {
        LocalDate windowStart = task.start().isAfter(asOf) ? task.start() : asOf;
        LocalDate start = windowStart.isAfter(from) ? windowStart : from;
        LocalDate end = task.end().isBefore(to) ? task.end() : to;
        if (end.isBefore(start)) {
            return 0;
        }
        return remainingDailyHours(task, absent, asOf) * WorkingDays.countBetween(start, end, absent);
    }

    /**
     * Effort owed by a task whose window has already closed while work remained on it.
     *
     * <p>These hours are real and somebody will have to spend them, but they have no date left
     * to sit on, so they are reported separately instead of being folded into a future week
     * that was never planned to hold them.
     */
    public static double overdueHours(GanttTask task, LocalDate asOf) {
        return task.end().isBefore(asOf) ? task.remainingWorkHours() : 0;
    }

    /** Productive capacity, in hours, of the inclusive window {@code [from, to]} for one person. */
    public static double capacityHours(LocalDate from, LocalDate to, Predicate<LocalDate> absent) {
        return WorkingDays.countBetween(from, to, absent) * PRODUCTIVE_HOURS_PER_DAY;
    }

    /** Converts effort hours back to man-days, for figures the team already reads in MD. */
    public static double toMd(double hours) {
        return hours / HOURS_PER_MD;
    }

    private static boolean isAvailable(LocalDate date, Predicate<LocalDate> absent) {
        return !WorkingDays.isWeekend(date) && !absent.test(date);
    }
}