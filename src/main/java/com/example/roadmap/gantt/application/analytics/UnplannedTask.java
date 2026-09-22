package com.example.roadmap.gantt.application.analytics;

import java.time.LocalDate;

/**
 * A task that is on the roadmap but is missing something the schedule needs: a committed
 * calendar window, or an explicit effort estimate.
 *
 * <p>A task without a local Target End is excluded from the Gantt and workload: Jira dates do
 * not substitute for the locally committed calendar window. A task without an effort estimate
 * is likewise excluded.
 *
 * <p>Rather than hide either case, every such task is listed in the roadmap's "necesita
 * atención" tray with its owner, the {@link #reason()} it needs attention, and a link to
 * Jira, so the team can agree on real dates or load a real estimate.
 *
 * @param taskKey      Jira issue key, e.g. {@code "TEST-10608"}
 * @param summary      short human-readable title
 * @param issueType    Jira issue type
 * @param assigneeName display name of the person who owns the task
 * @param roleLabel    the owner's role
 * @param roleColor    role colour, shared with the roadmap bars
 * @param status       Jira workflow status, may be {@code null}
 * @param startDate    the start the roadmap did resolve, {@code null} when there is none
 * @param assumedEnd   retained for display compatibility; {@code null} when the local Target End is missing
 * @param md           effort estimate in man-days, {@code 0} when {@link #reason()} is {@link UnplannedReason#NO_ESTIMATE}
 * @param jiraUrl      absolute link to the issue in Jira
 * @param reason       why the task landed in this tray
 */
public record UnplannedTask(
        String taskKey,
        String summary,
        String issueType,
        String assigneeName,
        String roleLabel,
        String roleColor,
        String status,
        LocalDate startDate,
        LocalDate assumedEnd,
        double md,
        String jiraUrl,
        UnplannedReason reason) {
}
