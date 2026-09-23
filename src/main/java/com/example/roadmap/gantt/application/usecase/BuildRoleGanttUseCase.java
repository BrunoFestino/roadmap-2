package com.example.roadmap.gantt.application.usecase;

import com.example.roadmap.gantt.application.data.GanttDataProvider;
import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.TaskStack;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Builds the roadmap grouped by each task's effective stack. The assignee role is only the
 * final fallback already captured in {@link GanttTask#stack()}, never an assignment rule.
 */
@Service
public class BuildRoleGanttUseCase {

    private static final List<TaskStack> STACKS = List.of(TaskStack.FRONTEND, TaskStack.BACKEND,
            TaskStack.MOBILE, TaskStack.DEVOPS, TaskStack.PO, TaskStack.SQC,
            TaskStack.AMBIGUOUS, TaskStack.UNCLASSIFIED);

    private final GanttDataProvider dataProvider;

    public BuildRoleGanttUseCase(GanttDataProvider dataProvider) {
        this.dataProvider = dataProvider;
    }

    public GanttChart build() {
        return build(dataProvider.tasks(), dataProvider.milestones());
    }

    public GanttChart build(List<GanttTask> input, List<Milestone> milestones) {
        List<GanttTask> tasks = GanttBounds.withinWindow(input);
        List<GanttGroup> groups = new ArrayList<>();
        addContextGroups(groups, tasks, milestones);

        for (TaskStack stack : STACKS) {
            List<GanttTask> stackTasks = tasks.stream()
                    .filter(task -> !task.isContextWork())
                    .filter(task -> task.stack() == stack)
                    .sorted(Comparator.comparing(GanttTask::start))
                    .toList();
            if (stackTasks.isEmpty()) {
                continue;
            }
            groups.add(new GanttGroup(stack.label(), stack.color(), stackTasks));
        }

        LocalDate start = GanttBounds.min(tasks);
        LocalDate end = GanttBounds.max(tasks);
        return new GanttChart(start, end, groups, milestones);
    }

    private void addContextGroups(List<GanttGroup> groups, List<GanttTask> tasks, List<Milestone> milestones) {
        List<GanttTask> epics = tasks.stream().filter(GanttTask::isEpic)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!epics.isEmpty() || !milestones.isEmpty()) {
            groups.add(new GanttGroup("Milestones and epics", "#6554C0", epics));
        }
        List<GanttTask> stories = tasks.stream().filter(GanttTask::isUserStory)
                .sorted(Comparator.comparing(GanttTask::start)).toList();
        if (!stories.isEmpty()) {
            groups.add(new GanttGroup("Stories", "#2C8FB5", stories));
        }
    }
}
