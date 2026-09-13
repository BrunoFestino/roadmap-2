package com.example.roadmap.gantt.application.model;

import com.example.roadmap.config.TeamRosterProperties;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;

/**
 * Configured AR1 roster: Jira username to display name and role.
 *
 * <p>Each {@code ROADMAP_TEAM_MEMBERS} entry uses
 * {@code username|display name|role}. Entries are comma-separated and retain their order.
 */
public final class GanttTeamRoster {

    private final Map<String, TeamMember> members;

    public GanttTeamRoster(TeamRosterProperties properties) {
        Map<String, TeamMember> parsed = new LinkedHashMap<>();
        for (String entry : properties.members().split(",", -1)) {
            String[] parts = entry.trim().split("\\|", -1);
            if (parts.length != 3) {
                throw new IllegalArgumentException("Invalid roadmap.team.members entry: " + entry
                        + ". Expected username|display name|role");
            }
            String username = required(parts[0], "username", entry);
            String name = required(parts[1], "display name", entry);
            String roleName = required(parts[2], "role", entry).toUpperCase(Locale.ROOT);
            Role role;
            try {
                role = Role.valueOf(roleName);
            } catch (IllegalArgumentException exception) {
                throw new IllegalArgumentException("Invalid role " + roleName
                        + " in roadmap.team.members. Allowed values: FRONTEND, BACKEND, MOBILE, DEVOPS", exception);
            }
            TeamMember previous = parsed.putIfAbsent(username, new TeamMember(username, name, role));
            if (previous != null) {
                throw new IllegalArgumentException("Duplicate Jira username in roadmap.team.members: " + username);
            }
        }
        if (parsed.isEmpty()) {
            throw new IllegalArgumentException("roadmap.team.members must contain at least one member");
        }
        members = java.util.Collections.unmodifiableMap(new LinkedHashMap<>(parsed));
    }

    public static GanttTeamRoster defaults() {
        return new GanttTeamRoster(TeamRosterProperties.defaults());
    }

    /** All configured team members, in roster order. */
    public List<TeamMember> members() {
        return List.copyOf(members.values());
    }

    /** Jira usernames of the configured team, in roster order. */
    public List<String> usernames() {
        return List.copyOf(members.keySet());
    }

    /** The team member for a Jira username, or {@code null} when it is outside the roster. */
    public TeamMember byUsername(String username) {
        return username == null ? null : members.get(username);
    }

    private static String required(String value, String field, String entry) {
        String normalized = value.trim();
        if (normalized.isEmpty()) {
            throw new IllegalArgumentException("Missing " + field + " in roadmap.team.members entry: " + entry);
        }
        return normalized;
    }
}
