package com.example.roadmap.gantt.application.analytics;

import com.example.roadmap.gantt.application.model.EpicPalette;
import com.example.roadmap.gantt.application.model.WorkContour;
import java.time.LocalDate;

/**
 * How many hours one task contributes to one week for one person: the drill-down that
 * explains a cell of the workload grid.
 *
 * <p>Microsoft Project shows this by expanding a resource row in the Resource Usage view.
 * Without it, a red cell tells a manager there is a problem but not which commitment caused
 * it, so this record always travels with its {@link WeekLoad}.
 *
 * @param taskKey    Jira issue key, e.g. {@code "TTAR-10608"}
 * @param summary    short human-readable title
 * @param hours      effort hours this task demands inside the week
 * @param dailyHours average hours per day the task demands on the days it occupies inside
 *                   this week; under a levelled contour the rate varies week to week
 * @param status     Jira workflow status, may be {@code null}
 * @param startDate  first day of the task's committed window
 * @param endDate    last day of the task's committed window
 * @param md         total effort in man-days, the whole task and not just this week
 * @param epicKey    epic this task serves, or {@code null} when the chain could not be
 *                   resolved; drives the colour it is drawn with everywhere
 */
public record TaskLoad(
        String taskKey,
        String summary,
        double hours,
        double dailyHours,
        String status,
        java.time.LocalDate startDate,
        java.time.LocalDate endDate,
        double md,
        String epicKey,
        double remainingHours) {

    /** The colour this task shares with every other task of the same epic. */
    public String color() {
        return EpicPalette.colorFor(epicKey);
    }

    /** The task's dedication as a percentage of a 6-hour productive day. */
    public double dedicationPct() {
        return dailyHours / WorkContour.PRODUCTIVE_HOURS_PER_DAY * 100;
    }
}