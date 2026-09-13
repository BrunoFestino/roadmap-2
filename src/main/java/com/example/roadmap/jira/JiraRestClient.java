package com.example.roadmap.jira;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import org.springframework.web.client.RestClient;

public class JiraRestClient implements JiraClient {

    private static final int PAGE_SIZE = 100;
    private static final String OPEN_STATUSES =
            "status NOT IN (\"Done\", \"Cancelled\", \"Resolved\", \"Closed\", \"Obsolete\")";
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
        String jql = "project = " + projectKey
                + " AND assignee IN (" + String.join(", ", assignees) + ")"
                + " AND " + OPEN_STATUSES
                + " AND (issuetype IN (\"User Story\", Task, \"Test Plan\", Bug, Spike, \"L3 Problem\")"
                + " OR issuetype IN subTaskIssueTypes() OR issuetype = Epic)"
                + " ORDER BY key ASC";
        return searchAllPages(jql, roadmapFields());
    }

    @Override
    public JiraSearchResponseDto searchOpenMilestones(String projectKey) {
        return searchAllPages(
                "project = " + projectKey + " AND issuetype = Milestone AND " + OPEN_STATUSES + " ORDER BY key DESC",
                "summary,status,duedate");
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
        return String.join(",", "summary", "status", "issuetype", "parent", "assignee", "duedate",
                "timetracking", "labels", properties.fieldEffortEstimate(), properties.fieldEpicLink(),
                properties.fieldTargetStart(), properties.fieldFirstTimeInProgress());
    }
}
