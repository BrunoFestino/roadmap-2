package com.example.roadmap.jira.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

/** The narrow Jira issue shape used by the roadmap and its milestone markers. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record JiraIssueDto(String key, Fields fields) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Fields(
            String summary,
            IssueType issuetype,
            TimeTracking timetracking,
            User assignee,
            Status status,
            Parent parent,
            String created,
            String duedate,
            @JsonProperty("customfield_14230") String effortEstimateManDays,
            @JsonProperty("customfield_10830") String epicLinkKey,
            @JsonProperty("customfield_12832") String targetStart,
            @JsonProperty("customfield_13034") String firstTimeInProgress
    ) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record User(String displayName, String name, String emailAddress) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Status(String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Parent(String key) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record IssueType(String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TimeTracking(Integer originalEstimateSeconds, Integer timeSpentSeconds) {
    }

}