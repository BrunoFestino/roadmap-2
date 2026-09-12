package com.example.roadmap.gantt.application.analytics;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;
import java.util.function.ToDoubleFunction;

/**
 * One role's aggregated workload: the group header of the "Carga del equipo" grid.
 *
 * <p>A role total is deliberately only a summary of its people. Overallocation is always
 * detected per person first - a role sitting at 80% can still hide someone at 160% next to
 * someone at 40% - so {@link #overallocatedPeopleInWeek(int)} exists to surface that inside
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
     * not - they are a calendar fact rather than a quantity - so the row takes the longest
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