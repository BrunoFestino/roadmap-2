package com.example.roadmap.gantt.ui;

import com.vaadin.flow.component.datepicker.DatePicker;
import java.util.List;
import java.util.Locale;

final class DateFields {
    private DateFields() {}

    static void configure(DatePicker field) {
        field.setLocale(Locale.forLanguageTag("es-AR"));
        field.setI18n(new DatePicker.DatePickerI18n()
                .setDateFormat("dd/MM/yyyy")
                .setMonthNames(List.of("enero", "febrero", "marzo", "abril", "mayo", "junio",
                        "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"))
                .setWeekdays(List.of("domingo", "lunes", "martes", "miércoles", "jueves", "viernes", "sábado"))
                .setWeekdaysShort(List.of("dom", "lun", "mar", "mié", "jue", "vie", "sáb"))
                .setFirstDayOfWeek(1).setToday("Hoy").setCancel("Cancelar"));
        field.setPlaceholder("dd/mm/aaaa");
    }
}
