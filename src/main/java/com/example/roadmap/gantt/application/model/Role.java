package com.example.roadmap.gantt.application.model;



/**
 * A role within the AR1 team. Each role carries a human-readable label and a distinct bar
 * colour so both Gantt views read at a glance.
 *
 * <p>Self-contained to the {@code gantt} feature: it does not depend on any Jira or
 * milestone type.
 */
public enum Role {

    BACKEND("Backend", "#0F4660"),
    FRONTEND("Frontend", "#2C8FB5"),
    FULL_STACK("Full Stack", "#6554C0"),
    DEVOPS("DevOps", "#B36A00"),
    MOBILE("Mobile Developer", "#2E7D32");

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

    /**
     * The role bucket used to group the "By role" Gantt: {@code FULL_STACK} folds into
     * {@code BACKEND} there, while the "By person" view still shows each member's real role
     * (e.g. "Full Stack") next to their name.
     */
    public Role bucket() {
        return this == FULL_STACK ? BACKEND : this;
    }
}