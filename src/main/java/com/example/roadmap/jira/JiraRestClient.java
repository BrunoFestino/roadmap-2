package com.example.roadmap.jira;
import com.example.roadmap.config.*;
import com.example.roadmap.jira.*;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.ui.*;
import com.example.roadmap.gantt.ui.style.*;
import com.example.roadmap.gantt.ui.widget.*;
import com.example.roadmap.ui.*;

import com.fasterxml.jackson.annotation.*;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.applayout.*;
import com.vaadin.flow.component.button.*;
import com.vaadin.flow.component.checkbox.*;
import com.vaadin.flow.component.combobox.*;
import com.vaadin.flow.component.datepicker.*;
import com.vaadin.flow.component.dependency.*;
import com.vaadin.flow.component.dialog.*;
import com.vaadin.flow.component.grid.*;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.component.notification.*;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.select.*;
import com.vaadin.flow.component.sidenav.*;
import com.vaadin.flow.component.textfield.*;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.*;
import com.vaadin.flow.component.page.*;
import com.vaadin.flow.component.details.*;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.theme.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.web.client.*;
import java.net.*;
import java.net.http.*;
import java.nio.charset.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
public class JiraRestClient implements JiraClient {

    private static final int PAGE_SIZE = 100;
    private static final String OPEN_STATUSES =
            "status NOT IN (\"Done\", \"Cancelled\", \"Resolved\", \"Closed\", \"Obsolete\")";
    private static final String ROADMAP_FIELDS =
            "summary,status,issuetype,parent,assignee,duedate,timetracking,"
                    + "customfield_14230,customfield_12832,customfield_13034,customfield_10830";

    private final RestClient restClient;

    public JiraRestClient(RestClient jiraRestClient) {
        this.restClient = jiraRestClient;
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
        return searchAllPages(jql, ROADMAP_FIELDS);
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
}