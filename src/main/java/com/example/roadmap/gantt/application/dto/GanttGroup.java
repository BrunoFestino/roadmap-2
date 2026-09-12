package com.example.roadmap.gantt.application.dto;

import com.example.roadmap.gantt.application.model.GanttTask;
import java.util.List;

/**
 * A group of tasks under one heading - a role or a person - shared by both Gantt views.
 *
 * @param label group heading (role label or person display name)
 * @param color heading / bar accent colour (CSS hex), from the group's role
 * @param tasks the tasks in this group, ordered by planned start date; empty when the
 *              group (e.g. a person with no current work) has nothing to show
 */
public record GanttGroup(String label, String color, List<GanttTask> tasks) {

    public GanttGroup {
        tasks = tasks == null ? List.of() : List.copyOf(tasks);
    }
}