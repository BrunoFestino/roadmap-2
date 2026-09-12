package com.example.roadmap.gantt.application.usecase;

import com.example.roadmap.gantt.application.data.GanttDataProvider;
import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.Role;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;
import org.springframework.stereotype.Service;

/**
 * Builds the "Roadmap Gantt - View by Role": one group per role bucket present, holding
 * that bucket's tasks ordered by planned start date. {@code FULL_STACK} members fold into
 * {@code BACKEND} here (see {@link Role#bucket()}); the "By person" view still shows their
 * real role.
 */
@Service
public class BuildRoleGanttUseCase {

    private static final List<Role> BUCKETS = List.of(Role.BACKEND, Role.FRONTEND, Role.MOBILE, Role.DEVOPS);

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

        for (Role bucket : BUCKETS) {
            List<GanttTask> bucketTasks = tasks.stream()
                    .filter(task -> !task.isContextWork())
                    .filter(t -> t.assignee().role().bucket() == bucket)
                    .sorted(Comparator.comparing(GanttTask::start))
                    .toList();
            if (bucketTasks.isEmpty()) {
                continue;
            }
            groups.add(new GanttGroup(bucket.label(), bucket.color(), bucketTasks));
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