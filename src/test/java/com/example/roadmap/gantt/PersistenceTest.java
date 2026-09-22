package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.model.*;
import io.zonky.test.db.postgres.embedded.EmbeddedPostgres;
import org.flywaydb.core.Flyway;
import org.junit.jupiter.api.Test;
import org.springframework.jdbc.core.JdbcTemplate;
import java.time.LocalDate;
import static org.assertj.core.api.Assertions.*;

class PersistenceTest {
    @Test void migrationsPreservePlansStacksAndAbsences() throws Exception {
        try (var postgres = EmbeddedPostgres.start()) {
            var source = postgres.getPostgresDatabase();
            var flyway = Flyway.configure().dataSource(source).load();
            assertThat(flyway.migrate().migrationsExecuted).isEqualTo(3);
            var jdbc = new JdbcTemplate(source);
            assertThat(jdbc.queryForObject("SELECT count(*) FROM roadmap_schedule", Integer.class)).isZero();
            assertThat(jdbc.queryForObject("SELECT count(*) FROM team_absence", Integer.class)).isZero();
            var schedules = new TargetStartRepository(jdbc);
            var absences = new TeamAbsenceRepository(jdbc);
            LocalDate start = LocalDate.of(2026, 9, 11);
            schedules.saveSchedule("TEST-TEST", start, start.plusDays(3));
            schedules.saveSchedule("TEST-TEST", start, start.plusDays(7), TaskStack.FRONTEND, 2.25);
            var absence = absences.add("jdoe", start, start.plusDays(1), AbsenceType.VACATION, "Prueba");
            assertThat(flyway.migrate().migrationsExecuted).isZero();
            assertThat(new TargetStartRepository(jdbc).findScheduleByIssueKey("TEST-TEST"))
                    .hasValue(new TargetStartRepository.Schedule(start, start.plusDays(7), 2.25, TaskStack.FRONTEND));
            assertThat(absences.findAll()).containsExactly(absence);
            absences.update(new TeamAbsence(absence.id(), absence.username(), start, start.plusDays(2), absence.type(), "Editada"));
            assertThat(absences.findAll().getFirst().note()).isEqualTo("Editada");
            absences.delete(absence.id());
            assertThat(absences.findAll()).isEmpty();
            assertThatThrownBy(() -> jdbc.update("""
                    INSERT INTO roadmap_schedule (issue_key, start_date, end_date, effort_md)
                    VALUES ('BAD', ?, ?, 0)
                    """, start, start.minusDays(1)))
                    .isInstanceOf(org.springframework.dao.DataIntegrityViolationException.class);
            assertThatThrownBy(() -> jdbc.update("""
                    INSERT INTO roadmap_schedule (issue_key, start_date, end_date, stack_local)
                    VALUES ('BAD-STACK', ?, ?, 'FULL_STACK')
                    """, start, start.plusDays(1)))
                    .isInstanceOf(org.springframework.dao.DataIntegrityViolationException.class);
        }
    }
}
