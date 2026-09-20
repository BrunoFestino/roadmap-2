package com.example.roadmap.gantt.application.analytics;

import java.time.LocalDate;
import java.util.List;

/**
 * Everything the workload views need, computed once per page load.
 *
 * <p>The three sections it feeds map one-to-one onto Microsoft Project's resource views, and
 * each answers exactly one management question:
 * <ul>
 *   <li>{@link #roles()} and their people → <em>Resource Usage</em>: how many hours does
 *       each person have booked each week, and which tasks are they?</li>
 *   <li>{@link #weekStarts()} plus each person's weeks → <em>Resource Graph</em>: when does
 *       someone break their capacity, and by how much?</li>
 *   <li>{@link #freeFromByPerson()} via {@link PersonWorkload#freeFrom()} →
 *       <em>Remaining Availability</em>: who can take new work, and from when?</li>
 * </ul>
 *
 * <p>{@link #unplannedTasks()} is not a view of load but of data quality: tasks missing a
 * committed calendar window, an explicit effort estimate, or both.
 *
 * @param asOf                  the date the report was computed for
 * @param horizonStart          first day of the reporting horizon (inclusive)
 * @param horizonEnd            last day of the reporting horizon (inclusive)
 * @param weekStarts            start date of every week bucket, chronologically
 * @param roles                 role groups, each carrying its people, in roadmap role order
 * @param unplannedTasks        tasks missing a calendar window or an effort estimate
 * @param warnings              date-related planning issues (overdue tasks, windows with no
 *                              available days)
 */
public record WorkloadReport(
        LocalDate asOf,
        LocalDate horizonStart,
        LocalDate horizonEnd,
        List<LocalDate> weekStarts,
        List<RoleWorkload> roles,
        List<UnplannedTask> unplannedTasks,
        List<PlanningWarning> warnings) {

    /** Every person in the report, flattened out of their role groups. */
    public List<PersonWorkload> people() {
        return roles.stream().flatMap(role -> role.people().stream()).toList();
    }

    /** People who can absorb new work at some point in the horizon, soonest first. */
    public List<PersonWorkload> freeFromByPerson() {
        return people().stream()
                .filter(person -> person.freeFrom() != null)
                .sorted((a, b) -> a.freeFrom().compareTo(b.freeFrom()))
                .toList();
    }

    /** People with at least one overallocated week: the ones a manager has to act on. */
    public List<PersonWorkload> overallocatedPeople() {
        return people().stream().filter(PersonWorkload::hasOverallocation).toList();
    }

    public boolean isEmpty() {
        return roles.isEmpty();
    }
}
