package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;
import java.util.List;
import java.util.function.Predicate;

/**
 * A single planned piece of work in the roadmap: one Jira issue assigned to an roadmap team
 * member, modelled with Microsoft Project's scheduling identity
 * {@code Work = Duration × Units}.
 *
 * <p>The three variables are kept explicit and independent:
 * <ul>
 *   <li><strong>Work</strong> - {@link #md()}, the effort estimate. One MD is
 *       {@value WorkContour#HOURS_PER_MD} hours of effort.</li>
 *   <li><strong>Duration</strong> - the calendar commitment {@link #displayStartDate()} to
 *       {@link #plannedEndDate()}, read from the maintained database schedule. It is a business
 *       commitment, never derived from the effort.</li>
 *   <li><strong>Units</strong> - the resulting daily dedication, computed on demand by
 *       {@link WorkContour}. It is what makes "how busy is this person" answerable.</li>
 * </ul>
 *
 * <p>Every task is therefore a <em>fixed-duration</em> task in Microsoft Project terms: the
 * window is the input and the dedication is what flexes. The roadmap never stretches a bar
 * to match an estimate, and never shortens one to match a milestone.
 *
 * <p>The start date is deliberately split in two:
 * <ul>
 *   <li>{@link #actualStartDate()} - a date read directly from the Target Start source or
 *       from an issue's first In Progress transition.
 *   <li>{@link #plannedStartDate()} - the roadmap date. It equals the real source date:
 *       items without either source are intentionally excluded instead of being inferred.
 * </ul>
 *
 * @param key               Jira issue key, e.g. {@code "DEMO-10608"}
 * @param summary           short human-readable title
 * @param issueType         Jira issue type, e.g. {@code "Task"} or {@code "Epic"}
 * @param assignee          the team member doing the work; {@code null} only for an Epic
 * @param actualStartDate   real start date read from Jira, {@code null} if Jira has none
 * @param plannedStartDate  this roadmap's own calculated start date (always present)
 * @param startDateSource   which tier ultimately produced {@link #displayStartDate()}
 * @param md                effort estimate in man-days (positive for executable work and zero for an Epic)
 * @param status            Jira workflow status, may be {@code null}
 * @param plannedEndDate    end of the calendar commitment; when the database schedule has no end
 *                          date this falls back to full dedication, i.e.
 *                          {@code start + MD working days}
 * @param hasCalendarWindow {@code true} when the end date is a real committed date from the
 *                          database schedule rather than the full-dedication fallback
 * @param epicKey           key of the epic this work serves, resolved through the issue's own
 *                          Epic Link or its parent's; {@code null} when it could not be
 *                          reached, which paints the task in {@link EpicPalette#UNASSIGNED}
 * @param milestoneKey      key of the Parent Milestone configured in Jira; when present it
 *                          has visual priority over the Epic
 * @param parentKey         key of this issue's Jira parent, populated only when
 *                          {@code issueType} is the literal "Sub-task" type; used by the
 *                          workload report to discount a sub-task's effort from its parent's
 *                          load instead of counting both. {@code null} for every other issue
 *                          type, and never used to influence dates or the Gantt.
 * @param stack             effective stack used to place the task in the role/stack roadmap
 * @param stackSource       source that supplied the effective stack
 * @param prjTaskLabels     Jira labels identifying PRJ tasks, shown in the roadmap tooltip
 */
public record GanttTask(
        String key,
        String summary,
        String issueType,
        TeamMember assignee,
        LocalDate actualStartDate,
        LocalDate plannedStartDate,
        StartDateSource startDateSource,
        double md,
        String status,
        LocalDate plannedEndDate,
        boolean hasCalendarWindow,
        String epicKey,
        String milestoneKey,
        String parentKey,
        long loggedSeconds,
        TaskStack stack,
        TaskStackSource stackSource,
        List<String> prjTaskLabels,
        boolean inheritedEffort) {

    public GanttTask {
        boolean epic = "Epic".equalsIgnoreCase(issueType);
        if (!Double.isFinite(md) || md < 0 || (!epic && md == 0)) {
            throw new IllegalArgumentException("md must be positive for executable work and zero or more for an Epic");
        }
        if (!epic && assignee == null) {
            throw new IllegalArgumentException("assignee is required for executable work");
        }
        if (stack == null) {
            stack = TaskStack.UNCLASSIFIED;
            stackSource = TaskStackSource.NONE;
        } else if (stackSource == null) {
            stackSource = TaskStackSource.NONE;
        }
        prjTaskLabels = prjTaskLabels == null ? List.of() : List.copyOf(prjTaskLabels);
    }

    /**
     * Builds a task with no committed end date: the window falls back to full dedication,
     * {@code start + MD working days}, skipping weekends and the assignee's absences.
     */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, Predicate<LocalDate> extraBlockedDays) {
        return create(key, summary, issueType, assignee, actualStartDate, plannedStartDate, startDateSource,
                md, status, null, extraBlockedDays, null, 0L,
                assignee.role().stack(), TaskStackSource.PERSON_ROLE, List.of());
    }

    /**
     * Builds a task, using {@code committedEndDate} as the calendar commitment when the
     * maintained schedule supplies one. Without it the task is flagged as having no calendar
     * window and falls back to {@code start + MD working days}, i.e. 100% dedication.
     */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, long loggedSeconds) {
        return create(key, summary, issueType, assignee, actualStartDate, plannedStartDate, startDateSource,
                md, status, committedEndDate, extraBlockedDays, epicKey, loggedSeconds,
                assignee.role().stack(), TaskStackSource.PERSON_ROLE, List.of());
    }

    /** Builds a task with an explicitly resolved effective stack and its source. */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, long loggedSeconds,
                                   TaskStack stack, TaskStackSource stackSource) {
        return create(key, summary, issueType, assignee, actualStartDate, plannedStartDate, startDateSource,
                md, status, committedEndDate, extraBlockedDays, epicKey, loggedSeconds,
                stack, stackSource, List.of());
    }

    /** Builds a task with an explicitly resolved effective stack and PRJ task labels. */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, long loggedSeconds,
                                   TaskStack stack, TaskStackSource stackSource, List<String> prjTaskLabels) {
        LocalDate displayStart = actualStartDate != null ? actualStartDate : plannedStartDate;
        boolean committed = committedEndDate != null && !committedEndDate.isBefore(displayStart);
        LocalDate endDate = committed
                ? committedEndDate
                : WorkingDays.endFrom(displayStart, fallbackWorkingDays(md), extraBlockedDays);
        return new GanttTask(key, summary, issueType, assignee, actualStartDate, plannedStartDate,
                startDateSource, md, status, endDate, committed, epicKey, null, null, loggedSeconds,
                stack, stackSource, prjTaskLabels, false);
    }

    /** Builds a task with an explicitly resolved effective stack, PRJ task labels and its Jira parent. */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, String milestoneKey,
                                   long loggedSeconds, TaskStack stack, TaskStackSource stackSource,
                                   List<String> prjTaskLabels) {
        return create(key, summary, issueType, assignee, actualStartDate, plannedStartDate, startDateSource,
                md, status, committedEndDate, extraBlockedDays, epicKey, milestoneKey, null, loggedSeconds,
                stack, stackSource, prjTaskLabels);
    }

    /** Builds a task carrying its Jira {@code parentKey}, used to discount sub-task effort from a parent's load. */
    public static GanttTask create(String key, String summary, String issueType, TeamMember assignee,
                                   LocalDate actualStartDate, LocalDate plannedStartDate, StartDateSource startDateSource,
                                   double md, String status, LocalDate committedEndDate,
                                   Predicate<LocalDate> extraBlockedDays, String epicKey, String milestoneKey,
                                   String parentKey, long loggedSeconds, TaskStack stack, TaskStackSource stackSource,
                                   List<String> prjTaskLabels) {
        LocalDate displayStart = actualStartDate != null ? actualStartDate : plannedStartDate;
        boolean committed = committedEndDate != null && !committedEndDate.isBefore(displayStart);
        LocalDate endDate = committed
                ? committedEndDate
                : WorkingDays.endFrom(displayStart, fallbackWorkingDays(md), extraBlockedDays);
        return new GanttTask(key, summary, issueType, assignee, actualStartDate, plannedStartDate,
                startDateSource, md, status, endDate, committed, epicKey, milestoneKey, parentKey, loggedSeconds,
                stack, stackSource, prjTaskLabels, false);
    }

    public static GanttTask createEpic(String key, String summary, LocalDate startDate,
                                       LocalDate endDate, StartDateSource source, String status) {
        if (startDate == null || endDate == null || endDate.isBefore(startDate)) {
            throw new IllegalArgumentException("Epic requires a valid planned date range");
        }
        return new GanttTask(key, summary, "Epic", null, startDate, startDate, source,
                0, status, endDate, true, key, null, null, 0L,
                TaskStack.UNCLASSIFIED, TaskStackSource.NONE, List.of(), false);
    }

    /**
     * Copy of this task with its effort estimate reduced to {@code effectiveMd}, keeping the
     * exact same committed window untouched - used solely to discount a Jira Sub-task's
     * effort from its parent's load in the workload report. The Gantt itself never sees this
     * copy: it always reads the task built straight from Jira, so its dates never move.
     *
     * @throws IllegalArgumentException if {@code effectiveMd} would leave a non-Epic task
     *                                  at zero; callers must drop the task instead of calling
     *                                  this with a fully-absorbed estimate
     */
    public GanttTask withEffectiveMd(double effectiveMd) {
        return new GanttTask(key, summary, issueType, assignee, actualStartDate, plannedStartDate,
                startDateSource, effectiveMd, status, plannedEndDate, hasCalendarWindow, epicKey, milestoneKey,
                parentKey, loggedSeconds, stack, stackSource, prjTaskLabels, inheritedEffort);
    }

    public GanttTask withInheritedEffort() {
        return new GanttTask(key, summary, issueType, assignee, actualStartDate, plannedStartDate,
                startDateSource, md, status, plannedEndDate, hasCalendarWindow, epicKey, milestoneKey,
                parentKey, loggedSeconds, stack, stackSource, prjTaskLabels, true);
    }

    private static int fallbackWorkingDays(double md) {
        return (int) Math.ceil(md * WorkContour.HOURS_PER_MD / WorkContour.PRODUCTIVE_HOURS_PER_DAY);
    }

    /** The date actually rendered on the roadmap: the real Jira date when there is one. */
    public LocalDate displayStartDate() {
        return actualStartDate != null ? actualStartDate : plannedStartDate;
    }

    /** Alias of {@link #displayStartDate()}. */
    public LocalDate start() {
        return displayStartDate();
    }

    /** Alias of {@link #plannedEndDate()}: the single end date of the calendar commitment. */
    public LocalDate end() {
        return plannedEndDate();
    }

    /** Total effort of this task in hours ({@code MD × 8}). */
    public double workHours() {
        return md * WorkContour.HOURS_PER_MD;
    }

    /** Hours actually logged against this issue in Jira. */
    public double loggedHours() {
        return loggedSeconds / 3600.0;
    }

    /**
     * Effort still owed: the estimate minus what has really been logged.
     *
     * <p>This is what makes availability a fact rather than an assumption. Without it the only
     * way to read a week that is already half spent is to assume the work planned for Monday
     * got done - an assumption nothing in the data supports. Logged hours answer it instead.
     *
     * <p>Clamped at zero: a task that burned more hours than estimated owes nothing further,
     * it simply cost more than planned, and that overrun belongs to a velocity report rather
     * than to future capacity.
     */
    public double remainingWorkHours() {
        return Math.max(0, workHours() - loggedHours());
    }

    /** {@code true} once Jira has at least one hour logged against this issue. */
    public boolean hasLoggedTime() {
        return loggedSeconds > 0;
    }

    /**
     * {@code true} when the start date was not read directly from Jira - drives the
     * dashed-border treatment in the widget.
     */
    public boolean estimated() {
        return !startDateSource.isActual();
    }

    /**
     * {@code true} when this task has effort but no committed calendar window, so its
     * dedication had to be assumed at 100%. These surface in the "sin ventana" tray.
     */
    public boolean missingCalendarWindow() {
        return !hasCalendarWindow;
    }

    public boolean isContextWork() {
        return "Epic".equalsIgnoreCase(issueType) || "User Story".equalsIgnoreCase(issueType);
    }

    public String effectiveEpicKey() {
        return epicKey == null || epicKey.isBlank() ? null : epicKey;
    }

    public String effectiveMilestoneKey() {
        return milestoneKey == null || milestoneKey.isBlank() ? null : milestoneKey;
    }

    public String initiativeKey() {
        String milestone = effectiveMilestoneKey();
        return milestone == null ? effectiveEpicKey() : milestone;
    }
    public boolean isEpic() {
        return "Epic".equalsIgnoreCase(issueType);
    }

    public boolean isUserStory() {
        return "User Story".equalsIgnoreCase(issueType);
    }

    public boolean missingEpic() {
        return effectiveEpicKey() == null;
    }

    public boolean missingInitiative() {
        return initiativeKey() == null;
    }

    public String color() {
        return EpicPalette.colorFor(initiativeKey());
    }
}
