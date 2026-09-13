package com.example.roadmap.gantt.application.model;



/**
 * Where a task's start date came from, in strict priority order.
 *
 * <p>Lets the Gantt distinguish a real date read directly from Jira from one this roadmap
 * had to calculate itself, and keeps that distinction auditable (surfaced in the bar's
 * tooltip) instead of collapsing everything into a single opaque "estimated" flag.
 */
public enum StartDateSource {

    LOCAL_PLAN("Planificación local (PostgreSQL)"),

    /** Configured "Target start" custom field, read directly off the issue. */
    TARGET_START("Target Start (Jira)"),
    /** Legacy "Planned/Effective Start Date" source, not used by the current provider. */
    JIRA_START_DATE("Start Date (Jira)"),
    /** Configured "First Time In Progress" custom field, read directly off the issue. */
    FIRST_TIME_IN_PROGRESS("Primera vez En Progreso (Jira)"),
    /** Legacy Jira Agile sprint source, not used by the current provider. */
    SPRINT_START("Inicio de sprint (Jira)"),
    /** Calculated by chaining this person's other undated tasks one after another. */
    CHAINED_PLANNED("Planificado por encadenamiento"),
    /** Last-resort technical fallback: the issue's Jira creation date. */
    CREATED_DATE_FALLBACK("Fecha de creación (fallback)");

    private final String label;

    StartDateSource(String label) {
        this.label = label;
    }

    /** Short human-readable label, shown in the bar tooltip for auditability. */
    public String label() {
        return label;
    }

    /** {@code true} for the tiers that read an actual date directly from Jira. */
    public boolean isActual() {
        return this == LOCAL_PLAN || this == TARGET_START || this == JIRA_START_DATE || this == FIRST_TIME_IN_PROGRESS || this == SPRINT_START;
    }
}
