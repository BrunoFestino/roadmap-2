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
public class DemoApplication {
    private final AtomicReference<String> fault = new AtomicReference<>("none");
    private final GanttTeamRoster teamRoster = GanttTeamRoster.defaults();
    private final TaskStackResolver taskStackResolver = TaskStackResolver.defaults();

    public static void main(String[] args) {
        var app = new SpringApplication(DemoApplication.class);
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
                INSERT INTO roadmap_schedule (issue_key, start_date, end_date, effort_md) VALUES
                  ('DEMO-TEST',    '2026-09-11', '2026-09-14', 2),
                  ('DEMO-OVERDUE', '2026-08-17', '2026-08-21', 3),
                  ('DEMO-WEEKEND', '2026-09-12', '2026-09-13', 1),
                  ('DEMO-2101',    '2026-09-14', '2026-09-25', 5),
                  ('DEMO-2102',    '2026-09-16', '2026-10-02', 8),
                  ('DEMO-2103',    '2026-09-21', '2026-10-09', 5),
                  ('DEMO-2104',    '2026-10-05', '2026-10-16', 6),
                  ('DEMO-2105',    '2026-09-28', '2026-10-16', 8),
                  ('DEMO-2106',    '2026-10-12', '2026-10-30', 9),
                  ('DEMO-2107',    '2026-09-14', '2026-10-02', 7),
                  ('DEMO-2108',    '2026-09-17', '2026-10-09', 5),
                  ('DEMO-2111',    '2026-09-18', '2026-09-25', 2),
                  ('DEMO-2112',    '2026-09-21', '2026-09-30', 3),
                  ('DEMO-2113',    '2026-10-01', '2026-10-12', 3),
                  ('DEMO-2114',    '2026-10-12', '2026-10-23', 4),
                  ('DEMO-GREEN',   '2026-11-02', '2026-11-06', null),
                  ('DEMO-YELLOW',  '2026-11-02', '2026-11-06', null),
                  ('DEMO-RED',     '2026-11-02', '2026-11-06', null),
                  ('DEMO-PARENT',  '2026-10-19', '2026-10-30', null),
                  ('DEMO-SUB-A',   '2026-10-19', '2026-10-30', 3),
                  ('DEMO-SUB-B',   '2026-10-19', '2026-10-30', null),
                  ('DEMO-SUB-C',   '2026-10-19', '2026-10-30', null)
                """);
        jdbc.update("""
                INSERT INTO team_absence (id, username, start_date, end_date, absence_type, note) VALUES
                  ('demo-absence-1', 'mjohnson',   '2026-09-18', '2026-09-18', 'BIRTHDAY',   'Birthday'),
                  ('demo-absence-2', 'jdoe',   '2026-09-21', '2026-09-23', 'VACATION',   'Planned vacation'),
                  ('demo-absence-3', 'tanderson',     '2026-09-28', '2026-09-29', 'SICK_LEAVE', 'Medical leave'),
                  ('demo-absence-4', 'dlee',   '2026-10-05', '2026-10-09', 'VACATION',   'Family trip'),
                  ('demo-absence-5', 'emartin', '2026-10-12', '2026-10-12', 'OTHER',      'Personal appointment')
                """);
        jdbc.update("""
                UPDATE roadmap_schedule
                SET stack_local = CASE issue_key
                    WHEN 'DEMO-2104' THEN 'FRONTEND'
                    WHEN 'DEMO-2112' THEN 'DEVOPS'
                    ELSE stack_local
                END
                WHERE issue_key IN ('DEMO-2104', 'DEMO-2112')
                """);
        return jdbc;
    }

    @Bean JiraProperties properties() { return new JiraProperties("http://127.0.0.1:18083", "synthetic", "DEMO", null, null); }
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
            @Override public void saveSchedule(String key, LocalDate start, LocalDate end, TaskStack stack, Double effortMd) {
                fail("schedule-save");
                super.saveSchedule(key, start, end, stack, effortMd);
                fault.updateAndGet(value -> "reload-after-save".equals(value) ? "jira-load" : value);
            }
        };
    }

    @Bean JiraClient jira() {
        return new JiraClient() {
            public JiraSearchResponseDto searchOpenIssuesByAssignees(String p, List<String> users) {
                fail("jira-load");
                return new JiraSearchResponseDto(List.of(
                        issue("DEMO-2010", "Renewed mobile checkout", "User Story", "asmith", "Open", "13", "DEMO-2000", null, "2026-09-07", null, 0),
                        issue("DEMO-2011", "Offline synchronization", "User Story", "jdoe", "In Progress", "8", "DEMO-2000", null, null, "2026-09-03", 16),
                        issue("DEMO-2020", "Low-latency APIs", "User Story", "dlee", "In Progress", "13", "DEMO-2001", null, "2026-09-08", null, 24),
                        issue("DEMO-2021", "End-to-end observability", "User Story", "tanderson", "Open", "5", "DEMO-2001", null, "2026-09-21", null, 0),
                        issue("DEMO-2030", "New design system", "User Story", "mjohnson", "In Progress", "8", "DEMO-2002", null, null, "2026-09-10", 8),
                        issue("DEMO-2031", "Accessible AA workflows", "User Story", "bwilson", "Open", "5", "DEMO-2002", null, "2026-09-28", null, 0),

                        issue("DEMO-TEST", "Friday-to-Monday test", "Task", "jdoe", "Open", "2", null, null, null, null, 0),
                        issue("DEMO-GREEN", "Traffic light example: 30 hours", "Task", "bwilson", "Open", "3.75", null, null, null, null, 0),
                        issue("DEMO-YELLOW", "Traffic light example: 36 hours", "Task", "mjohnson", "Open", "4.5", null, null, null, null, 0),
                        issue("DEMO-RED", "Traffic light example: 44 hours", "Task", "jdoe", "Open", "5.5", null, null, null, null, 0),
                        issue("DEMO-PARENT", "Mixed subtask budget example", "Task", "bwilson", "Open", "10", null, null, null, null, 0),
                        issue("DEMO-SUB-A", "Explicit local estimate: 3 MD", "Sub-task", "bwilson", "Open", "9", null, "DEMO-PARENT", null, null, 0),
                        issue("DEMO-SUB-B", "Inherited share: 3.5 MD", "Sub-task", "jdoe", "Open", "9", null, "DEMO-PARENT", null, null, 0),
                        issue("DEMO-SUB-C", "Inherited share: 3.5 MD", "Sub-task", "mjohnson", "Open", "9", null, "DEMO-PARENT", null, null, 0),
                        issue("DEMO-OVERDUE", "Overdue commitment", "Bug", "jdoe", "Blocked", "3", null, null, null, null, 0),
                        issue("DEMO-WEEKEND", "Window with no available days", "Task", "jdoe", "Open", "1", null, null, null, null, 0),
                        issue("DEMO-2101", "Biometric authentication", "Task", "asmith", "In Progress", "5", "DEMO-2000", null, null, null, 8),
                        issue("DEMO-2102", "Responsive components", "Task", "mjohnson", "Open", "8", "DEMO-2002", null, null, null, 0),
                        issue("DEMO-2103", "Reduce checkout latency", "Bug", "dlee", "In Progress", "5", "DEMO-2001", null, null, null, 12),
                        issue("DEMO-2104", "Feature flags by market", "Spike", "bwilson", "Open", "6", "DEMO-2001", null, null, null, 0),
                        issue("DEMO-2105", "Payment idempotency", "Task", "sbrown", "Blocked", "8", "DEMO-2001", null, null, null, 0),
                        issue("DEMO-2106", "Nightly reconciliation", "L3 Problem", "rgarcia", "Open", "9", null, null, null, null, 0),
                        issue("DEMO-2107", "Visual regression suite", "Test Plan", "emartin", "In Progress", "7", "DEMO-2002", null, null, null, 16),
                        issue("DEMO-2108", "Distributed tracing", "Task", "tanderson", "Open", "5", "DEMO-2001", null, null, null, 0),

                        issue("DEMO-2111", "Validate Face ID and fingerprint", "Sub-task", "asmith", "In Progress", null, null, "DEMO-2010", null, null, 4),
                        issue("DEMO-2112", "Persist offline queue", "Sub-task", "jdoe", "Open", null, null, "DEMO-2011", null, null, 0),
                        issue("DEMO-2113", "Migrate country selector", "Sub-task", "mjohnson", "Open", null, null, "DEMO-2030", null, null, 0),
                        issue("DEMO-2114", "Add catalog cache", "Sub-task", "dlee", "Open", null, null, "DEMO-2020", null, null, 0),

                        issue("DEMO-2201", "Reconciliation hotfix", "Bug", "rgarcia", "In Progress", "3", "DEMO-2001", null, null, "2026-09-11", 4),
                        issue("DEMO-2202", "Configuration panel", "Task", "bwilson", "Open", "4", "DEMO-2002", null, "2026-10-19", null, 0),
                        issue("DEMO-2203", "Token migration", "Task", "emartin", "Open", null, "DEMO-2001", null, "2026-10-26", null, 0),

                        issue("DEMO-NODATE", "Work awaiting planning", "Task", "jdoe", "Open", "3", null, null, null, null, 0),
                        issue("DEMO-2190", "Define deep-link strategy", "Task", "asmith", "Open", "5", "DEMO-2000", null, null, null, 0),
                        issue("DEMO-2191", "Investigate intermittent webhooks", "Bug", "sbrown", "Blocked", "0", "DEMO-2001", null, null, null, 0)));
            }
            public JiraSearchResponseDto searchOpenEpics(String p) {
                return new JiraSearchResponseDto(List.of(
                        epic("DEMO-2000", "Mobile experience", "2026-09-01", "2026-10-02", "In Progress"),
                        epic("DEMO-2001", "Platform modernization", "2026-09-07", "2026-10-16", "In Progress"),
                        epic("DEMO-2002", "Accessible web experience", "2026-09-14", "2026-10-30", "Open")));
            }
            public JiraSearchResponseDto searchOpenMilestones(String p) {
                return new JiraSearchResponseDto(List.of(
                        milestone("DEMO-M1", "Internal pilot", "2026-09-04", "Open"),
                        milestone("DEMO-M2", "Beta mobile", "2026-09-25", "Open"),
                        milestone("DEMO-M3", "Integration freeze", "2026-10-09", "In Progress"),
                        milestone("DEMO-M4", "Release example", "2026-10-30", "Open"),
                        milestone("DEMO-M5", "Discarded delivery", "2026-09-18", "Closed")));
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
            case "DEMO-2101", "DEMO-2111" -> List.of("Mobile");
            case "DEMO-2102", "DEMO-2113" -> List.of("Front End");
            case "DEMO-2103", "DEMO-2104", "DEMO-2114" -> List.of("BE");
            case "DEMO-2105" -> List.of("Mobile");
            case "DEMO-2107" -> List.of("Front End", "BE");
            case "DEMO-2108" -> List.of("DevOps");
            default -> List.of("roadmap-demo");
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
                List.of(), customFields(null, null, targetStart, null)));
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
