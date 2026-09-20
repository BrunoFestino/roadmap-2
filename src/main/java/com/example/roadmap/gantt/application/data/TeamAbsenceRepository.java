package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.model.AbsenceType;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;

/**
 * PostgreSQL-backed store for the roadmap team's absences. Database transactions make changes
 * immediately visible to every application instance and preserve them across restarts.
 */
@Repository
public class TeamAbsenceRepository {

    private final JdbcTemplate jdbcTemplate;

    public TeamAbsenceRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    /** All stored absences, sorted by start date and then id. */
    public List<TeamAbsence> findAll() {
        return jdbcTemplate.query("""
                        SELECT id, username, start_date, end_date, absence_type, note
                        FROM team_absence
                        ORDER BY start_date, id
                        """,
                (rs, rowNum) -> toAbsence(
                        rs.getString("id"),
                        rs.getString("username"),
                        rs.getObject("start_date", LocalDate.class),
                        rs.getObject("end_date", LocalDate.class),
                        rs.getString("absence_type"),
                        rs.getString("note")));
    }

    /** All absences for one team member, sorted by start date. */
    public List<TeamAbsence> findByUsername(String username) {
        return jdbcTemplate.query("""
                        SELECT id, username, start_date, end_date, absence_type, note
                        FROM team_absence
                        WHERE username = ?
                        ORDER BY start_date, id
                        """,
                (rs, rowNum) -> toAbsence(
                        rs.getString("id"),
                        rs.getString("username"),
                        rs.getObject("start_date", LocalDate.class),
                        rs.getObject("end_date", LocalDate.class),
                        rs.getString("absence_type"),
                        rs.getString("note")),
                username);
    }

    /** Adds a new absence and persists immediately. */
    public TeamAbsence add(String username, LocalDate startDate, LocalDate endDate, AbsenceType type, String note) {
        TeamAbsence absence = TeamAbsence.create(username, startDate, endDate, type, note);
        jdbcTemplate.update("""
                        INSERT INTO team_absence (id, username, start_date, end_date, absence_type, note)
                        VALUES (?, ?, ?, ?, ?, ?)
                        """,
                absence.id(), absence.username(), absence.startDate(), absence.endDate(),
                absence.type().name(), absence.note());
        return absence;
    }

    /** Replaces an existing absence (matched by id) and persists immediately. */
    public void update(TeamAbsence updated) {
        int changed = jdbcTemplate.update("""
                        UPDATE team_absence
                        SET username = ?, start_date = ?, end_date = ?, absence_type = ?, note = ?
                        WHERE id = ?
                        """,
                updated.username(), updated.startDate(), updated.endDate(), updated.type().name(), updated.note(),
                updated.id());
        if (changed == 0) {
            throw new IllegalArgumentException("No absence with id " + updated.id());
        }
    }

    /** Removes an absence by id and persists immediately; no-op if it does not exist. */
    public void delete(String id) {
        jdbcTemplate.update("DELETE FROM team_absence WHERE id = ?", id);
    }

    /** {@code true} if the given team member has a stored absence covering {@code date}. */
    public boolean isAbsent(String username, LocalDate date) {
        return Boolean.TRUE.equals(jdbcTemplate.queryForObject("""
                        SELECT EXISTS (
                            SELECT 1
                            FROM team_absence
                            WHERE username = ?
                              AND start_date <= ?
                              AND end_date >= ?
                        )
                        """,
                Boolean.class, username, date, date));
    }

    private TeamAbsence toAbsence(String id, String username, LocalDate startDate, LocalDate endDate,
                                  String type, String note) {
        return new TeamAbsence(id, username, startDate, endDate, AbsenceType.valueOf(type), note);
    }
}