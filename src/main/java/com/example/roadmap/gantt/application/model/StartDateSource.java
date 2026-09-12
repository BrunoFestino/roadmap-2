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
 * Where a task's start date came from, in strict priority order.
 *
 * <p>Lets the Gantt distinguish a real date read directly from Jira from one this roadmap
 * had to calculate itself, and keeps that distinction auditable (surfaced in the bar's
 * tooltip) instead of collapsing everything into a single opaque "estimated" flag.
 */
public enum StartDateSource {

    /** {@code customfield_12832} "Target start", read directly off the issue. */
    TARGET_START("Target Start (Jira)"),
    /** {@code customfield_15030} "Planned/Effective Start Date", read directly off the issue. */
    JIRA_START_DATE("Start Date (Jira)"),
    /** {@code customfield_13034} "First Time In Progress", read directly off the issue. */
    FIRST_TIME_IN_PROGRESS("Primera vez En Progreso (Jira)"),
    /** Start date of the issue's Jira Agile sprint ({@code customfield_10730}). */
    SPRINT_START("Inicio de sprint (Jira)"),
    /** Calculated by chaining this person's other undated tasks one after another. */
    CHAINED_PLANNED("Planificado por encadenamiento"),
    /** Last-resort technical fallback: the issue's Jira creation date. */
    CREATED_DATE_FALLBACK("Fecha de creación (fallback)");

    private final String label;

    StartDateSource(String label) {
        this.label = label;
    }

    /** Short human-readable label, shown in the bar tooltip for auditability. */
    public String label() {
        return label;
    }

    /** {@code true} for the tiers that read an actual date directly from Jira. */
    public boolean isActual() {
        return this == TARGET_START || this == JIRA_START_DATE || this == FIRST_TIME_IN_PROGRESS || this == SPRINT_START;
    }
}