package com.example.roadmap.gantt.ui;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.data.TargetStartRepository;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TaskStackSource;
import com.example.roadmap.gantt.application.model.WorkContour;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
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
    private final TextField jiraStackField = new TextField("Label Jira");
    private final ComboBox<TaskStack> localStackField = new ComboBox<>("Stack local");
    private final TextField roleStackField = new TextField("Fallback por persona");
    private final Span effectiveStack = new Span("Stack efectivo: -");
    private final Button saveButton = new Button("Guardar planificación");
    private TaskPlan selected;
    private final transient TeamAbsenceRepository absenceRepository;
    private final transient GanttTeamRoster teamRoster;
    private final transient TaskStackResolver taskStackResolver;
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(TaskPlanningView.class);

    public TaskPlanningView(JiraClient jiraClient, JiraProperties jiraProperties,
                            TargetStartRepository scheduleRepository, TeamAbsenceRepository absenceRepository,
                            GanttTeamRoster teamRoster, TaskStackResolver taskStackResolver) {
        this.jiraClient = jiraClient;
        this.jiraProperties = jiraProperties;
        this.scheduleRepository = scheduleRepository;
        this.absenceRepository = absenceRepository;
        this.teamRoster = teamRoster;
        this.taskStackResolver = taskStackResolver;
        DateFields.configure(startField);
        DateFields.configure(endField);
        configureStackFields();

        addClassName("app-page");
        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        configureGrid();
        add(title(), subtitle(), toolbar(), grid, planningForm());
        reloadTasks();
    }

    private Component title() {
        H1 title = new H1("Planificación de tareas");
        title.addClassName("page-title");
        title.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return title;
    }

    private Component subtitle() {
        Span subtitle = new Span("Elegí una tarea abierta y definí su ventana de trabajo. "
                + "El stack local es opcional y tiene prioridad sobre Jira y el rol de la persona. "
                + "Las tareas en progreso mantienen su fecha de inicio.");
        subtitle.addClassName("page-subtitle");
        subtitle.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return subtitle;
    }

    private Component toolbar() {
        Button reload = new Button("Actualizar tareas", event -> reloadTasks());
        reload.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        HorizontalLayout toolbar = new HorizontalLayout(reload);
        toolbar.addClassName("page-toolbar");
        return toolbar;
    }

    private void configureGrid() {
        grid.addColumn(TaskPlan::issueKey).setHeader("Tarea").setAutoWidth(true);
        grid.addColumn(TaskPlan::summary).setHeader("Resumen").setFlexGrow(1);
        grid.addColumn(TaskPlan::assignee).setHeader("Responsable").setAutoWidth(true);
        grid.addColumn(plan -> plan.role().label()).setHeader("Rol").setAutoWidth(true);
        grid.addColumn(TaskPlan::status).setHeader("Estado").setAutoWidth(true);
        grid.addColumn(plan -> taskStackResolver.classifyJira(plan.jiraLabels()).displayLabel())
                .setHeader("Label Jira").setAutoWidth(true);
        grid.addColumn(plan -> plan.localStack() == null ? "-" : plan.localStack().label())
                .setHeader("Stack local").setAutoWidth(true);
        grid.addColumn(plan -> plan.effectiveStack().label()).setHeader("Stack efectivo").setAutoWidth(true);
        grid.addColumn(plan -> format(plan.startDate())).setHeader("Inicio").setAutoWidth(true);
        grid.addColumn(plan -> format(plan.endDate())).setHeader("Fin").setAutoWidth(true);
        grid.setSelectionMode(Grid.SelectionMode.SINGLE);
        grid.asSingleSelect().addValueChangeListener(event -> selectTask(event.getValue()));
        grid.setWidthFull();
        grid.setHeight("clamp(300px, 38vh, 420px)");
        grid.addClassNames("data-grid", "planning-grid");
    }

    private Component planningForm() {
        startField.setRequiredIndicatorVisible(true);
        endField.setRequiredIndicatorVisible(true);
        startField.setEnabled(false);
        endField.setEnabled(false);
        saveButton.setEnabled(false);
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        saveButton.addClickListener(event -> save());

        HorizontalLayout fields = new HorizontalLayout(startField, endField, jiraStackField,
                localStackField, roleStackField, saveButton);
        fields.addClassName("form-fields");
        fields.setAlignItems(Alignment.END);
        fields.setSpacing(true);
        fields.setWrap(true);

        VerticalLayout form = new VerticalLayout(selectedTask, fields, effectiveStack);
        form.addClassNames("surface-card", "planning-form");
        selectedTask.addClassName("selection-instruction");
        effectiveStack.addClassName("effective-stack-preview");
        effectiveStack.getStyle().set("display", "block").set("padding", "10px 12px")
                .set("border-radius", "7px").set("background", "#EDF7EE")
                .set("color", "#2E7D32").set("font-size", "13px").set("font-weight", "700");
        form.setPadding(false);
        form.setSpacing(true);
        form.getStyle().set("background", GanttStyle.CARD_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "16px");
        return form;
    }

    private void configureStackFields() {
        jiraStackField.setReadOnly(true);
        roleStackField.setReadOnly(true);
        localStackField.setItems(List.of(TaskStack.FRONTEND, TaskStack.BACKEND,
                TaskStack.MOBILE, TaskStack.DEVOPS));
        localStackField.setItemLabelGenerator(TaskStack::label);
        localStackField.setClearButtonVisible(true);
        localStackField.setPlaceholder("Usar valor heredado");
        localStackField.addValueChangeListener(event -> updateEffectiveStack());
        jiraStackField.setWidth("190px");
        localStackField.setWidth("190px");
        roleStackField.setWidth("220px");
    }

    private boolean reloadTasks() {
        try {
            Map<String, TargetStartRepository.Schedule> schedules = scheduleRepository.findSchedules();
            List<TaskPlan> plans = jiraClient
                    .searchOpenIssuesByAssignees(jiraProperties.project(), teamRoster.usernames())
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
        TeamMember member = teamRoster.byUsername(fields.assignee().name());
        if (member == null) {
            return null;
        }
        String status = fields.status() == null || fields.status().name() == null ? "Sin estado" : fields.status().name();
        LocalDate scheduledStart = schedule == null ? null : schedule.startDate();
        LocalDate jiraStart = parseDate(fields.customField(jiraProperties.fieldTargetStart()));
        if (jiraStart == null) {
            jiraStart = parseDate(fields.customField(jiraProperties.fieldFirstTimeInProgress()));
        }
        TaskStack localStack = schedule == null ? null : schedule.localStack();
        TaskStackResolver.Resolution stack = taskStackResolver.resolve(localStack, fields.labels(), member.role());
        return new TaskPlan(issue.key(), fields.summary() == null ? issue.key() : fields.summary(), member.name(), member.username(), member.role(), status,
                scheduledStart, schedule == null ? null : schedule.endDate(),
                isInProgress(status), scheduledStart == null ? jiraStart : scheduledStart,
                fields.labels(), localStack, stack.stack(), stack.source());
    }

    private void selectTask(TaskPlan plan) {
        selected = plan;
        boolean taskSelected = plan != null;
        startField.setEnabled(taskSelected && !plan.startLocked());
        endField.setEnabled(taskSelected);
        localStackField.setEnabled(taskSelected);
        saveButton.setEnabled(taskSelected && (!plan.startLocked() || plan.lockedStartDate() != null));
        startField.setValue(taskSelected
                ? (plan.startLocked() ? plan.lockedStartDate() : plan.startDate())
                : null);
        endField.setValue(taskSelected ? plan.endDate() : null);
        jiraStackField.setValue(taskSelected
                ? taskStackResolver.classifyJira(plan.jiraLabels()).displayLabel()
                : "");
        roleStackField.setValue(taskSelected ? plan.assignee() + " · " + plan.role().label() : "");
        localStackField.setValue(taskSelected ? plan.localStack() : null);
        updateEffectiveStack();
        if (!taskSelected) {
            selectedTask.setText("Elegí una tarea de la tabla.");
        } else if (plan.startLocked()) {
            selectedTask.setText(plan.lockedStartDate() == null
                    ? plan.issueKey() + " está In Progress, pero Jira no informó su inicio. No se puede guardar."
                    : plan.issueKey() + " está In Progress. Su inicio queda bloqueado en "
                    + format(plan.lockedStartDate()) + ".");
        } else {
            selectedTask.setText(plan.issueKey() + ": cargá las fechas y, si hace falta, sobrescribí el stack heredado.");
        }
    }

    private void updateEffectiveStack() {
        if (selected == null) {
            effectiveStack.setText("Stack efectivo: -");
            effectiveStack.getStyle().set("background", "#EDF7EE").set("color", "#2E7D32");
            return;
        }
        TaskStackResolver.Resolution resolution = taskStackResolver.resolve(
                localStackField.getValue(), selected.jiraLabels(), selected.role());
        effectiveStack.setText("Stack efectivo: " + resolution.stack().label()
                + " · fuente: " + resolution.source().label());
        switch (resolution.stack()) {
            case AMBIGUOUS -> effectiveStack.getStyle()
                    .set("background", "#FDECEA").set("color", "#B3261E");
            case UNCLASSIFIED -> effectiveStack.getStyle()
                    .set("background", "#FFF6E5").set("color", "#8A4B00");
            default -> effectiveStack.getStyle()
                    .set("background", "#EDF7EE").set("color", "#2E7D32");
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
            scheduleRepository.saveSchedule(key, startDate, endDate, localStackField.getValue());
        } catch (RuntimeException e) {
            LOG.error("Saving schedule failed for {}", key, e);
            showError("No se guardaron las fechas de " + key + ". Conservamos el formulario; podés reintentar.");
            return;
        }
        if (reloadTasks()) showSuccess("Planificación guardada para " + key + ".");
        else showError("La planificación de " + key + " se guardó, pero falló la recarga. Usá Actualizar tareas.");
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

    private record TaskPlan(String issueKey, String summary, String assignee, String username,
                            Role role, String status,
                            LocalDate startDate, LocalDate endDate, boolean startLocked,
                            LocalDate lockedStartDate, List<String> jiraLabels, TaskStack localStack,
                            TaskStack effectiveStack, TaskStackSource stackSource) {
    }
}
