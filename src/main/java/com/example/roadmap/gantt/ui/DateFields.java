package com.example.roadmap.gantt.ui;

import com.vaadin.flow.component.datepicker.DatePicker;
import java.util.List;
import java.util.Locale;

final class DateFields {
    private DateFields() {}

    static void configure(DatePicker field) {
        field.setLocale(Locale.ENGLISH);
        field.setI18n(new DatePicker.DatePickerI18n()
                .setDateFormat("MM/dd/yyyy")
                .setMonthNames(List.of("January", "February", "March", "April", "May", "June",
                        "July", "August", "September", "October", "November", "December"))
                .setWeekdays(List.of("Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"))
                .setWeekdaysShort(List.of("Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"))
                .setFirstDayOfWeek(1).setToday("Today").setCancel("Cancel"));
        field.setPlaceholder("mm/dd/yyyy");
    }
}
