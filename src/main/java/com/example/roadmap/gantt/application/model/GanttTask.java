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
 * A single planned piece of work in the roadmap: one Jira issue assigned to an AR1 team
 * member, modelled with Microsoft Project's scheduling identity
 * {@code Work = Duration × Units}.
 *
 * <p>The three variables are kept explicit and independent:
 * <ul>
 *   <li><strong>Work</strong> — {@link #md()}, the effort estimate. One MD is
 *       {@value WorkContour#HOURS_PER_MD} hours of effort.</li>
 *   <li><strong>Duration</strong> — the calendar commitment {@link #displayStartDate()} to
 *       {@link #plannedEndDate()}, read from the maintained database schedule. It is a business
 *       commitment, never derived from the effort.</li>
 *   <li><strong>Units</strong> — the resulting daily dedication, computed on demand by
 *       {@link WorkContour}. It is what makes "how busy is this person" answerable.</li>
 * </ul>
 *
 * <p>Every task is therefore a <em>fixed-duration</em> task in Microsoft Project terms: the
 * window is the input and the dedication is what flexes. The roadmap never stretches a bar
 * to match an estimate, and never shortens one to match a milestone.
 *
 * <p>The start date is deliberately split in two:
 * <ul>
 *   <li>{@link #actualStartDate()} — a date read directly from the Target Start source or
 *       from an issue's first In Progress transition.
 *   <li>{@link #plannedStartDate()} — the roadmap date. It equals the real source date:
 *       items without either source are intentionally excluded instead of being inferred.
 * </ul>
 *
 * @param key               Jira issue key, e.g. {@code "TTAR-10608"}
 * @param summary           short human-readable title
 * @param issueType         Jira issue type, e.g. {@code "Task"} or {@code "Epic"}
 * @param assignee          the team member doing the work (carries the role)
 * @param actualStartDate   real start date read from Jira, {@code null} if Jira has none
 * @param plannedStartDate  this roadmap's own calculated start date (always present)
 * @param startDateSource   which tier ultimately produced {@link #displayStartDate()}
 * @param md                effort estimate in man-days (at least 1)
 * @param mdEstimated       {@code true} when the MD effort was defaulted (Jira had none)
 * @param status            Jira workflow status, may be {@code null}
 * @param plannedEndDate    end of the calendar commitment; when the database schedule has no end
 *                          date this falls back to full dedication, i.e.
 *                          {@code start + MD working days}
 * @param hasCalendarWindow {@code true} when the end date is a real committed date from the
 *                          database schedule rather than the full-dedication fallback
 * @param epicKey           key of the epic this work serves, resolved through the issue's own
 *                          Epic Link or its parent's; {@code null} when it could not be
 *                          reached, which paints the task in {@link EpicPalette#UNASSIGNED}
 */
public record GanttTask(
        String key,
        String summary,
        String issueType,
        TeamMember assignee,
        LocalDate actualStartDate,
        LocalDate plannedStartDate,
        StartDateSource startDateSource,
        int md,
        boolean mdEstimated,
        String status,
        LocalDate plannedEndDate,
        boolean hasCalendarWindow,
        String epicKey,
        long loggedSeconds) {

    public GanttTask {
        md = Math.max(1, md);
    }

    /**
     * Builds a task with no committed end date: the window falls back to full dedication,
     * {@code start + MD working days}, skipping weekends and the assignee's absences.
     */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   int md, boolean mdEstimated, String status, Predicate<LocalDate> extraBlockedDays) {
        return create(key, summary, issueType, assignee, actualStartDate, plannedStartDate, startDateSource,
                md, mdEstimated, status, null, extraBlockedDays, null, 0L);
    }

    /**
     * Builds a task, using {@code committedEndDate} as the calendar commitment when the
     * maintained schedule supplies one. Without it the task is flagged as having no calendar
     * window and falls back to {@code start + MD working days}, i.e. 100% dedication.
     */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   int md, boolean mdEstimated, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, long loggedSeconds) {
        LocalDate displayStart = actualStartDate != null ? actualStartDate : plannedStartDate;
        boolean committed = committedEndDate != null && !committedEndDate.isBefore(displayStart);
        LocalDate endDate = committed
                ? committedEndDate
                : WorkingDays.endFrom(displayStart, md, extraBlockedDays);
        return new GanttTask(key, summary, issueType, assignee, actualStartDate, plannedStartDate,
                startDateSource, md, mdEstimated, status, endDate, committed, epicKey, loggedSeconds);
    }

    /** The date actually rendered on the roadmap: the real Jira date when there is one. */
    public LocalDate displayStartDate() {
        return actualStartDate != null ? actualStartDate : plannedStartDate;
    }

    /** Alias of {@link #displayStartDate()}. */
    public LocalDate start() {
        return displayStartDate();
    }

    /** Alias of {@link #plannedEndDate()}: the single end date of the calendar commitment. */
    public LocalDate end() {
        return plannedEndDate();
    }

    /** Total effort of this task in hours ({@code MD × 8}). */
    public double workHours() {
        return md * WorkContour.HOURS_PER_MD;
    }

    /** Hours actually logged against this issue in Jira. */
    public double loggedHours() {
        return loggedSeconds / 3600.0;
    }

    /**
     * Effort still owed: the estimate minus what has really been logged.
     *
     * <p>This is what makes availability a fact rather than an assumption. Without it the only
     * way to read a week that is already half spent is to assume the work planned for Monday
     * got done — an assumption nothing in the data supports. Logged hours answer it instead.
     *
     * <p>Clamped at zero: a task that burned more hours than estimated owes nothing further,
     * it simply cost more than planned, and that overrun belongs to a velocity report rather
     * than to future capacity.
     */
    public double remainingWorkHours() {
        return Math.max(0, workHours() - loggedHours());
    }

    /** {@code true} once Jira has at least one hour logged against this issue. */
    public boolean hasLoggedTime() {
        return loggedSeconds > 0;
    }

    /**
     * {@code true} when either the effort or the start date is not a real value read
     * directly from Jira — drives the dashed-border treatment in the widget.
     */
    public boolean estimated() {
        return mdEstimated || !startDateSource.isActual();
    }

    /**
     * {@code true} when this task has effort but no committed calendar window, so its
     * dedication had to be assumed at 100%. These surface in the "sin ventana" tray.
     */
    public boolean missingCalendarWindow() {
        return !hasCalendarWindow;
    }

    public boolean isContextWork() {
        return "Epic".equalsIgnoreCase(issueType) || "User Story".equalsIgnoreCase(issueType);
    }

    public String effectiveEpicKey() {
        return epicKey == null || epicKey.isBlank() ? null : epicKey;
    }
    public boolean isEpic() {
        return "Epic".equalsIgnoreCase(issueType);
    }

    public boolean isUserStory() {
        return "User Story".equalsIgnoreCase(issueType);
    }

    public boolean missingEpic() {
        return effectiveEpicKey() == null;
    }

    public String color() {
        return EpicPalette.colorFor(effectiveEpicKey());
    }
}