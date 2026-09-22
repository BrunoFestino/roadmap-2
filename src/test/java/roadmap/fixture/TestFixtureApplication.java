package roadmap.fixture;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.vaadin.flow.spring.annotation.EnableVaadin;
import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import org.flywaydb.core.Flyway;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.SpringBootConfiguration;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.boot.autoconfigure.flyway.FlywayAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.dao.DataAccessResourceFailureException;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

/** Local-only fixture launcher. This class and its fault controls are never packaged in the app. */
@EnableVaadin("com.example.roadmap")
@SpringBootConfiguration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, FlywayAutoConfiguration.class})
public class TestFixtureApplication {
    private final AtomicReference<String> fault = new AtomicReference<>("none");
    private final GanttTeamRoster teamRoster = GanttTeamRoster.defaults();
    private final TaskStackResolver taskStackResolver = TaskStackResolver.defaults();

    public static void main(String[] args) {
        var app = new SpringApplication(TestFixtureApplication.class);
        app.setDefaultProperties(Map.of("server.address", "127.0.0.1", "server.port", "18083",
                "vaadin.productionMode", "true", "vaadin.launch-browser", "false"));
        app.run(args);
    }

    @Bean(destroyMethod = "close") EmbeddedPostgres postgres() throws Exception { return EmbeddedPostgres.start(); }

    @Bean JdbcTemplate jdbc(EmbeddedPostgres postgres) {
        var source = postgres.getPostgresDatabase();
        Flyway.configure().dataSource(source).load().migrate();
        var jdbc = new JdbcTemplate(source);
        jdbc.update("""
                INSERT INTO roadmap_schedule (issue_key, start_date, end_date) VALUES
                  ('TEST-TEST',    '2026-09-11', '2026-09-14'),
                  ('TEST-OVERDUE', '2026-08-17', '2026-08-21'),
                  ('TEST-WEEKEND', '2026-09-12', '2026-09-13'),
                  ('TEST-2101',    '2026-09-14', '2026-09-25'),
                  ('TEST-2102',    '2026-09-16', '2026-10-02'),
                  ('TEST-2103',    '2026-09-21', '2026-10-09'),
                  ('TEST-2104',    '2026-10-05', '2026-10-16'),
                  ('TEST-2105',    '2026-09-28', '2026-10-16'),
                  ('TEST-2106',    '2026-10-12', '2026-10-30'),
                  ('TEST-2107',    '2026-09-14', '2026-10-02'),
                  ('TEST-2108',    '2026-09-17', '2026-10-09'),
                  ('TEST-2111',    '2026-09-18', '2026-09-25'),
                  ('TEST-2112',    '2026-09-21', '2026-09-30'),
                  ('TEST-2113',    '2026-10-01', '2026-10-12'),
                  ('TEST-2114',    '2026-10-12', '2026-10-23'),
                  ('TEST-GREEN',   '2026-11-02', '2026-11-06'),
                  ('TEST-YELLOW',  '2026-11-02', '2026-11-06'),
                  ('TEST-RED',     '2026-11-02', '2026-11-06'),
                  ('TEST-PARENT',  '2026-10-19', '2026-10-30'),
                  ('TEST-SUB-A',   '2026-10-19', '2026-10-30'),
                  ('TEST-SUB-B',   '2026-10-19', '2026-10-30'),
                  ('TEST-SUB-C',   '2026-10-19', '2026-10-30')
                """);
        jdbc.update("""
                INSERT INTO team_absence (id, username, start_date, end_date, absence_type, note) VALUES
                  ('fixture-absence-1', 'mjohnson',   '2026-09-18', '2026-09-18', 'BIRTHDAY',   'Birthday'),
                  ('fixture-absence-2', 'jdoe',   '2026-09-21', '2026-09-23', 'VACATION',   'Planned vacation'),
                  ('fixture-absence-3', 'tanderson',     '2026-09-28', '2026-09-29', 'SICK_LEAVE', 'Medical leave'),
                  ('fixture-absence-4', 'dlee',   '2026-10-05', '2026-10-09', 'VACATION',   'Family trip'),
                  ('fixture-absence-5', 'emartin', '2026-10-12', '2026-10-12', 'OTHER',      'Personal appointment')
                """);
        jdbc.update("""
                UPDATE roadmap_schedule
                SET stack_local = CASE issue_key
                    WHEN 'TEST-2104' THEN 'FRONTEND'
                    WHEN 'TEST-2112' THEN 'DEVOPS'
                    ELSE stack_local
                END
                WHERE issue_key IN ('TEST-2104', 'TEST-2112')
                """);
        return jdbc;
    }

    @Bean JiraProperties properties() { return new JiraProperties("http://127.0.0.1:18083", "synthetic", "TEST", null, null); }
    @Bean GanttTeamRoster teamRoster() { return teamRoster; }
    @Bean TaskStackResolver taskStackResolver() { return taskStackResolver; }

    private void fail(String operation) {
        String current = fault.get();
        if (operation.equals(current) && fault.compareAndSet(current, "none"))
            throw new DataAccessResourceFailureException("Synthetic " + operation + " failure");
    }

    @Bean TeamAbsenceRepository absences(JdbcTemplate jdbc) {
        return new TeamAbsenceRepository(jdbc) {
            @Override public List<TeamAbsence> findAll() { fail("absence-load"); return super.findAll(); }
            @Override public TeamAbsence add(String u, LocalDate s, LocalDate e, AbsenceType t, String n) {
                fail("absence-save"); return super.add(u, s, e, t, n);
            }
            @Override public void delete(String id) { fail("absence-delete"); super.delete(id); }
        };
    }

    @Bean TargetStartRepository schedules(JdbcTemplate jdbc) {
        return new TargetStartRepository(jdbc) {
            @Override public void saveSchedule(String key, LocalDate start, LocalDate end, TaskStack stack) {
                fail("schedule-save");
                super.saveSchedule(key, start, end, stack);
                fault.updateAndGet(value -> "reload-after-save".equals(value) ? "jira-load" : value);
            }
        };
    }

    @Bean JiraClient jira() {
        return new JiraClient() {
            public JiraSearchResponseDto searchOpenIssuesByAssignees(String p, List<String> users) {
                fail("jira-load");
                return new JiraSearchResponseDto(List.of(
                        issue("TEST-2010", "Renewed mobile checkout", "User Story", "asmith", "Open", "13", "TEST-2000", null, "2026-09-07", null, 0),
                        issue("TEST-2011", "Offline synchronization", "User Story", "jdoe", "In Progress", "8", "TEST-2000", null, null, "2026-09-03", 16),
                        issue("TEST-2020", "Low-latency APIs", "User Story", "dlee", "In Progress", "13", "TEST-2001", null, "2026-09-08", null, 24),
                        issue("TEST-2021", "End-to-end observability", "User Story", "tanderson", "Open", "5", "TEST-2001", null, "2026-09-21", null, 0),
                        issue("TEST-2030", "New design system", "User Story", "mjohnson", "In Progress", "8", "TEST-2002", null, null, "2026-09-10", 8),
                        issue("TEST-2031", "Accessible AA workflows", "User Story", "bwilson", "Open", "5", "TEST-2002", null, "2026-09-28", null, 0),

                        issue("TEST-TEST", "Friday-to-Monday test", "Task", "jdoe", "Open", "2", null, null, null, null, 0),
                        issue("TEST-GREEN", "Traffic light example: 30 hours", "Task", "bwilson", "Open", "3.75", null, null, null, null, 0),
                        issue("TEST-YELLOW", "Traffic light example: 36 hours", "Task", "mjohnson", "Open", "4.5", null, null, null, null, 0),
                        issue("TEST-RED", "Traffic light example: 44 hours", "Task", "jdoe", "Open", "5.5", null, null, null, null, 0),
                        issue("TEST-PARENT", "Parent excluded when subtasks exist", "Task", "bwilson", "Open", "10", null, null, null, null, 0),
                        issue("TEST-SUB-A", "Jira Original Estimate: 3 MD", "Sub-task", "bwilson", "Open", "3", null, "TEST-PARENT", null, null, 0),
                        issue("TEST-SUB-B", "Jira estimate required", "Sub-task", "jdoe", "Open", null, null, "TEST-PARENT", null, null, 0),
                        issue("TEST-SUB-C", "Jira estimate required", "Sub-task", "mjohnson", "Open", null, null, "TEST-PARENT", null, null, 0),
                        issue("TEST-OVERDUE", "Overdue commitment", "Bug", "jdoe", "Blocked", "3", null, null, null, null, 0),
                        issue("TEST-WEEKEND", "Window with no available days", "Task", "jdoe", "Open", "1", null, null, null, null, 0),
                        issue("TEST-2101", "Biometric authentication", "Task", "asmith", "In Progress", "5", "TEST-2000", null, null, null, 8),
                        issue("TEST-2102", "Responsive components", "Task", "mjohnson", "Open", "8", "TEST-2002", null, null, null, 0),
                        issue("TEST-2103", "Reduce checkout latency", "Bug", "dlee", "In Progress", "5", "TEST-2001", null, null, null, 12),
                        issue("TEST-2104", "Feature flags by market", "Spike", "bwilson", "Open", "6", "TEST-2001", null, null, null, 0),
                        issue("TEST-2105", "Payment idempotency", "Task", "sbrown", "Blocked", "8", "TEST-2001", null, null, null, 0),
                        issue("TEST-2106", "Nightly reconciliation", "L3 Problem", "rgarcia", "Open", "9", null, null, null, null, 0),
                        issue("TEST-2107", "Visual regression suite", "Test Plan", "emartin", "In Progress", "7", "TEST-2002", null, null, null, 16),
                        issue("TEST-2108", "Distributed tracing", "Task", "tanderson", "Open", "5", "TEST-2001", null, null, null, 0),

                        issue("TEST-2111", "Validate Face ID and fingerprint", "Sub-task", "asmith", "In Progress", "2", null, "TEST-2010", null, null, 4),
                        issue("TEST-2112", "Persist offline queue", "Sub-task", "jdoe", "Open", "3", null, "TEST-2011", null, null, 0),
                        issue("TEST-2113", "Migrate country selector", "Sub-task", "mjohnson", "Open", "3", null, "TEST-2030", null, null, 0),
                        issue("TEST-2114", "Add catalog cache", "Sub-task", "dlee", "Open", "4", null, "TEST-2020", null, null, 0),

                        issue("TEST-2201", "Reconciliation hotfix", "Bug", "rgarcia", "In Progress", "3", "TEST-2001", null, null, "2026-09-11", 4),
                        issue("TEST-2202", "Configuration panel", "Task", "bwilson", "Open", "4", "TEST-2002", null, "2026-10-19", null, 0),
                        issue("TEST-2203", "Token migration", "Task", "emartin", "Open", null, "TEST-2001", null, "2026-10-26", null, 0),

                        issue("TEST-NODATE", "Work awaiting planning", "Task", "jdoe", "Open", "3", null, null, null, null, 0),
                        issue("TEST-2190", "Define deep-link strategy", "Task", "asmith", "Open", "5", "TEST-2000", null, null, null, 0),
                        issue("TEST-2191", "Investigate intermittent webhooks", "Bug", "sbrown", "Blocked", "0", "TEST-2001", null, null, null, 0)));
            }
            public JiraSearchResponseDto searchOpenEpics(String p) {
                if (Boolean.getBoolean("roadmap.fixture.initiative-cases")) {
                    return new JiraSearchResponseDto(List.of(
                            epic("TEST-2000", "Mobile experience", null, null, "Open"),
                            epic("TEST-2001", "Platform modernization", "2026-08-01", "2026-08-10", "Open")));
                }
                return new JiraSearchResponseDto(List.of(
                        epic("TEST-2000", "Mobile experience", "2026-09-01", "2026-10-02", "In Progress"),
                        epic("TEST-2001", "Platform modernization", "2026-09-07", "2026-10-16", "In Progress"),
                        epic("TEST-2002", "Accessible web experience", "2026-09-14", "2026-10-30", "Open")));
            }
            public Map<String, String> findIssueSummaries(List<String> keys) {
                return keys.contains("TEST-2002") ? Map.of("TEST-2002", "Accessible web experience") : Map.of();
            }
            public JiraSearchResponseDto searchOpenMilestones(String p) {
                return new JiraSearchResponseDto(List.of(
                        milestone("TEST-M1", "Internal pilot", "2026-09-04", "Open"),
                        milestone("TEST-M2", "Beta mobile", "2026-09-25", "Open"),
                        milestone("TEST-M3", "Integration freeze", "2026-10-09", "In Progress"),
                        milestone("TEST-M4", "Release example", "2026-10-30", "Open"),
                        milestone("TEST-M5", "Discarded delivery", "2026-09-18", "Closed")));
            }
        };
    }

    private JiraIssueDto issue(String key, String summary, String type, String username, String status,
                               String effort, String epicKey, String parentKey, String targetStart,
                               String firstTimeInProgress, int loggedHours) {
        TeamMember member = teamRoster.byUsername(username);
        Integer originalSeconds = effort != null && Double.parseDouble(effort) > 0
                ? (int) Math.round(Double.parseDouble(effort) * 8 * 3600) : null;
        JiraIssueDto.TimeTracking tracking = new JiraIssueDto.TimeTracking(originalSeconds, loggedHours * 3600);
        JiraIssueDto.Parent parent = parentKey == null ? null : new JiraIssueDto.Parent(parentKey);
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType(type), tracking,
                new JiraIssueDto.User(member.name(), member.username(), null), new JiraIssueDto.Status(status),
                parent, "2026-08-03", null, stackLabels(key),
                customFields(effort, epicKey, targetStart, firstTimeInProgress)));
    }

    private List<String> stackLabels(String key) {
        return switch (key) {
            case "TEST-2101", "TEST-2111" -> List.of("Mobile");
            case "TEST-2102", "TEST-2113" -> List.of("Front End");
            case "TEST-2103", "TEST-2104", "TEST-2114" -> List.of("BE");
            case "TEST-2105" -> List.of("Mobile");
            case "TEST-2107" -> List.of("Front End", "BE");
            case "TEST-2108" -> List.of("DevOps");
            default -> List.of("roadmap-fixture");
        };
    }

    private JiraIssueDto milestone(String key, String summary, String dueDate, String status) {
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType("Milestone"), null,
                null, new JiraIssueDto.Status(status), null, "2026-08-03", dueDate,
                List.of(), Map.of()));
    }

    private JiraIssueDto epic(String key, String summary, String targetStart, String dueDate, String status) {
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType("Epic"), null,
                null, new JiraIssueDto.Status(status), null, "2026-08-03", dueDate,
                List.of(), customFields("12.5", null, targetStart, null)));
    }

    private Map<String, Object> customFields(String effort, String epicKey, String targetStart,
            String firstTimeInProgress) {
        Map<String, Object> fields = new LinkedHashMap<>();
        putIfPresent(fields, JiraProperties.DEFAULT_FIELD_EFFORT_ESTIMATE, effort);
        putIfPresent(fields, JiraProperties.DEFAULT_FIELD_EPIC_LINK, epicKey);
        putIfPresent(fields, JiraProperties.DEFAULT_FIELD_TARGET_START, targetStart);
        putIfPresent(fields, JiraProperties.DEFAULT_FIELD_FIRST_TIME_IN_PROGRESS, firstTimeInProgress);
        return fields;
    }

    private void putIfPresent(Map<String, Object> target, String key, String value) {
        if (value != null) {
            target.put(key, value);
        }
    }

    @Bean GanttDataProvider provider(JiraClient j, JiraProperties p, TeamAbsenceRepository a,
            TargetStartRepository s, GanttTeamRoster roster, TaskStackResolver resolver) {
        return new JiraGanttDataProvider(j, p, a, s, roster, resolver);
    }
    @Bean BuildRoleGanttUseCase roles(GanttDataProvider d) { return new BuildRoleGanttUseCase(d); }
    @Bean BuildPersonGanttUseCase people(GanttDataProvider d, GanttTeamRoster roster) {
        return new BuildPersonGanttUseCase(d, roster);
    }
    @Bean BuildWorkloadReportUseCase workload(GanttDataProvider d, TeamAbsenceRepository a,
            JiraProperties p, GanttTeamRoster roster) {
        return new BuildWorkloadReportUseCase(d, a, p, roster);
    }

    @RestController
    class FaultControl {
        private final JdbcTemplate jdbc;
        FaultControl(JdbcTemplate jdbc) { this.jdbc = jdbc; }
        @PostMapping("/test/fault/{mode}") Map<String, String> fault(@PathVariable String mode) {
            fault.set(mode); return Map.of("mode", mode);
        }
        @GetMapping("/test/state") Map<String, Object> state() {
            return Map.of("plans", jdbc.queryForList("SELECT * FROM roadmap_schedule ORDER BY issue_key"),
                    "absences", jdbc.queryForList("SELECT * FROM team_absence ORDER BY id"));
        }
    }
}
