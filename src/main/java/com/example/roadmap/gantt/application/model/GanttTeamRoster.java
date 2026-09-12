package com.example.roadmap.gantt.application.model;

import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * The AR1 (Argentina) team roster: Jira username to team member (display name + role).
 *
 * <p>Jira has no first-class "team" concept, so this is the single source of truth for
 * which assignees belong to AR1. The Jira data provider uses {@link #usernames()} to scope
 * its JQL to exactly these people (so e.g. a DevOps engineer working across countries only
 * shows their AR1-relevant work), and {@link #byUsername(String)} to resolve each issue's
 * assignee back to a display name and role.
 */
public final class GanttTeamRoster {

    private static final Map<String, TeamMember> MEMBERS = new LinkedHashMap<>();

    static {
        register("bfestino", "Bruno Festino", Role.MOBILE);
        register("dgillig", "David Gillig", Role.MOBILE);
        register("agrigaliun", "Agustin Grigaliunas", Role.FULL_STACK);
        register("mbazante", "Mauro Bazante", Role.FRONTEND);
        register("tarteaga", "Tony Arteaga", Role.BACKEND);
        register("sreza1", "Juan Sebastian Reza", Role.BACKEND);
        register("mmendoza", "Mateo Mendoza", Role.BACKEND);
        register("sbenalcaza", "Sebastian Benalcazar", Role.FULL_STACK);
        register("rdente", "Rodrigo Dente", Role.DEVOPS);
    }

    private GanttTeamRoster() {
    }

    private static void register(String username, String name, Role role) {
        MEMBERS.put(username, new TeamMember(username, name, role));
    }

    /** All AR1 team members, in roster order. */
    public static List<TeamMember> members() {
        return List.copyOf(MEMBERS.values());
    }

    /** Jira usernames of the whole AR1 team, in roster order (for JQL assignee filters). */
    public static List<String> usernames() {
        return List.copyOf(MEMBERS.keySet());
    }

    /** The team member for a Jira username, or {@code null} if they are not on the AR1 roster. */
    public static TeamMember byUsername(String username) {
        return username == null ? null : MEMBERS.get(username);
    }
}