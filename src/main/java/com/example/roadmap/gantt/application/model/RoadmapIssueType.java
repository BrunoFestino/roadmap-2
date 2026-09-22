package com.example.roadmap.gantt.application.model;

import java.util.Locale;

/**
 * Issue types with roadmap semantics shared by planning, Gantt and workload views.
 * Jira installations may call a story either {@code Story} or {@code User Story}; both
 * names intentionally share the same roadmap treatment.
 */
public enum RoadmapIssueType {
    EPIC("Epic", true),
    STORY("Story", true),
    TASK("Task", false),
    BUG("Bug", false),
    SPIKE("Spike", false),
    SUBTASK("Subtask", false),
    OTHER("Other", false);

    private final String label;
    private final boolean contextOnly;

    RoadmapIssueType(String label, boolean contextOnly) {
        this.label = label;
        this.contextOnly = contextOnly;
    }

    public String label() {
        return label;
    }

    public String chipLabel() {
        return label.toUpperCase(Locale.ROOT);
    }

    public boolean isContextOnly() {
        return contextOnly;
    }

    public boolean isEpic() {
        return this == EPIC;
    }

    public boolean isStory() {
        return this == STORY;
    }

    public String chipClass() {
        return switch (this) {
            case BUG -> "usage-bug-chip";
            case SPIKE -> "usage-spike-chip";
            case STORY -> "usage-story-chip";
            case SUBTASK -> "usage-subtask-chip";
            case EPIC -> "usage-epic-chip";
            case TASK, OTHER -> "usage-task-chip";
        };
    }

    public static RoadmapIssueType from(String rawType) {
        if (rawType == null || rawType.isBlank()) {
            return TASK;
        }
        String normalized = rawType.trim().toLowerCase(Locale.ROOT);
        return switch (normalized) {
            case "epic" -> EPIC;
            case "story", "user story" -> STORY;
            case "task" -> TASK;
            case "bug" -> BUG;
            case "spike" -> SPIKE;
            case "subtask", "sub-task", "sub task" -> SUBTASK;
            default -> OTHER;
        };
    }

    public static RoadmapIssueType from(String rawType, boolean subtask) {
        return subtask ? SUBTASK : from(rawType);
    }
}
