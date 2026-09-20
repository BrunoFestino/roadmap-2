package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.*;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;
import java.util.List;
import java.util.Map;

import static com.example.roadmap.gantt.WorkloadRegressionTest.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class EffortPolicyTest {
    private JiraIssueDto.Fields fields(String type, Integer estimate, Integer logged) {
        return new JiraIssueDto.Fields("Estimate policy", new JiraIssueDto.IssueType(type),
                new JiraIssueDto.TimeTracking(estimate, logged),
                new JiraIssueDto.User(PERSON.name(), PERSON.username(), null), new JiraIssueDto.Status("Open"),
                new JiraIssueDto.Parent("PARENT"), null, null, List.of(),
                customFields("99", "2026-09-14"));
    }

    @Test void tasksUseOnlyOriginalEstimateAndKeepDecimals() {
        assertThat(EffortEstimates.resolve(fields("Task", 63360, 0), 7.0)).isEqualTo(2.2);
        assertThat(EffortEstimates.resolve(fields("Task", null, 0), 7.0)).isNull();
        assertThat(EffortEstimates.resolve(fields("Task", 0, 0), 7.0)).isNull();
    }

    @Test void subtasksUseOnlyPositiveLocalEffort() {
        var subtask = fields("Sub-task", 288000, 3600);
        assertThat(EffortEstimates.jiraMd(subtask)).isNull();
        assertThat(EffortEstimates.resolve(subtask, 1.25)).isEqualTo(1.25);
        for (Double value : new Double[]{null, 0.0, -1.0, Double.NaN, Double.POSITIVE_INFINITY}) {
            assertThat(EffortEstimates.resolve(subtask, value)).isNull();
        }
    }

    @Test void closedConsumptionKeepsActualWorklogsButNeverUsesOriginalEstimate() {
        assertThat(EffortEstimates.completedSubtaskMd(fields("Sub-task", 288000, 14400), 2.0)).isEqualTo(0.5);
        assertThat(EffortEstimates.completedSubtaskMd(fields("Sub-task", 288000, 0), 2.0)).isEqualTo(2.0);
        assertThat(EffortEstimates.completedSubtaskMd(fields("Sub-task", 288000, 0), null)).isZero();
    }

    @Test void providerAndAttentionListUseTheSameExclusiveSources() {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        var day = LocalDate.of(2026, 9, 14);
        when(schedules.findSchedules()).thenReturn(Map.of(
                "SUB-LOCAL", new TargetStartRepository.Schedule(day, day.plusDays(4), 1.25),
                "TASK-LOCAL", new TargetStartRepository.Schedule(day, day.plusDays(4), 7.0)));
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(
                new JiraIssueDto("SUB-LOCAL", fields("Sub-task", 288000, 0)),
                new JiraIssueDto("SUB-JIRA", fields("Sub-task", 288000, 0)),
                new JiraIssueDto("TASK-LOCAL", fields("Task", null, 0)),
                new JiraIssueDto("TASK-JIRA", fields("Task", 63360, 0)))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var snapshot = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());
        assertThat(snapshot.tasks()).extracting(GanttTask::key).containsExactly("SUB-LOCAL", "TASK-JIRA");
        assertThat(snapshot.tasks()).extracting(GanttTask::md).containsExactly(1.25, 2.2);
        assertThat(snapshot.unplannedTasks()).extracting(UnplannedTask::taskKey)
                .containsExactly("SUB-JIRA", "TASK-LOCAL");
    }

    @Test void trafficLightsHaveStrictDailyAndWeeklyBoundaries() {
        for (double days : new double[]{1, 3, 5, 10}) {
            assertThat(LoadSignal.of(6 * days, 6 * days, 6)).isEqualTo(LoadSignal.GREEN);
            assertThat(LoadSignal.of(6 * days + .01, 6 * days, 6)).isEqualTo(LoadSignal.YELLOW);
            assertThat(LoadSignal.of(8 * days, 6 * days, 6)).isEqualTo(LoadSignal.YELLOW);
            assertThat(LoadSignal.of(8 * days + .01, 6 * days, 6)).isEqualTo(LoadSignal.RED);
        }
        assertThat(LoadSignal.of(0, 0, 6)).isEqualTo(LoadSignal.UNAVAILABLE);
    }

    @Test void histogramBandsConserveHoursAndDoNotIncreaseAvailableCapacity() {
        var week = new WeekLoad(FRIDAY, FRIDAY.plusDays(6), 44, 30, 44.0 / 30 * 100,
                5, 30, 44, 0, List.of());
        assertThat(week.warningBandHours()).isEqualTo(10);
        assertThat(week.criticalOverflowHours()).isEqualTo(4);
        assertThat(week.warningBandHours() + week.criticalOverflowHours() + week.capacityHours()).isEqualTo(44);
        assertThat(week.freeHours()).isZero();
        assertThat(week.loadSignal()).isEqualTo(LoadSignal.RED);
    }

    @Test void onlyUnestimatedSubtasksShareTheRemainingParentBudget() {
        var entries = List.of(new SubtaskBudget.Entry("P", null, "Task", 10.0),
                new SubtaskBudget.Entry("A", "P", "Sub-task", 3.0),
                new SubtaskBudget.Entry("B", "P", "Sub-task", null),
                new SubtaskBudget.Entry("C", "P", "Sub-task", null));
        var budget = SubtaskBudget.allocate(entries, Map.of());
        assertThat(budget.effectiveMd()).containsEntry("P", 0.0).containsEntry("A", 3.0)
                .containsEntry("B", 3.5).containsEntry("C", 3.5);
        assertThat(budget.inheritedKeys()).containsExactlyInAnyOrder("B", "C");
        var consumed = SubtaskBudget.allocate(entries, Map.of("P", 2.0));
        assertThat(consumed.effectiveMd()).containsEntry("A", 3.0).containsEntry("B", 2.5).containsEntry("C", 2.5);
    }

    @Test void overrunPreservesExplicitEffortButLeavesNoInheritedShare() {
        var entries = List.of(new SubtaskBudget.Entry("P", null, "Task", 10.0),
                new SubtaskBudget.Entry("A", "P", "Sub-task", 8.0),
                new SubtaskBudget.Entry("B", "P", "Sub-task", 5.0),
                new SubtaskBudget.Entry("C", "P", "Sub-task", null));
        var budget = SubtaskBudget.allocate(entries, Map.of());
        assertThat(budget.effectiveMd()).containsEntry("P", 0.0).containsEntry("A", 8.0)
                .containsEntry("B", 5.0).containsEntry("C", 0.0);
        assertThat(budget.overrunsMd()).containsEntry("P", 3.0);
    }

    @Test void providerMakesInheritedEffortVisibleAndWorkloadUsesItOnce() {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        var day = LocalDate.of(2026, 9, 14);
        when(schedules.findSchedules()).thenReturn(Map.of(
                "A", new TargetStartRepository.Schedule(day, day.plusDays(11), 3.0),
                "B", new TargetStartRepository.Schedule(day, day.plusDays(11), null),
                "C", new TargetStartRepository.Schedule(day, day.plusDays(11), null),
                "PARENT", new TargetStartRepository.Schedule(day, day.plusDays(11), null)));
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(
                new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                new JiraIssueDto("A", fields("Sub-task", 288000, 0)),
                new JiraIssueDto("B", fields("Sub-task", 288000, 0)),
                new JiraIssueDto("C", fields("Sub-task", 288000, 0)))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var snapshot = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());
        assertThat(snapshot.tasks()).extracting(GanttTask::md).containsExactly(10.0, 3.0, 3.5, 3.5);
        assertThat(snapshot.tasks()).filteredOn(GanttTask::inheritedEffort).extracting(GanttTask::key).containsExactly("B", "C");
        assertThat(snapshot.unplannedTasks()).isEmpty();
        var result = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER).build(snapshot, day);
        assertThat(person(result).totalAssignedHours()).isCloseTo(80, within(1e-6));
        assertThat(person(result).weeks().stream().flatMap(week -> week.tasks().stream()))
                .extracting(TaskLoad::taskKey).doesNotContain("PARENT");
        verify(schedules, never()).saveSchedule(anyString(), any(), any(), any(), any());
    }

    @Test void allUnestimatedSubtasksShareEquallyAndAllEstimatedOnesLeaveTheParentRemainder() {
        var parent = new SubtaskBudget.Entry("P", null, "Task", 10.0);
        var shared = SubtaskBudget.allocate(List.of(parent,
                new SubtaskBudget.Entry("A", "P", "Sub-task", null),
                new SubtaskBudget.Entry("B", "P", "Sub-task", null)), Map.of());
        assertThat(shared.effectiveMd()).containsEntry("P", 0.0).containsEntry("A", 5.0).containsEntry("B", 5.0);
        var explicit = SubtaskBudget.allocate(List.of(parent,
                new SubtaskBudget.Entry("A", "P", "Sub-task", 3.0),
                new SubtaskBudget.Entry("B", "P", "Sub-task", 4.0)), Map.of("P", 2.0));
        assertThat(explicit.effectiveMd()).containsEntry("P", 1.0).containsEntry("A", 3.0).containsEntry("B", 4.0);
    }

    @Test void missingOrContextParentDoesNotInventAnInheritedEstimate() {
        for (String type : List.of("User Story", "Epic", "Task")) {
            var parent = new SubtaskBudget.Entry("P", null, type, type.equals("Task") ? null : 10.0);
            var budget = SubtaskBudget.allocate(List.of(parent,
                    new SubtaskBudget.Entry("A", "P", "Sub-task", null)), Map.of());
            assertThat(budget.effectiveMd()).doesNotContainKey("A");
            assertThat(budget.inheritedKeys()).isEmpty();
        }
    }

    @Test void undatedSubtaskKeepsItsReservationWithoutAddingDatedWorkload() {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        var day = LocalDate.of(2026, 9, 14);
        when(schedules.findSchedules()).thenReturn(Map.of());
        var missingDate = new JiraIssueDto.Fields("Undated subtask", new JiraIssueDto.IssueType("Sub-task"),
                new JiraIssueDto.TimeTracking(288000, 0),
                new JiraIssueDto.User(PERSON.name(), PERSON.username(), null), new JiraIssueDto.Status("Open"),
                new JiraIssueDto.Parent("PARENT"), null, null, List.of(), Map.of());
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(
                new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                new JiraIssueDto("UNDATED", missingDate), new JiraIssueDto("DATED", fields("Sub-task", null, 0)))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var snapshot = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());
        assertThat(snapshot.unplannedTasks()).filteredOn(task -> task.taskKey().equals("UNDATED"))
                .singleElement().extracting(UnplannedTask::reason).isEqualTo(UnplannedReason.NO_DATE);
        var result = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER).build(snapshot, day);
        assertThat(person(result).totalAssignedHours()).isCloseTo(40, within(1e-6));
        assertThat(snapshot.subtaskBudget().effectiveMd()).containsEntry("UNDATED", 5.0).containsEntry("DATED", 5.0);
    }
}
