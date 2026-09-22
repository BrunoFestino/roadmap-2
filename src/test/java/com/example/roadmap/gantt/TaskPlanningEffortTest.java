package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.data.TargetStartRepository;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.ui.TaskPlanningView;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.textfield.NumberField;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.util.stream.Stream;

import static com.example.roadmap.gantt.WorkloadRegressionTest.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class TaskPlanningEffortTest {
    @Test void planningDisplaysJiraSourcesReadOnlyAndExcludesParents() {
        var jira = mock(JiraClient.class);
        var task = issue("TASK", "2026-09-14", "2.2");
        var done = issue("DONE", "2026-09-14", "4");
        done.fields().setStatus(new JiraIssueDto.Status("Done"));
        var parent = issue("PARENT", "2026-09-14", "99");
        var child = issue("CHILD", "2026-09-14", "1.25");
        child.fields().setIssuetype(new JiraIssueDto.IssueType("Technical subtask", true));
        child.fields().setParent(new JiraIssueDto.Parent("PARENT"));
        var epic = issue("EPIC", "2026-09-14", "99");
        epic.fields().setIssuetype(new JiraIssueDto.IssueType("Epic"));
        epic.fields().setAdditionalField(PROPS.fieldEffortEstimate(), "12.5");
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList()))
                .thenReturn(new JiraSearchResponseDto(List.of(parent, child, task, done)));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of(epic)));
        var schedules = mock(TargetStartRepository.class);
        var view = new TaskPlanningView(jira, PROPS, schedules, mock(TeamAbsenceRepository.class),
                ROSTER, STACK_RESOLVER);
        Grid<?> grid = descendants(view).filter(Grid.class::isInstance).map(Grid.class::cast).findFirst().orElseThrow();
        var estimate = descendants(view).filter(NumberField.class::isInstance)
                .map(NumberField.class::cast).findFirst().orElseThrow();
        assertThat(grid.getListDataView().getItemCount()).isEqualTo(3);
        assertThat(estimate.isReadOnly()).isTrue();
        select(grid, 0); // Epic, then Task, then Subtask in the planning list.
        assertThat(estimate.getValue()).isEqualTo(12.5);
        assertThat(estimate.getHelperText()).contains("Jira MD field");
        select(grid, 1);
        assertThat(estimate.getValue()).isEqualTo(2.2);
        assertThat(estimate.getHelperText()).contains("Time Tracking Original Estimate");
        select(grid, 2);
        assertThat(estimate.getValue()).isEqualTo(1.25);
        assertThat(estimate.getHelperText()).contains("Time Tracking Original Estimate");
        assertThat(estimate.isReadOnly()).isTrue();
        verify(schedules, never()).saveSchedule(anyString(), any(), any(), any());
    }

    private static <T> void select(Grid<T> grid, int index) {
        grid.select(grid.getListDataView().getItem(index));
    }

    private static Stream<Component> descendants(Component component) {
        return Stream.concat(Stream.of(component), component.getChildren().flatMap(TaskPlanningEffortTest::descendants));
    }
}
