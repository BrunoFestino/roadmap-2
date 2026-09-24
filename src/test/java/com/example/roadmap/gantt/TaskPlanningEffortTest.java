package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.data.TargetStartRepository;
import com.example.roadmap.gantt.application.data.TeamAbsenceRepository;
import com.example.roadmap.gantt.ui.TaskPlanningView;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.JiraIssueLoader;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.UI;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.datepicker.DatePicker;
import com.vaadin.flow.component.grid.Grid;
import com.vaadin.flow.component.textfield.NumberField;
import org.junit.jupiter.api.Test;

import java.util.List;
import java.time.LocalDate;
import java.util.stream.Stream;

import static com.example.roadmap.gantt.WorkloadRegressionTest.*;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.*;

class TaskPlanningEffortTest {
    @Test void savingUpdatesLocalDatesAndSelectionWithoutFetchingJiraAgain() {
        var jira = mock(JiraClient.class);
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList()))
                .thenReturn(new JiraSearchResponseDto(List.of(issue("TASK-1", "2026-09-14", "2"))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var schedules = mock(TargetStartRepository.class);
        var absences = mock(TeamAbsenceRepository.class);
        var ui = new UI();
        UI.setCurrent(ui);
        try {
            var view = new TaskPlanningView(new JiraIssueLoader(jira, Runnable::run), PROPS,
                    schedules, absences, ROSTER, STACK_RESOLVER);
            ui.add(view);
            UI.setCurrent(ui);
            var grid = descendants(view).filter(Grid.class::isInstance).map(Grid.class::cast).findFirst().orElseThrow();
            select(grid, 0);
            var dates = descendants(view).filter(DatePicker.class::isInstance).map(DatePicker.class::cast).toList();
            var start = LocalDate.of(2026, 10, 5);
            var end = LocalDate.of(2026, 10, 9);
            dates.get(0).setValue(start);
            dates.get(1).setValue(end);
            clearInvocations(jira);
            var rowUpdates = new java.util.concurrent.atomic.AtomicInteger();
            var registration = grid.getDataProvider().addDataProviderListener(event -> {
                assertThat(event).isInstanceOf(com.vaadin.flow.data.provider.DataChangeEvent.DataRefreshEvent.class);
                rowUpdates.incrementAndGet();
            });
            descendants(view).filter(Button.class::isInstance).map(Button.class::cast)
                    .filter(button -> button.getText().equals("Save plan")).findFirst().orElseThrow().click();
            registration.remove();
            assertThat(rowUpdates.get()).isEqualTo(1);
            verify(schedules).saveSchedule(eq("TASK-1"), eq(start), eq(end), any());
            verify(absences).findByUsername(PERSON.username());
            verify(absences, never()).findAll();
            verifyNoInteractions(jira);
            assertThat(grid.getSelectedItems()).hasSize(1);
            assertThat(dates.get(0).getValue()).isEqualTo(start);
            assertThat(dates.get(1).getValue()).isEqualTo(end);
            // Reselecting reads the updated row instead of restoring the old schedule.
            grid.deselectAll();
            select(grid, 0);
            assertThat(dates.get(0).getValue()).isEqualTo(start);
            assertThat(dates.get(1).getValue()).isEqualTo(end);
        } finally {
            UI.setCurrent(null);
        }
    }

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
        var view = new TaskPlanningView(new JiraIssueLoader(jira, Runnable::run), PROPS, schedules, mock(TeamAbsenceRepository.class),
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
