package com.example.roadmap.gantt.application.model;

import com.example.roadmap.jira.dto.JiraIssueDto;

/** Shared estimate policy for planning and roadmap loading. Worklogs remain independent. */
public final class EffortEstimates {
    private static final double SECONDS_PER_MD = 8 * 60 * 60;

    private EffortEstimates() { }

    public static boolean isSubtask(JiraIssueDto.Fields fields) {
        return fields.issuetype() != null && "Sub-task".equalsIgnoreCase(fields.issuetype().name());
    }

    public static Double jiraMd(JiraIssueDto.Fields fields) {
        if (isSubtask(fields)) return null;
        var tracking = fields.timetracking();
        return tracking == null || tracking.originalEstimateSeconds() == null
                || tracking.originalEstimateSeconds() <= 0
                ? null : tracking.originalEstimateSeconds() / SECONDS_PER_MD;
    }

    public static Double resolve(JiraIssueDto.Fields fields, Double localMd) {
        if (!isSubtask(fields)) return jiraMd(fields);
        return localMd != null && Double.isFinite(localMd) && localMd > 0 ? localMd : null;
    }

    public static double completedSubtaskMd(JiraIssueDto.Fields fields, Double localMd) {
        var tracking = fields.timetracking();
        if (tracking != null && tracking.timeSpentSeconds() != null && tracking.timeSpentSeconds() > 0) {
            return tracking.timeSpentSeconds() / SECONDS_PER_MD;
        }
        Double estimate = resolve(fields, localMd);
        return estimate == null ? 0 : estimate;
    }
}
