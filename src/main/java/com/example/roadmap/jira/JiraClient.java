package com.example.roadmap.jira;

import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import java.util.List;
import java.util.Map;

public interface JiraClient {

    JiraSearchResponseDto searchOpenIssuesByAssignees(String projectKey, List<String> usernames);

    /** Open roadmap work plus finalized subtasks needed to identify parents with subtasks. */
    default JiraSearchResponseDto searchWorkloadIssuesByAssignees(String projectKey, List<String> usernames) {
        return searchOpenIssuesByAssignees(projectKey, usernames);
    }

    JiraSearchResponseDto searchOpenEpics(String projectKey);

    JiraSearchResponseDto searchOpenMilestones(String projectKey);

    /** Names of referenced issues, including closed initiatives outside the roadmap filters. */
    default Map<String, String> findIssueSummaries(List<String> issueKeys) {
        return Map.of();
    }
}
