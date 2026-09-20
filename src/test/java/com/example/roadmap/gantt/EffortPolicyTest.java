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


    private RoadmapSnapshot snapshot(List<JiraIssueDto> issues, Map<String, TargetStartRepository.Schedule> local) {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        when(schedules.findSchedules()).thenReturn(local);
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(issues));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var result = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());
        verify(schedules, never()).saveSchedule(anyString(), any(), any(), any(), any());
        return result;
    }

    @Test void onlyLocalChildEffortCountsAndStandaloneTasksKeepTheirOwnEstimate() {
        var day = LocalDate.of(2026, 9, 14);
        for (int parentSeconds : new int[]{0, 28800, 2880000}) {
            var data = snapshot(List.of(
                    new JiraIssueDto("PARENT", fields("Task", parentSeconds, 288000)),
                    new JiraIssueDto("A", fields("Sub-task", 288000, 0)),
                    new JiraIssueDto("B", fields("Sub-task", 288000, 0)),
                    new JiraIssueDto("C", fields("Sub-task", 288000, 0)),
                    new JiraIssueDto("SINGLE", fields("Task", 57600, 0))), Map.of(
                    "A", new TargetStartRepository.Schedule(day, day.plusDays(11), 3.0),
                    "SINGLE", new TargetStartRepository.Schedule(day, day.plusDays(11), 99.0)));
            assertThat(data.tasks()).extracting(GanttTask::key).containsExactly("A", "SINGLE");
            assertThat(data.tasks()).extracting(GanttTask::md).containsExactly(3.0, 2.0);
            assertThat(data.unplannedTasks()).extracting(UnplannedTask::taskKey).containsExactly("B", "C");
            assertThat(data.unplannedTasks()).allMatch(t -> t.reason() == UnplannedReason.NO_ESTIMATE);
            var result = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER).build(data, day);
            assertThat(person(result).totalAssignedHours()).isCloseTo(40, within(1e-6));
            assertThat(result.warnings()).isEmpty();
        }
    }

    @Test void unestimatedAndUndatedSubtasksNeverReviveTheParent() {
        var child = fields("Sub-task", 288000, 0);
        child.setAdditionalField(PROPS.fieldTargetStart(), null);
        for (Double estimate : new Double[]{null, 0.0, -1.0, 3.0}) {
            var data = snapshot(List.of(new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                    new JiraIssueDto("CHILD", child)), Map.of(
                    "CHILD", new TargetStartRepository.Schedule(null, null, estimate)));
            assertThat(data.tasks()).isEmpty();
            assertThat(data.unplannedTasks()).singleElement().satisfies(task -> {
                assertThat(task.taskKey()).isEqualTo("CHILD");
                assertThat(task.reason()).isEqualTo(estimate != null && estimate > 0
                        ? UnplannedReason.NO_DATE : UnplannedReason.NO_ESTIMATE);
            });
        }
    }

    @Test void subtasksOutsideTheTeamStillExcludeTheirParent() {
        var parent = fields("Task", 288000, 0);
        parent.setSubtasks(List.of(new JiraIssueDto.Parent("OUTSIDE")));
        var data = snapshot(List.of(new JiraIssueDto("PARENT", parent)), Map.of());
        assertThat(data.tasks()).isEmpty();
        assertThat(data.unplannedTasks()).isEmpty();
        assertThat(data.parentTaskKeys()).containsExactly("PARENT");
    }

    @Test void closedSubtaskWithoutEffortStillExcludesTheParent() {
        for (String status : List.of("Done", "Cancelled", "Resolved", "Closed", "Obsolete")) {
            var child = fields("Sub-task", null, 0);
            child.setStatus(new JiraIssueDto.Status(status));
            var data = snapshot(List.of(new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                    new JiraIssueDto("CHILD", child)), Map.of());
            assertThat(data.tasks()).isEmpty();
            assertThat(data.unplannedTasks()).isEmpty();
        }
    }

    @Test void customJiraSubtaskTypesUseLocalEffortAndExcludeParents() {
        var child = fields("Technical subtask", 288000, 0);
        child.setIssuetype(new JiraIssueDto.IssueType("Technical subtask", true));
        var day = LocalDate.of(2026, 9, 14);
        var data = snapshot(List.of(new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                new JiraIssueDto("CHILD", child)), Map.of(
                "CHILD", new TargetStartRepository.Schedule(day, day.plusDays(4), 1.25)));
        assertThat(data.tasks()).singleElement().satisfies(task -> {
            assertThat(task.key()).isEqualTo("CHILD");
            assertThat(task.md()).isEqualTo(1.25);
        });
    }
}
