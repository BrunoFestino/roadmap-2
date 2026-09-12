package com.example.roadmap.gantt;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.*;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class WorkloadRegressionTest {
    static final LocalDate FRIDAY = LocalDate.of(2026, 9, 11);
    static final TeamMember PERSON = GanttTeamRoster.members().getFirst();
    static final JiraProperties PROPS = new JiraProperties("http://localhost", "test", "TTAR", null, null);

    static GanttTask task(String key, String start, String end, int md, long logged) {
        LocalDate date = LocalDate.parse(start);
        return GanttTask.create(key, key, "Task", PERSON, date, date, StartDateSource.LOCAL_PLAN,
                md, false, "Open", LocalDate.parse(end), d -> false, null, logged);
    }

    static WorkloadReport report(List<GanttTask> tasks, List<TeamAbsence> absences, LocalDate asOf) {
        return new BuildWorkloadReportUseCase(null, null, PROPS)
                .build(new RoadmapSnapshot(tasks, List.of(), absences, List.of()), asOf);
    }

    static PersonWorkload person(WorkloadReport report) {
        return report.people().stream().filter(p -> p.username().equals(PERSON.username())).findFirst().orElseThrow();
    }

    @Test void remainingHoursAreConservedAcrossDifferentWeeklyDistributions() {
        var flex = task("FLEX", "2026-09-07", "2026-09-18", 3, 0);
        var future = task("FUTURE", "2026-09-14", "2026-09-18", 4, 32 * 3600);
        var person = person(report(List.of(flex, future), List.of(), FRIDAY));
        assertThat(person.weeks().stream().mapToDouble(WeekLoad::remainingAssignedHours).sum()).isCloseTo(24, within(1e-6));
        var next = person.weeks().get(1);
        assertThat(next.remainingAssignedHours()).isPositive();
        assertThat(next.tasks().stream().mapToDouble(TaskLoad::remainingHours).sum()).isCloseTo(next.remainingAssignedHours(), within(1e-6));
    }

    @Test void noFreeDateOnAnExhaustedFriday() {
        var p = person(report(List.of(task("FULL", "2026-09-07", "2026-09-11", 2, 0)), List.of(), FRIDAY));
        assertThat(p.weeks().getFirst().freeHours()).isZero();
        assertThat(p.freeFrom()).isEqualTo(FRIDAY.plusDays(3));
    }

    @Test void freeDateSkipsPersonalAbsencesAndWeekends() {
        var absence = TeamAbsence.create(PERSON.username(), FRIDAY.plusDays(3), FRIDAY.plusDays(4), AbsenceType.VACATION, "");
        assertThat(person(report(List.of(), List.of(absence), FRIDAY.plusDays(1))).freeFrom()).isEqualTo(FRIDAY.plusDays(5));
    }

    @Test void currentDayCanHaveRealRoom() {
        assertThat(person(report(List.of(), List.of(), FRIDAY)).freeFrom()).isEqualTo(FRIDAY);
    }

    @Test void weekendDemandIsRetainedAndWarned() {
        var task = task("WEEKEND", "2026-09-12", "2026-09-13", 1, 0);
        var contour = LevelledContour.remaining(List.of(task), d -> false, FRIDAY);
        assertThat(contour.unallocatedHours(task)).isEqualTo(8);
        var warnings = report(List.of(task), List.of(), FRIDAY).warnings();
        assertThat(warnings).singleElement().satisfies(w -> {
            assertThat(w.remainingHours()).isEqualTo(8);
            assertThat(w.reason()).contains("sin días disponibles");
        });
    }

    @Test void absenceAddedAfterPlanningCannotHideDemand() {
        var task = task("VACATION", "2026-09-14", "2026-09-18", 3, 0);
        var absence = TeamAbsence.create(PERSON.username(), task.start(), task.end(), AbsenceType.VACATION, "");
        assertThat(report(List.of(task), List.of(absence), FRIDAY).warnings()).singleElement()
                .extracting(PlanningWarning::remainingHours).isEqualTo(24.0);
    }

    @Test void overdueWorkIsVisibleWithoutInventingNewDates() {
        var task = task("OVERDUE", "2026-08-17", "2026-08-21", 3, 0);
        var result = report(List.of(task), List.of(), FRIDAY);
        assertThat(result.warnings()).singleElement().satisfies(w -> {
            assertThat(w.reason()).contains("Vencida");
            assertThat(w.remainingHours()).isEqualTo(24);
        });
        assertThat(person(result).totalAssignedHours()).isZero();
        assertThat(task.end()).isEqualTo(LocalDate.of(2026, 8, 21));
    }

    @Test void residualAssignmentFindsTheFourDayFeasiblePlan() {
        var tasks = List.of(task("A", "2026-09-10", "2026-09-11", 1, 0),
                task("B", "2026-09-11", "2026-09-14", 1, 0), task("C", "2026-09-14", "2026-09-15", 1, 0));
        for (var order : List.of(tasks, tasks.reversed())) {
            var contour = LevelledContour.plan(order, d -> false);
            for (var task : tasks) assertThat(contour.hoursIn(task, task.start(), task.end())).isCloseTo(8, within(1e-6));
            for (var day : List.of("2026-09-10", "2026-09-11", "2026-09-14", "2026-09-15")) {
                LocalDate date = LocalDate.parse(day);
                assertThat(tasks.stream().mapToDouble(t -> contour.hoursIn(t, date, date)).sum()).isCloseTo(6, within(1e-6));
            }
        }
    }

    @Test void unavoidableOverloadStillConservesAllEffort() {
        var tasks = List.of(task("A", "2026-09-11", "2026-09-11", 2, 0), task("B", "2026-09-11", "2026-09-11", 1, 0));
        var contour = LevelledContour.plan(tasks, d -> false);
        assertThat(tasks.stream().mapToDouble(t -> contour.hoursIn(t, FRIDAY, FRIDAY)).sum()).isCloseTo(24, within(1e-6));
    }

    @Test void oneRefreshReadsEachSourceOnlyOnceAndKeepsUndatedIssues() {
        JiraClient jira = mock(JiraClient.class);
        TeamAbsenceRepository absences = mock(TeamAbsenceRepository.class);
        TargetStartRepository schedules = mock(TargetStartRepository.class);
        when(absences.findAll()).thenReturn(List.of());
        when(schedules.findSchedules()).thenReturn(Map.of());
        when(jira.searchOpenIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(issue("NO-DATE", null, "0"), issue("DATED", "2026-09-14", "-2"))));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var provider = new JiraGanttDataProvider(jira, PROPS, absences, schedules);
        var useCase = new BuildWorkloadReportUseCase(provider, absences, PROPS);
        var snapshot = useCase.loadSnapshot();
        new BuildRoleGanttUseCase(provider).build(snapshot.tasks(), snapshot.milestones());
        new BuildPersonGanttUseCase(provider).build(snapshot.tasks(), snapshot.milestones());
        var result = useCase.build(snapshot, FRIDAY);
        assertThat(result.unplannedTasks()).extracting(UnplannedTask::taskKey).contains("NO-DATE", "DATED");
        assertThat(snapshot.tasks()).singleElement().satisfies(t -> {
            assertThat(t.md()).isEqualTo(3);
            assertThat(t.mdEstimated()).isTrue();
        });
        verify(absences).findAll();
        verify(absences, never()).isAbsent(anyString(), any());
        verify(schedules).findSchedules();
        verify(jira).searchOpenIssuesByAssignees(anyString(), anyList());
        verify(jira).searchOpenMilestones(anyString());
        verifyNoMoreInteractions(jira, absences, schedules);
    }

    @Test void exhaustedEstimateIsAReviewWarningNotProofOfCompletion() {
        var result = report(List.of(task("OPEN", "2026-09-14", "2026-09-18", 1, 8 * 3600)), List.of(), FRIDAY);
        assertThat(result.warnings()).singleElement().extracting(PlanningWarning::reason).asString().contains("Estimación agotada");
    }

    static JiraIssueDto issue(String key, String start, String effort) {
        return new JiraIssueDto(key, new JiraIssueDto.Fields(key, new JiraIssueDto.IssueType("Task"), null,
                new JiraIssueDto.User(PERSON.name(), PERSON.username(), null), new JiraIssueDto.Status("Open"),
                null, null, null, effort, null, start, null));
    }
}
