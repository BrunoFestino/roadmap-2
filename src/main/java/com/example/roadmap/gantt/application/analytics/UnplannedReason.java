package com.example.roadmap.gantt.application.analytics;

/** Why a task could not be fully placed on the roadmap and needs the team's attention. */
public enum UnplannedReason {

    /** No committed start, or a start with no end so the report had to assume 100% dedication. */
    NO_DATE("Missing date"),
    /** No explicit effort estimate (MD field, Time Tracking, or local schedule). */
    NO_ESTIMATE("Missing estimate");

    private final String label;

    UnplannedReason(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}
