package com.example.roadmap.gantt.application.model;

/** The source that determined a task's effective stack. */
public enum TaskStackSource {
    LOCAL_PLAN("Local planning"),
    JIRA_LABEL("Label Jira"),
    PERSON_ROLE("Person role"),
    NONE("No source");

    private final String label;

    TaskStackSource(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}
