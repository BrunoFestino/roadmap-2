package com.example.roadmap.jira;

import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import java.util.List;

public interface JiraClient {

    JiraSearchResponseDto searchOpenIssuesByAssignees(String projectKey, List<String> usernames);

    /** Open roadmap work plus finalized subtasks needed to retain consumed parent budget. */
    default JiraSearchResponseDto searchWorkloadIssuesByAssignees(String projectKey, List<String> usernames) {
        return searchOpenIssuesByAssignees(projectKey, usernames);
    }

    JiraSearchResponseDto searchOpenEpics(String projectKey);

    JiraSearchResponseDto searchOpenMilestones(String projectKey);
}
