package com.example.roadmap.gantt.ui.widget;
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
 * Assigns each task in a group to a sub-lane using greedy interval packing, so overlapping
 * tasks never hide one another.
 *
 * <p>The packing footprint includes the horizontal space the task's label needs — inside
 * the bar if it fits, appended after it (past the end-date text) otherwise — not just the
 * bar's own width. That way a short bar with a long label still reserves real room and
 * pushes a colliding neighbour down to another lane instead of drawing text on top of it.
 */
final class GanttLanePacker {

    record Placed(GanttTask task, int x, int width, String label, boolean labelInside, int lane) {
    }

    private GanttLanePacker() {
    }

    static List<Placed> pack(GanttChart chart, List<GanttTask> tasks, int pixelsPerDay) {
        List<GanttTask> sorted = tasks.stream()
                .sorted(Comparator.comparing(GanttTask::start))
                .toList();

        List<List<int[]>> laneFootprints = new ArrayList<>(); // each entry: [x, footprintEnd]
        List<Placed> result = new ArrayList<>();

        for (GanttTask task : sorted) {
            LocalDate displayStart = task.start().isBefore(chart.timelineStart())
                    ? chart.timelineStart() : task.start();
            int x = GanttScale.xOf(chart, displayStart, pixelsPerDay);
            int width = GanttScale.widthOf(displayStart, task.end(), pixelsPerDay);
            String label = label(task);
            int labelWidth = (int) Math.ceil(label.length() * GanttStyle.CHAR_W);
            int dateWidth = 40;
            boolean labelInside = labelWidth + 14 < width;
            int footprintEnd = x + width + dateWidth + (labelInside ? 0 : labelWidth + 10) + 12;

            int laneIndex = -1;
            for (int i = 0; i < laneFootprints.size(); i++) {
                boolean free = laneFootprints.get(i).stream()
                        .noneMatch(f -> x < f[1] && f[0] < footprintEnd);
                if (free) {
                    laneIndex = i;
                    break;
                }
            }
            if (laneIndex == -1) {
                laneFootprints.add(new ArrayList<>());
                laneIndex = laneFootprints.size() - 1;
            }
            laneFootprints.get(laneIndex).add(new int[] {x, footprintEnd});

            result.add(new Placed(task, x, width, label, labelInside, laneIndex));
        }
        return result;
    }

    static int laneCount(List<Placed> placed) {
        return placed.stream().mapToInt(Placed::lane).max().orElse(0) + 1;
    }

    private static String label(GanttTask task) {
        String summary = task.summary() == null ? "" : task.summary();
        String truncated = summary.length() > 38 ? summary.substring(0, 36) + "…" : summary;
        return summary.isBlank() ? task.key() : task.key() + " — " + truncated;
    }
}