package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import java.util.Set;
import java.util.HashSet;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import java.util.function.Predicate;
import java.util.stream.Collectors;

/** Immutable inputs shared by every projection of a single refresh. */
public record RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                              List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks,
                              Set<String> parentTaskKeys, Map<String, String> issueSummaries) {
    public RoadmapSnapshot {
        Set<String> parents = new HashSet<>(parentTaskKeys);
        tasks.stream().filter(task -> "Sub-task".equalsIgnoreCase(task.issueType()))
                .map(GanttTask::parentKey).filter(java.util.Objects::nonNull).forEach(parents::add);
        parentTaskKeys = Set.copyOf(parents);
        tasks = tasks.stream().filter(task -> task.isEpic() || !parents.contains(task.key())).toList();
        milestones = List.copyOf(milestones);
        absences = List.copyOf(absences);
        unplannedTasks = unplannedTasks.stream().filter(task -> !parents.contains(task.taskKey())).toList();
        issueSummaries = Map.copyOf(issueSummaries);
    }

    public RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                           List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks,
                           Set<String> parentTaskKeys) {
        this(tasks, milestones, absences, unplannedTasks, parentTaskKeys, Map.of());
    }

    public RoadmapSnapshot(List<GanttTask> tasks, List<Milestone> milestones,
                           List<TeamAbsence> absences, List<UnplannedTask> unplannedTasks) {
        this(tasks, milestones, absences, unplannedTasks, Set.of());
    }

    public Map<String, List<TeamAbsence>> absencesByPerson() {
        return absences.stream().collect(Collectors.groupingBy(TeamAbsence::username));
    }

    public static Predicate<LocalDate> calendar(List<TeamAbsence> absences, String username) {
        List<TeamAbsence> personal = absences.stream().filter(a -> a.username().equals(username)).toList();
        return date -> personal.stream().anyMatch(a -> a.covers(date));
    }
}
