package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.model.TaskStack;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowCallbackHandler;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.Map;
import java.util.Optional;

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
                        SELECT start_date, end_date, effort_md, stack_local
                        FROM roadmap_schedule
                        WHERE issue_key = ?
                        """,
                (rs, rowNum) -> new Schedule(
                        rs.getObject("start_date", LocalDate.class),
                        rs.getObject("end_date", LocalDate.class),
                        nullableDouble(rs.getBigDecimal("effort_md")),
                        parseStack(rs.getString("stack_local"))),
                issueKey).stream().findFirst();
    }

    /** All manually entered schedules, ordered by issue key for deterministic processing. */
    public Map<String, Schedule> findSchedules() {
        Map<String, Schedule> schedules = new LinkedHashMap<>();
        jdbcTemplate.query("""
                        SELECT issue_key, start_date, end_date, effort_md, stack_local
                        FROM roadmap_schedule
                        ORDER BY issue_key
                        """,
                (RowCallbackHandler) rs -> schedules.put(
                        rs.getString("issue_key"),
                        new Schedule(
                                rs.getObject("start_date", LocalDate.class),
                                rs.getObject("end_date", LocalDate.class),
                                nullableDouble(rs.getBigDecimal("effort_md")),
                                parseStack(rs.getString("stack_local")))));
        return schedules;
    }

    /**
     * Creates or updates a task's planned date range while preserving effort and any local
     * stack previously maintained for that task.
     */
    public void saveSchedule(String issueKey, LocalDate startDate, LocalDate endDate) {
        Schedule current = findScheduleByIssueKey(issueKey).orElse(null);
        saveSchedule(issueKey, startDate, endDate, current == null ? null : current.localStack(),
                current == null ? null : current.effortMd());
    }

    /**
     * Atomically stores the date window and optional local stack override. A null stack means
     * that Jira, and then the assignee's role, determine the effective stack.
     */
    public void saveSchedule(String issueKey, LocalDate startDate, LocalDate endDate, TaskStack localStack) {
        Double currentEffort = findScheduleByIssueKey(issueKey).map(Schedule::effortMd).orElse(null);
        saveSchedule(issueKey, startDate, endDate, localStack, currentEffort);
    }

    /**
     * Atomically stores the date window, optional local stack override and optional local effort.
     * A null effort deliberately clears the local fallback so Jira remains the only source.
     */
    public void saveSchedule(String issueKey, LocalDate startDate, LocalDate endDate, TaskStack localStack,
                             Double effortMd) {
        if (issueKey == null || issueKey.isBlank()) {
            throw new IllegalArgumentException("issueKey is required");
        }
        if (startDate == null || endDate == null) {
            throw new IllegalArgumentException("startDate and endDate are required");
        }
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("endDate cannot be before startDate");
        }
        if (localStack != null && !localStack.selectable()) {
            throw new IllegalArgumentException("localStack must be one of the four selectable stacks");
        }
        if (effortMd != null && effortMd <= 0) {
            throw new IllegalArgumentException("effortMd must be positive when supplied");
        }
        jdbcTemplate.update("""
                        INSERT INTO roadmap_schedule (issue_key, start_date, end_date, stack_local, effort_md)
                        VALUES (?, ?, ?, ?, ?)
                        ON CONFLICT (issue_key) DO UPDATE
                        SET start_date = EXCLUDED.start_date,
                            end_date = EXCLUDED.end_date,
                            stack_local = EXCLUDED.stack_local,
                            effort_md = EXCLUDED.effort_md
                        """,
                issueKey.trim(), startDate, endDate, localStack == null ? null : localStack.name(), effortMd);
    }

    /** A manually maintained schedule; endDate is optional for legacy target-start-only data. */
    public record Schedule(LocalDate startDate, LocalDate endDate, Double effortMd, TaskStack localStack) {
        public Schedule(LocalDate startDate, LocalDate endDate, Double effortMd) {
            this(startDate, endDate, effortMd, null);
        }
    }

    private static Double nullableDouble(java.math.BigDecimal value) {
        return value == null ? null : value.doubleValue();
    }

    private static TaskStack parseStack(String value) {
        return value == null ? null : TaskStack.valueOf(value);
    }
}
