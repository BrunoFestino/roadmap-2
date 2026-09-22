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
            assertThat(flyway.migrate().migrationsExecuted).isEqualTo(4);
            var jdbc = new JdbcTemplate(source);
            assertThat(jdbc.queryForObject("SELECT count(*) FROM roadmap_schedule", Integer.class)).isZero();
            assertThat(jdbc.queryForObject("SELECT count(*) FROM team_absence", Integer.class)).isZero();
            var schedules = new TargetStartRepository(jdbc);
            var absences = new TeamAbsenceRepository(jdbc);
            LocalDate start = LocalDate.of(2026, 9, 11);
            schedules.saveSchedule("TEST-TEST", start, start.plusDays(3));
            schedules.saveSchedule("TEST-TEST", start, start.plusDays(7), TaskStack.FRONTEND);
            var absence = absences.add("jdoe", start, start.plusDays(1), AbsenceType.VACATION, "Prueba");
            assertThat(flyway.migrate().migrationsExecuted).isZero();
            assertThat(new TargetStartRepository(jdbc).findScheduleByIssueKey("TEST-TEST"))
                    .hasValue(new TargetStartRepository.Schedule(start, start.plusDays(7), TaskStack.FRONTEND));
            assertThat(absences.findAll()).containsExactly(absence);
            absences.update(new TeamAbsence(absence.id(), absence.username(), start, start.plusDays(2), absence.type(), "Editada"));
            assertThat(absences.findAll().getFirst().note()).isEqualTo("Editada");
            absences.delete(absence.id());
            assertThat(absences.findAll()).isEmpty();
            assertThatThrownBy(() -> jdbc.update("""
                    INSERT INTO roadmap_schedule (issue_key, start_date, end_date)
                    VALUES ('BAD', ?, ?)
                    """, start, start.minusDays(1)))
                    .isInstanceOf(org.springframework.dao.DataIntegrityViolationException.class);
            assertThatThrownBy(() -> jdbc.update("""
                    INSERT INTO roadmap_schedule (issue_key, start_date, end_date, stack_local)
                    VALUES ('BAD-STACK', ?, ?, 'FULL_STACK')
                    """, start, start.plusDays(1)))
                    .isInstanceOf(org.springframework.dao.DataIntegrityViolationException.class);
        }
    }

    @Test void upgradeArchivesLocalMdAndPreservesDatesStacksAndAbsences() throws Exception {
        try (var postgres = EmbeddedPostgres.start()) {
            var source = postgres.getPostgresDatabase();
            Flyway.configure().dataSource(source).target("3").load().migrate();
            var jdbc = new JdbcTemplate(source);
            LocalDate start = LocalDate.of(2026, 9, 14);
            jdbc.update("""
                    INSERT INTO roadmap_schedule (issue_key, start_date, end_date, effort_md, stack_local)
                    VALUES ('SUB-1', ?, ?, 2.125, 'BACKEND'), ('TASK-1', ?, NULL, NULL, NULL)
                    """, start, start.plusDays(4), start);
            var absence = new TeamAbsenceRepository(jdbc)
                    .add("jdoe", start, start, AbsenceType.VACATION, "Preserved");
            var flyway = Flyway.configure().dataSource(source).load();
            assertThat(flyway.migrate().migrationsExecuted).isEqualTo(1);
            assertThat(jdbc.queryForObject("""
                    SELECT count(*) FROM information_schema.columns
                    WHERE table_schema = 'public' AND table_name = 'roadmap_schedule' AND column_name = 'effort_md'
                    """, Integer.class)).isZero();
            assertThat(jdbc.queryForObject("SELECT effort_md FROM roadmap_legacy_effort WHERE issue_key = 'SUB-1'",
                    Double.class)).isEqualTo(2.125);
            assertThat(jdbc.queryForObject("SELECT count(*) FROM roadmap_legacy_effort", Integer.class)).isEqualTo(1);
            var schedules = new TargetStartRepository(jdbc);
            assertThat(schedules.findSchedules()).containsEntry("SUB-1",
                    new TargetStartRepository.Schedule(start, start.plusDays(4), TaskStack.BACKEND))
                    .containsEntry("TASK-1", new TargetStartRepository.Schedule(start, null, null));
            assertThat(new TeamAbsenceRepository(jdbc).findAll()).containsExactly(absence);
            schedules.saveSchedule("SUB-1", start, start.plusDays(7));
            assertThat(schedules.findScheduleByIssueKey("SUB-1")).hasValue(
                    new TargetStartRepository.Schedule(start, start.plusDays(7), TaskStack.BACKEND));
            schedules.saveSchedule("SUB-1", start, start.plusDays(7), null);
            assertThat(schedules.findScheduleByIssueKey("SUB-1").orElseThrow().localStack()).isNull();
            assertThat(flyway.migrate().migrationsExecuted).isZero();
            assertThat(jdbc.queryForObject("SELECT effort_md FROM roadmap_legacy_effort WHERE issue_key = 'SUB-1'",
                    Double.class)).isEqualTo(2.125);
        }
    }
}
