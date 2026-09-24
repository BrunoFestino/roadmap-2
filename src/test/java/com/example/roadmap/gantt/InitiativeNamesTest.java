package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.JiraIssueLoader;
import com.example.roadmap.jira.dto.*;
import java.util.List;
import java.util.Map;
import org.junit.jupiter.api.Test;
import static com.example.roadmap.gantt.WorkloadRegressionTest.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class InitiativeNamesTest {
    @Test void namesSurviveMissingEpicDatesAndClosedInitiativesAreLookedUpOnce() {
        var jira = mock(JiraClient.class);
        var schedules = mock(TargetStartRepository.class);
        var start = java.time.LocalDate.of(2026, 9, 14);
        when(schedules.findSchedules()).thenReturn(Map.of(
                "TASK-1", new TargetStartRepository.Schedule(start, start.plusDays(4), null),
                "TASK-2", new TargetStartRepository.Schedule(start, start.plusDays(4), null),
                "TASK-3", new TargetStartRepository.Schedule(start, start.plusDays(4), null)));
        var first = issue("TASK-1", "2026-09-14", "2");
        first.fields().setAdditionalField(PROPS.fieldEpicLink(), "EPIC-1");
        var second = issue("TASK-2", "2026-09-14", "3");
        second.fields().setAdditionalField(PROPS.fieldEpicLink(), "EPIC-2");
        var third = issue("TASK-3", "2026-09-14", "1");
        third.fields().setAdditionalField(PROPS.fieldEpicLink(), "EPIC-2");
        var undated = issue("EPIC-1", null, "1");
        undated.fields().setIssuetype(new JiraIssueDto.IssueType("Epic"));
        undated.fields().setSummary("Undated initiative");
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList()))
                .thenReturn(new JiraSearchResponseDto(List.of(first, second, third)));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of(undated)));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.findIssueSummaries(List.of("EPIC-2"))).thenReturn(Map.of("EPIC-2", "Closed initiative"));

        var snapshot = new JiraGanttDataProvider(new JiraIssueLoader(jira, Runnable::run), PROPS, mock(TeamAbsenceRepository.class),
                schedules, ROSTER, STACK_RESOLVER).snapshot(List.of());

        assertThat(snapshot.tasks()).extracting(task -> task.key()).containsExactly("TASK-1", "TASK-2", "TASK-3");
        assertThat(snapshot.issueSummaries()).containsEntry("EPIC-1", "Undated initiative")
                .containsEntry("EPIC-2", "Closed initiative");
        verify(jira).findIssueSummaries(List.of("EPIC-2"));
    }
}
