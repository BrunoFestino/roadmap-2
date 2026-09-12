package com.example.roadmap.gantt.ui.widget;
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
 * Converts calendar dates into pixel offsets on the fixed pixel-per-day Gantt canvas.
 *
 * <p>A bar's <em>left</em> edge is positioned by calendar-day offset (so it lines up with
 * the week axis and weekend bands), but its <em>width</em> is {@code working days *
 * PX_PER_DAY} — the same number validated against the task's MD — so the drawn length is
 * always traceable to the effort estimate, not to the calendar span.
 */
final class GanttScale {

    private GanttScale() {
    }

    static int xOf(GanttChart chart, LocalDate date, int pixelsPerDay) {
        long days = chart.dayOffset(date);
        return GanttStyle.LEFT_COL + (int) Math.round(days * (double) pixelsPerDay);
    }

    static int widthOf(LocalDate start, LocalDate end, int pixelsPerDay) {
        long workingDays = WorkingDays.countBetween(start, end);
        long calendarDays = ChronoUnit.DAYS.between(start, end) + 1;
        long days = Math.max(1, Math.min(workingDays, calendarDays));
        return (int) Math.round(days * (double) pixelsPerDay);
    }
}