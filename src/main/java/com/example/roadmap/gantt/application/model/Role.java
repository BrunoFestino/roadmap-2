package com.example.roadmap.gantt.application.model;



/**
 * A role within the AR1 team. Each role carries a human-readable label and a distinct bar
 * colour so both Gantt views read at a glance.
 *
 * <p>Self-contained to the {@code gantt} feature: it does not depend on any Jira or
 * milestone type.
 */
public enum Role {

    FRONTEND("Front", "#2C8FB5"),
    BACKEND("BE", "#0F4660"),
    MOBILE("Mobile", "#2E7D32"),
    DEVOPS("DevOps", "#B36A00");

    private final String label;
    private final String color;

    Role(String label, String color) {
        this.label = label;
        this.color = color;
    }

    public String label() {
        return label;
    }

    public String color() {
        return color;
    }

    /** The equivalent task stack when the person's role is used as the final fallback. */
    public TaskStack stack() {
        return TaskStack.valueOf(name());
    }
}
