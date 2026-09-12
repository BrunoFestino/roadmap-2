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
 * Builds the "Roadmap Gantt — View by Person": one group per AR1 team member, in roster
 * order, holding their tasks ordered by planned start date. Members with no current work
 * still get an (empty) group, so the roadmap always shows the whole team.
 */
@Service
public class BuildPersonGanttUseCase {

    private final GanttDataProvider dataProvider;

    public BuildPersonGanttUseCase(GanttDataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public GanttChart build() {
        List<GanttTask> tasks = GanttBounds.withinWindow(dataProvider.tasks());
        List<GanttGroup> groups = new ArrayList<>();
        addContextGroups(groups, tasks);

        for (TeamMember member : GanttTeamRoster.members()) {
            List<GanttTask> personTasks = tasks.stream()
                    .filter(task -> !task.isContextWork())
                    .filter(t -> t.assignee().username().equals(member.username()))
                    .sorted(Comparator.comparing(GanttTask::start))
                    .toList();
            groups.add(new GanttGroup(member.name(), member.role().color(), personTasks));
        }

        LocalDate start = GanttBounds.min(tasks);
        LocalDate end = GanttBounds.max(tasks);
        return new GanttChart(start, end, groups, dataProvider.milestones());
    }

    private void addContextGroups(List<GanttGroup> groups, List<GanttTask> tasks) {
        List<GanttTask> epics = tasks.stream().filter(GanttTask::isEpic)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!epics.isEmpty() || !dataProvider.milestones().isEmpty()) {
            groups.add(new GanttGroup("Milestones y épicas", "#6554C0", epics));
        }
        List<GanttTask> stories = tasks.stream().filter(GanttTask::isUserStory)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!stories.isEmpty()) {
            groups.add(new GanttGroup("User Stories", "#2C8FB5", stories));
        }
    }
}