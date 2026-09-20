package com.example.roadmap.gantt.ui.widget;

import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;

/** Uses inclusive calendar days for both position and width. */
final class GanttScale {

    private GanttScale() {
    }

    static int xOf(GanttChart chart, LocalDate date, int pixelsPerDay) {
        long days = chart.dayOffset(date);
        return GanttStyle.LEFT_COL + GanttStyle.TIMELINE_GAP
                + (int) Math.round(days * (double) pixelsPerDay);
    }

    static int widthOf(LocalDate start, LocalDate end, int pixelsPerDay) {
        long days = Math.max(1, ChronoUnit.DAYS.between(start, end) + 1);
        return (int) Math.round(days * (double) pixelsPerDay);
    }
}
