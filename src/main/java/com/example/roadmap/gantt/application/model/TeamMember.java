package com.example.roadmap.gantt.application.model;



/**
 * A member of the roadmap team, identified by Jira username, display name and
 * {@link Role}.
 *
 * @param username Jira username used to match issue assignees (e.g. {@code "mjohnson"})
 * @param name     display name, e.g. {@code "Maria Johnson"}
 * @param role     the member's role, which drives grouping and bar colour in both Gantt views
 */
public record TeamMember(String username, String name, Role role) {
}