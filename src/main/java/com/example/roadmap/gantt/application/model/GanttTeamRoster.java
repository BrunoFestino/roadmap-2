package com.example.roadmap.gantt.application.model;

import com.example.roadmap.config.TeamRosterProperties;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * Configured example roster: Jira username to display name and role.
 *
 * <p>Each {@code ROADMAP_TEAM_MEMBERS} entry uses
 * {@code username|display name|role}. Entries are comma-separated and retain their order.
 */
public final class GanttTeamRoster {

    private static final Pattern MEMBER_ENTRY =
            Pattern.compile("([^|,]+)\\|(.+?)\\|([^|,]+)(?:,|$)");

    private final Map<String, TeamMember> members;

    public GanttTeamRoster(TeamRosterProperties properties) {
        Map<String, TeamMember> parsed = new LinkedHashMap<>();
        String configuredMembers = properties.members();
        Matcher matcher = MEMBER_ENTRY.matcher(configuredMembers);
        int parsedUntil = 0;
        while (matcher.find()) {
            if (matcher.start() != parsedUntil) {
                throw invalidEntry(configuredMembers.substring(parsedUntil));
            }
            String entry = matcher.group();
            String username = required(matcher.group(1), "username", entry);
            String name = required(matcher.group(2), "display name", entry);
            String roleName = required(matcher.group(3), "role", entry).toUpperCase(Locale.ROOT);
            Role role;
            try {
                role = Role.valueOf(roleName);
            } catch (IllegalArgumentException exception) {
                throw new IllegalArgumentException("Invalid role " + roleName
                        + " in roadmap.team.members. Allowed values: FRONTEND, BACKEND, MOBILE, DEVOPS, PO, SQC",
                        exception);
            }
            TeamMember previous = parsed.putIfAbsent(username, new TeamMember(username, name, role));
            if (previous != null) {
                throw new IllegalArgumentException("Duplicate Jira username in roadmap.team.members: " + username);
            }
            parsedUntil = matcher.end();
        }
        if (parsedUntil != configuredMembers.length()) {
            throw invalidEntry(configuredMembers.substring(parsedUntil));
        }
        if (parsed.isEmpty()) {
            throw new IllegalArgumentException("roadmap.team.members must contain at least one member");
        }
        members = java.util.Collections.unmodifiableMap(new LinkedHashMap<>(parsed));
    }

    private static IllegalArgumentException invalidEntry(String entry) {
        return new IllegalArgumentException("Invalid roadmap.team.members entry: " + entry
                + ". Expected username|display name|role");
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