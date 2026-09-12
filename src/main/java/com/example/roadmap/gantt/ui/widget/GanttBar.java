package com.example.roadmap.gantt.ui.widget;

import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.vaadin.flow.component.html.Div;

/**
 * A single Gantt bar: an absolutely positioned div, sized to exactly {@code working days *
 * PX_PER_DAY} pixels - no artificial minimum width, so a short task is never visually
 * stretched. Narrow bars get a heavier border so they stay visible next to longer ones, and
 * bars with an inferred (rather than Jira-read) schedule get a dashed border.
 */
final class GanttBar {

    private GanttBar() {
    }

    static Div create(int width, String color, boolean estimated, boolean narrow, String tooltip) {
        Div bar = new Div();
        bar.getElement().setAttribute("title", tooltip);
        bar.getStyle()
                .set("position", "absolute")
                .set("left", "0")
                .set("top", "50%")
                .set("transform", "translateY(-50%)")
                .set("width", Math.max(width, 3) + "px")
                .set("height", GanttStyle.BAR_HEIGHT + "px")
                .set("box-sizing", "border-box")
                .set("background", color)
                .set("border-radius", "4px")
                .set("border", (narrow ? "2px " : "1px ") + (estimated ? "dashed " : "solid ") + GanttStyle.BAR_BORDER)
                .set("box-shadow", "0 1px 2px rgba(31,42,48,0.20)");
        return bar;
    }
}