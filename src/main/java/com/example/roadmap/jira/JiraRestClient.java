package com.example.roadmap.jira;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.model.WorkflowStatus;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.LinkedHashMap;
import java.util.Objects;
import org.springframework.web.client.RestClient;

public class JiraRestClient implements JiraClient {

    private static final int PAGE_SIZE = 100;
    private static final String OPEN_STATUSES = WorkflowStatus.jiraOpenClause();
    private static final String EXECUTABLE_TYPES =
            "issuetype IN (\"User Story\", Story, Task, \"Test Plan\", Bug, Spike, \"L3 Problem\")";
    private final RestClient restClient;
    private final JiraProperties properties;

    public JiraRestClient(RestClient jiraRestClient, JiraProperties properties) {
        this.restClient = jiraRestClient;
        this.properties = properties;
    }

    @Override
    public JiraSearchResponseDto searchOpenIssuesByAssignees(String projectKey, List<String> usernames) {
        List<String> assignees = normalizeUsernames(usernames);
        if (assignees.isEmpty()) {
            return new JiraSearchResponseDto(List.of());
        }
        String jql = "assignee IN (" + String.join(", ", assignees) + ")"
                + " AND " + OPEN_STATUSES
                + " AND (" + EXECUTABLE_TYPES
                + " OR issuetype IN subTaskIssueTypes())"
                + " ORDER BY key ASC";
        return searchAllPages(jql, roadmapFields());
    }

    @Override
    public JiraSearchResponseDto searchWorkloadIssuesByAssignees(String projectKey, List<String> usernames) {
        List<String> assignees = normalizeUsernames(usernames);
        if (assignees.isEmpty()) {
            return new JiraSearchResponseDto(List.of());
        }
        String jql = "assignee IN (" + String.join(", ", assignees) + ")"
                + " AND ((" + EXECUTABLE_TYPES + " AND " + OPEN_STATUSES + ")"
                + " OR issuetype IN subTaskIssueTypes())"
                + " ORDER BY key ASC";
        return searchAllPages(jql, roadmapFields());
    }

    @Override
    public JiraSearchResponseDto searchOpenEpics(String projectKey) {
        return searchAllPages(
                "project = " + projectKey + " AND issuetype = Epic AND " + OPEN_STATUSES + " ORDER BY key ASC",
                roadmapFields());
    }

    @Override
    public JiraSearchResponseDto searchOpenMilestones(String projectKey) {
        return searchAllPages(
                "project = " + projectKey + " AND issuetype = Milestone AND " + OPEN_STATUSES + " ORDER BY key DESC",
                "summary,status,duedate");
    }

    @Override
    public Map<String, String> findIssueSummaries(List<String> issueKeys) {
        List<String> keys = issueKeys.stream().filter(Objects::nonNull)
                .map(String::trim).filter(key -> key.matches("[A-Za-z][A-Za-z0-9_]*-[0-9]+"))
                .distinct().toList();
        Map<String, String> summaries = new LinkedHashMap<>();
        for (int start = 0; start < keys.size(); start += PAGE_SIZE) {
            List<String> batch = keys.subList(start, Math.min(start + PAGE_SIZE, keys.size()));
            var response = searchAllPages("key IN (" + String.join(", ", batch) + ") ORDER BY key ASC", "summary");
            for (JiraIssueDto issue : response.issues()) {
                if (issue != null && batch.contains(issue.key()) && issue.fields() != null
                        && issue.fields().summary() != null && !issue.fields().summary().isBlank()) {
                    summaries.put(issue.key(), issue.fields().summary());
                }
            }
        }
        return Map.copyOf(summaries);
    }

    @Override
    public List<JiraIssueDto> findIssueHierarchy(List<String> issueKeys) {
        List<String> keys = issueKeys.stream().filter(Objects::nonNull)
                .map(String::trim).filter(key -> key.matches("[A-Za-z][A-Za-z0-9_]*-[0-9]+"))
                .distinct().toList();
        if (keys.isEmpty()) {
            return List.of();
        }
        return searchAllPages("key IN (" + String.join(", ", keys) + ") ORDER BY key ASC",
                roadmapFields()).issues();
    }

    private JiraSearchResponseDto searchAllPages(String jql, String fields) {
        List<JiraIssueDto> issues = new ArrayList<>();
        int startAt = 0;
        int total = Integer.MAX_VALUE;
        while (startAt < total) {
            int pageStart = startAt;
            JiraSearchResponseDto page = restClient.get()
                    .uri(builder -> builder.path("/rest/api/2/search")
                            .queryParam("jql", jql)
                            .queryParam("fields", fields)
                            .queryParam("startAt", pageStart)
                            .queryParam("maxResults", PAGE_SIZE)
                            .build())
                    .retrieve()
                    .body(JiraSearchResponseDto.class);
            if (page == null || page.issues() == null || page.issues().isEmpty()) {
                break;
            }
            issues.addAll(page.issues());
            total = page.total() > 0 ? page.total() : issues.size();
            int returned = page.issues().size();
            startAt = page.startAt() + (page.maxResults() > 0 ? page.maxResults() : returned);
            if (startAt <= pageStart) {
                startAt = pageStart + returned;
            }
        }
        return new JiraSearchResponseDto(issues);
    }

    private List<String> normalizeUsernames(List<String> usernames) {
        if (usernames == null) {
            return List.of();
        }
        return usernames.stream()
                .filter(Objects::nonNull)
                .map(String::trim)
                .filter(name -> !name.isEmpty())
                .distinct()
                .toList();
    }

    private String roadmapFields() {
        return String.join(",", "summary", "status", "issuetype", "parent", "subtasks", "assignee", "duedate",
                "timetracking", "labels", properties.fieldEffortEstimate(), properties.fieldEpicLink(),
                properties.fieldParentMilestone(), properties.fieldTargetStart(),
                properties.fieldFirstTimeInProgress());
    }
}
