package com.example.roadmap.gantt.application.analytics;

import java.time.LocalDate;

/**
 * A task that is on the roadmap but has no committed calendar window in the database schedule.
 *
 * <p>Because the roadmap now models {@code Work = Duration × Units}, a task without an end
 * date has no duration to spread its effort over, so the report has to assume full
 * dedication: the window becomes {@code start + MD working days}. That assumption is safe
 * but usually wrong, and it silently inflates the owner's load.
 *
 * <p>Rather than hide it, every such task is listed in the roadmap's "sin ventana" tray with
 * its owner and a link to Jira, so the team can agree on real dates and record them in the database.
 *
 * @param taskKey      Jira issue key, e.g. {@code "TTAR-10608"}
 * @param summary      short human-readable title
 * @param issueType    Jira issue type
 * @param assigneeName display name of the person who owns the task
 * @param roleLabel    the owner's role
 * @param roleColor    role colour, shared with the roadmap bars
 * @param status       Jira workflow status, may be {@code null}
 * @param startDate    the start the roadmap did resolve, always present
 * @param assumedEnd   the end the roadmap had to assume at 100% dedication
 * @param md           effort estimate in man-days
 * @param mdEstimated  {@code true} when even the effort was defaulted rather than read
 * @param jiraUrl      absolute link to the issue in Jira
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
        int md,
        boolean mdEstimated,
        String jiraUrl) {
}