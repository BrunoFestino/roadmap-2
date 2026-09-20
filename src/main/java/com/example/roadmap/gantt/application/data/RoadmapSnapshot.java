package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.SubtaskBudget;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/** Immutable inputs shared by every projection of a single refresh. */
public record RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                              List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks,
                              List<CompletedSubtaskEffort> completedSubtasks, SubtaskBudget.Allocation subtaskBudget) {
    public RoadmapSnapshot {
        tasks = List.copyOf(tasks);
        milestones = List.copyOf(milestones);
        absences = List.copyOf(absences);
        unplannedTasks = List.copyOf(unplannedTasks);
        completedSubtasks = List.copyOf(completedSubtasks);
    }

    public RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                           List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks,
                           List<CompletedSubtaskEffort> completedSubtasks) {
        this(tasks, milestones, absences, unplannedTasks, completedSubtasks, null);
    }

    public RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                           List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks) {
        this(tasks, milestones, absences, unplannedTasks, List.of());
    }

    public Map<String, List<TeamAbsence>> absencesByPerson() {
        return absences.stream().collect(Collectors.groupingBy(TeamAbsence::username));
    }

    public static Predicate<LocalDate> calendar(List<TeamAbsence> absences, String username) {
        List<TeamAbsence> personal = absences.stream().filter(a -> a.username().equals(username)).toList();
        return date -> personal.stream().anyMatch(a -> a.covers(date));
    }
}
