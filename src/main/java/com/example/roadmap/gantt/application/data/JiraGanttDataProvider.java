package com.example.roadmap.gantt.application.data;

import com.example.roadmap.gantt.application.analytics.UnplannedReason;
import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.EffortEstimates;
import com.example.roadmap.gantt.application.model.TaskHierarchy;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.StartDateSource;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import com.example.roadmap.gantt.application.model.TaskStackSource;
import com.example.roadmap.gantt.application.model.TeamAbsence;
import com.example.roadmap.gantt.application.model.TeamMember;
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
 * Tasks and subtasks use Jira Original Estimate. Epics use the Jira MD field.
 * Parents with subtasks are excluded before filtering dates, estimates or assignees.
 *
 * A task or subtask needs a local Target End to enter the Gantt. Start priority is
 * local Start, Jira Target Start, then First Time In Progress for in-progress tasks.
 * Missing local ends, starts and unresolved estimates appear under Needs attention.
 *
 * All views share the same leaf tasks and their own estimates. Jira is never modified.
 */
@Component
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

    private static final org.slf4j.Logger LOG = org.slf4j.LoggerFactory.getLogger(JiraGanttDataProvider.class);

    @Override
    public List<GanttTask> tasks() {
        return loadTasks(absenceRepository.findAll()).tasks();
    }

    @Override
    public RoadmapSnapshot snapshot(List<TeamAbsence> absences) {
        RoadmapSnapshot loaded = loadTasks(absences);
        List<Milestone> milestones = milestones();
        Map<String, String> summaries = new HashMap<>(loaded.issueSummaries());
        milestones.forEach(milestone -> summaries.put(milestone.key(), milestone.name()));
        List<String> missing = loaded.tasks().stream().map(GanttTask::initiativeKey)
                .filter(java.util.Objects::nonNull).distinct().filter(key -> !summaries.containsKey(key)).toList();
        if (!missing.isEmpty()) summaries.putAll(jiraApiClient.findIssueSummaries(missing));
        return new RoadmapSnapshot(loaded.tasks(), milestones, absences, loaded.unplannedTasks(),
                loaded.parentTaskKeys(), summaries);
    }

    private RoadmapSnapshot loadTasks(List<TeamAbsence> absences) {
        List<JiraIssueDto> issues = jiraApiClient
                .searchWorkloadIssuesByAssignees(jiraProperties.project(), teamRoster.usernames())
                .issues();
        List<JiraIssueDto> epicIssues = jiraApiClient.searchOpenEpics(jiraProperties.project()).issues();
        issues = issues == null ? List.of() : issues;
        epicIssues = epicIssues == null ? List.of() : epicIssues;
        if (issues.isEmpty() && epicIssues.isEmpty()) {
            return new RoadmapSnapshot(List.of(), List.of(), absences, List.of());
        }

        Map<String, TargetStartRepository.Schedule> schedules = targetStartRepository.findSchedules();
        List<JiraIssueDto> indexedIssues = new ArrayList<>(issues);
        indexedIssues.addAll(epicIssues);
        Map<String, String> summaries = new HashMap<>();
        for (JiraIssueDto issue : indexedIssues) {
            if (issue != null && issue.key() != null && issue.fields() != null
                    && issue.fields().summary() != null && !issue.fields().summary().isBlank()) {
                summaries.put(issue.key(), issue.fields().summary());
            }
        }
        InitiativeIndex initiatives = InitiativeIndex.of(indexedIssues,
                jiraProperties.fieldEpicLink(), jiraProperties.fieldParentMilestone());
        Map<String, List<String>> prjTaskLabelsByIssue = prjTaskLabelsByIssue(indexedIssues);
        List<GanttTask> result = new ArrayList<>();
        List<UnplannedTask> unplanned = new ArrayList<>();
        Set<String> parentKeys = TaskHierarchy.parentKeys(issues);
        for (JiraIssueDto issue : issues) {
            if (issue == null || issue.key() == null || issue.fields() == null
                    || parentKeys.contains(issue.key()) || WorkflowStatus.isFinal(statusName(issue.fields()))) continue;
            Draft draft = toDraft(issue, schedules);
            if (draft == null) continue;
            if (!draft.hasEstimate) {
                LOG.warn("Issue {} has no applicable estimate; listed under Needs attention", draft.key);
                // No effort estimate at all: the task can't be placed on the Gantt or counted
                // towards anyone's load, regardless of whether it has dates. It only shows up
                // in the "necesita atención" tray until an estimate is loaded.
                unplanned.add(new UnplannedTask(draft.key, draft.summary, draft.issueType,
                        draft.member.name(), draft.member.role().label(), draft.member.role().color(),
                        draft.status, draft.actualStartDate, null, 0, jiraUrl(draft.key),
                        UnplannedReason.NO_ESTIMATE));
                continue;
            }
            if (draft.schedule == null || draft.schedule.endDate() == null) {
                unplanned.add(new UnplannedTask(draft.key, draft.summary, draft.issueType,
                        draft.member.name(), draft.member.role().label(), draft.member.role().color(),
                        draft.status, draft.actualStartDate, null, draft.md, jiraUrl(draft.key),
                        UnplannedReason.NO_DATE));
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
            draft.prjTaskLabels = resolvePrjTaskLabels(issue, draft.epicKey, prjTaskLabelsByIssue);
            Predicate<LocalDate> blocked = RoadmapSnapshot.calendar(absences, draft.member.username());
            GanttTask task = draft.toTask(draft.actualStartDate, draft.actualStartDate, draft.actualSource, blocked);
            result.add(task);
        }

        for (JiraIssueDto issue : epicIssues) {
            GanttTask epic = toEpic(issue, schedules.get(issue.key()));
            if (epic != null) {
                result.add(epic);
            }
        }

        return new RoadmapSnapshot(result, List.of(), absences, unplanned, parentKeys, summaries);
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
        Double md = EffortEstimates.epicMd(fields, jiraProperties.fieldEffortEstimate());
        return GanttTask.createEpic(issue.key(), summary, start, end, source, status, md == null ? 0 : md);
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
                if (issue == null) continue;
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
        draft.issueType = EffortEstimates.isSubtask(fields) ? "Sub-task" : fields.issuetype() == null || fields.issuetype().name() == null
                ? "Task" : fields.issuetype().name();
        draft.schedule = schedules.get(draft.key);
        TaskStackResolver.Resolution stackResolution = taskStackResolver.resolve(
                draft.schedule == null ? null : draft.schedule.localStack(), fields.labels(), member.role());
        draft.stack = stackResolution.stack();
        draft.stackSource = stackResolution.source();
        draft.parentKey = fields.parent() != null ? fields.parent().key() : null;

        resolveActualStart(draft, fields);
        draft.hasEstimate = resolveEffort(draft, fields);
        return draft;
    }

    /** Tasks and subtasks use their own Jira Original Estimate. */
    private boolean resolveEffort(Draft draft, JiraIssueDto.Fields fields) {
        Double estimate = EffortEstimates.jiraMd(fields);
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

    /**
     * A PRJtask belongs to the leaf when present there. Otherwise it is inherited from the
     * immediate Jira parent, then from the resolved Epic. An empty result deliberately means
     * there is no reference at any of those three levels.
     */
    private List<String> resolvePrjTaskLabels(JiraIssueDto issue, String epicKey,
                                              Map<String, List<String>> labelsByIssue) {
        List<String> own = labelsByIssue.getOrDefault(issue.key(), List.of());
        if (!own.isEmpty()) return own;
        JiraIssueDto.Fields fields = issue.fields();
        String parentKey = fields.parent() == null ? null : fields.parent().key();
        List<String> parent = parentKey == null ? List.of() : labelsByIssue.getOrDefault(parentKey, List.of());
        if (!parent.isEmpty()) return parent;
        return epicKey == null ? List.of() : labelsByIssue.getOrDefault(epicKey, List.of());
    }

    private Map<String, List<String>> prjTaskLabelsByIssue(List<JiraIssueDto> issues) {
        Map<String, List<String>> result = new HashMap<>();
        for (JiraIssueDto issue : issues) {
            if (issue != null && issue.key() != null && issue.fields() != null) {
                result.put(issue.key(), prjTaskLabels(issue.fields().labels()));
            }
        }
        return result;
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
