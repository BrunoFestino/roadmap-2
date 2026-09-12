package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;
import java.util.Objects;
import java.util.UUID;

/**
 * A single period a team member is unavailable (vacation, birthday, sick leave, etc.),
 * entered once by the roadmap owner and reused on every future load - see
 * {@link com.example.roadmap.gantt.application.data.TeamAbsenceRepository}.
 *
 * <p>The range is inclusive on both ends: a one-day absence (e.g. a birthday) has
 * {@code startDate.equals(endDate)}.
 *
 * @param id        stable identifier, generated once when the absence is created
 * @param username  Jira username, must match a {@link GanttTeamRoster} member
 * @param startDate first day the person is unavailable (inclusive)
 * @param endDate   last day the person is unavailable (inclusive), never before {@code startDate}
 * @param type      why the person is unavailable
 * @param note      optional free-text detail (e.g. "half day"), never {@code null}
 */
public record TeamAbsence(
        String id,
        String username,
        LocalDate startDate,
        LocalDate endDate,
        AbsenceType type,
        String note) {

    public TeamAbsence {
        Objects.requireNonNull(username, "username is required");
        Objects.requireNonNull(startDate, "startDate is required");
        Objects.requireNonNull(endDate, "endDate is required");
        Objects.requireNonNull(type, "type is required");
        if (endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("endDate cannot be before startDate");
        }
        note = note == null ? "" : note;
    }

    /** Convenience factory that generates a fresh id, used when creating a new absence. */
    public static TeamAbsence create(String username, LocalDate startDate, LocalDate endDate,
                                     AbsenceType type, String note) {
        return new TeamAbsence(UUID.randomUUID().toString(), username, startDate, endDate, type, note);
    }

    /** {@code true} if {@code date} falls within this absence's inclusive range. */
    public boolean covers(LocalDate date) {
        return !date.isBefore(startDate) && !date.isAfter(endDate);
    }
}