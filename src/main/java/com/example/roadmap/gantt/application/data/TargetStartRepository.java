package com.example.roadmap.gantt.application.data;
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
/**
 * Source of truth for manually scheduled Jira work. Schedules live in PostgreSQL so every
 * application instance reads the same current plan rather than a local CSV file.
 */
@Repository
public class TargetStartRepository {

    private final JdbcTemplate jdbcTemplate;

    public TargetStartRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /** The target start date for one issue key, if a schedule has been entered for it. */
    public Optional<LocalDate> findByIssueKey(String issueKey) {
        return findScheduleByIssueKey(issueKey).map(Schedule::startDate);
    }

    /** The manually entered schedule for one issue key. */
    public Optional<Schedule> findScheduleByIssueKey(String issueKey) {
        if (issueKey == null) {
            return Optional.empty();
        }
        return jdbcTemplate.query("""
                        SELECT start_date, end_date, effort_md
                        FROM roadmap_schedule
                        WHERE issue_key = ?
                        """,
                (rs, rowNum) -> new Schedule(
                        rs.getObject("start_date", LocalDate.class),
                        rs.getObject("end_date", LocalDate.class),
                        rs.getObject("effort_md", Integer.class)),
                issueKey).stream().findFirst();
    }

    /** All manually entered schedules, ordered by issue key for deterministic processing. */
    public Map<String, Schedule> findSchedules() {
        Map<String, Schedule> schedules = new LinkedHashMap<>();
        jdbcTemplate.query("""
                        SELECT issue_key, start_date, end_date, effort_md
                        FROM roadmap_schedule
                        ORDER BY issue_key
                        """,
                (RowCallbackHandler) rs -> schedules.put(
                        rs.getString("issue_key"),
                        new Schedule(
                                rs.getObject("start_date", LocalDate.class),
                                rs.getObject("end_date", LocalDate.class),
                                rs.getObject("effort_md", Integer.class))));
        return schedules;
    }

    /**
     * Creates or updates a task's planned date range while preserving any effort value
     * previously maintained for that task.
     */
    public void saveSchedule(String issueKey, LocalDate startDate, LocalDate endDate) {
        if (issueKey == null || issueKey.isBlank()) {
            throw new IllegalArgumentException("issueKey is required");
        }
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("startDate and endDate are required");
        }
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("endDate cannot be before startDate");
        }
        jdbcTemplate.update("""
                        INSERT INTO roadmap_schedule (issue_key, start_date, end_date)
                        VALUES (?, ?, ?)
                        ON CONFLICT (issue_key) DO UPDATE
                        SET start_date = EXCLUDED.start_date,
                            end_date = EXCLUDED.end_date
                        """,
                issueKey.trim(), startDate, endDate);
    }

    /** A manually maintained schedule; endDate is optional for legacy target-start-only data. */
    public record Schedule(LocalDate startDate, LocalDate endDate, Integer effortMd) {
    }
}