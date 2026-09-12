package com.example.roadmap.gantt.application.usecase;
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
 * Timeline window shared by the two build use cases: a fixed one-week look-back from today
 * (just enough context on what was already in flight), through one week past the last
 * planned task. Tasks that wrapped up entirely before that look-back cutoff are dropped
 * from the roadmap altogether — this is a forward-looking planning view, not a history —
 * and any task still open across the cutoff has its bar visually clamped so no date before
 * it is ever drawn (see {@code GanttLanePacker}).
 */
final class GanttBounds {

    private static final long LOOKBACK_WEEKS = 1;
    private static final long LOOKAHEAD_WEEKS = 1;

    private GanttBounds() {
    }

    /** The fixed cutoff: tasks finished before this date are dropped, the timeline never shows earlier dates. */
    static LocalDate cutoff() {
        return LocalDate.now().minusWeeks(LOOKBACK_WEEKS);
    }

    /** Keeps only tasks still relevant to a forward-looking roadmap: those ending on/after {@link #cutoff()}. */
    static List<GanttTask> withinWindow(Collection<GanttTask> tasks) {
        LocalDate cutoff = cutoff();
        return tasks.stream().filter(t -> !t.end().isBefore(cutoff)).toList();
    }

    /** Always exactly one week before today: the timeline never shows anything earlier. */
    static LocalDate min(Collection<GanttTask> tasks) {
        return cutoff();
    }

    /** One week after the last planned task's end, or one week after today if there are none. */
    static LocalDate max(Collection<GanttTask> tasks) {
        LocalDate lastTaskEnd = tasks.stream()
                .map(GanttTask::end)
                .max(LocalDate::compareTo)
                .orElse(LocalDate.now());
        return lastTaskEnd.plusWeeks(LOOKAHEAD_WEEKS);
    }
}