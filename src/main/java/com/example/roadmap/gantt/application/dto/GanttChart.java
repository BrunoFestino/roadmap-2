package com.example.roadmap.gantt.application.dto;

import com.example.roadmap.gantt.application.model.Milestone;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

/**
 * A complete Gantt ready to render: the timeline bounds (used to scale every bar), the
 * ordered groups and the milestones to mark. Both {@code BuildRoleGanttUseCase} and
 * {@code BuildPersonGanttUseCase} produce this same shape so the UI is view-agnostic.
 *
 * @param timelineStart earliest planned start across all tasks (inclusive)
 * @param timelineEnd   latest planned end across all tasks (inclusive)
 * @param groups        ordered groups to render top to bottom
 * @param milestones    milestones to mark on the timeline (not rows/bars)
 */
public record GanttChart(
        LocalDate timelineStart,
        LocalDate timelineEnd,
        List<GanttGroup> groups,
        List<Milestone> milestones) {

    public GanttChart {
        groups = groups == null ? List.of() : List.copyOf(groups);
        milestones = milestones == null ? List.of() : List.copyOf(milestones);
    }

    public boolean isEmpty() {
        return groups.isEmpty() || timelineStart == null || timelineEnd == null;
    }

    /** Calendar days between {@link #timelineStart()} and {@code date} (may be negative). */
    public long dayOffset(LocalDate date) {
        if (timelineStart == null || date == null) {
            return 0;
        }
        return ChronoUnit.DAYS.between(timelineStart, date);
    }

    /** Total inclusive span of the timeline in calendar days (at least 1). */
    public long totalDays() {
        if (timelineStart == null || timelineEnd == null) {
            return 1;
        }
        return Math.max(1, ChronoUnit.DAYS.between(timelineStart, timelineEnd) + 1);
    }
}