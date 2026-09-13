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
                  ('TTAR-TEST',    '2026-09-11', '2026-09-14', 2),
                  ('TTAR-OVERDUE', '2026-08-17', '2026-08-21', 3),
                  ('TTAR-WEEKEND', '2026-09-12', '2026-09-13', 1),
                  ('TTAR-2101',    '2026-09-14', '2026-09-25', 5),
                  ('TTAR-2102',    '2026-09-16', '2026-10-02', 8),
                  ('TTAR-2103',    '2026-09-21', '2026-10-09', 5),
                  ('TTAR-2104',    '2026-10-05', '2026-10-16', 6),
                  ('TTAR-2105',    '2026-09-28', '2026-10-16', 8),
                  ('TTAR-2106',    '2026-10-12', '2026-10-30', 9),
                  ('TTAR-2107',    '2026-09-14', '2026-10-02', 7),
                  ('TTAR-2108',    '2026-09-17', '2026-10-09', 5),
                  ('TTAR-2111',    '2026-09-18', '2026-09-25', 2),
                  ('TTAR-2112',    '2026-09-21', '2026-09-30', 3),
                  ('TTAR-2113',    '2026-10-01', '2026-10-12', 3),
                  ('TTAR-2114',    '2026-10-12', '2026-10-23', 4)
                """);
        jdbc.update("""
                INSERT INTO team_absence (id, username, start_date, end_date, absence_type, note) VALUES
                  ('demo-absence-1', 'mbazante',   '2026-09-18', '2026-09-18', 'BIRTHDAY',   'Cumpleaños'),
                  ('demo-absence-2', 'bfestino',   '2026-09-21', '2026-09-23', 'VACATION',   'Vacaciones planificadas'),
                  ('demo-absence-3', 'rdente',     '2026-09-28', '2026-09-29', 'SICK_LEAVE', 'Licencia médica'),
                  ('demo-absence-4', 'tarteaga',   '2026-10-05', '2026-10-09', 'VACATION',   'Viaje familiar'),
                  ('demo-absence-5', 'sbenalcaza', '2026-10-12', '2026-10-12', 'OTHER',      'Trámite personal')
                """);
        jdbc.update("""
                UPDATE roadmap_schedule
                SET stack_local = CASE issue_key
                    WHEN 'TTAR-2104' THEN 'FRONTEND'
                    WHEN 'TTAR-2112' THEN 'DEVOPS'
                    ELSE stack_local
                END
                WHERE issue_key IN ('TTAR-2104', 'TTAR-2112')
                """);
        return jdbc;
    }

    @Bean JiraProperties properties() { return new JiraProperties("http://127.0.0.1:18083", "synthetic", "TTAR", null, null); }
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
                        issue("TTAR-2000", "Nueva experiencia mobile", "Epic", "bfestino", "In Progress", null, null, null, "2026-09-01", null, 0),
                        issue("TTAR-2001", "Modernización de plataforma", "Epic", "tarteaga", "In Progress", null, null, null, "2026-09-07", null, 0),
                        issue("TTAR-2002", "Experiencia web accesible", "Epic", "mbazante", "Open", null, null, null, "2026-09-14", null, 0),

                        issue("TTAR-2010", "Checkout mobile renovado", "User Story", "dgillig", "Open", "13", "TTAR-2000", null, "2026-09-07", null, 0),
                        issue("TTAR-2011", "Sincronización offline", "User Story", "bfestino", "In Progress", "8", "TTAR-2000", null, null, "2026-09-03", 16),
                        issue("TTAR-2020", "APIs de baja latencia", "User Story", "tarteaga", "In Progress", "13", "TTAR-2001", null, "2026-09-08", null, 24),
                        issue("TTAR-2021", "Observabilidad end-to-end", "User Story", "rdente", "Open", "5", "TTAR-2001", null, "2026-09-21", null, 0),
                        issue("TTAR-2030", "Nuevo sistema de diseño", "User Story", "mbazante", "In Progress", "8", "TTAR-2002", null, null, "2026-09-10", 8),
                        issue("TTAR-2031", "Flujos accesibles AA", "User Story", "agrigaliun", "Open", "5", "TTAR-2002", null, "2026-09-28", null, 0),

                        issue("TTAR-TEST", "Prueba viernes a lunes", "Task", "bfestino", "Open", "2", null, null, null, null, 0),
                        issue("TTAR-OVERDUE", "Compromiso vencido", "Bug", "bfestino", "Blocked", "3", null, null, null, null, 0),
                        issue("TTAR-WEEKEND", "Ventana sin días disponibles", "Task", "bfestino", "Open", "1", null, null, null, null, 0),
                        issue("TTAR-2101", "Autenticación biométrica", "Task", "dgillig", "In Progress", "5", "TTAR-2000", null, null, null, 8),
                        issue("TTAR-2102", "Componentes responsive", "Task", "mbazante", "Open", "8", "TTAR-2002", null, null, null, 0),
                        issue("TTAR-2103", "Reducir latencia del checkout", "Bug", "tarteaga", "In Progress", "5", "TTAR-2001", null, null, null, 12),
                        issue("TTAR-2104", "Feature flags por mercado", "Spike", "agrigaliun", "Open", "6", "TTAR-2001", null, null, null, 0),
                        issue("TTAR-2105", "Idempotencia de pagos", "Task", "sreza1", "Blocked", "8", "TTAR-2001", null, null, null, 0),
                        issue("TTAR-2106", "Reconciliación nocturna", "L3 Problem", "mmendoza", "Open", "9", null, null, null, null, 0),
                        issue("TTAR-2107", "Suite de regresión visual", "Test Plan", "sbenalcaza", "In Progress", "7", "TTAR-2002", null, null, null, 16),
                        issue("TTAR-2108", "Trazas distribuidas", "Task", "rdente", "Open", "5", "TTAR-2001", null, null, null, 0),

                        issue("TTAR-2111", "Validar Face ID y huella", "Sub-task", "dgillig", "In Progress", null, null, "TTAR-2010", null, null, 4),
                        issue("TTAR-2112", "Persistir cola offline", "Sub-task", "bfestino", "Open", null, null, "TTAR-2011", null, null, 0),
                        issue("TTAR-2113", "Migrar selector de país", "Sub-task", "mbazante", "Open", null, null, "TTAR-2030", null, null, 0),
                        issue("TTAR-2114", "Agregar cache de catálogo", "Sub-task", "tarteaga", "Open", null, null, "TTAR-2020", null, null, 0),

                        issue("TTAR-2201", "Hotfix de conciliación", "Bug", "mmendoza", "In Progress", "3", "TTAR-2001", null, null, "2026-09-11", 4),
                        issue("TTAR-2202", "Panel de configuración", "Task", "agrigaliun", "Open", "4", "TTAR-2002", null, "2026-10-19", null, 0),
                        issue("TTAR-2203", "Migración de tokens", "Task", "sbenalcaza", "Open", null, "TTAR-2001", null, "2026-10-26", null, 0),

                        issue("TTAR-NODATE", "Trabajo pendiente de planificar", "Task", "bfestino", "Open", "3", null, null, null, null, 0),
                        issue("TTAR-2190", "Definir estrategia de deep links", "Task", "dgillig", "Open", "5", "TTAR-2000", null, null, null, 0),
                        issue("TTAR-2191", "Investigar intermitencia de webhooks", "Bug", "sreza1", "Blocked", "0", "TTAR-2001", null, null, null, 0)));
            }
            public JiraSearchResponseDto searchOpenMilestones(String p) {
                return new JiraSearchResponseDto(List.of(
                        milestone("TTAR-M1", "Piloto interno", "2026-09-04", "Open"),
                        milestone("TTAR-M2", "Beta mobile", "2026-09-25", "Open"),
                        milestone("TTAR-M3", "Freeze de integración", "2026-10-09", "In Progress"),
                        milestone("TTAR-M4", "Release AR1", "2026-10-30", "Open"),
                        milestone("TTAR-M5", "Entrega descartada", "2026-09-18", "Closed")));
            }
        };
    }

    private JiraIssueDto issue(String key, String summary, String type, String username, String status,
                               String effort, String epicKey, String parentKey, String targetStart,
                               String firstTimeInProgress, int loggedHours) {
        TeamMember member = teamRoster.byUsername(username);
        JiraIssueDto.TimeTracking tracking = loggedHours == 0
                ? null
                : new JiraIssueDto.TimeTracking(null, loggedHours * 3600);
        JiraIssueDto.Parent parent = parentKey == null ? null : new JiraIssueDto.Parent(parentKey);
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType(type), tracking,
                new JiraIssueDto.User(member.name(), member.username(), null), new JiraIssueDto.Status(status),
                parent, "2026-08-03", null, stackLabels(key),
                customFields(effort, epicKey, targetStart, firstTimeInProgress)));
    }

    private List<String> stackLabels(String key) {
        return switch (key) {
            case "TTAR-2101", "TTAR-2111" -> List.of("Mobile");
            case "TTAR-2102", "TTAR-2113" -> List.of("Front End");
            case "TTAR-2103", "TTAR-2104", "TTAR-2114" -> List.of("BE");
            case "TTAR-2105" -> List.of("Mobile");
            case "TTAR-2107" -> List.of("Front End", "BE");
            case "TTAR-2108" -> List.of("DevOps");
            default -> List.of("roadmap-demo");
        };
    }

    private JiraIssueDto milestone(String key, String summary, String dueDate, String status) {
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType("Milestone"), null,
                null, new JiraIssueDto.Status(status), null, "2026-08-03", dueDate,
                List.of(), Map.of()));
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
