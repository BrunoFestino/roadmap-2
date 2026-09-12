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
import java.util.List;
import java.util.Map;
import java.util.concurrent.atomic.AtomicReference;

/** Local-only fixture launcher. This class and its fault controls are never packaged in the app. */
@EnableVaadin("com.example.roadmap")
@SpringBootConfiguration
@EnableAutoConfiguration(exclude = {DataSourceAutoConfiguration.class, FlywayAutoConfiguration.class})
public class DemoApplication {
    private final AtomicReference<String> fault = new AtomicReference<>("none");

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
        jdbc.update("INSERT INTO roadmap_schedule VALUES ('TTAR-TEST', '2026-09-11', '2026-09-14', 2)");
        jdbc.update("INSERT INTO roadmap_schedule VALUES ('TTAR-OVERDUE', '2026-08-17', '2026-08-21', 3)");
        jdbc.update("INSERT INTO roadmap_schedule VALUES ('TTAR-WEEKEND', '2026-09-12', '2026-09-13', 1)");
        return jdbc;
    }

    @Bean JiraProperties properties() { return new JiraProperties("http://127.0.0.1:18083", "synthetic", "TTAR", null, null); }

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
            @Override public void saveSchedule(String key, LocalDate start, LocalDate end) {
                fail("schedule-save");
                super.saveSchedule(key, start, end);
                fault.updateAndGet(value -> "reload-after-save".equals(value) ? "jira-load" : value);
            }
        };
    }

    @Bean JiraClient jira() {
        return new JiraClient() {
            public JiraSearchResponseDto searchOpenIssuesByAssignees(String p, List<String> users) {
                fail("jira-load");
                return new JiraSearchResponseDto(List.of(issue("TTAR-TEST", "Prueba viernes a lunes", "2"),
                        issue("TTAR-OVERDUE", "Compromiso vencido", "3"), issue("TTAR-WEEKEND", "Ventana sin días disponibles", "1"),
                        issue("TTAR-NODATE", "Trabajo pendiente de planificar", "3")));
            }
            public JiraSearchResponseDto searchOpenMilestones(String p) { return new JiraSearchResponseDto(List.of()); }
        };
    }

    private JiraIssueDto issue(String key, String summary, String effort) {
        return new JiraIssueDto(key, new JiraIssueDto.Fields(summary, new JiraIssueDto.IssueType("Task"), null,
                new JiraIssueDto.User("Bruno Festino", "bfestino", null), new JiraIssueDto.Status("Open"),
                null, null, null, effort, null, null, null));
    }

    @Bean GanttDataProvider provider(JiraClient j, JiraProperties p, TeamAbsenceRepository a, TargetStartRepository s) { return new JiraGanttDataProvider(j, p, a, s); }
    @Bean BuildRoleGanttUseCase roles(GanttDataProvider d) { return new BuildRoleGanttUseCase(d); }
    @Bean BuildPersonGanttUseCase people(GanttDataProvider d) { return new BuildPersonGanttUseCase(d); }
    @Bean BuildWorkloadReportUseCase workload(GanttDataProvider d, TeamAbsenceRepository a, JiraProperties p) { return new BuildWorkloadReportUseCase(d, a, p); }

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
