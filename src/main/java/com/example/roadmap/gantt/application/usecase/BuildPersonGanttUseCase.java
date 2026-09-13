package com.example.roadmap.gantt.application.usecase;

import com.example.roadmap.gantt.application.data.GanttDataProvider;
import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.TeamMember;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Builds the "Roadmap Gantt - View by Person": one group per AR1 team member, in roster
 * order, holding their tasks ordered by planned start date. Members with no current work
 * still get an (empty) group, so the roadmap always shows the whole team.
 */
@Service
public class BuildPersonGanttUseCase {

    private final GanttDataProvider dataProvider;
    private final GanttTeamRoster teamRoster;

    public BuildPersonGanttUseCase(GanttDataProvider dataProvider, GanttTeamRoster teamRoster) {
        this.dataProvider = dataProvider;
        this.teamRoster = teamRoster;
    }

    public GanttChart build() {
        return build(dataProvider.tasks(), dataProvider.milestones());
    }

    public GanttChart build(List<GanttTask> input, List<Milestone> milestones) {
        List<GanttTask> tasks = GanttBounds.withinWindow(input);
        List<GanttGroup> groups = new ArrayList<>();
        addContextGroups(groups, tasks, milestones);

        for (TeamMember member : teamRoster.members()) {
            List<GanttTask> personTasks = tasks.stream()
                    .filter(task -> !task.isContextWork())
                    .filter(t -> t.assignee().username().equals(member.username()))
                    .sorted(Comparator.comparing(GanttTask::start))
                    .toList();
            groups.add(new GanttGroup(member.name(), member.role().color(), personTasks));
        }

        LocalDate start = GanttBounds.min(tasks);
        LocalDate end = GanttBounds.max(tasks);
        return new GanttChart(start, end, groups, milestones);
    }

    private void addContextGroups(List<GanttGroup> groups, List<GanttTask> tasks, List<Milestone> milestones) {
        List<GanttTask> epics = tasks.stream().filter(GanttTask::isEpic)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!epics.isEmpty() || !milestones.isEmpty()) {
            groups.add(new GanttGroup("Milestones y épicas", "#6554C0", epics));
        }
        List<GanttTask> stories = tasks.stream().filter(GanttTask::isUserStory)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!stories.isEmpty()) {
            groups.add(new GanttGroup("User Stories", "#2C8FB5", stories));
        }
    }
}
