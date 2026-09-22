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
        assertThat(EffortEstimates.jiraMd(fields("Task", 63360, 0))).isEqualTo(2.2);
        assertThat(EffortEstimates.jiraMd(fields("Task", null, 0))).isNull();
        assertThat(EffortEstimates.jiraMd(fields("Task", 0, 0))).isNull();
    }

    @Test void subtasksUseOnlyPositiveOriginalEstimateAndKeepDecimals() {
        assertThat(EffortEstimates.jiraMd(fields("Sub-task", 36000, 3600))).isEqualTo(1.25);
        for (Integer value : new Integer[]{null, 0, -1}) {
            assertThat(EffortEstimates.jiraMd(fields("Sub-task", value, 3600))).isNull();
        }
        var missingTracking = fields("Sub-task", null, 0);
        missingTracking.setTimetracking(null);
        assertThat(EffortEstimates.jiraMd(missingTracking)).isNull();
    }

    @Test void epicsUseOnlyTheConfiguredMdField() {
        var epic = fields("Epic", 288000, 3600);
        String configuredField = "customfield_9123";
        assertThat(EffortEstimates.epicMd(epic, configuredField)).isNull();
        epic.setAdditionalField(configuredField, 12.5);
        assertThat(EffortEstimates.epicMd(epic, configuredField)).isEqualTo(12.5);
        epic.setAdditionalField(configuredField, " 1.125 ");
        assertThat(EffortEstimates.epicMd(epic, configuredField)).isEqualTo(1.125);
        for (Object value : new Object[]{null, "", " ", 0, -1, "NaN", "Infinity", "invalid"}) {
            epic.setAdditionalField(configuredField, value);
            assertThat(EffortEstimates.epicMd(epic, configuredField)).isNull();
        }
    }

    @Test void providerAndAttentionListUseTheSameExclusiveSources() {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        var day = LocalDate.of(2026, 9, 14);
        when(schedules.findSchedules()).thenReturn(Map.of(
                "SUB-PLANNED", new TargetStartRepository.Schedule(day, day.plusDays(4), null),
                "TASK-PLANNED", new TargetStartRepository.Schedule(day, day.plusDays(4), null)));
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(
                new JiraIssueDto("SUB-PLANNED", fields("Sub-task", 36000, 0)),
                new JiraIssueDto("SUB-JIRA", fields("Sub-task", 288000, 0)),
                new JiraIssueDto("SUB-MISSING", fields("Sub-task", null, 0)),
                new JiraIssueDto("TASK-PLANNED", fields("Task", null, 0)),
                new JiraIssueDto("TASK-JIRA", fields("Task", 63360, 0)))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var snapshot = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());
        assertThat(snapshot.tasks()).extracting(GanttTask::key).containsExactly("SUB-PLANNED", "SUB-JIRA", "TASK-JIRA");
        assertThat(snapshot.tasks()).extracting(GanttTask::md).containsExactly(1.25, 10.0, 2.2);
        assertThat(snapshot.unplannedTasks()).extracting(UnplannedTask::taskKey)
                .containsExactly("SUB-MISSING", "TASK-PLANNED");
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
        verify(schedules, never()).saveSchedule(anyString(), any(), any(), any());
        return result;
    }

    @Test void onlyJiraChildEffortCountsAndStandaloneTasksKeepTheirOwnEstimate() {
        var day = LocalDate.of(2026, 9, 14);
        for (int parentSeconds : new int[]{0, 28800, 2880000}) {
            var data = snapshot(List.of(
                    new JiraIssueDto("PARENT", fields("Task", parentSeconds, 288000)),
                    new JiraIssueDto("A", fields("Sub-task", 86400, 0)),
                    new JiraIssueDto("B", fields("Sub-task", null, 0)),
                    new JiraIssueDto("C", fields("Sub-task", 0, 0)),
                    new JiraIssueDto("SINGLE", fields("Task", 57600, 0))), Map.of(
                    "A", new TargetStartRepository.Schedule(day, day.plusDays(11), null),
                    "SINGLE", new TargetStartRepository.Schedule(day, day.plusDays(11), null)));
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
        var child = fields("Sub-task", null, 0);
        child.setAdditionalField(PROPS.fieldTargetStart(), null);
        for (Integer estimate : new Integer[]{null, 0, -1, 86400}) {
            child.setTimetracking(new JiraIssueDto.TimeTracking(estimate, 0));
            var data = snapshot(List.of(new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                    new JiraIssueDto("CHILD", child)), Map.of(
                    "CHILD", new TargetStartRepository.Schedule(null, null, null)));
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

    @Test void customJiraSubtaskTypesUseTimeTrackingAndExcludeParents() {
        var child = fields("Technical subtask", 36000, 0);
        child.setIssuetype(new JiraIssueDto.IssueType("Technical subtask", true));
        var day = LocalDate.of(2026, 9, 14);
        var data = snapshot(List.of(new JiraIssueDto("PARENT", fields("Task", 288000, 0)),
                new JiraIssueDto("CHILD", child)), Map.of(
                "CHILD", new TargetStartRepository.Schedule(day, day.plusDays(4), null)));
        assertThat(data.tasks()).singleElement().satisfies(task -> {
            assertThat(task.key()).isEqualTo("CHILD");
            assertThat(task.md()).isEqualTo(1.25);
        });
    }

    @Test void allChildEstimatesAreSummedAndWorklogsReduceOnlyTheirOwnRemainingWork() {
        var day = LocalDate.of(2026, 9, 14);
        var data = snapshot(List.of(
                new JiraIssueDto("PARENT", fields("Task", 2880000, 2880000)),
                new JiraIssueDto("A", fields("Sub-task", 86400, 14400)),
                new JiraIssueDto("B", fields("Sub-task", 115200, 3600))), Map.of(
                "A", new TargetStartRepository.Schedule(day, day.plusDays(11), null),
                "B", new TargetStartRepository.Schedule(day, day.plusDays(11), null)));
        assertThat(data.tasks()).extracting(GanttTask::key).containsExactly("A", "B");
        assertThat(data.tasks().stream().mapToDouble(GanttTask::md).sum()).isEqualTo(7);
        assertThat(data.tasks()).extracting(GanttTask::remainingWorkHours).containsExactly(20.0, 31.0);
        var report = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER).build(data, day);
        assertThat(person(report).totalAssignedHours()).isCloseTo(56, within(1e-6));
    }

    @Test void providerKeepsEpicMdWithoutAddingItToPersonWorkload() {
        var jira = mock(JiraClient.class);
        var epic = fields("Epic", 288000, 0);
        epic.setAssignee(null);
        epic.setDuedate("2026-09-25");
        epic.setAdditionalField(PROPS.fieldEffortEstimate(), "12.5");
        var noEstimate = fields("Epic", 288000, 0);
        noEstimate.setDuedate("2026-09-25");
        noEstimate.setAdditionalField(PROPS.fieldEffortEstimate(), null);
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(
                new JiraSearchResponseDto(List.of(new JiraIssueDto("TASK", fields("Task", 57600, 0)))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of(
                new JiraIssueDto("EPIC", epic), new JiraIssueDto("EPIC-MISSING", noEstimate))));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var data = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                mock(TargetStartRepository.class), ROSTER, STACK_RESOLVER).snapshot(List.of());
        assertThat(data.tasks()).extracting(GanttTask::md).containsExactly(2.0, 12.5, 0.0);
        var report = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER)
                .build(data, LocalDate.of(2026, 9, 14));
        assertThat(person(report).totalAssignedHours()).isCloseTo(16, within(1e-6));
    }

    @Test void prjTaskIsTakenFromTheTaskThenParentThenEpicOrLeftEmpty() {
        var jira = mock(JiraClient.class);
        var parent = issueWithPrjTask("PARENT", "Task", "PARENT", List.of("PRJtask-parent"));
        parent.fields().setSubtasks(List.of(new JiraIssueDto.Parent("CHILD-PARENT")));
        var childFromParent = issueWithPrjTask("CHILD-PARENT", "Sub-task", "PARENT", List.of());
        var own = issueWithPrjTask("OWN", "Task", null, List.of("PRJtask-own"));
        var childFromEpic = issueWithPrjTask("CHILD-EPIC", "Task", null, List.of());
        childFromEpic.fields().setAdditionalField(PROPS.fieldEpicLink(), "EPIC");
        var none = issueWithPrjTask("NONE", "Task", null, List.of());
        var epic = issueWithPrjTask("EPIC", "Epic", null, List.of("PRJtask-epic"));
        epic.fields().setDuedate("2026-09-25");
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(
                new JiraSearchResponseDto(List.of(parent, childFromParent, own, childFromEpic, none)));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of(epic)));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var schedules = mock(TargetStartRepository.class);
        when(schedules.findSchedules()).thenReturn(Map.of());

        var snapshot = new JiraGanttDataProvider(jira, PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());

        assertThat(snapshot.tasks()).filteredOn(task -> !task.isEpic())
                .extracting(GanttTask::key, GanttTask::prjTaskLabels)
                .containsExactly(
                        tuple("CHILD-PARENT", List.of("PRJtask-parent")),
                        tuple("OWN", List.of("PRJtask-own")),
                        tuple("CHILD-EPIC", List.of("PRJtask-epic")),
                        tuple("NONE", List.of()));
    }

    private JiraIssueDto issueWithPrjTask(String key, String type, String parentKey, List<String> labels) {
        var fields = fields(type, 28800, 0);
        fields.setSummary(key);
        fields.setParent(parentKey == null ? null : new JiraIssueDto.Parent(parentKey));
        fields.setLabels(labels);
        return new JiraIssueDto(key, fields);
    }
}
