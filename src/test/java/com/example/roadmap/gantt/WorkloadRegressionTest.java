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
    static final GanttTeamRoster ROSTER = GanttTeamRoster.defaults();
    static final TaskStackResolver STACK_RESOLVER = TaskStackResolver.defaults();
    static final TeamMember PERSON = ROSTER.members().getFirst();
    static final JiraProperties PROPS = new JiraProperties("http://localhost", "test", "DEMO", null, null);

    static GanttTask task(String key, String start, String end, int md, long logged) {
        LocalDate date = LocalDate.parse(start);
        return GanttTask.create(key, key, "Task", PERSON, date, date, StartDateSource.LOCAL_PLAN,
                md, "Open", LocalDate.parse(end), d -> false, null, logged);
    }

    static GanttTask subtask(String key, String parentKey, String start, String end,
                             double md, String status, long logged) {
        LocalDate date = LocalDate.parse(start);
        return GanttTask.create(key, key, "Sub-task", PERSON, date, date, StartDateSource.LOCAL_PLAN,
                md, status, LocalDate.parse(end), d -> false, null, null, parentKey, logged,
                PERSON.role().stack(), TaskStackSource.PERSON_ROLE, List.of());
    }

    static WorkloadReport report(List<GanttTask> tasks, List<TeamAbsence> absences, LocalDate asOf) {
        return new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER)
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
            assertThat(w.reason()).startsWith("Window has no");
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
            assertThat(w.reason()).startsWith("Overdue:");
            assertThat(w.remainingHours()).isEqualTo(24);
        });
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

    @Test void oneRefreshReadsEachSourceOnlyOnceAndListsIssuesWithoutValidEstimates() {
        JiraClient jira = mock(JiraClient.class);
        TeamAbsenceRepository absences = mock(TeamAbsenceRepository.class);
        TargetStartRepository schedules = mock(TargetStartRepository.class);
        when(absences.findAll()).thenReturn(List.of());
        when(schedules.findSchedules()).thenReturn(Map.of());
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList())).thenReturn(new JiraSearchResponseDto(List.of(issue("NO-DATE", null, "0"), issue("DATED", "2026-09-14", "-2"))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var provider = new JiraGanttDataProvider(jira, PROPS, absences, schedules, ROSTER, STACK_RESOLVER);
        var useCase = new BuildWorkloadReportUseCase(provider, absences, PROPS, ROSTER);
        var snapshot = useCase.loadSnapshot();
        new BuildRoleGanttUseCase(provider).build(snapshot.tasks(), snapshot.milestones());
        new BuildPersonGanttUseCase(provider, ROSTER).build(snapshot.tasks(), snapshot.milestones());
        var result = useCase.build(snapshot, FRIDAY);
        assertThat(snapshot.tasks()).isEmpty();
        assertThat(result.unplannedTasks()).extracting(UnplannedTask::taskKey).containsExactlyInAnyOrder("NO-DATE", "DATED");
        assertThat(result.unplannedTasks()).extracting(UnplannedTask::reason)
                .containsOnly(UnplannedReason.NO_ESTIMATE);
        verify(absences).findAll();
        verify(absences, never()).isAbsent(anyString(), any());
        verify(schedules).findSchedules();
        verify(jira).searchWorkloadIssuesByAssignees(anyString(), anyList());
        verify(jira).searchOpenEpics(anyString());
        verify(jira).searchOpenMilestones(anyString());
        verifyNoMoreInteractions(jira, absences, schedules);
    }

    @Test void exhaustedEstimateDoesNotCreateAPlanningWarning() {
        var result = report(List.of(task("OPEN", "2026-09-14", "2026-09-18", 1, 8 * 3600)), List.of(), FRIDAY);
        assertThat(result.warnings()).isEmpty();
    }

    @Test void explicitSubtaskEstimatesArePreservedAndTheParentKeepsUnassignedBudget() {
        var parent = task("PARENT", "2026-09-14", "2026-09-18", 10, 0);
        var first = subtask("SUB-1", "PARENT", "2026-09-14", "2026-09-18", 3, "Open", 0);
        var second = subtask("SUB-2", "PARENT", "2026-09-14", "2026-09-18", 4, "Open", 0);

        var taskLoads = person(report(List.of(parent, first, second), List.of(), FRIDAY)).weeks().stream()
                .flatMap(week -> week.tasks().stream())
                .collect(java.util.stream.Collectors.toMap(TaskLoad::taskKey, TaskLoad::md, (left, right) -> left));

        assertThat(taskLoads).containsEntry("PARENT", 3.0);
        assertThat(taskLoads).containsEntry("SUB-1", 3.0).containsEntry("SUB-2", 4.0);
    }

    @Test void fallbackWindowUsesProductiveCapacityRatherThanOneCalendarDayPerMd() {
        LocalDate monday = LocalDate.of(2026, 9, 14);
        var task = GanttTask.create("FALLBACK", "FALLBACK", "Task", PERSON,
                monday, monday, StartDateSource.LOCAL_PLAN, 2, "Open", d -> false);

        assertThat(task.end()).isEqualTo(LocalDate.of(2026, 9, 16));
        assertThat(WorkContour.capacityHours(task.start(), task.end(), d -> false)).isEqualTo(18);
    }

    @Test void originalEstimateKeepsItsDecimalPrecision() {
        JiraClient jira = mock(JiraClient.class);
        TeamAbsenceRepository absences = mock(TeamAbsenceRepository.class);
        TargetStartRepository schedules = mock(TargetStartRepository.class);
        when(absences.findAll()).thenReturn(List.of());
        when(schedules.findSchedules()).thenReturn(Map.of());
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList()))
                .thenReturn(new JiraSearchResponseDto(List.of(issue("DECIMAL", "2026-09-14", "2.2"))));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));

        var provider = new JiraGanttDataProvider(jira, PROPS, absences, schedules, ROSTER, STACK_RESOLVER);

        assertThat(provider.snapshot(List.of()).tasks()).singleElement()
                .extracting(GanttTask::md).isEqualTo(2.2);
    }

    @Test void remainingWorkingDaysDiscountPersonalAbsences() {
        LocalDate monday = LocalDate.of(2026, 9, 14);
        var absence = TeamAbsence.create(PERSON.username(), monday.plusDays(1), monday.plusDays(2),
                AbsenceType.VACATION, "");

        var firstWeek = person(report(List.of(), List.of(absence), monday)).weeks().getFirst();

        assertThat(firstWeek.remainingWorkingDays()).isEqualTo(3);
        assertThat(firstWeek.remainingCapacityHours()).isEqualTo(18);
    }

    @Test void completedConsumptionDoesNotSilentlyReduceExplicitOpenEstimates() {
        var parent = task("PARENT", "2026-09-14", "2026-09-18", 10, 0);
        var first = subtask("SUB-1", "PARENT", "2026-09-14", "2026-09-18", 3, "Open", 0);
        var second = subtask("SUB-2", "PARENT", "2026-09-14", "2026-09-18", 4, "Open", 0);
        var snapshot = new RoadmapSnapshot(List.of(parent, first, second), List.of(), List.of(), List.of(),
                List.of(new CompletedSubtaskEffort("SUB-DONE", "PARENT", 5)));

        var result = new BuildWorkloadReportUseCase(null, null, PROPS, ROSTER).build(snapshot, FRIDAY);
        var taskLoads = person(result).weeks().stream().flatMap(week -> week.tasks().stream())
                .collect(java.util.stream.Collectors.toMap(TaskLoad::taskKey, TaskLoad::md, (left, right) -> left));

        assertThat(taskLoads).doesNotContainKey("PARENT");
        assertThat(taskLoads).containsEntry("SUB-1", 3.0).containsEntry("SUB-2", 4.0);
        assertThat(result.subtaskOverrunWarnings()).hasSize(1);
    }

    @Test void providerKeepsFinalizedSubtaskConsumptionWithoutPuttingItBackOnTheGantt() {
        JiraClient jira = mock(JiraClient.class);
        TeamAbsenceRepository absences = mock(TeamAbsenceRepository.class);
        TargetStartRepository schedules = mock(TargetStartRepository.class);
        when(schedules.findSchedules()).thenReturn(Map.of());
        var parent = issue("PARENT", "2026-09-14", "10");
        var completed = new JiraIssueDto("SUB-DONE", new JiraIssueDto.Fields("SUB-DONE",
                new JiraIssueDto.IssueType("Sub-task"), new JiraIssueDto.TimeTracking(5 * 8 * 3600, 5 * 8 * 3600),
                new JiraIssueDto.User(PERSON.name(), PERSON.username(), null), new JiraIssueDto.Status("Done"),
                new JiraIssueDto.Parent("PARENT"), null, null, List.of(), Map.of()));
        when(jira.searchWorkloadIssuesByAssignees(anyString(), anyList()))
                .thenReturn(new JiraSearchResponseDto(List.of(parent, completed)));
        when(jira.searchOpenEpics(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        when(jira.searchOpenMilestones(anyString())).thenReturn(new JiraSearchResponseDto(List.of()));
        var provider = new JiraGanttDataProvider(jira, PROPS, absences, schedules, ROSTER, STACK_RESOLVER);

        var snapshot = provider.snapshot(List.of());

        assertThat(snapshot.tasks()).extracting(GanttTask::key).containsExactly("PARENT");
        assertThat(snapshot.completedSubtasks()).containsExactly(
                new CompletedSubtaskEffort("SUB-DONE", "PARENT", 5));
    }

    static JiraIssueDto issue(String key, String start, String effort) {
        Integer seconds = effort != null && Double.parseDouble(effort) > 0
                ? (int) Math.round(Double.parseDouble(effort) * 8 * 3600) : null;
        return new JiraIssueDto(key, new JiraIssueDto.Fields(key, new JiraIssueDto.IssueType("Task"),
                new JiraIssueDto.TimeTracking(seconds, 0),
                new JiraIssueDto.User(PERSON.name(), PERSON.username(), null), new JiraIssueDto.Status("Open"),
                null, null, null, List.of(), customFields(effort, start)));
    }

    static Map<String, Object> customFields(String effort, String targetStart) {
        Map<String, Object> fields = new java.util.LinkedHashMap<>();
        if (effort != null) {
            fields.put(JiraProperties.DEFAULT_FIELD_EFFORT_ESTIMATE, effort);
        }
        if (targetStart != null) {
            fields.put(JiraProperties.DEFAULT_FIELD_TARGET_START, targetStart);
        }
        return fields;
    }
}
