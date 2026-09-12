package com.example.roadmap.gantt.application.data;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

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