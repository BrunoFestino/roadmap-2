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
 * How many hours one task contributes to one week for one person: the drill-down that
 * explains a cell of the workload grid.
 *
 * <p>Microsoft Project shows this by expanding a resource row in the Resource Usage view.
 * Without it, a red cell tells a manager there is a problem but not which commitment caused
 * it, so this record always travels with its {@link WeekLoad}.
 *
 * @param taskKey    Jira issue key, e.g. {@code "TTAR-10608"}
 * @param summary    short human-readable title
 * @param hours      effort hours this task demands inside the week
 * @param dailyHours average hours per day the task demands on the days it occupies inside
 *                   this week; under a levelled contour the rate varies week to week
 * @param status     Jira workflow status, may be {@code null}
 * @param startDate  first day of the task's committed window
 * @param endDate    last day of the task's committed window
 * @param md         total effort in man-days, the whole task and not just this week
 * @param epicKey    epic this task serves, or {@code null} when the chain could not be
 *                   resolved; drives the colour it is drawn with everywhere
 */
public record TaskLoad(
        String taskKey,
        String summary,
        double hours,
        double dailyHours,
        String status,
        java.time.LocalDate startDate,
        java.time.LocalDate endDate,
        double md,
        String epicKey) {

    /** The colour this task shares with every other task of the same epic. */
    public String color() {
        return EpicPalette.colorFor(epicKey);
    }

    /** The task's dedication as a percentage of a 6-hour productive day. */
    public double dedicationPct() {
        return dailyHours / WorkContour.PRODUCTIVE_HOURS_PER_DAY * 100;
    }
}