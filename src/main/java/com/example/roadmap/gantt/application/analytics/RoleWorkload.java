package com.example.roadmap.gantt.application.analytics;
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
 * One role's aggregated workload: the group header of the "Carga del equipo" grid.
 *
 * <p>A role total is deliberately only a summary of its people. Overallocation is always
 * detected per person first — a role sitting at 80% can still hide someone at 160% next to
 * someone at 40% — so {@link #overallocatedPeopleInWeek(int)} exists to surface that inside
 * an otherwise healthy-looking row.
 *
 * @param roleLabel  role bucket label, e.g. {@code "Backend"}
 * @param roleColor  role colour, shared with the roadmap bars
 * @param people     the members of this role, in roster order
 * @param weeks      one aggregated {@link WeekLoad} per week of the horizon
 * @param freeFrom   earliest week any member of the role becomes available, {@code null}
 *                   when the whole role is busy across the horizon
 */
public record RoleWorkload(
        String roleLabel,
        String roleColor,
        List<PersonWorkload> people,
        List<WeekLoad> weeks,
        LocalDate freeFrom) {

    /** Number of people in this role whose {@code index}-th week is overallocated. */
    public long overallocatedPeopleInWeek(int index) {
        return people.stream()
                .filter(person -> index < person.weeks().size() && person.weeks().get(index).overallocated())
                .count();
    }

    public int headcount() {
        return people.size();
    }

    /**
     * Sums a set of people into one week-by-week row. Exposed because the view has to be able
     * to rebuild the role total from the people actually on screen: with a person or role
     * filter applied, a stored total would keep describing people the user has filtered out.
     *
     * <p>Capacity, remaining capacity and remaining work all add up plainly. Remaining days do
     * not — they are a calendar fact rather than a quantity — so the row takes the longest
     * view any of its members has of the week.
     */
    public static List<WeekLoad> aggregate(List<PersonWorkload> people, List<LocalDate> weekStarts) {
        List<WeekLoad> aggregated = new ArrayList<>(weekStarts.size());
        for (int index = 0; index < weekStarts.size(); index++) {
            final int week = index;
            double assigned = sum(people, week, WeekLoad::assignedHours);
            double capacity = sum(people, week, WeekLoad::capacityHours);
            long remainingDays = people.stream()
                    .filter(person -> week < person.weeks().size())
                    .mapToLong(person -> person.weeks().get(week).remainingWorkingDays())
                    .max().orElse(0);
            aggregated.add(new WeekLoad(weekStarts.get(index), weekStarts.get(index).plusDays(6),
                    assigned, capacity, capacity <= 0 ? 0 : assigned * 100.0 / capacity,
                    remainingDays,
                    sum(people, week, WeekLoad::remainingCapacityHours),
                    sum(people, week, WeekLoad::remainingAssignedHours),
                    sum(people, week, WeekLoad::carriedOverHours),
                    List.of()));
        }
        return aggregated;
    }

    private static double sum(List<PersonWorkload> people, int week, ToDoubleFunction<WeekLoad> field) {
        return people.stream()
                .filter(person -> week < person.weeks().size())
                .mapToDouble(person -> field.applyAsDouble(person.weeks().get(week)))
                .sum();
    }
}