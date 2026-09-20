package com.example.roadmap.gantt.application.analytics;

/** Weekly thresholds scale with available person-days, including role aggregates. */
public enum LoadSignal {
    UNAVAILABLE, GREEN, YELLOW, RED;

    public static final double CRITICAL_HOURS_PER_DAY = 8.0;
    private static final double EPSILON = 0.000001;

    public static LoadSignal of(double assignedHours, double capacityHours, double productiveHoursPerDay) {
        if (capacityHours <= 0) return UNAVAILABLE;
        if (assignedHours > capacityHours * CRITICAL_HOURS_PER_DAY / productiveHoursPerDay + EPSILON) return RED;
        if (assignedHours > capacityHours + EPSILON) return YELLOW;
        return GREEN;
    }
}
