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
 * Where the roadmap owner sets the AR1 team's absences (vacations, birthdays, sick leave,
 * etc.) once, so they are loaded automatically on every future visit and can still be
 * edited or removed. Backed by {@link TeamAbsenceRepository}, which persists to PostgreSQL
 * rather than the browser session, so the data survives an app restart
 * and is shared across whoever opens the roadmap.
 *
 * <p>Every stored absence is automatically taken into account by the Jira Gantt provider
 * when it schedules a person's chained tasks and computes each bar's planned end date.
 */
@Route(value = "gantt/availability", layout = MainLayout.class)
@PageTitle("Ausencias del equipo")
public class TeamAvailabilityView extends VerticalLayout {

    private static final DateTimeFormatter DATE_FORMAT = DateTimeFormatter.ofPattern("dd/MM/yyyy");

    private final transient TeamAbsenceRepository repository;

    private final Grid<TeamAbsence> grid = new Grid<>();
    private final ComboBox<TeamMember> memberField = new ComboBox<>("Persona");
    private final ComboBox<AbsenceType> typeField = new ComboBox<>("Tipo");
    private final DatePicker startField = new DatePicker("Desde");
    private final DatePicker endField = new DatePicker("Hasta");
    private final TextField noteField = new TextField("Nota (opcional)");
    private final Button saveButton = new Button("Agregar");
    private final Button cancelEditButton = new Button("Cancelar edición");

    private final Binder<FormValues> binder = new Binder<>(FormValues.class);
    private String editingId;
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(TeamAvailabilityView.class);

    public TeamAvailabilityView(TeamAbsenceRepository repository) {
        this.repository = repository;
        DateFields.configure(startField);
        DateFields.configure(endField);

        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        add(title(), subtitle(), buildForm(), new Button("Actualizar ausencias", e -> refreshGrid()), grid);
        configureGrid();
        bindForm();
        refreshGrid();
    }

    private H1 title() {
        H1 h1 = new H1("Ausencias del equipo (AR1)");
        h1.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return h1;
    }

    private Span subtitle() {
        Span span = new Span("Vacaciones, cumpleaños, licencias, etc. Se cargan una sola vez y "
                + "el roadmap las tiene en cuenta automáticamente en cada visita.");
        span.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return span;
    }

    // ── form ─────────────────────────────────────────────────────────────────────

    private Component buildForm() {
        memberField.setItems(GanttTeamRoster.members());
        memberField.setItemLabelGenerator(TeamMember::name);
        memberField.setRequiredIndicatorVisible(true);

        typeField.setItems(AbsenceType.values());
        typeField.setItemLabelGenerator(AbsenceType::label);
        typeField.setRequiredIndicatorVisible(true);
        typeField.setValue(AbsenceType.VACATION);

        startField.setRequiredIndicatorVisible(true);
        endField.setRequiredIndicatorVisible(true);
        noteField.setPlaceholder("Ej: vacaciones. Se descuentan días completos.");
        noteField.setWidth("220px");

        saveButton.addThemeVariants(ButtonVariant.LUMO_PRIMARY);
        saveButton.addClickListener(e -> save());
        cancelEditButton.addClickListener(e -> resetForm());
        cancelEditButton.setVisible(false);

        FlexLayout fields = new FlexLayout(memberField, typeField, startField, endField, noteField);
        fields.getStyle().set("gap", "12px").set("flex-wrap", "wrap").set("align-items", "flex-end");

        HorizontalLayout actions = new HorizontalLayout(saveButton, cancelEditButton);
        actions.setSpacing(true);

        VerticalLayout form = new VerticalLayout(fields, actions);
        form.setPadding(false);
        form.setSpacing(true);
        form.getStyle().set("background", GanttStyle.CARD_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "16px").set("margin-top", "8px");
        return form;
    }

    private void bindForm() {
        binder.forField(memberField).asRequired("Elegí una persona").bind(FormValues::member, FormValues::member);
        binder.forField(typeField).asRequired("Elegí un tipo").bind(FormValues::type, FormValues::type);
        binder.forField(startField).asRequired("Elegí una fecha de inicio").bind(FormValues::startDate, FormValues::startDate);
        binder.forField(endField).asRequired("Elegí una fecha de fin")
                .withValidator((end, ctx) -> {
                    LocalDate start = startField.getValue();
                    if (start != null && end != null && end.isBefore(start)) {
                        return com.vaadin.flow.data.binder.ValidationResult.error("\"Hasta\" no puede ser anterior a \"Desde\"");
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
            showError("Revisá los campos marcados en rojo.");
            return;
        }

        try {
            if (editingId == null) {
                repository.add(values.member.username(), values.startDate, values.endDate, values.type, values.note);
                showSuccess("Ausencia agregada.");
            } else {
                repository.update(new TeamAbsence(editingId, values.member.username(), values.startDate,
                        values.endDate, values.type, values.note));
                showSuccess("Ausencia actualizada.");
            }
            resetForm();
            refreshGrid();
        } catch (RuntimeException e) {
            LOG.error("Saving absence failed", e);
            showError("No se guardó la ausencia. Conservamos el formulario; podés reintentar.");
        }
    }

    private void resetForm() {
        editingId = null;
        binder.setBean(new FormValues());
        typeField.setValue(AbsenceType.VACATION);
        saveButton.setText("Agregar");
        cancelEditButton.setVisible(false);
    }

    private void editRow(TeamAbsence absence) {
        editingId = absence.id();
        FormValues values = new FormValues();
        values.member = GanttTeamRoster.byUsername(absence.username());
        values.type = absence.type();
        values.startDate = absence.startDate();
        values.endDate = absence.endDate();
        values.note = absence.note();
        binder.setBean(values);
        saveButton.setText("Guardar cambios");
        cancelEditButton.setVisible(true);
    }

    private void deleteRow(TeamAbsence absence) {
        try {
            repository.delete(absence.id());
        } catch (RuntimeException e) {
            LOG.error("Deleting absence failed for {}", absence.id(), e);
            showError("No se eliminó la ausencia. Podés reintentar.");
            return;
        }
        if (absence.id().equals(editingId)) resetForm();
        showSuccess("Ausencia eliminada.");
        refreshGrid();
    }

    // ── grid ─────────────────────────────────────────────────────────────────────

    private void configureGrid() {
        grid.addColumn(a -> memberName(a.username())).setHeader("Persona").setAutoWidth(true);
        grid.addColumn(a -> a.type().label()).setHeader("Tipo").setAutoWidth(true);
        grid.addColumn(a -> a.startDate().format(DATE_FORMAT)).setHeader("Desde").setAutoWidth(true);
        grid.addColumn(a -> a.endDate().format(DATE_FORMAT)).setHeader("Hasta").setAutoWidth(true);
        grid.addColumn(TeamAbsence::note).setHeader("Nota").setAutoWidth(true);
        grid.addColumn(new ComponentRenderer<>(this::rowActions)).setHeader("").setAutoWidth(true);
        grid.setAllRowsVisible(true);
        grid.getStyle().set("margin-top", "16px");
    }

    private Component rowActions(TeamAbsence absence) {
        Button edit = new Button("Editar", e -> editRow(absence));
        Button delete = new Button("Eliminar", e -> deleteRow(absence));
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
            showError("No se pudo actualizar la lista de ausencias. Los cambios confirmados siguen guardados. Usá Actualizar ausencias.");
        }
    }

    private String memberName(String username) {
        TeamMember member = GanttTeamRoster.byUsername(username);
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