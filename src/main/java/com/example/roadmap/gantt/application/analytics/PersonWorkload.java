package com.example.roadmap.gantt.application.analytics;

import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;

/**
 * One person's workload across the reporting horizon: the row of the "Carga del equipo"
 * grid and the series behind their load histogram.
 *
 * <p>{@link #freeFrom()} is the answer to the question the roadmap could not answer before:
 * <em>hasta cuándo está tomado</em>. It is the first week in the horizon where the person
 * drops below {@link BuildWorkloadReportUseCase#BUSY_THRESHOLD_PCT}% utilization, i.e. the
 * first week they can genuinely absorb new work - not merely the day after their last bar
 * ends, which ignored how loaded the weeks in between actually were.
 *
 * @param username       Jira username
 * @param name           display name
 * @param roleLabel      the person's specific role, e.g. {@code "Backend"}
 * @param roleColor      role colour, shared with the roadmap bars
 * @param bucketLabel    the role bucket this person is grouped under in the grid
 * @param weeks          one {@link WeekLoad} per week of the horizon, chronologically
 * @param freeFrom       first week start where utilization drops below the busy threshold,
 *                       or {@code null} when the person is busy for the whole horizon
 * @param totalFreeHours productive hours left unassigned <em>from {@code freeFrom} onwards</em>,
 *                       not across the whole horizon: the leftovers of the weeks the person is
 *                       already booked in are not capacity anyone can commit. Zero when
 *                       {@code freeFrom} is {@code null}.
 */
public record PersonWorkload(
        String username,
        String name,
        String roleLabel,
        String roleColor,
        String bucketLabel,
        List<WeekLoad> weeks,
        LocalDate freeFrom,
        double totalFreeHours) {

    /** {@code true} when at least one week in the horizon demands more hours than available. */
    public boolean hasOverallocation() {
        return weeks.stream().anyMatch(WeekLoad::overallocated);
    }

    public LoadSignal loadSignal() {
        return weeks.stream().map(WeekLoad::loadSignal)
                .max(Comparator.naturalOrder()).orElse(LoadSignal.UNAVAILABLE);
    }

    /** The most loaded week of the horizon: Microsoft Project's "peak units" for this person. */
    public double peakUtilizationPct() {
        return weeks.stream().mapToDouble(WeekLoad::utilizationPct).max().orElse(0);
    }

    /** Start of the week behind {@link #peakUtilizationPct()}, so the peak can be dated. */
    public LocalDate peakWeekStart() {
        return weeks.stream()
                .max(Comparator.comparingDouble(WeekLoad::utilizationPct))
                .map(WeekLoad::weekStart)
                .orElse(null);
    }

    /**
     * Last day covered by the report. Every availability claim is bounded by it: beyond the
     * horizon there is simply no data, so the UI says "hasta el {@code horizonEnd}" instead
     * of implying the person is free forever.
     */
    public LocalDate horizonEnd() {
        return weeks.isEmpty() ? null : weeks.get(weeks.size() - 1).weekEnd();
    }

    /** Effort hours assigned across the whole horizon. */
    public double totalAssignedHours() {
        return weeks.stream().mapToDouble(WeekLoad::assignedHours).sum();
    }

    /** Productive hours available across the whole horizon. */
    public double totalCapacityHours() {
        return weeks.stream().mapToDouble(WeekLoad::capacityHours).sum();
    }
}
