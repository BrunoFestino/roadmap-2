package com.example.roadmap.gantt.application.analytics;
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
 * Everything the workload views need, computed once per page load.
 *
 * <p>The three sections it feeds map one-to-one onto Microsoft Project's resource views, and
 * each answers exactly one management question:
 * <ul>
 *   <li>{@link #roles()} and their people → <em>Resource Usage</em>: how many hours does
 *       each person have booked each week, and which tasks are they?</li>
 *   <li>{@link #weekStarts()} plus each person's weeks → <em>Resource Graph</em>: when does
 *       someone break their capacity, and by how much?</li>
 *   <li>{@link #freeFromByPerson()} via {@link PersonWorkload#freeFrom()} →
 *       <em>Remaining Availability</em>: who can take new work, and from when?</li>
 * </ul>
 *
 * <p>{@link #unplannedTasks()} is not a view of load but of data quality: tasks whose
 * dedication had to be assumed because the database schedule has no end date for them.
 *
 * @param asOf           the date the report was computed for
 * @param horizonStart   first day of the reporting horizon (inclusive)
 * @param horizonEnd     last day of the reporting horizon (inclusive)
 * @param weekStarts     start date of every week bucket, chronologically
 * @param roles          role groups, each carrying its people, in roadmap role order
 * @param unplannedTasks tasks with effort but no committed calendar window
 */
public record WorkloadReport(
        LocalDate asOf,
        LocalDate horizonStart,
        LocalDate horizonEnd,
        List<LocalDate> weekStarts,
        List<RoleWorkload> roles,
        List<UnplannedTask> unplannedTasks) {

    /** Every person in the report, flattened out of their role groups. */
    public List<PersonWorkload> people() {
        return roles.stream().flatMap(role -> role.people().stream()).toList();
    }

    /** People who can absorb new work at some point in the horizon, soonest first. */
    public List<PersonWorkload> freeFromByPerson() {
        return people().stream()
                .filter(person -> person.freeFrom() != null)
                .sorted((a, b) -> a.freeFrom().compareTo(b.freeFrom()))
                .toList();
    }

    /** People with at least one overallocated week: the ones a manager has to act on. */
    public List<PersonWorkload> overallocatedPeople() {
        return people().stream().filter(PersonWorkload::hasOverallocation).toList();
    }

    public boolean isEmpty() {
        return roles.isEmpty();
    }
}