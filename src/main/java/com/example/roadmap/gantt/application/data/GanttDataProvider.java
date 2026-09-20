package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import java.util.List;

/**
 * Supplies the planned work and milestones the Gantt renders.
 *
 * <p>The only implementation is {@link JiraGanttDataProvider}; the interface exists so the
 * use cases and UI never depend on Jira directly, and so a failure talking to Jira
 * (network, auth, timeout) is the caller's to handle rather than silently swallowed here.
 */
public interface GanttDataProvider {

    /** Planned tasks for the roadmap team, one per relevant open Jira issue. */
    List<GanttTask> tasks();

    default RoadmapSnapshot snapshot(List<TeamAbsence> absences) {
        return new RoadmapSnapshot(tasks(), milestones(), absences, List.of());
    }

    /** Open milestones (with a due date) to mark on the timeline. */
    List<Milestone> milestones();
}