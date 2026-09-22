package com.example.roadmap.gantt.application.model;

import com.example.roadmap.jira.dto.JiraIssueDto;

/** Shared estimate policy for planning and roadmap loading. Worklogs remain independent. */
public final class EffortEstimates {
    private static final double SECONDS_PER_MD = 8 * 60 * 60;

    private EffortEstimates() { }

    public static boolean isSubtask(JiraIssueDto.Fields fields) {
        return fields.issuetype() != null && (fields.issuetype().subtask() || "Sub-task".equalsIgnoreCase(fields.issuetype().name()));
    }

    /** Tasks and subtasks use their own Time Tracking Original Estimate. */
    public static Double jiraMd(JiraIssueDto.Fields fields) {
        var tracking = fields.timetracking();
        return tracking == null || tracking.originalEstimateSeconds() == null
                || tracking.originalEstimateSeconds() <= 0
                ? null : tracking.originalEstimateSeconds() / SECONDS_PER_MD;
    }

    /** Epics use only the configured Jira MD field; no Time Tracking fallback. */
    public static Double epicMd(JiraIssueDto.Fields fields, String effortField) {
        String raw = fields.customField(effortField);
        if (raw == null || raw.isBlank()) return null;
        try {
            double md = Double.parseDouble(raw.trim());
            return Double.isFinite(md) && md > 0 ? md : null;
        } catch (NumberFormatException e) {
            return null;
        }
    }

}
