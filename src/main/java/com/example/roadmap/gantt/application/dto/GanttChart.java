package com.example.roadmap.gantt.application.dto;
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
 * A complete Gantt ready to render: the timeline bounds (used to scale every bar), the
 * ordered groups and the milestones to mark. Both {@code BuildRoleGanttUseCase} and
 * {@code BuildPersonGanttUseCase} produce this same shape so the UI is view-agnostic.
 *
 * @param timelineStart earliest planned start across all tasks (inclusive)
 * @param timelineEnd   latest planned end across all tasks (inclusive)
 * @param groups        ordered groups to render top to bottom
 * @param milestones    milestones to mark on the timeline (not rows/bars)
 */
public record GanttChart(
        LocalDate timelineStart,
        LocalDate timelineEnd,
        List<GanttGroup> groups,
        List<Milestone> milestones) {

    public GanttChart {
        groups = groups == null ? List.of() : List.copyOf(groups);
        milestones = milestones == null ? List.of() : List.copyOf(milestones);
    }

    public boolean isEmpty() {
        return groups.isEmpty() || timelineStart == null || timelineEnd == null;
    }

    /** Calendar days between {@link #timelineStart()} and {@code date} (may be negative). */
    public long dayOffset(LocalDate date) {
        if (timelineStart == null || date == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(timelineStart, date);
    }

    /** Total inclusive span of the timeline in calendar days (at least 1). */
    public long totalDays() {
        if (timelineStart == null || timelineEnd == null) {
            return 1;
        }
        return Math.max(1, ChronoUnit.DAYS.between(timelineStart, timelineEnd) + 1);
    }
}