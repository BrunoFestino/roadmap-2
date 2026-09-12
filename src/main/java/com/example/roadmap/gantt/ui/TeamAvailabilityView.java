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

    public TeamAvailabilityView(TeamAbsenceRepository repository) {
        this.repository = repository;

        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        add(title(), subtitle(), buildForm(), grid);
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
        noteField.setPlaceholder("Ej: medio día, aviso corto, etc.");
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
            showError("No se pudo guardar: " + e.getMessage());
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
        repository.delete(absence.id());
        if (absence.id().equals(editingId)) {
            resetForm();
        }
        refreshGrid();
        showSuccess("Ausencia eliminada.");
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
        List<TeamAbsence> all = repository.findAll();
        grid.setItems(all);
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