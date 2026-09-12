package com.example.roadmap.gantt.application.model;
import com.example.roadmap.config.*;
import com.example.roadmap.jira.*;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.ui.*;
import com.example.roadmap.gantt.ui.style.*;
import com.example.roadmap.gantt.ui.widget.*;
import com.example.roadmap.ui.*;

import com.fasterxml.jackson.annotation.*;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.applayout.*;
import com.vaadin.flow.component.button.*;
import com.vaadin.flow.component.checkbox.*;
import com.vaadin.flow.component.combobox.*;
import com.vaadin.flow.component.datepicker.*;
import com.vaadin.flow.component.dependency.*;
import com.vaadin.flow.component.dialog.*;
import com.vaadin.flow.component.grid.*;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.component.notification.*;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.select.*;
import com.vaadin.flow.component.sidenav.*;
import com.vaadin.flow.component.textfield.*;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.*;
import com.vaadin.flow.component.page.*;
import com.vaadin.flow.component.details.*;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.theme.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.web.client.*;
import java.net.*;
import java.net.http.*;
import java.nio.charset.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
/**
 * A single period a team member is unavailable (vacation, birthday, sick leave, etc.),
 * entered once by the roadmap owner and reused on every future load — see
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