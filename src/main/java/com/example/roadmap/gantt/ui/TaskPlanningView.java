package com.example.roadmap.gantt.ui;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.data.TargetStartRepository;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.application.model.WorkContour;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Comparator;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;

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
    private final transient TeamAbsenceRepository absenceRepository;
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(TaskPlanningView.class);

    public TaskPlanningView(JiraClient jiraClient, JiraProperties jiraProperties,
                            TargetStartRepository scheduleRepository, TeamAbsenceRepository absenceRepository) {
        this.jiraClient = jiraClient;
        this.jiraProperties = jiraProperties;
        this.scheduleRepository = scheduleRepository;
        this.absenceRepository = absenceRepository;
        DateFields.configure(startField);
        DateFields.configure(endField);

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
        fields.setWrap(true);

        VerticalLayout form = new VerticalLayout(selectedTask, fields);
        form.setPadding(false);
        form.setSpacing(true);
        form.getStyle().set("background", GanttStyle.CARD_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "16px");
        return form;
    }

    private boolean reloadTasks() {
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
            return true;
        } catch (RuntimeException e) {
            LOG.error("Loading task planning failed", e);
            showError("No se pudieron actualizar las tareas. Conservamos los datos visibles; podés reintentar.");
            return false;
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
        return new TaskPlan(issue.key(), fields.summary() == null ? issue.key() : fields.summary(), member.name(), member.username(), status,
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
        String key = selected.issueKey();
        try {
            Predicate<LocalDate> absent = RoadmapSnapshot.calendar(absenceRepository.findAll(), selected.username());
            if (WorkContour.capacityHours(startDate, endDate, absent) <= 0) {
                showError("La ventana no tiene días disponibles para esta persona. Revisá fines de semana y ausencias.");
                return;
            }
            scheduleRepository.saveSchedule(key, startDate, endDate);
        } catch (RuntimeException e) {
            LOG.error("Saving schedule failed for {}", key, e);
            showError("No se guardaron las fechas de " + key + ". Conservamos el formulario; podés reintentar.");
            return;
        }
        if (reloadTasks()) showSuccess("Fechas guardadas para " + key + ".");
        else showError("Las fechas de " + key + " se guardaron, pero falló la recarga. Usá Actualizar tareas.");
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

    private record TaskPlan(String issueKey, String summary, String assignee, String username, String status,
                            LocalDate startDate, LocalDate endDate, boolean startLocked,
                            LocalDate lockedStartDate) {
    }
}