package com.example.roadmap.gantt.application.data;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.StartDateSource;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TaskStackSource;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.JiraIssueDto;
import com.vaadin.flow.component.Component;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.function.Predicate;

/**
 * Loads the AR1 Gantt straight from Jira: one task per open issue assigned to a member of
 * {@link GanttTeamRoster}, plus the project's open milestones.
 *
 * <h2>Start date resolution</h2>
 * Each task's start date is resolved through an explicit, ordered chain of sources, from
 * most to least authoritative, so the Gantt can always tell a real Jira date apart from one
 * it had to calculate itself:
 * <ol>
 *   <li>{@link StartDateSource#LOCAL_PLAN} - the manually maintained PostgreSQL schedule;
 *       the most authoritative start date whenever the schedule has a row for the issue.</li>
 *   <li>{@link StartDateSource#TARGET_START} - the Jira field configured by
 *       {@code ROADMAP_JIRA_FIELD_TARGET_START}.</li>
 *   <li>{@link StartDateSource#FIRST_TIME_IN_PROGRESS} - the Jira field configured by
 *       {@code ROADMAP_JIRA_FIELD_FIRST_TIME_IN_PROGRESS}, used only when the issue is
 *       currently In Progress.</li>
 * </ol>
 * Issues without either source are excluded from the roadmap. The roadmap never invents a
 * schedule from sprint, creation date or task chaining.
 *
 * <h2>Duration and effort are independent</h2>
 * PostgreSQL is the schedule's source of truth and supplies all three variables of
 * {@code Work = Duration x Units}: {@code startDate}, {@code endDate} and {@code effortMd}.
 * A row's {@code endDate} becomes the task's committed calendar window, and effort is later
 * spread across it by {@code WorkContour} rather than read as full dedication.
 *
 * <p>A task with no {@code endDate} keeps no committed window: it falls back to
 * {@code start + MD working days}, i.e. 100% dedication, and is flagged through
 * {@link GanttTask#missingCalendarWindow()} so the roadmap can list it for the team to date
 * properly instead of silently inflating its owner's load.
 *
 * <p><strong>Effort (MD)</strong> comes from the Jira field configured by
 * {@code ROADMAP_JIRA_FIELD_EFFORT_ESTIMATE}, falling back to the schedule's
 * {@code effortMd} and finally to 3 MD for a normal issue.
 * Subtasks deliberately ignore any Jira estimate: they use the schedule's {@code effortMd}, or
 * 1 MD when it is absent. In either fallback case the task is flagged as estimated.
 *
 * <p><strong>Absences</strong> - vacations, birthdays, sick leave, etc., entered once via
 * the team availability screen and kept in {@link TeamAbsenceRepository} - are treated as
 * additional non-working days for their specific assignee: they extend the fallback window
 * of an undated task, and they remove days from a committed window when effort is spread
 * over it, so a person's real available days are always respected.
 *
 * <p><strong>Delivery date is never used to derive a task's start date.</strong> The
 * {@code duedate} field read in {@link #milestones()} only places the milestone marker
 * itself on the timeline; it is deliberately never combined with a task's MD estimate to
 * back-calculate when that task "should" start - every task's schedule comes exclusively
 * from the start-date chain above, forward from its own real or calculated start.
 *
 * <p>Any failure talking to Jira (network, auth, timeout) propagates as-is: this provider
 * does not fall back to sample data.
 */
@org.springframework.stereotype.Component
public class JiraGanttDataProvider implements GanttDataProvider {

    private static final int DEFAULT_MD = 3;
    private static final int DEFAULT_SUBTASK_MD = 1;
    private static final List<String> CLOSED_STATUSES =
            List.of("Done", "Closed", "Resolved", "Cancelled", "Obsolete");

    private final JiraClient jiraApiClient;
    private final JiraProperties jiraProperties;
    private final TeamAbsenceRepository absenceRepository;
    private final TargetStartRepository targetStartRepository;
    private final GanttTeamRoster teamRoster;
    private final TaskStackResolver taskStackResolver;

    public JiraGanttDataProvider(JiraClient jiraApiClient, JiraProperties jiraProperties,
            TeamAbsenceRepository absenceRepository, TargetStartRepository targetStartRepository,
            GanttTeamRoster teamRoster, TaskStackResolver taskStackResolver) {
        this.jiraApiClient = jiraApiClient;
        this.jiraProperties = jiraProperties;
        this.absenceRepository = absenceRepository;
        this.targetStartRepository = targetStartRepository;
        this.teamRoster = teamRoster;
        this.taskStackResolver = taskStackResolver;
    }

    /** {@code true} for weekends and any stored absence of {@code username}. */
    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(JiraGanttDataProvider.class);

    @Override
    public List<GanttTask> tasks() {
        return loadTasks(absenceRepository.findAll()).tasks();
    }

    @Override
    public RoadmapSnapshot snapshot(List<TeamAbsence> absences) {
        RoadmapSnapshot loaded = loadTasks(absences);
        return new RoadmapSnapshot(loaded.tasks(), milestones(), absences, loaded.undatedTasks());
    }

    private RoadmapSnapshot loadTasks(List<TeamAbsence> absences) {
        List<JiraIssueDto> issues = jiraApiClient
                .searchOpenIssuesByAssignees(jiraProperties.project(), teamRoster.usernames())
                .issues();
        if (issues == null || issues.isEmpty()) {
            return new RoadmapSnapshot(List.of(), List.of(), absences, List.of());
        }

        Map<String, TargetStartRepository.Schedule> schedules = targetStartRepository.findSchedules();
        EpicIndex epics = EpicIndex.of(issues, jiraProperties.fieldEpicLink());
        List<GanttTask> result = new ArrayList<>();
        List<UnplannedTask> undated = new ArrayList<>();

        for (JiraIssueDto issue : issues) {
            Draft draft = toDraft(issue, schedules);
            if (draft == null) {
                continue;
            }
            if (draft.actualStartDate == null) {
                undated.add(new UnplannedTask(draft.key, draft.summary, draft.issueType,
                        draft.member.name(), draft.member.role().label(), draft.member.role().color(),
                        draft.status, null, null, draft.md, draft.mdEstimated, null));
                continue;
            }
            draft.epicKey = epics.resolve(issue.key());
            Predicate<LocalDate> blocked = RoadmapSnapshot.calendar(absences, draft.member.username());
            result.add(draft.toTask(draft.actualStartDate, draft.actualStartDate, draft.actualSource, blocked));
        }

        return new RoadmapSnapshot(result, List.of(), absences, undated);
    }

    /**
     * Resolves which epic each issue belongs to, which Jira never states directly on a
     * subtask: a subtask points at its parent story, and the story carries the Epic Link. The
     * index walks that chain across the whole fetched page so both hops can be made without
     * extra requests.
     *
     * <p>An issue whose parent was not fetched - because it is assigned outside the team or
     * already closed - simply has no reachable epic. That is expected rather than an error,
     * and those tasks are painted with {@code EpicPalette.UNASSIGNED}.
     */
    private record EpicIndex(Map<String, String> epicLinkByKey, Map<String, String> parentByKey,
            Set<String> epicKeys) {

        /** Guards against a malformed parent cycle in Jira turning resolution into a hang. */
        private static final int MAX_HOPS = 4;

        static EpicIndex of(List<JiraIssueDto> issues, String epicLinkField) {
            Map<String, String> epicLinks = new HashMap<>();
            Map<String, String> parents = new HashMap<>();
            Set<String> epics = new HashSet<>();

            for (JiraIssueDto issue : issues) {
                JiraIssueDto.Fields fields = issue.fields();
                if (issue.key() == null || fields == null) {
                    continue;
                }
                if (fields.issuetype() != null && "Epic".equalsIgnoreCase(fields.issuetype().name())) {
                    epics.add(issue.key());
                }
                String epicLink = fields.customField(epicLinkField);
                if (epicLink != null && !epicLink.isBlank()) {
                    epicLinks.put(issue.key(), epicLink.trim());
                }
                if (fields.parent() != null && fields.parent().key() != null) {
                    parents.put(issue.key(), fields.parent().key());
                }
            }
            return new EpicIndex(epicLinks, parents, epics);
        }

        String resolve(String issueKey) {
            String current = issueKey;
            for (int hop = 0; hop < MAX_HOPS && current != null; hop++) {
                if (epicKeys.contains(current)) {
                    return current;
                }
                String epicLink = epicLinkByKey.get(current);
                if (epicLink != null) {
                    return epicLink;
                }
                current = parentByKey.get(current);
            }
            return null;
        }
    }

    @Override
    public List<Milestone> milestones() {
        List<JiraIssueDto> issues = jiraApiClient
                .searchOpenMilestones(jiraProperties.project())
                .issues();
        if (issues == null || issues.isEmpty()) {
            return List.of();
        }

        List<Milestone> milestones = new ArrayList<>();
        for (JiraIssueDto issue : issues) {
            JiraIssueDto.Fields fields = issue.fields();
            if (fields == null || fields.duedate() == null) {
                continue;
            }
            String status = fields.status() == null ? null : fields.status().name();
            if (status != null && CLOSED_STATUSES.contains(status)) {
                continue;
            }
            LocalDate date = parseDate(fields.duedate());
            if (date == null) {
                continue;
            }
            milestones.add(new Milestone(fields.summary() == null ? issue.key() : fields.summary(), date));
        }
        return milestones;
    }

    private Draft toDraft(JiraIssueDto issue, Map<String, TargetStartRepository.Schedule> schedules) {
        JiraIssueDto.Fields fields = issue.fields();
        if (fields == null || fields.assignee() == null) {
            return null;
        }
        TeamMember member = teamRoster.byUsername(fields.assignee().name());
        if (member == null) {
            return null;
        }

        Draft draft = new Draft();
        draft.key = issue.key();
        draft.summary = fields.summary() == null ? issue.key() : fields.summary();
        draft.member = member;
        draft.status = fields.status() == null ? null : fields.status().name();
        draft.loggedSeconds = fields.timetracking() == null || fields.timetracking().timeSpentSeconds() == null
                ? 0L
                : fields.timetracking().timeSpentSeconds();
        draft.created = parseDate(fields.created());
        draft.issueType = fields.issuetype() == null || fields.issuetype().name() == null
                ? "Task" : fields.issuetype().name();
        draft.schedule = schedules.get(draft.key);
        TaskStackResolver.Resolution stackResolution = taskStackResolver.resolve(
                draft.schedule == null ? null : draft.schedule.localStack(), fields.labels(), member.role());
        draft.stack = stackResolution.stack();
        draft.stackSource = stackResolution.source();

        resolveActualStart(draft, fields);
        resolveEffort(draft, fields);
        return draft;
    }

    /**
     * Uses Jira's explicit MD estimate when supplied. An unestimated subtask derives effort
     * from its maintained schedule (inclusive), skipping weekends and the assignee's
     * recorded absences; without a schedule end date it uses the safe one-MD default.
     */
    private void resolveEffort(Draft draft, JiraIssueDto.Fields fields) {
        if (fields.parent() != null) {
            if (draft.schedule != null && draft.schedule.effortMd() != null) {
                draft.md = draft.schedule.effortMd();
                draft.mdEstimated = false;
                return;
            }
            draft.md = DEFAULT_SUBTASK_MD;
            draft.mdEstimated = true;
            return;
        }

        int jiraMd = parseMd(fields.customField(jiraProperties.fieldEffortEstimate()));
        if (jiraMd > 0) {
            draft.md = jiraMd;
            draft.mdEstimated = false;
            return;
        }

        if (draft.schedule != null && draft.schedule.effortMd() != null) {
            draft.md = draft.schedule.effortMd();
            draft.mdEstimated = false;
            return;
        }

        draft.md = DEFAULT_MD;
        draft.mdEstimated = true;
    }

    /** A roadmap task needs a Target Start or a real start from an in-progress issue. */
    private void resolveActualStart(Draft draft, JiraIssueDto.Fields fields) {
        LocalDate scheduledStart = draft.schedule == null ? null : draft.schedule.startDate();
        if (scheduledStart != null) {
            draft.actualStartDate = scheduledStart;
            draft.actualSource = StartDateSource.LOCAL_PLAN;
            draft.committedEndDate = draft.schedule.endDate();
            return;
        }
        LocalDate targetStart = parseDate(fields.customField(jiraProperties.fieldTargetStart()));
        if (targetStart != null) {
            draft.actualStartDate = targetStart;
            draft.actualSource = StartDateSource.TARGET_START;
            return;
        }
        LocalDate firstInProgress = isInProgress(draft.status)
                ? parseDate(fields.customField(jiraProperties.fieldFirstTimeInProgress())) : null;
        if (firstInProgress != null) {
            draft.actualStartDate = firstInProgress;
            draft.actualSource = StartDateSource.FIRST_TIME_IN_PROGRESS;
        }
    }

    private boolean isInProgress(String status) {
        return "In Progress".equalsIgnoreCase(status);
    }

    private int parseMd(String raw) {
        if (raw == null || raw.isBlank()) {
            return -1;
        }
        try {
            double value = Double.parseDouble(raw.trim());
            return Double.isFinite(value) && value > 0 && value <= Integer.MAX_VALUE
                    ? (int) Math.ceil(value) : -1;
        } catch (NumberFormatException e) {
            return -1;
        }
    }

    private LocalDate parseDate(String raw) {
        if (raw == null || raw.isBlank() || "<null>".equalsIgnoreCase(raw.trim())) {
            return null;
        }
        try {
            // Jira dates may carry a time component, e.g. "2026-08-27T00:00:00.000-0300"
            String datePart = raw.length() >= 10 ? raw.substring(0, 10) : raw;
            return LocalDate.parse(datePart, DateTimeFormatter.ISO_LOCAL_DATE);
        } catch (RuntimeException e) {
            LOG.warn("Invalid Jira date format; value omitted");
            return null;
        }
    }

    private static final class Draft {
        String key;
        String summary;
        String issueType;
        TeamMember member;
        int md;
        boolean mdEstimated;
        String status;
        LocalDate created;
        LocalDate actualStartDate;
        StartDateSource actualSource;
        TargetStartRepository.Schedule schedule;
        LocalDate committedEndDate;
        String epicKey;
        long loggedSeconds;
        TaskStack stack;
        TaskStackSource stackSource;

        GanttTask toTask(LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource source,
                Predicate<LocalDate> extraBlockedDays) {
            return GanttTask.create(key, summary, issueType, member, actualStartDate, plannedStartDate, source,
                    md, mdEstimated, status, committedEndDate, extraBlockedDays, epicKey, loggedSeconds,
                    stack, stackSource);
        }
    }
}
