package com.example.roadmap.gantt.application.analytics;

/** A task condition that requires roadmap planning attention. */
public record PlanningWarning(
        String taskKey,
        String summary,
        String assigneeName,
        double remainingHours,
        String reason) {
}
