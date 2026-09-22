package com.example.roadmap.gantt.application.model;

import com.example.roadmap.jira.dto.JiraIssueDto;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/** Identifies containers before filtering children by status, assignee, dates or effort. */
public final class TaskHierarchy {
    private TaskHierarchy() { }

    public static Set<String> parentKeys(List<JiraIssueDto> issues) {
        Set<String> parents = new HashSet<>();
        for (JiraIssueDto issue : issues) {
            if (issue == null || issue.fields() == null) continue;
            var fields = issue.fields();
            if (!fields.subtasks().isEmpty() && issue.key() != null) parents.add(issue.key());
            if (EffortEstimates.isSubtask(fields) && fields.parent() != null
                    && fields.parent().key() != null) parents.add(fields.parent().key());
        }
        return Set.copyOf(parents);
    }
}
