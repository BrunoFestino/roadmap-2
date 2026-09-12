package com.example.roadmap.gantt.application.analytics;



/** Demand that must stay visible even though it cannot contribute to future capacity. */
public record PlanningWarning(String taskKey, String summary, String assigneeName,
                              double remainingHours, String reason) {
}
