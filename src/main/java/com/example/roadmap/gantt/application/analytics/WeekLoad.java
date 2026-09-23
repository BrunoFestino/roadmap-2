package com.example.roadmap.gantt.application.analytics;

import com.example.roadmap.gantt.application.model.WorkContour;
import java.time.LocalDate;
import java.util.List;

/**
 * One week of load for one person or one role, in effort hours.
 *
 * <p>This is the cell of the "Carga del equipo" grid - Microsoft Project's Resource Usage
 * view. Hours, not MD, because hours are what a week of capacity is naturally measured in
 * (five available days give {@code 5 × 6 = 30} productive hours) and what makes an
 * overallocation legible at a glance.
 *
 * <h2>Two clocks in the same cell</h2>
 * <p>A week that is already half spent has to answer two different questions, so this record
 * carries both and never mixes them:
 * <ul>
 *   <li><strong>The whole week</strong> - {@code assignedHours}, {@code capacityHours} and
 *       {@code utilizationPct} always describe Monday to Sunday. That is what keeps the
 *       percentage of the current week comparable with the weeks after it: shrinking the
 *       denominator as the week burns down would make every Friday look like a crisis.</li>
 *   <li><strong>What is left of it</strong> - the {@code remaining*} components count only
 *       from today onwards, and measure the work Jira says is still owed rather than the
 *       slice of the plan that happens to land there. Every figure that claims free capacity
 *       is built on these, because Monday's unused hours are gone and cannot be sold to
 *       anyone, and Monday's unfinished work has not gone anywhere.</li>
 * </ul>
 *
 * <p>For a week that has not started yet both clocks agree, so the distinction only ever
 * changes the first week of the horizon.
 *
 * @param weekStart      Monday-relative first day of the bucket (inclusive)
 * @param weekEnd        last day of the bucket (inclusive)
 * @param assignedHours  effort hours demanded across the whole week
 * @param capacityHours  productive hours of the whole week (working days × 6, minus absences)
 * @param utilizationPct {@code assignedHours / capacityHours × 100}, over the whole week
 * @param remainingWorkingDays   working days from today to {@code weekEnd}, weekends aside
 * @param remainingCapacityHours productive hours still ahead, absences already discounted
 * @param remainingAssignedHours work still owed on those remaining days, from Jira's logged hours
 * @param carriedOverHours       of that, the part that was planned for days already gone and
 *                               has not been logged, i.e. work dragged into the days left
 * @param tasks          per-task breakdown explaining the hours, ordered by descending load
 */
public record WeekLoad(
        LocalDate weekStart,
        LocalDate weekEnd,
        double assignedHours,
        double capacityHours,
        double utilizationPct,
        long remainingWorkingDays,
        double remainingCapacityHours,
        double remainingAssignedHours,
        double carriedOverHours,
        List<TaskLoad> tasks) {

    public LoadSignal loadSignal() {
        return LoadSignal.of(assignedHours, capacityHours,
                WorkContour.PRODUCTIVE_HOURS_PER_DAY);
    }

    /** Figures to show when making a commitment now: elapsed business days cannot supply capacity. */
    public double actionableAssignedHours() {
        return partiallyElapsed() ? remainingAssignedHours : assignedHours;
    }

    public double actionableCapacityHours() {
        return partiallyElapsed() ? remainingCapacityHours : capacityHours;
    }

    public double actionableUtilizationPct() {
        return actionableCapacityHours() <= 0 ? 0
                : actionableAssignedHours() * 100 / actionableCapacityHours();
    }

    public LoadSignal actionableLoadSignal() {
        return LoadSignal.of(actionableAssignedHours(), actionableCapacityHours(),
                WorkContour.PRODUCTIVE_HOURS_PER_DAY);
    }

    public boolean actionableOverallocated() {
        return actionableAssignedHours() > actionableCapacityHours() + 0.000001;
    }

    public double actionableOverflowHours() {
        return Math.max(0, actionableAssignedHours() - actionableCapacityHours());
    }

    public double criticalCapacityHours() {
        return capacityHours * LoadSignal.CRITICAL_HOURS_PER_DAY
                / WorkContour.PRODUCTIVE_HOURS_PER_DAY;
    }

    /** Portion between 6 and 8 hours per available day. */
    public double warningBandHours() {
        return Math.max(0, Math.min(assignedHours, criticalCapacityHours()) - capacityHours);
    }

    /** Portion strictly above 8 hours per available day. */
    public double criticalOverflowHours() {
        return Math.max(0, assignedHours - criticalCapacityHours());
    }

    /**
     * Hours that can still be committed, counted only from today onwards. Zero once the week
     * is overbooked - and also zero for a week that is already over, which is the point.
     */
    public double freeHours() {
        return Math.max(0, remainingCapacityHours - remainingAssignedHours);
    }

    /** {@code true} when the week demands more hours than the person or role actually has. */
    public boolean overallocated() {
        return assignedHours > capacityHours;
    }

    /** Hours demanded beyond capacity; zero when the week fits. */
    public double overflowHours() {
        return Math.max(0, assignedHours - capacityHours);
    }

    /**
     * Work still owed that does not fit in the productive capacity remaining from today.
     * Unlike {@link #overflowHours()}, this is actionable during a partially elapsed week.
     */
    public double outsideRemainingCapacityHours() {
        return Math.max(0, remainingAssignedHours - remainingCapacityHours);
    }

    /** {@code true} when the week has no capacity at all, e.g. a full week of absence. */
    public boolean unavailable() {
        return capacityHours <= 0;
    }

    /** {@code true} when part of this week is already behind us, i.e. it is the current week. */
    public boolean partiallyElapsed() {
        return remainingCapacityHours < capacityHours;
    }

    /**
     * Effort that was planned for days of this week that have already gone by and that Jira
     * shows no logged time for, so it now weighs on the days that are left.
     *
     * <p>This is measured, not assumed: it is the gap between the work still owed and the
     * slice of the original plan that fell on the remaining days.
     */
    public boolean hasCarriedOverWork() {
        return carriedOverHours > 0.05;
    }

    /** {@code true} when this week still has time left to commit work to. */
    public boolean hasTimeLeft() {
        return remainingCapacityHours > 0;
    }
}
