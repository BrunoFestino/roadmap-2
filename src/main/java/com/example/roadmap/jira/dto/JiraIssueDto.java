package com.example.roadmap.jira.dto;
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