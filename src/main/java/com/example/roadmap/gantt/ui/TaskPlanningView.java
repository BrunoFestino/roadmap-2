package com.example.roadmap.gantt.ui;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.data.TargetStartRepository;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.EffortEstimates;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskHierarchy;
import com.example.roadmap.gantt.application.model.WorkflowStatus;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TeamMember;
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
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.component.textfield.NumberField;
import com.vaadin.flow.data.value.ValueChangeMode;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.function.Predicate;

/**
 * Lets roadmap owners plan the dates of open example Jira tasks without editing files directly.
 */
@Route(value = "gantt/planning", layout = MainLayout.class)
@PageTitle("Task planning")
public class TaskPlanningView extends VerticalLayout {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    private final transient JiraClient jiraClient;
    private final transient JiraProperties jiraProperties;
    private final transient TargetStartRepository scheduleRepository;
    private final Grid<TaskPlan> grid = new Grid<>(TaskPlan.class, false);
    private final TextField issueFilter = new TextField("Jira ID");
    private final ComboBox<String> assigneeFilter = new ComboBox<>("Person");
    private final ComboBox<PlanningKind> typeFilter = new ComboBox<>("Show");
    private final Span gridHint = new Span("Scroll the table horizontally to view all details.");
    private final Span selectedTask = new Span("Select an Epic, task or subtask from the table.");
    private final DatePicker startField = new DatePicker("Start");
    private final DatePicker endField = new DatePicker("End");
    private final NumberField effortField = new NumberField("Jira estimate (MD)");
    private final TextField jiraStackField = new TextField("Label Jira");
    private final ComboBox<TaskStack> localStackField = new ComboBox<>("Local stack");
    private final TextField roleStackField = new TextField("Person fallback");
    private final Span effectiveStack = new Span("Effective stack: -");
    private final Button saveButton = new Button("Save plan");
    private List<TaskPlan> plans = List.of();
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
        configureFilters();
        gridHint.addClassName("planning-grid-hint");
        add(title(), subtitle(), toolbar(), gridHint, grid, planningForm());
        reloadTasks();
    }

    private Component title() {
        H1 title = new H1("Task planning");
        title.addClassName("page-title");
        title.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return title;
    }

    private Component subtitle() {
        Span subtitle = new Span("Plan open Epics, tasks and subtasks. "
                + "This screen defines dates and stack; Team capacity & load shows the resulting weekly allocation. "
                + "Tasks and subtasks use Jira Time Tracking Original Estimate; parent tasks with subtasks are excluded. "
                + "The local stack is optional and takes priority over Jira and the person's role. "
                + "Epics use the Jira MD field and never consume person capacity. Milestones use only "
                + "their Jira Delivery Date.");
        subtitle.addClassName("page-subtitle");
        subtitle.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return subtitle;
    }

    private Component toolbar() {
        Button reload = new Button("Refresh", event -> reloadTasks());
        reload.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        HorizontalLayout filters = new HorizontalLayout(issueFilter, assigneeFilter, typeFilter);
        filters.addClassName("planning-filters");
        filters.setAlignItems(Alignment.END);
        filters.setSpacing(true);
        filters.setWrap(true);

        HorizontalLayout toolbar = new HorizontalLayout(filters, reload);
        toolbar.addClassNames("page-toolbar", "planning-toolbar");
        toolbar.setAlignItems(Alignment.END);
        return toolbar;
    }

    private void configureGrid() {
        grid.addComponentColumn(plan -> tableText(plan.kind().label())).setHeader("Type")
                .setWidth("110px").setFlexGrow(0);
        grid.addComponentColumn(this::issueLink).setHeader("Issue")
                .setWidth("145px").setFlexGrow(0);
        grid.addComponentColumn(this::summaryCell).setHeader("Summary")
                .setWidth("400px").setFlexGrow(1);
        grid.addComponentColumn(plan -> tableText(plan.assignee())).setHeader("Assignee")
                .setWidth("175px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(formatWindow(plan))).setHeader("Start - End")
                .setWidth("225px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(formatMd(plan.jiraEffortMd())))
                .setHeader("Estimate (MD)").setWidth("145px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(plan.kind() == PlanningKind.EPIC
                        ? "Jira MD field" : "Jira Original Estimate"))
                .setHeader("Estimate source").setWidth("195px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(plan.role() == null ? "-" : plan.role().label()))
                .setHeader("Role").setWidth("100px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(plan.status())).setHeader("Status")
                .setWidth("180px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(plan.kind() == PlanningKind.EPIC ? "-"
                        : taskStackResolver.classifyJira(plan.jiraLabels()).displayLabel()))
                .setHeader("Label Jira").setWidth("210px").setFlexGrow(0);
        grid.addComponentColumn(plan -> tableText(
                        plan.localStack() == null ? "-" : plan.localStack().label()))
                .setHeader("Local stack").setWidth("150px").setFlexGrow(0);
        grid.setSelectionMode(Grid.SelectionMode.SINGLE);
        grid.asSingleSelect().addValueChangeListener(event -> selectTask(event.getValue()));
        grid.setWidthFull();
        grid.addClassNames("data-grid", "planning-grid");
    }

    private Component issueLink(TaskPlan plan) {
        Anchor link = new Anchor(jiraIssueUrl(plan.issueKey()), plan.issueKey());
        link.setTarget("_blank");
        link.getElement().setAttribute("rel", "noopener noreferrer");
        link.getElement().setAttribute("aria-label",
                "Open " + plan.issueKey() + " in Jira: " + plan.summary());
        link.getStyle().set("font-weight", "700").set("white-space", "nowrap");
        return link;
    }

    private Component summaryCell(TaskPlan plan) {
        Span summary = new Span(plan.summary());
        summary.getElement().setAttribute("title", plan.summary());
        summary.addClassName("planning-grid-text");
        return summary;
    }

    private Component tableText(String value) {
        Span text = new Span(value == null || value.isBlank() ? "-" : value);
        text.addClassName("planning-grid-text");
        return text;
    }

    private void configureFilters() {
        issueFilter.setPlaceholder("e.g. TEST-123");
        issueFilter.setClearButtonVisible(true);
        issueFilter.setValueChangeMode(ValueChangeMode.EAGER);
        issueFilter.addValueChangeListener(event -> applyFilters());

        assigneeFilter.setPlaceholder("All people");
        assigneeFilter.setClearButtonVisible(true);
        assigneeFilter.setAllowCustomValue(false);
        assigneeFilter.addValueChangeListener(event -> applyFilters());

        typeFilter.setItems(PlanningKind.values());
        typeFilter.setItemLabelGenerator(PlanningKind::label);
        typeFilter.setValue(PlanningKind.ALL);
        typeFilter.setAllowCustomValue(false);
        typeFilter.addValueChangeListener(event -> applyFilters());
    }

    private Component planningForm() {
        startField.setRequiredIndicatorVisible(true);
        endField.setRequiredIndicatorVisible(true);
        startField.setEnabled(false);
        endField.setEnabled(false);
        effortField.setReadOnly(true);
        effortField.setHelperText("Update estimates in Jira. 1 MD = 8 hours.");
        saveButton.setEnabled(false);
        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        saveButton.addClassName("planning-save-button");
        saveButton.addClickListener(event -> save());

        HorizontalLayout fields = new HorizontalLayout(startField, endField, effortField, jiraStackField,
                localStackField, roleStackField);
        fields.addClassName("form-fields");
        fields.setAlignItems(Alignment.END);
        fields.setSpacing(true);
        fields.setWrap(true);

        HorizontalLayout actions = new HorizontalLayout(effectiveStack, saveButton);
        actions.addClassNames("form-actions", "planning-actions");
        actions.setWidthFull();
        VerticalLayout form = new VerticalLayout(selectedTask, fields, actions);
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
        localStackField.setPlaceholder("Use inherited value");
        localStackField.addValueChangeListener(event -> updateEffectiveStack());
        jiraStackField.setWidth("190px");
        localStackField.setWidth("190px");
        roleStackField.setWidth("220px");
    }

    private boolean reloadTasks() {
        try {
            Map<String, TargetStartRepository.Schedule> schedules = scheduleRepository.findSchedules();
            var issues = jiraClient.searchWorkloadIssuesByAssignees(jiraProperties.project(), teamRoster.usernames()).issues();
            var parents = TaskHierarchy.parentKeys(issues);
            List<TaskPlan> loaded = new ArrayList<>(issues.stream()
                    .filter(issue -> issue != null && issue.fields() != null && !parents.contains(issue.key()))
                    .filter(issue -> issue.fields().status() == null || !WorkflowStatus.isFinal(issue.fields().status().name()))
                    .map(issue -> toTaskPlan(issue, schedules.get(issue.key())))
                    .filter(plan -> plan != null)
                    .toList());
            loaded.addAll(jiraClient.searchOpenEpics(jiraProperties.project()).issues().stream()
                    .map(issue -> toEpicPlan(issue, schedules.get(issue.key())))
                    .filter(plan -> plan != null)
                    .toList());
            plans = loaded.stream()
                    .sorted(Comparator.comparing(TaskPlan::kind)
                            .thenComparing(TaskPlan::assignee, Comparator.nullsLast(String::compareTo))
                            .thenComparing(TaskPlan::issueKey))
                    .toList();
            refreshAssigneeFilter();
            applyFilters();
            selectTask(null);
            return true;
        } catch (RuntimeException e) {
            LOG.error("Loading task planning failed", e);
            showError("Tasks could not be refreshed. The visible data was preserved; you can retry.");
            return false;
        }
    }

    private TaskPlan toTaskPlan(JiraIssueDto issue, TargetStartRepository.Schedule schedule) {
        JiraIssueDto.Fields fields = issue.fields();
        if (issue.key() == null || fields == null || fields.assignee() == null) {
            return null;
        }
        TeamMember member = teamRoster.byUsername(fields.assignee().name());
        if (member == null) {
            return null;
        }
        String status = fields.status() == null || fields.status().name() == null ? "No status" : fields.status().name();
        LocalDate scheduledStart = schedule == null ? null : schedule.startDate();
        LocalDate jiraStart = parseDate(fields.customField(jiraProperties.fieldTargetStart()));
        if (jiraStart == null) {
            jiraStart = parseDate(fields.customField(jiraProperties.fieldFirstTimeInProgress()));
        }
        LocalDate effectiveStart = scheduledStart == null ? jiraStart : scheduledStart;
        TaskStack localStack = schedule == null ? null : schedule.localStack();
        return new TaskPlan(EffortEstimates.isSubtask(fields) ? PlanningKind.SUBTASK : PlanningKind.TASK, issue.key(),
                fields.summary() == null ? issue.key() : fields.summary(),
                member.name(), member.username(), member.role(), status,
                effectiveStart, schedule == null ? null : schedule.endDate(),
                EffortEstimates.jiraMd(fields),
                fields.labels(), localStack);
    }

    private TaskPlan toEpicPlan(JiraIssueDto issue, TargetStartRepository.Schedule schedule) {
        JiraIssueDto.Fields fields = issue.fields();
        if (issue.key() == null || fields == null) {
            return null;
        }
        String status = fields.status() == null || fields.status().name() == null
                ? "No status" : fields.status().name();
        LocalDate start = schedule == null ? null
                : schedule.startDate();
        if (start == null) {
            start = parseDate(fields.customField(jiraProperties.fieldTargetStart()));
        }
        LocalDate end = schedule == null ? null : schedule.endDate();
        if (end == null) {
            end = parseDate(fields.duedate());
        }
        return new TaskPlan(PlanningKind.EPIC, issue.key(),
                fields.summary() == null ? issue.key() : fields.summary(),
                "Team", null, null, status, start, end,
                EffortEstimates.epicMd(fields, jiraProperties.fieldEffortEstimate()), List.of(), null);
    }

    private void refreshAssigneeFilter() {
        List<String> assignees = plans.stream()
                .filter(plan -> plan.kind() != PlanningKind.EPIC)
                .map(TaskPlan::assignee)
                .filter(name -> name != null && !name.isBlank())
                .distinct()
                .sorted(String.CASE_INSENSITIVE_ORDER)
                .toList();
        String selectedAssignee = assigneeFilter.getValue();
        assigneeFilter.setItems(assignees);
        if (selectedAssignee != null && assignees.contains(selectedAssignee)) {
            assigneeFilter.setValue(selectedAssignee);
        }
    }

    private void applyFilters() {
        PlanningKind selectedKind = typeFilter.getValue();
        String issueQuery = issueFilter.getValue() == null
                ? "" : issueFilter.getValue().trim().toUpperCase(Locale.ROOT);
        String selectedAssignee = assigneeFilter.getValue();
        List<TaskPlan> filteredPlans = plans.stream()
                .filter(plan -> selectedKind == null || selectedKind == PlanningKind.ALL
                        || plan.kind() == selectedKind)
                .filter(plan -> issueQuery.isEmpty()
                        || plan.issueKey().toUpperCase(Locale.ROOT).contains(issueQuery))
                .filter(plan -> selectedAssignee == null || selectedAssignee.equals(plan.assignee()))
                .toList();
        grid.setItems(filteredPlans);
        // Keep short filtered lists close to their editor without changing grid virtualization.
        int contentHeight = 64 + Math.min(filteredPlans.size(), 10) * 52;
        grid.setHeight("clamp(120px, " + contentHeight + "px, min(48vh, 540px))");
        if (selected != null && !filteredPlans.contains(selected)) {
            grid.deselectAll();
            selectTask(null);
        }
    }

    private void selectTask(TaskPlan plan) {
        selected = plan;
        boolean taskSelected = plan != null;
        boolean epicSelected = taskSelected && plan.kind() == PlanningKind.EPIC;
        startField.setEnabled(taskSelected);
        endField.setEnabled(taskSelected);
        localStackField.setEnabled(taskSelected && !epicSelected);
        saveButton.setEnabled(taskSelected);
        startField.setValue(taskSelected ? plan.startDate() : null);
        endField.setValue(taskSelected ? plan.endDate() : null);
        effortField.setValue(taskSelected ? plan.jiraEffortMd() : null);
        effortField.setHelperText(epicSelected ? "Source: Jira MD field. Update the epic estimate in Jira."
                : "Source: Jira Time Tracking Original Estimate. 1 MD = 8 hours.");
        startField.setInvalid(false);
        endField.setInvalid(false);
        effortField.setInvalid(false);
        jiraStackField.setValue(taskSelected && !epicSelected
                ? taskStackResolver.classifyJira(plan.jiraLabels()).displayLabel()
                : "");
        roleStackField.setValue(taskSelected && !epicSelected
                ? plan.assignee() + " · " + plan.role().label() : "");
        localStackField.setValue(taskSelected && !epicSelected ? plan.localStack() : null);
        updateEffectiveStack();
        if (!taskSelected) {
            selectedTask.setText("Select an Epic, task or subtask from the table.");
        } else if (epicSelected) {
            selectedTask.setText(plan.issueKey() + " · " + plan.summary()
                    + ": define the Epic duration. "
                    + "Its effort comes from the Jira MD field. No assignee or stack is required.");
        } else {
            selectedTask.setText(plan.issueKey() + " · " + plan.summary()
                    + ": enter or reschedule the dates and, if needed, "
                    + "override the inherited stack.");
        }
    }

    private void updateEffectiveStack() {
        if (selected == null) {
            effectiveStack.setText("Effective stack: -");
            effectiveStack.getStyle().set("background", "#EDF7EE").set("color", "#2E7D32");
            return;
        }
        if (selected.kind() == PlanningKind.EPIC) {
            effectiveStack.setText("Team initiative: does not consume capacity.");
            effectiveStack.getStyle().set("background", "#E8F2F6").set("color", GanttStyle.PRIMARY_900);
            return;
        }
        TaskStackResolver.Resolution resolution = taskStackResolver.resolve(
                localStackField.getValue(), selected.jiraLabels(), selected.role());
        effectiveStack.setText("Effective stack: " + resolution.stack().label()
                + " · source: " + resolution.source().label());
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
        LocalDate startDate = startField.getValue();
        LocalDate endDate = endField.getValue();
        boolean epic = selected.kind() == PlanningKind.EPIC;
        if (startDate == null || endDate == null) {
            showError("Enter both start and end dates.");
            return;
        }
        if (endDate.isBefore(startDate)) {
            showError("The end date cannot be earlier than the start date.");
            return;
        }
        String key = selected.issueKey();
        try {
            if (!epic) {
                Predicate<LocalDate> absent = RoadmapSnapshot.calendar(
                        absenceRepository.findAll(), selected.username());
                if (WorkContour.capacityHours(startDate, endDate, absent) <= 0) {
                    showError("This window has no available days for this person. "
                            + "Check weekends and absences.");
                    return;
                }
            }
            scheduleRepository.saveSchedule(key, startDate, endDate,
                    epic ? null : localStackField.getValue());
        } catch (RuntimeException e) {
            LOG.error("Saving schedule failed for {}", key, e);
            showError("The dates for " + key + " were not saved. The form was preserved; you can retry.");
            return;
        }
        if (reloadTasks()) showSuccess("Plan saved for " + key + ".");
        else showError("The plan for " + key + " was saved, but refresh failed. Use Refresh.");
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

    private String formatWindow(TaskPlan plan) {
        if (plan.startDate() == null && plan.endDate() == null) {
            return "Not planned";
        }
        return format(plan.startDate()) + " - " + format(plan.endDate());
    }

    private String formatMd(Double md) {
        if (md == null) {
            return "-";
        }
        return md == Math.rint(md)
                ? Math.round(md) + " MD"
                : String.format(Locale.ROOT, "%.2f MD", md);
    }

    private String jiraIssueUrl(String issueKey) {
        String baseUrl = jiraProperties.baseUrl().trim();
        return (baseUrl.endsWith("/") ? baseUrl : baseUrl + "/") + "browse/" + issueKey;
    }

    private void showSuccess(String message) {
        Notification notification = Notification.show(message, 3000, Notification.Position.BOTTOM_START);
        notification.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    private void showError(String message) {
        Notification notification = Notification.show(message, 4000, Notification.Position.BOTTOM_START);
        notification.addThemeVariants(NotificationVariant.LUMO_ERROR);
    }

    private enum PlanningKind {
        ALL("All"),
        EPIC("Epic"),
        TASK("Task"),
        SUBTASK("Subtask");

        private final String label;

        PlanningKind(String label) {
            this.label = label;
        }

        String label() {
            return label;
        }
    }

    private record TaskPlan(PlanningKind kind, String issueKey, String summary, String assignee, String username,
                            Role role, String status,
                            LocalDate startDate, LocalDate endDate, Double jiraEffortMd,
                            List<String> jiraLabels, TaskStack localStack) {
    }
}
