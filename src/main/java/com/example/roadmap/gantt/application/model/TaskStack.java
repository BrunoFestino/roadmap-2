package com.example.roadmap.gantt.application.model;

/**
 * The technical stack used to place a task in the roadmap.
 *
 * <p>The six role stacks are selectable during local planning. The remaining values are
 * derived states used when Jira is contradictory or no source can classify the task.
 */
public enum TaskStack {

    FRONTEND("Front", "#2C8FB5", true),
    BACKEND("BE", "#0F4660", true),
    MOBILE("Mobile", "#2E7D32", true),
    DEVOPS("DevOps", "#B36A00", true),
    PO("PO", "#7B61A8", true),
    SQC("SQC", "#C0392B", true),
    AMBIGUOUS("Ambiguous stack", "#B3261E", false),
    UNCLASSIFIED("No stack", "#6B778C", false);

    private final String label;
    private final String color;
    private final boolean selectable;

    TaskStack(String label, String color, boolean selectable) {
        this.label = label;
        this.color = color;
        this.selectable = selectable;
    }

    public String label() {
        return label;
    }

    public String color() {
        return color;
    }

    public boolean selectable() {
        return selectable;
    }

}
