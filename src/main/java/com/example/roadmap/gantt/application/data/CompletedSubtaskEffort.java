package com.example.roadmap.gantt.application.data;

/** Effort already consumed by a finalized Jira Sub-task whose parent remains open. */
public record CompletedSubtaskEffort(String key, String parentKey, double consumedMd) {

    public CompletedSubtaskEffort {
        if (key == null || key.isBlank() || parentKey == null || parentKey.isBlank()) {
            throw new IllegalArgumentException("key and parentKey are required");
        }
        if (!Double.isFinite(consumedMd) || consumedMd <= 0) {
            throw new IllegalArgumentException("consumedMd must be positive");
        }
    }
}
