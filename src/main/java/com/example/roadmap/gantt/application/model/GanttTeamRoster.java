package com.example.roadmap.gantt.application.model;
import com.example.roadmap.config.*;
import com.example.roadmap.jira.*;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.ui.*;
import com.example.roadmap.gantt.ui.style.*;
import com.example.roadmap.gantt.ui.widget.*;
import com.example.roadmap.ui.*;

import com.fasterxml.jackson.annotation.*;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.applayout.*;
import com.vaadin.flow.component.button.*;
import com.vaadin.flow.component.checkbox.*;
import com.vaadin.flow.component.combobox.*;
import com.vaadin.flow.component.datepicker.*;
import com.vaadin.flow.component.dependency.*;
import com.vaadin.flow.component.dialog.*;
import com.vaadin.flow.component.grid.*;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.component.notification.*;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.select.*;
import com.vaadin.flow.component.sidenav.*;
import com.vaadin.flow.component.textfield.*;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.*;
import com.vaadin.flow.component.page.*;
import com.vaadin.flow.component.details.*;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.theme.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.web.client.*;
import java.net.*;
import java.net.http.*;
import java.nio.charset.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
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