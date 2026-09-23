package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TaskStackSource;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.StartDateSource;
import com.example.roadmap.gantt.application.usecase.BuildRoleGanttUseCase;
import java.time.LocalDate;
import java.util.List;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TaskStackResolverTest {
    private final TaskStackResolver resolver = TaskStackResolver.defaults();

    @Test
    void localStackHasPriorityOverJiraAndPersonRole() {
        var result = resolver.resolve(TaskStack.FRONTEND, List.of("BE"), Role.BACKEND);

        assertThat(result.stack()).isEqualTo(TaskStack.FRONTEND);
        assertThat(result.source()).isEqualTo(TaskStackSource.LOCAL_PLAN);
        assertThat(result.jira().displayLabel()).isEqualTo("BE");
    }

    @Test
    void jiraLabelWinsWhenThereIsNoLocalStack() {
        var result = resolver.resolve(null, List.of("roadmap", "Mobile"), Role.BACKEND);

        assertThat(result.stack()).isEqualTo(TaskStack.MOBILE);
        assertThat(result.source()).isEqualTo(TaskStackSource.JIRA_LABEL);
    }

    @Test
    void differentRecognizedJiraLabelsAreFlaggedAsAmbiguous() {
        var result = resolver.resolve(null, List.of("BE", "Front End", "backend"), Role.MOBILE);

        assertThat(result.stack()).isEqualTo(TaskStack.AMBIGUOUS);
        assertThat(result.source()).isEqualTo(TaskStackSource.JIRA_LABEL);
        assertThat(result.jira().recognizedLabels()).containsExactly("BE", "Front End", "backend");
    }

    @Test
    void personRoleIsTheFinalFallback() {
        var result = resolver.resolve(null, List.of("roadmap", "urgent"), Role.DEVOPS);

        assertThat(result.stack()).isEqualTo(TaskStack.DEVOPS);
        assertThat(result.source()).isEqualTo(TaskStackSource.PERSON_ROLE);
    }

    @Test
    void productAndQualityRolesHaveTheirOwnStacks() {
        assertThat(resolver.resolve(null, List.of(), Role.PO).stack()).isEqualTo(TaskStack.PO);
        assertThat(resolver.resolve(null, List.of(), Role.SQC).stack()).isEqualTo(TaskStack.SQC);
        assertThat(resolver.classifyJira(List.of("product owner")).stack()).isEqualTo(TaskStack.PO);
        assertThat(resolver.classifyJira(List.of("quality control")).stack()).isEqualTo(TaskStack.SQC);
    }

    @Test
    void missingEverySourceRemainsUnclassified() {
        var result = resolver.resolve(null, List.of(), null);

        assertThat(result.stack()).isEqualTo(TaskStack.UNCLASSIFIED);
        assertThat(result.source()).isEqualTo(TaskStackSource.NONE);
    }

    @Test
    void roleRoadmapGroupsByEffectiveTaskStackInsteadOfAssigneeRole() {
        var assignee = GanttTeamRoster.defaults().members().getFirst();
        var date = LocalDate.now();
        var task = GanttTask.create("T-1", "Frontend work", "Task", assignee,
                date, date, StartDateSource.LOCAL_PLAN, 1, "Open", date,
                ignored -> false, null, 0, TaskStack.FRONTEND, TaskStackSource.JIRA_LABEL);

        var chart = new BuildRoleGanttUseCase(null).build(List.of(task), List.of());

        assertThat(assignee.role()).isEqualTo(Role.MOBILE);
        assertThat(chart.groups()).singleElement().satisfies(group -> {
            assertThat(group.label()).isEqualTo("Front");
            assertThat(group.tasks()).containsExactly(task);
        });
    }

    @Test
    void roleRoadmapIncludesProductAndQualityStacks() {
        var po = GanttTeamRoster.defaults().byUsername("lthomas");
        var sqc = GanttTeamRoster.defaults().byUsername("hclark");
        var date = LocalDate.now();
        var poTask = GanttTask.create("PO-1", "Product planning", "Task", po,
                date, date, StartDateSource.LOCAL_PLAN, 1, "Open", date,
                ignored -> false, null, 0, TaskStack.PO, TaskStackSource.PERSON_ROLE);
        var sqcTask = GanttTask.create("SQC-1", "Quality validation", "Task", sqc,
                date, date, StartDateSource.LOCAL_PLAN, 1, "Open", date,
                ignored -> false, null, 0, TaskStack.SQC, TaskStackSource.PERSON_ROLE);

        var chart = new BuildRoleGanttUseCase(null).build(List.of(poTask, sqcTask), List.of());

        assertThat(chart.groups()).extracting(group -> group.label())
                .containsExactly("PO", "SQC");
    }
}
