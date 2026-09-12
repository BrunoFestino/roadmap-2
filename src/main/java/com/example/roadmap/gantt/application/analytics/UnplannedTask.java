package com.example.roadmap.gantt.application.analytics;
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
 * A task that is on the roadmap but has no committed calendar window in the database schedule.
 *
 * <p>Because the roadmap now models {@code Work = Duration × Units}, a task without an end
 * date has no duration to spread its effort over, so the report has to assume full
 * dedication: the window becomes {@code start + MD working days}. That assumption is safe
 * but usually wrong, and it silently inflates the owner's load.
 *
 * <p>Rather than hide it, every such task is listed in the roadmap's "sin ventana" tray with
 * its owner and a link to Jira, so the team can agree on real dates and record them in the database.
 *
 * @param taskKey      Jira issue key, e.g. {@code "TTAR-10608"}
 * @param summary      short human-readable title
 * @param issueType    Jira issue type
 * @param assigneeName display name of the person who owns the task
 * @param roleLabel    the owner's role
 * @param roleColor    role colour, shared with the roadmap bars
 * @param status       Jira workflow status, may be {@code null}
 * @param startDate    the start the roadmap did resolve, always present
 * @param assumedEnd   the end the roadmap had to assume at 100% dedication
 * @param md           effort estimate in man-days
 * @param mdEstimated  {@code true} when even the effort was defaulted rather than read
 * @param jiraUrl      absolute link to the issue in Jira
 */
public record UnplannedTask(
        String taskKey,
        String summary,
        String issueType,
        String assigneeName,
        String roleLabel,
        String roleColor,
        String status,
        LocalDate startDate,
        LocalDate assumedEnd,
        int md,
        boolean mdEstimated,
        String jiraUrl) {
}