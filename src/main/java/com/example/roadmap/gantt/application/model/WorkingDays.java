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
 * Working-day arithmetic shared by the whole Gantt: Saturdays and Sundays never count as
 * effort days, and a task's start day always counts as its first day of effort.
 *
 * <p>This is the one place the "end = start + MD working days" rule lives, so every bar's
 * width can always be traced back to the same calculation.
 *
 * <p>Every method has an overload taking an {@code extraBlockedDays} predicate, used to
 * additionally skip a specific person's stored absences (vacation, sick leave, etc. — see
 * {@code TeamAbsenceRepository}) on top of weekends. The no-predicate overloads keep the
 * original weekends-only behaviour and are implemented in terms of the predicate ones with
 * an "always available" predicate, so both stay in sync by construction.
 */
public final class WorkingDays {

    private static final Predicate<LocalDate> NONE_BLOCKED = date -> false;

    private WorkingDays() {
    }

    public static boolean isWeekend(LocalDate date) {
        DayOfWeek day = date.getDayOfWeek();
        return day == DayOfWeek.SATURDAY || day == DayOfWeek.SUNDAY;
    }

    /** The next working day on/after {@code date} ({@code date} itself if it already is one). */
    public static LocalDate onOrAfter(LocalDate date) {
        return onOrAfter(date, NONE_BLOCKED);
    }

    /** As {@link #onOrAfter(LocalDate)}, also skipping any date matched by {@code extraBlockedDays}. */
    public static LocalDate onOrAfter(LocalDate date, Predicate<LocalDate> extraBlockedDays) {
        LocalDate cursor = date;
        while (isWeekend(cursor) || extraBlockedDays.test(cursor)) {
            cursor = cursor.plusDays(1);
        }
        return cursor;
    }

    /** The next working day strictly after {@code date}. */
    public static LocalDate nextWorkingDay(LocalDate date) {
        return nextWorkingDay(date, NONE_BLOCKED);
    }

    /** As {@link #nextWorkingDay(LocalDate)}, also skipping any date matched by {@code extraBlockedDays}. */
    public static LocalDate nextWorkingDay(LocalDate date, Predicate<LocalDate> extraBlockedDays) {
        return onOrAfter(date.plusDays(1), extraBlockedDays);
    }

    /**
     * End date of an {@code md}-working-day effort window that starts on {@code start},
     * counting only working days and counting the start day itself as day 1. {@code start}
     * is snapped forward to a working day first if needed.
     */
    public static LocalDate endFrom(LocalDate start, int md) {
        return endFrom(start, md, NONE_BLOCKED);
    }

    /** As {@link #endFrom(LocalDate, int)}, also skipping any date matched by {@code extraBlockedDays}. */
    public static LocalDate endFrom(LocalDate start, int md, Predicate<LocalDate> extraBlockedDays) {
        int days = Math.max(1, md);
        LocalDate cursor = onOrAfter(start, extraBlockedDays);
        int counted = 0;
        while (true) {
            if (!isWeekend(cursor) && !extraBlockedDays.test(cursor)) {
                counted++;
            }

            if (counted >= days) {
                return cursor;
            }
            cursor = cursor.plusDays(1);
        }
    }

    /** Number of working days in the inclusive window {@code [start, end]}. */
    public static long countBetween(LocalDate start, LocalDate end) {
        return countBetween(start, end, NONE_BLOCKED);
    }

    /** As {@link #countBetween(LocalDate, LocalDate)}, also excluding matched blocked dates. */
    public static long countBetween(LocalDate start, LocalDate end, Predicate<LocalDate> extraBlockedDays) {
        long count = 0;
        LocalDate cursor = start;
        while (!cursor.isAfter(end)) {
            if (!isWeekend(cursor) && !extraBlockedDays.test(cursor)) {
                count++;
            }
            cursor = cursor.plusDays(1);
        }
        return count;
    }
}