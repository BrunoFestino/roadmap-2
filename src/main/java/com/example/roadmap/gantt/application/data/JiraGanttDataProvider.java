package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.analytics.UnplannedReason;
import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.EffortEstimates;
import com.example.roadmap.gantt.application.model.SubtaskBudget;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.StartDateSource;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TaskStackSource;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.TeamMember;
import com.example.roadmap.gantt.application.model.WorkingDays;
import com.example.roadmap.gantt.application.model.WorkflowStatus;
import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.dto.JiraIssueDto;
import org.springframework.stereotype.Component;

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
 * Loads Jira issues and local schedules once per snapshot.
 *
 * Standard tasks use Jira Original Estimate only. Subtasks use a local estimate, or
 * inherit an equal share of the parent budget left after explicit sibling estimates
 * and finalized-subtask consumption. Budget reservations are resolved before date
 * filtering so undated work does not silently donate its budget to dated siblings.
 *
 * Start priority is local Start, Jira Target Start, then First Time In Progress for
 * in-progress tasks. A local End commits the window; otherwise the fallback uses
 * enough available business days at six productive hours per day. Missing starts
 * and unresolved estimates appear under Needs attention.
 *
 * Gantt tasks retain original estimates (or explicitly marked inherited shares).
 * The snapshot also carries the effective workload allocation, avoiding parent/child
 * double counting while keeping both projections consistent. Jira is never modified.
 */
@org.springframework.stereotype.Component
public class JiraGanttDataProvider implements GanttDataProvider {

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
        return new RoadmapSnapshot(loaded.tasks(), milestones(), absences, loaded.unplannedTasks(),
                loaded.completedSubtasks(), loaded.subtaskBudget());
    }

    private RoadmapSnapshot loadTasks(List<TeamAbsence> absences) {
        List<JiraIssueDto> issues = jiraApiClient
                .searchWorkloadIssuesByAssignees(jiraProperties.project(), teamRoster.usernames())
                .issues();
        List<JiraIssueDto> epicIssues = jiraApiClient.searchOpenEpics(jiraProperties.project()).issues();
        issues = issues == null ? List.of() : issues;
        epicIssues = epicIssues == null ? List.of() : epicIssues;
        if (issues.isEmpty() && epicIssues.isEmpty()) {
            return new RoadmapSnapshot(List.of(), List.of(), absences, List.of(), List.of());
        }

        Map<String, TargetStartRepository.Schedule> schedules = targetStartRepository.findSchedules();
        List<JiraIssueDto> indexedIssues = new ArrayList<>(issues);
        indexedIssues.addAll(epicIssues);
        InitiativeIndex initiatives = InitiativeIndex.of(indexedIssues,
                jiraProperties.fieldEpicLink(), jiraProperties.fieldParentMilestone());
        List<GanttTask> result = new ArrayList<>();
        List<UnplannedTask> unplanned = new ArrayList<>();
        List<CompletedSubtaskEffort> completedSubtasks = new ArrayList<>();
        List<Draft> drafts = new ArrayList<>();
        Set<String> activeIssueKeys = issues.stream()
                .filter(issue -> issue != null && issue.key() != null && issue.fields() != null)
                .filter(issue -> !WorkflowStatus.isFinal(statusName(issue.fields())))
                .map(JiraIssueDto::key)
                .collect(java.util.stream.Collectors.toSet());

        for (JiraIssueDto issue : issues) {
            if (isFinalSubtaskOfActiveParent(issue, activeIssueKeys)) {
                double consumedMd = completedSubtaskConsumedMd(issue.fields(), schedules.get(issue.key()));
                if (consumedMd > 0) {
                    completedSubtasks.add(new CompletedSubtaskEffort(
                            issue.key(), issue.fields().parent().key(), consumedMd));
                }
                continue;
            }
            if (issue != null && issue.fields() != null && WorkflowStatus.isFinal(statusName(issue.fields()))) {
                continue;
            }
            Draft draft = toDraft(issue, schedules);
            if (draft == null) {
                continue;
            }
            drafts.add(draft);
        }

        Map<String, Double> consumed = new HashMap<>();
        completedSubtasks.forEach(task -> consumed.merge(task.parentKey(), task.consumedMd(), Double::sum));
        SubtaskBudget.Allocation budget = SubtaskBudget.allocate(drafts.stream()
                .map(draft -> new SubtaskBudget.Entry(draft.key, draft.parentKey, draft.issueType,
                        draft.hasEstimate ? draft.md : null)).toList(), consumed);
        for (Draft draft : drafts) {
            if (!draft.hasEstimate && budget.inheritedKeys().contains(draft.key)
                    && budget.effectiveMd().getOrDefault(draft.key, 0.0) > 0.000001) {
                draft.md = budget.effectiveMd().get(draft.key);
                draft.hasEstimate = true;
            }
            if (!draft.hasEstimate) {
                LOG.warn("Issue {} has neither an applicable estimate nor inherited parent budget; listed under Needs attention", draft.key);
                // No effort estimate at all: the task can't be placed on the Gantt or counted
                // towards anyone's load, regardless of whether it has dates. It only shows up
                // in the "necesita atención" tray until an estimate is loaded.
                unplanned.add(new UnplannedTask(draft.key, draft.summary, draft.issueType,
                        draft.member.name(), draft.member.role().label(), draft.member.role().color(),
                        draft.status, draft.actualStartDate, null, 0, jiraUrl(draft.key),
                        UnplannedReason.NO_ESTIMATE));
                continue;
            }
            if (draft.actualStartDate == null) {
                unplanned.add(new UnplannedTask(draft.key, draft.summary, draft.issueType,
                        draft.member.name(), draft.member.role().label(), draft.member.role().color(),
                        draft.status, null, null, draft.md, jiraUrl(draft.key), UnplannedReason.NO_DATE));
                continue;
            }
            draft.epicKey = initiatives.resolveEpic(draft.key);
            draft.milestoneKey = initiatives.resolveMilestone(draft.key);
            Predicate<LocalDate> blocked = RoadmapSnapshot.calendar(absences, draft.member.username());
            GanttTask task = draft.toTask(draft.actualStartDate, draft.actualStartDate, draft.actualSource, blocked);
            result.add(budget.inheritedKeys().contains(draft.key) ? task.withInheritedEffort() : task);
        }

        for (JiraIssueDto issue : epicIssues) {
            GanttTask epic = toEpic(issue, schedules.get(issue.key()));
            if (epic != null) {
                result.add(epic);
            }
        }

        return new RoadmapSnapshot(result, List.of(), absences, unplanned, completedSubtasks, budget);
    }

    private boolean isFinalSubtaskOfActiveParent(JiraIssueDto issue, Set<String> activeIssueKeys) {
        if (issue == null || issue.fields() == null || issue.fields().issuetype() == null
                || issue.fields().parent() == null) {
            return false;
        }
        return "Sub-task".equalsIgnoreCase(issue.fields().issuetype().name())
                && WorkflowStatus.isFinal(statusName(issue.fields()))
                && activeIssueKeys.contains(issue.fields().parent().key());
    }

    private double completedSubtaskConsumedMd(JiraIssueDto.Fields fields,
                                               TargetStartRepository.Schedule schedule) {
        return EffortEstimates.completedSubtaskMd(fields, schedule == null ? null : schedule.effortMd());
    }

    private String statusName(JiraIssueDto.Fields fields) {
        return fields.status() == null ? null : fields.status().name();
    }

    /** Absolute Jira link for an issue key, tolerating a base URL with or without a trailing slash. */
    private String jiraUrl(String key) {
        String baseUrl = jiraProperties.baseUrl() == null ? "" : jiraProperties.baseUrl().trim();
        if (baseUrl.isEmpty()) {
            return null;
        }
        return baseUrl.endsWith("/") ? baseUrl + "browse/" + key : baseUrl + "/browse/" + key;
    }

    private GanttTask toEpic(JiraIssueDto issue, TargetStartRepository.Schedule schedule) {
        if (issue.key() == null || issue.fields() == null) {
            return null;
        }
        JiraIssueDto.Fields fields = issue.fields();
        LocalDate start = schedule == null ? null : schedule.startDate();
        LocalDate end = schedule == null ? null : schedule.endDate();
        StartDateSource source = StartDateSource.LOCAL_PLAN;
        if (start == null) {
            start = parseDate(fields.customField(jiraProperties.fieldTargetStart()));
            source = StartDateSource.TARGET_START;
        }
        if (end == null) {
            end = parseDate(fields.duedate());
        }
        if (start == null || end == null || end.isBefore(start)) {
            return null;
        }
        String summary = fields.summary() == null ? issue.key() : fields.summary();
        String status = fields.status() == null ? null : fields.status().name();
        return GanttTask.createEpic(issue.key(), summary, start, end, source, status);
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
    private record InitiativeIndex(Map<String, String> epicLinkByKey,
                                   Map<String, String> milestoneLinkByKey,
                                   Map<String, String> parentByKey,
                                   Set<String> epicKeys) {

        /** Guards against a malformed parent cycle in Jira turning resolution into a hang. */
        private static final int MAX_HOPS = 4;

        static InitiativeIndex of(List<JiraIssueDto> issues, String epicLinkField,
                                  String parentMilestoneField) {
            Map<String, String> epicLinks = new HashMap<>();
            Map<String, String> milestoneLinks = new HashMap<>();
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
                String milestoneLink = fields.customFieldIssueKey(parentMilestoneField);
                if (milestoneLink != null) {
                    milestoneLinks.put(issue.key(), milestoneLink);
                }
                if (fields.parent() != null && fields.parent().key() != null) {
                    parents.put(issue.key(), fields.parent().key());
                }
            }
            return new InitiativeIndex(epicLinks, milestoneLinks, parents, epics);
        }

        String resolveEpic(String issueKey) {
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

        String resolveMilestone(String issueKey) {
            String current = issueKey;
            for (int hop = 0; hop < MAX_HOPS && current != null; hop++) {
                String milestoneLink = milestoneLinkByKey.get(current);
                if (milestoneLink != null) {
                    return milestoneLink;
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
            if (WorkflowStatus.isFinal(status)) {
                continue;
            }
            LocalDate date = parseDate(fields.duedate());
            if (date == null) {
                continue;
            }
            milestones.add(new Milestone(issue.key(),
                    fields.summary() == null ? issue.key() : fields.summary(), date));
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
        draft.prjTaskLabels = prjTaskLabels(fields.labels());
        // Only Jira's literal "Sub-task" type discounts its effort from its parent's load
        // further down the pipeline; the raw parent link is still captured here regardless
        // of type, and the analytics layer decides what to do with it.
        draft.parentKey = fields.parent() != null ? fields.parent().key() : null;

        resolveActualStart(draft, fields);
        draft.hasEstimate = resolveEffort(draft, fields);
        return draft;
    }

    /** Standard tasks use Jira Original Estimate; subtasks use local effort only. */
    private boolean resolveEffort(Draft draft, JiraIssueDto.Fields fields) {
        Double estimate = EffortEstimates.resolve(fields,
                draft.schedule == null ? null : draft.schedule.effortMd());
        if (estimate == null) return false;
        draft.md = estimate;
        return true;
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

    private List<String> prjTaskLabels(List<String> labels) {
        if (labels == null) {
            return List.of();
        }
        return labels.stream()
                .filter(label -> label != null && label.replaceAll("[^A-Za-z0-9]", "")
                        .toLowerCase(java.util.Locale.ROOT).contains("prjtask"))
                .toList();
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
        double md;
        String status;
        LocalDate created;
        LocalDate actualStartDate;
        StartDateSource actualSource;
        TargetStartRepository.Schedule schedule;
        LocalDate committedEndDate;
        String epicKey;
        String milestoneKey;
        String parentKey;
        long loggedSeconds;
        TaskStack stack;
        TaskStackSource stackSource;
        List<String> prjTaskLabels;
        boolean hasEstimate;

        GanttTask toTask(LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource source,
                         Predicate<LocalDate> extraBlockedDays) {
            return GanttTask.create(key, summary, issueType, member, actualStartDate, plannedStartDate, source,
                    md, status, committedEndDate, extraBlockedDays, epicKey, milestoneKey, parentKey, loggedSeconds,
                    stack, stackSource, prjTaskLabels);
        }
    }
}
