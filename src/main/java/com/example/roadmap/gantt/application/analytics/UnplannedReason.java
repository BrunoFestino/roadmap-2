package com.example.roadmap.gantt.application.analytics;

/** Why a task could not be fully placed on the roadmap and needs the team's attention. */
public enum UnplannedReason {

    /** No local Target End, or no usable start date. */
    NO_DATE("Missing local Target End"),
    /** No positive Jira Time Tracking Original Estimate for a task or subtask. */
    NO_ESTIMATE("Missing estimate");

    private final String label;

    UnplannedReason(String label) {
        this.label = label;
    }

    public String label() {
        return label;
    }
}
