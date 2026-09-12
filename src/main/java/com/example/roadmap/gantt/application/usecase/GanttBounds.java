package com.example.roadmap.gantt.application.usecase;

import com.example.roadmap.gantt.application.model.GanttTask;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

/**
 * Timeline window shared by the two build use cases: a fixed one-week look-back from today
 * (just enough context on what was already in flight), through one week past the last
 * planned task. Tasks that wrapped up entirely before that look-back cutoff are dropped
 * from the roadmap altogether - this is a forward-looking planning view, not a history -
 * and any task still open across the cutoff has its bar visually clamped so no date before
 * it is ever drawn (see {@code GanttLanePacker}).
 */
final class GanttBounds {

    private static final long LOOKBACK_WEEKS = 1;
    private static final long LOOKAHEAD_WEEKS = 1;

    private GanttBounds() {
    }

    /** The fixed cutoff: tasks finished before this date are dropped, the timeline never shows earlier dates. */
    static LocalDate cutoff() {
        return LocalDate.now().minusWeeks(LOOKBACK_WEEKS);
    }

    /** Keeps only tasks still relevant to a forward-looking roadmap: those ending on/after {@link #cutoff()}. */
    static List<GanttTask> withinWindow(Collection<GanttTask> tasks) {
        LocalDate cutoff = cutoff();
        return tasks.stream().filter(t -> !t.end().isBefore(cutoff)).toList();
    }

    /** Always exactly one week before today: the timeline never shows anything earlier. */
    static LocalDate min(Collection<GanttTask> tasks) {
        return cutoff();
    }

    /** One week after the last planned task's end, or one week after today if there are none. */
    static LocalDate max(Collection<GanttTask> tasks) {
        LocalDate lastTaskEnd = tasks.stream()
                .map(GanttTask::end)
                .max(LocalDate::compareTo)
                .orElse(LocalDate.now());
        return lastTaskEnd.plusWeeks(LOOKAHEAD_WEEKS);
    }
}