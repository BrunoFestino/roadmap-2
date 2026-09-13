package com.example.roadmap.gantt.application.model;

/** The source that determined a task's effective stack. */
public enum TaskStackSource {
    LOCAL_PLAN("Planificación local"),
    JIRA_LABEL("Label Jira"),
    PERSON_ROLE("Rol de la persona"),
    NONE("Sin fuente");

    private final String label;

    TaskStackSource(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}
