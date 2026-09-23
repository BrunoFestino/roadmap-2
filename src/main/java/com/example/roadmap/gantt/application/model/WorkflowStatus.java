package com.example.roadmap.gantt.application.model;

import java.util.List;

/** Jira workflow states that stop contributing future workload. */
public final class WorkflowStatus {

    public static final List<String> FINAL = List.of(
            "In Use", "Delivered", "Closed", "Cancelled", "Moved to Bug", "Rejected",
            "Done", "Obsolete", "Risk Accepted", "Resolved");

    private WorkflowStatus() {
    }

    public static boolean isFinal(String status) {
        return status != null && FINAL.stream().anyMatch(value -> value.equalsIgnoreCase(status.trim()));
    }

    public static String jiraOpenClause() {
        return "status NOT IN (\"" + String.join("\", \"", FINAL) + "\")";
    }
}
