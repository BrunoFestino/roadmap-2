package com.example.roadmap.gantt.ui;
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
 * Lets roadmap owners plan the dates of open AR1 Jira tasks without editing files directly.
 * An in-progress task keeps its already established start date immutable.
 */
@Route(value = "gantt/planning", layout = MainLayout.class)
@PageTitle("Planificar tareas")
public class TaskPlanningView extends VerticalLayout {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final transient JiraClient jiraClient;
    private final transient JiraProperties jiraProperties;
    private final transient TargetStartRepository scheduleRepository;
    private final Grid<TaskPlan> grid = new Grid<>(TaskPlan.class, false);
    private final Span selectedTask = new Span("Elegí una tarea de la tabla.");
    private final DatePicker startField = new DatePicker("Inicio");
    private final DatePicker endField = new DatePicker("Fin");
    private final Button saveButton = new Button("Guardar fechas");
    private TaskPlan selected;

    public TaskPlanningView(JiraClient jiraClient, JiraProperties jiraProperties,
                            TargetStartRepository scheduleRepository) {
        this.jiraClient = jiraClient;
        this.jiraProperties = jiraProperties;
        this.scheduleRepository = scheduleRepository;

        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        configureGrid();
        add(title(), subtitle(), toolbar(), grid, planningForm());
        reloadTasks();
    }

    private Component title() {
        H1 title = new H1("Planificación de tareas");
        title.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return title;
    }

    private Component subtitle() {
        Span subtitle = new Span("Elegí una tarea abierta y definí su ventana de trabajo. "
                + "Las tareas en progreso mantienen su fecha de inicio.");
        subtitle.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return subtitle;
    }

    private Component toolbar() {
        Button reload = new Button("Actualizar tareas", event -> reloadTasks());
        reload.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        return new HorizontalLayout(reload);
    }

    private void configureGrid() {
        grid.addColumn(TaskPlan::issueKey).setHeader("Tarea").setAutoWidth(true);
        grid.addColumn(TaskPlan::summary).setHeader("Resumen").setFlexGrow(1);
        grid.addColumn(TaskPlan::assignee).setHeader("Responsable").setAutoWidth(true);
        grid.addColumn(TaskPlan::status).setHeader("Estado").setAutoWidth(true);
        grid.addColumn(plan -> format(plan.startDate())).setHeader("Inicio").setAutoWidth(true);
        grid.addColumn(plan -> format(plan.endDate())).setHeader("Fin").setAutoWidth(true);
        grid.setSelectionMode(Grid.SelectionMode.SINGLE);
        grid.asSingleSelect().addValueChangeListener(event -> selectTask(event.getValue()));
        grid.setWidthFull();
    }

    private Component planningForm() {
        startField.setRequiredIndicatorVisible(true);
        endField.setRequiredIndicatorVisible(true);
        startField.setEnabled(false);
        endField.setEnabled(false);
        saveButton.setEnabled(false);
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        saveButton.addClickListener(event -> save());

        HorizontalLayout fields = new HorizontalLayout(startField, endField, saveButton);
        fields.setAlignItems(Alignment.END);
        fields.setSpacing(true);

        VerticalLayout form = new VerticalLayout(selectedTask, fields);
        form.setPadding(false);
        form.setSpacing(true);
        form.getStyle().set("background", GanttStyle.CARD_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "16px");
        return form;
    }

    private void reloadTasks() {
        try {
            Map<String, TargetStartRepository.Schedule> schedules = scheduleRepository.findSchedules();
            List<TaskPlan> plans = jiraClient
                    .searchOpenIssuesByAssignees(jiraProperties.project(), GanttTeamRoster.usernames())
                    .issues().stream()
                    .map(issue -> toPlan(issue, schedules.get(issue.key())))
                    .filter(plan -> plan != null)
                    .sorted(Comparator.comparing(TaskPlan::assignee).thenComparing(TaskPlan::issueKey))
                    .toList();
            grid.setItems(plans);
            selectTask(null);
        } catch (RuntimeException e) {
            grid.setItems(List.of());
            selectTask(null);
            showError("No se pudieron cargar las tareas: " + e.getMessage());
        }
    }

    private TaskPlan toPlan(JiraIssueDto issue, TargetStartRepository.Schedule schedule) {
        JiraIssueDto.Fields fields = issue.fields();
        if (issue.key() == null || fields == null || fields.assignee() == null) {
            return null;
        }
        TeamMember member = GanttTeamRoster.byUsername(fields.assignee().name());
        if (member == null) {
            return null;
        }
        String status = fields.status() == null || fields.status().name() == null ? "Sin estado" : fields.status().name();
        LocalDate scheduledStart = schedule == null ? null : schedule.startDate();
        LocalDate jiraStart = parseDate(fields.targetStart());
        if (jiraStart == null) {
            jiraStart = parseDate(fields.firstTimeInProgress());
        }
        return new TaskPlan(issue.key(), fields.summary() == null ? issue.key() : fields.summary(), member.name(), status,
                scheduledStart, schedule == null ? null : schedule.endDate(),
                isInProgress(status), scheduledStart == null ? jiraStart : scheduledStart);
    }

    private void selectTask(TaskPlan plan) {
        selected = plan;
        boolean taskSelected = plan != null;
        startField.setEnabled(taskSelected && !plan.startLocked());
        endField.setEnabled(taskSelected);
        saveButton.setEnabled(taskSelected && (!plan.startLocked() || plan.lockedStartDate() != null));
        startField.setValue(taskSelected
                ? (plan.startLocked() ? plan.lockedStartDate() : plan.startDate())
                : null);
        endField.setValue(taskSelected ? plan.endDate() : null);
        if (!taskSelected) {
            selectedTask.setText("Elegí una tarea de la tabla.");
        } else if (plan.startLocked()) {
            selectedTask.setText(plan.lockedStartDate() == null
                    ? plan.issueKey() + " está In Progress, pero Jira no informó su inicio. No se puede guardar."
                    : plan.issueKey() + " está In Progress. Su inicio queda bloqueado en "
                    + format(plan.lockedStartDate()) + ".");
        } else {
            selectedTask.setText(plan.issueKey() + ": cargá las fechas de inicio y fin.");
        }
    }

    private void save() {
        if (selected == null) {
            return;
        }
        LocalDate startDate = selected.startLocked() ? selected.lockedStartDate() : startField.getValue();
        LocalDate endDate = endField.getValue();
        if (startDate == null || endDate == null) {
            showError("Completá las fechas de inicio y fin.");
            return;
        }
        if (endDate.isBefore(startDate)) {
            showError("La fecha de fin no puede ser anterior a la de inicio.");
            return;
        }
        scheduleRepository.saveSchedule(selected.issueKey(), startDate, endDate);
        showSuccess("Fechas guardadas para " + selected.issueKey() + ".");
        reloadTasks();
    }

    private boolean isInProgress(String status) {
        return "In Progress".equalsIgnoreCase(status);
    }

    private LocalDate parseDate(String rawDate) {
        if (rawDate == null || rawDate.length() < 10) {
            return null;
        }
        try {
            return LocalDate.parse(rawDate.substring(0, 10));
        } catch (RuntimeException e) {
            return null;
        }
    }

    private String format(LocalDate date) {
        return date == null ? "-" : DATE_FORMAT.format(date);
    }

    private void showSuccess(String message) {
        Notification notification = Notification.show(message, 3000, Notification.Position.BOTTOM_START);
        notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    private void showError(String message) {
        Notification notification = Notification.show(message, 4000, Notification.Position.BOTTOM_START);
        notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
    }

    private record TaskPlan(String issueKey, String summary, String assignee, String status,
                            LocalDate startDate, LocalDate endDate, boolean startLocked,
                            LocalDate lockedStartDate) {
    }
}