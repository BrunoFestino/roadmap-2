package com.example.roadmap.gantt.ui;

import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.application.model.AbsenceType;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.button.ButtonVariant;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.notification.Notification;
import com.vaadin.flow.component.notification.NotificationVariant;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.binder.Binder;
import com.vaadin.flow.data.binder.ValidationException;
import com.vaadin.flow.data.binder.ValidationResult;
import com.vaadin.flow.data.renderer.ComponentRenderer;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

/**
 * Where the roadmap owner sets the roadmap team's absences (vacations, birthdays, sick leave,
 * etc.) once, so they are loaded automatically on every future visit and can still be
 * edited or removed. Backed by {@link TeamAbsenceRepository}, which persists to PostgreSQL
 * rather than the browser session, so the data survives an app restart
 * and is shared across whoever opens the roadmap.
 *
 * <p>Every stored absence is automatically taken into account by the Jira Gantt provider
 * when it schedules a person's chained tasks and computes each bar's planned end date.
 */
@Route(value = "gantt/availability", layout = MainLayout.class)
@PageTitle("Team availability")
public class TeamAvailabilityView extends VerticalLayout {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("MM/dd/yyyy");

    private final transient TeamAbsenceRepository repository;
    private final transient GanttTeamRoster teamRoster;

    private final Grid<TeamAbsence> grid = new Grid<>();
    private final ComboBox<TeamMember> memberField = new ComboBox<>("Person");
    private final ComboBox<AbsenceType> typeField = new ComboBox<>("Type");
    private final DatePicker startField = new DatePicker("From");
    private final DatePicker endField = new DatePicker("To");
    private final TextField noteField = new TextField("Note (optional)");
    private final Button saveButton = new Button("Add");
    private final Button cancelEditButton = new Button("Cancel editing");

    private final Binder<FormValues> binder = new Binder<>(FormValues.class);
    private String editingId;
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(TeamAvailabilityView.class);

    public TeamAvailabilityView(TeamAbsenceRepository repository, GanttTeamRoster teamRoster) {
        this.repository = repository;
        this.teamRoster = teamRoster;
        DateFields.configure(startField);
        DateFields.configure(endField);

        addClassName("app-page");
        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        Button reload = new Button("Refresh absences", e -> refreshGrid());
        reload.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        H2 listTitle = new H2("Recorded absences");
        listTitle.addClassName("section-title");
        HorizontalLayout toolbar = new HorizontalLayout(listTitle, reload);
        toolbar.addClassNames("page-toolbar", "table-toolbar");
        add(title(), subtitle(), buildForm(), toolbar, grid);
        configureGrid();
        bindForm();
        refreshGrid();
    }

    private H1 title() {
        H1 h1 = new H1("Team availability");
        h1.addClassName("page-title");
        h1.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return h1;
    }

    private Span subtitle() {
        Span span = new Span("Vacations, birthdays, leave, and other absences are entered once and "
                + "automatically included by the roadmap on every visit.");
        span.addClassName("page-subtitle");
        span.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return span;
    }

    // ── form ─────────────────────────────────────────────────────────────────────

    private Component buildForm() {
        memberField.setItems(teamRoster.members());
        memberField.setItemLabelGenerator(TeamMember::name);
        memberField.setRequiredIndicatorVisible(true);

        typeField.setItems(AbsenceType.values());
        typeField.setItemLabelGenerator(AbsenceType::label);
        typeField.setRequiredIndicatorVisible(true);
        typeField.setValue(AbsenceType.VACATION);

        startField.setRequiredIndicatorVisible(true);
        endField.setRequiredIndicatorVisible(true);
        noteField.setPlaceholder("e.g. Family trip");
        noteField.setHelperText("Full days are deducted.");
        noteField.setWidth("220px");

        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        saveButton.addClickListener(e -> save());
        cancelEditButton.addClickListener(e -> resetForm());
        cancelEditButton.setVisible(false);

        FlexLayout fields = new FlexLayout(memberField, typeField, startField, endField, noteField);
        fields.addClassName("form-fields");
        fields.getStyle().set("gap", "12px").set("flex-wrap", "wrap").set("align-items", "flex-end");

        HorizontalLayout actions = new HorizontalLayout(saveButton, cancelEditButton);
        actions.addClassName("form-actions");
        actions.setSpacing(true);

        H2 formTitle = new H2("Absence details");
        formTitle.addClassName("section-title");
        VerticalLayout form = new VerticalLayout(formTitle, fields, actions);
        form.addClassNames("surface-card", "absence-form");
        form.setPadding(false);
        form.setSpacing(true);
        form.getStyle().set("background", GanttStyle.CARD_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "16px").set("margin-top", "8px");
        return form;
    }

    private void bindForm() {
        binder.forField(memberField).asRequired("Select a person").bind(FormValues::member, FormValues::member);
        binder.forField(typeField).asRequired("Select a type").bind(FormValues::type, FormValues::type);
        binder.forField(startField).asRequired("Select a start date").bind(FormValues::startDate, FormValues::startDate);
        binder.forField(endField).asRequired("Select an end date")
                .withValidator((end, ctx) -> {
                    LocalDate start = startField.getValue();
                    if (start != null && end != null && end.isBefore(start)) {
                        return com.vaadin.flow.data.binder.ValidationResult.error("\"To\" cannot be earlier than \"From\"");
                    }
                    return com.vaadin.flow.data.binder.ValidationResult.ok();
                })
                .bind(FormValues::endDate, FormValues::endDate);
        binder.forField(noteField).bind(FormValues::note, FormValues::note);
        binder.setBean(new FormValues());
    }

    private void save() {
        FormValues values = new FormValues();
        try {
            binder.writeBean(values);
        } catch (ValidationException e) {
            showError("Review the fields marked in red.");
            return;
        }

        try {
            if (editingId == null) {
                repository.add(values.member.username(), values.startDate, values.endDate, values.type, values.note);
                showSuccess("Absence added.");
            } else {
                repository.update(new TeamAbsence(editingId, values.member.username(), values.startDate,
                        values.endDate, values.type, values.note));
                showSuccess("Absence updated.");
            }
            resetForm();
            refreshGrid();
        } catch (RuntimeException e) {
            LOG.error("Saving absence failed", e);
            showError("The absence was not saved. The form was preserved; you can retry.");
        }
    }

    private void resetForm() {
        editingId = null;
        binder.setBean(new FormValues());
        typeField.setValue(AbsenceType.VACATION);
        saveButton.setText("Add");
        cancelEditButton.setVisible(false);
    }

    private void editRow(TeamAbsence absence) {
        editingId = absence.id();
        FormValues values = new FormValues();
        values.member = teamRoster.byUsername(absence.username());
        values.type = absence.type();
        values.startDate = absence.startDate();
        values.endDate = absence.endDate();
        values.note = absence.note();
        binder.setBean(values);
        saveButton.setText("Save changes");
        cancelEditButton.setVisible(true);
    }

    private void deleteRow(TeamAbsence absence) {
        try {
            repository.delete(absence.id());
        } catch (RuntimeException e) {
            LOG.error("Deleting absence failed for {}", absence.id(), e);
            showError("The absence was not deleted. You can retry.");
            return;
        }
        if (absence.id().equals(editingId)) resetForm();
        showSuccess("Absence deleted.");
        refreshGrid();
    }

    // ── grid ─────────────────────────────────────────────────────────────────────

    private void configureGrid() {
        grid.addColumn(a -> memberName(a.username())).setHeader("Person").setAutoWidth(true);
        grid.addColumn(a -> a.type().label()).setHeader("Type").setAutoWidth(true);
        grid.addColumn(a -> a.startDate().format(DATE_FORMAT)).setHeader("From").setAutoWidth(true);
        grid.addColumn(a -> a.endDate().format(DATE_FORMAT)).setHeader("To").setAutoWidth(true);
        grid.addColumn(TeamAbsence::note).setHeader("Note").setAutoWidth(true);
        grid.addColumn(new ComponentRenderer<>(this::rowActions)).setHeader("").setAutoWidth(true);
        grid.setAllRowsVisible(true);
        grid.addClassNames("data-grid", "absence-grid");
        grid.getStyle().set("margin-top", "16px");
    }

    private Component rowActions(TeamAbsence absence) {
        Button edit = new Button("Edit", e -> editRow(absence));
        Button delete = new Button("Delete", e -> deleteRow(absence));
        delete.addThemeVariants(ButtonVariant.LUMO_ERROR, ButtonVariant.LUMO_TERTIARY);
        edit.addThemeVariants(ButtonVariant.LUMO_TERTIARY);
        HorizontalLayout layout = new HorizontalLayout(edit, delete);
        layout.setSpacing(true);
        layout.setPadding(false);
        return layout;
    }

    private void refreshGrid() {
        try {
            grid.setItems(repository.findAll());
        } catch (RuntimeException e) {
            LOG.error("Loading absences failed", e);
            showError("The absence list could not be refreshed. Confirmed changes are still saved. Use Refresh absences.");
        }
    }

    private String memberName(String username) {
        TeamMember member = teamRoster.byUsername(username);
        return member != null ? member.name() : username;
    }

    private void showSuccess(String message) {
        Notification n = Notification.show(message, 3000, Notification.Position.BOTTOM_START);
        n.addThemeVariants(NotificationVariant.LUMO_SUCCESS);
    }

    private void showError(String message) {
        Notification n = Notification.show(message, 4000, Notification.Position.BOTTOM_START);
        n.addThemeVariants(NotificationVariant.LUMO_ERROR);
    }

    /** Plain mutable holder the {@link Binder} reads/writes the form fields into. */
    public static final class FormValues {
        private TeamMember member;
        private AbsenceType type;
        private LocalDate startDate;
        private LocalDate endDate;
        private String note = "";

        public TeamMember member() {
            return member;
        }

        public void member(TeamMember member) {
            this.member = member;
        }

        public AbsenceType type() {
            return type;
        }

        public void type(AbsenceType type) {
            this.type = type;
        }

        public LocalDate startDate() {
            return startDate;
        }

        public void startDate(LocalDate startDate) {
            this.startDate = startDate;
        }

        public LocalDate endDate() {
            return endDate;
        }

        public void endDate(LocalDate endDate) {
            this.endDate = endDate;
        }

        public String note() {
            return note;
        }

        public void note(String note) {
            this.note = note == null ? "" : note;
        }
    }
}
