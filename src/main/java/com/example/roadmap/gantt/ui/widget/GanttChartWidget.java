package com.example.roadmap.gantt.ui.widget;

import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.EpicPalette;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Milestone;
import com.example.roadmap.gantt.application.model.WorkingDays;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.Span;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;

/**
 * Renders a {@link GanttChart} as an absolutely positioned, fixed pixel-per-day canvas.
 *
 * <p>Each group (a role or a person) gets its tasks packed into sub-lanes by
 * {@link GanttLanePacker} so overlapping tasks are never hidden behind one another. Every
 * bar's width is {@code working days * PX_PER_DAY} - never stretched or clamped - with its
 * planned finish date always drawn next to it. Milestones are full-height dashed markers on
 * the timeline, never rows.
 */
public class GanttChartWidget extends Div {

    private static final DateTimeFormatter DAY_MONTH = DateTimeFormatter.ofPattern("dd/MM", Locale.forLanguageTag("es-AR"));
    /** Horizontal room a {@code dd/MM} label needs when drawn to the left of a bar. */
    private static final int START_LABEL_W = 38;
    /** Narrowest bar that can still hold the start date inside it next to the title. */
    private static final int START_LABEL_INSIDE_MIN_W = 74;
    private static final DateTimeFormatter WEEK_LABEL =
            DateTimeFormatter.ofPattern("EEE d MMM", Locale.forLanguageTag("es-AR"));
    private static final DateTimeFormatter MONTH_LABEL =
            DateTimeFormatter.ofPattern("MMMM yyyy", Locale.forLanguageTag("es-AR"));

    private final transient GanttChart chart;
    private final int pixelsPerDay;
    private final int axisStepDays;
    private final LocalDate today = LocalDate.now();

    public GanttChartWidget(GanttChart chart) {
        this(chart, GanttStyle.PX_PER_DAY, 7);
    }

    public GanttChartWidget(GanttChart chart, int pixelsPerDay) {
        this(chart, pixelsPerDay, 7);
    }

    public GanttChartWidget(GanttChart chart, int pixelsPerDay, int axisStepDays) {
        this.chart = chart;
        this.pixelsPerDay = Math.max(6, pixelsPerDay);
        this.axisStepDays = Math.max(1, axisStepDays);

        setWidthFull();
        getStyle()
                .set("padding", "16px")
                .set("background", GanttStyle.CARD_BG)
                .set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "12px")
                .set("box-shadow", "0 2px 8px rgba(31,42,48,0.08)")
                .set("box-sizing", "border-box")
                .set("overflow-x", "auto");

        if (chart.isEmpty()) {
            add(note("No data to display."));
            return;
        }

        List<GroupLayout> layouts = layout();
        int totalWidth = GanttStyle.LEFT_COL + (int) (chart.totalDays() * pixelsPerDay) + 60;
        int totalHeight = layouts.isEmpty() ? GanttStyle.HEADER_H : layouts.get(layouts.size() - 1).bottom() + 10;

        Div content = new Div();
        content.getStyle()
                .set("position", "relative")
                .set("width", totalWidth + "px")
                .set("height", totalHeight + "px")
                .set("font-family", GanttStyle.FONT);

        content.add(weekendBands(totalHeight));
        content.add(monthAxis());
        content.add(weekAxis());
        content.add(todayMarker(totalHeight));
        content.add(milestoneMarkers(totalHeight));

        for (GroupLayout g : layouts) {
            content.add(groupLabel(g));
            content.add(groupDivider(g));
            if (g.group.tasks().isEmpty()) {
                content.add(emptyNote(g));
            } else {
                for (GanttLanePacker.Placed placed : g.placed) {
                    content.add(taskBar(g, placed));
                }
            }
        }

        add(content);
    }

    // ── layout computation ──────────────────────────────────────────────────────────

    private record GroupLayout(GanttGroup group, int top, List<GanttLanePacker.Placed> placed) {
        int laneCount() {
            return placed.isEmpty() ? 1 : GanttLanePacker.laneCount(placed);
        }

        int height() {
            int lanes = laneCount();
            return GanttStyle.ROW_PAD * 2 + lanes * GanttStyle.LANE_HEIGHT + (lanes - 1) * GanttStyle.LANE_GAP;
        }

        int bottom() {
            return top + height();
        }
    }

    private List<GroupLayout> layout() {
        List<GroupLayout> layouts = new ArrayList<>();
        int y = GanttStyle.HEADER_H;
        for (GanttGroup group : chart.groups()) {
            List<GanttLanePacker.Placed> placed =
                    group.tasks().isEmpty() ? List.of() : GanttLanePacker.pack(chart, group.tasks(), pixelsPerDay);
            GroupLayout g = new GroupLayout(group, y, placed);
            layouts.add(g);
            y = g.bottom() + GanttStyle.GROUP_GAP;
        }
        return layouts;
    }

    // ── background layers ────────────────────────────────────────────────────────────

    private Div weekendBands(int totalHeight) {
        Div wrap = new Div();
        wrap.getStyle().set("position", "absolute").set("top", "0").set("left", "0")
                .set("width", "100%").set("height", "100%").set("pointer-events", "none");

        long days = chart.totalDays();
        for (long i = 0; i < days; i++) {
            LocalDate date = chart.timelineStart().plusDays(i);
            if (!WorkingDays.isWeekend(date)) {
                continue;
            }
            Div band = new Div();
            band.getStyle()
                    .set("position", "absolute")
                    .set("left", (GanttStyle.LEFT_COL + i * pixelsPerDay) + "px")
                    .set("top", (GanttStyle.HEADER_H - 8) + "px")
                    .set("width", pixelsPerDay + "px")
                    .set("height", (totalHeight - GanttStyle.HEADER_H + 8) + "px")
                    .set("background", GanttStyle.WEEKEND_BG);
            wrap.add(band);
        }
        return wrap;
    }

    private Div weekAxis() {
        Div axis = new Div();
        axis.getStyle().set("position", "absolute").set("top", "0").set("left", "0")
                .set("width", "100%").set("height", (GanttStyle.HEADER_H - 8) + "px");

        LocalDate cursor = chart.timelineStart();
        while (!cursor.isAfter(chart.timelineEnd())) {
            int x = GanttScale.xOf(chart, cursor, pixelsPerDay);

            Div line = new Div();
            line.getStyle().set("position", "absolute").set("left", x + "px")
                    .set("top", (GanttStyle.HEADER_H - 10) + "px").set("bottom", "0")
                    .set("width", "1px").set("background", GanttStyle.GRIDLINE);
            axis.add(line);

            Span label = new Span(capitalize(WEEK_LABEL.format(cursor)));
            label.getStyle().set("position", "absolute").set("left", (x + 3) + "px")
                    .set("bottom", "4px").set("font-size", "10.5px").set("color", GanttStyle.MUTED);
            axis.add(label);

            cursor = cursor.plusDays(axisStepDays);
        }
        return axis;
    }

    private Div monthAxis() {
        Div axis = new Div();
        axis.getStyle().set("position", "absolute").set("top", "0").set("left", "0")
                .set("width", "100%").set("height", "24px");

        LocalDate cursor = chart.timelineStart().with(TemporalAdjusters.firstDayOfMonth());
        while (!cursor.isAfter(chart.timelineEnd())) {
            LocalDate visibleStart = cursor.isBefore(chart.timelineStart()) ? chart.timelineStart() : cursor;
            int x = GanttScale.xOf(chart, visibleStart, pixelsPerDay);

            Div line = new Div();
            line.getStyle().set("position", "absolute").set("left", x + "px").set("top", "0")
                    .set("height", (GanttStyle.HEADER_H - 8) + "px").set("width", "1px")
                    .set("background", GanttStyle.BORDER);
            axis.add(line);

            Span label = new Span(capitalize(MONTH_LABEL.format(cursor)));
            label.getStyle().set("position", "absolute").set("left", (x + 4) + "px").set("top", "2px")
                    .set("font-size", "12px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900)
                    .set("white-space", "nowrap");
            axis.add(label);

            cursor = cursor.plusMonths(1);
        }
        return axis;
    }

    private String capitalize(String text) {
        return text.isEmpty() ? text : Character.toUpperCase(text.charAt(0)) + text.substring(1);
    }

    private Div todayMarker(int totalHeight) {
        Div wrap = new Div();
        if (today.isBefore(chart.timelineStart()) || today.isAfter(chart.timelineEnd())) {
            return wrap;
        }
        int x = GanttScale.xOf(chart, today, pixelsPerDay);

        Div line = new Div();
        line.getElement().setAttribute("title", "Hoy · " + DAY_MONTH.format(today));
        line.getStyle().set("position", "absolute").set("left", x + "px")
                .set("top", (GanttStyle.HEADER_H - 12) + "px")
                .set("height", Math.max(0, totalHeight - GanttStyle.HEADER_H + 12) + "px")
                .set("width", "0").set("border-left", "1.5px solid " + GanttStyle.TODAY);

        Span tag = new Span("hoy");
        tag.getStyle().set("position", "absolute").set("left", (x - 12) + "px")
                .set("top", (GanttStyle.HEADER_H - 30) + "px")
                .set("background", GanttStyle.TODAY).set("color", "#fff").set("font-size", "9.5px")
                .set("padding", "1px 5px").set("border-radius", "3px");

        wrap.add(line, tag);
        return wrap;
    }

    private Div milestoneMarkers(int totalHeight) {
        Div wrap = new Div();
        List<Milestone> milestones = chart.milestones();
        for (int i = 0; i < milestones.size(); i++) {
            Milestone m = milestones.get(i);
            if (m.date().isBefore(chart.timelineStart()) || m.date().isAfter(chart.timelineEnd())) {
                continue;
            }
            int x = GanttScale.xOf(chart, m.date(), pixelsPerDay);
            int level = i % 2;
            int labelTop = 24 + level * 20;
            // Milestones carry no Jira key here, so their own name seeds the palette: each
            // marker keeps a stable colour instead of every one of them being the same red.
            String color = EpicPalette.colorFor(m.name());

            Div line = new Div();
            line.getStyle().set("position", "absolute").set("left", x + "px")
                    .set("top", (labelTop + 16) + "px")
                    .set("height", Math.max(0, totalHeight - labelTop - 16) + "px")
                    .set("width", "0").set("border-left", "2px dashed " + color)
                    .set("opacity", "0.75");

            Div diamond = new Div();
            diamond.getStyle().set("position", "absolute").set("left", (x - 6) + "px").set("top", labelTop + "px")
                    .set("width", "12px").set("height", "12px").set("background", color)
                    .set("transform", "rotate(45deg)").set("border-radius", "2px");

            Span label = new Span(m.name() + " " + DAY_MONTH.format(m.date()));
            label.getStyle().set("position", "absolute").set("left", (x + 10) + "px").set("top", labelTop + "px")
                    .set("font-size", "10.5px").set("font-weight", "700").set("color", "#FFFFFF")
                    .set("background", color).set("border", "1px solid " + color)
                    .set("border-radius", "3px").set("padding", "1px 6px").set("white-space", "nowrap");

            wrap.add(line, diamond, label);
        }
        return wrap;
    }

    // ── groups ────────────────────────────────────────────────────────────────────

    private Span groupLabel(GroupLayout g) {
        int totalMd = g.group().tasks().stream().mapToInt(task -> task.md()).sum();
        LocalDate latestEnd = g.group().tasks().stream().map(GanttTask::end).max(LocalDate::compareTo).orElse(null);
        String metadata = g.group().tasks().isEmpty()
                ? "sin carga"
                : totalMd + " MD · hasta " + DAY_MONTH.format(latestEnd);
        boolean context = isContextGroup(g);
        Span text = new Span(g.group().label() + " · " + metadata);
        text.getStyle().set("position", "absolute").set("left", "0px")
                .set("top", (g.top() + g.height() / 2.0 - 15) + "px")
                .set("width", (GanttStyle.LEFT_COL - 12) + "px")
                .set("font-size", "13px").set("font-weight", "700")
                .set("color", context ? g.group().color() : GanttStyle.PRIMARY_900)
                .set("white-space", "normal").set("line-height", "15px").set("overflow", "hidden");
        return text;
    }

    private Div groupDivider(GroupLayout g) {
        Div line = new Div();
        line.getStyle().set("position", "absolute").set("left", "0")
                .set("top", (g.bottom() + GanttStyle.GROUP_GAP / 2) + "px")
                .set("width", "100%").set("height", "1px").set("background", "#ECECEE");
        return line;
    }

    private Span emptyNote(GroupLayout g) {
        Span note = new Span(isContextGroup(g) ? "sin elementos en la ventana" : "sin tareas en la ventana");
        note.getStyle().set("position", "absolute").set("left", GanttStyle.LEFT_COL + "px")
                .set("top", (g.top() + g.height() / 2.0 - 7) + "px")
                .set("font-size", "11px").set("font-style", "italic").set("color", "#BBBBBB");
        return note;
    }

    private Div taskBar(GroupLayout g, GanttLanePacker.Placed placed) {
        int laneTop = g.top() + GanttStyle.ROW_PAD + placed.lane() * (GanttStyle.LANE_HEIGHT + GanttStyle.LANE_GAP);
        int barTop = laneTop + (GanttStyle.LANE_HEIGHT - GanttStyle.BAR_HEIGHT) / 2;
        boolean narrow = placed.width() < 24;

        Div wrap = new Div();
        wrap.getStyle().set("position", "absolute").set("left", placed.x() + "px").set("top", barTop + "px")
                .set("height", GanttStyle.BAR_HEIGHT + "px");

        String tooltip = "Task Key: " + placed.task().key()
                + "\nSummary: " + placed.task().summary()
                + "\nStart Date: " + DAY_MONTH.format(placed.task().start())
                + "\nEnd Date: " + DAY_MONTH.format(placed.task().end())
                + (placed.task().hasCalendarWindow() ? "" : " (sin ventana planificada: se asume 100%)")
                + "\nEffort: " + placed.task().md() + " MD ("
                + formatHours(placed.task().workHours()) + " h)"
                + "\nCarga y disponibilidad: consultar el desglose semanal"
                + "\nAssignee: " + placed.task().assignee().name()
                + "\nRole: " + placed.task().assignee().role().label()
                + "\nÉpica: " + (placed.task().missingEpic()
                ? EpicPalette.UNASSIGNED_LABEL
                : placed.task().effectiveEpicKey())
                + "\nStatus: " + (placed.task().status() == null ? "Sin estado" : placed.task().status())
                + "\nStart source: " + placed.task().startDateSource().label();

        Div bar = GanttBar.create(placed.width(), colorFor(g, placed), placed.task().estimated(), narrow, tooltip);
        wrap.add(bar);

        boolean startOutside = placed.x() >= START_LABEL_W;
        boolean startInside = !startOutside && placed.width() >= START_LABEL_INSIDE_MIN_W;
        if (startOutside || startInside) {
            wrap.add(startDate(placed, startOutside));
        }

        Span endDate = new Span(DAY_MONTH.format(placed.task().end()));
        endDate.getStyle().set("position", "absolute").set("top", "50%").set("transform", "translateY(-50%)")
                .set("left", (placed.width() + 6) + "px")
                .set("font-size", "10.5px").set("color", GanttStyle.MUTED);
        wrap.add(endDate);

        Span label = new Span(placed.label());
        label.getStyle().set("position", "absolute").set("top", "50%").set("transform", "translateY(-50%)")
                .set("font-size", "11.5px").set("font-weight", placed.labelInside() ? "600" : "400")
                .set("color", placed.labelInside() ? "#FFFFFF" : "#1F3450")
                .set("white-space", "nowrap").set("overflow", "hidden");
        if (placed.labelInside()) {
            label.getStyle().set("left", (startInside ? 7 + START_LABEL_W : 7) + "px");
        } else {
            label.getStyle().set("left", (placed.width() + 6 + 38) + "px");
        }
        wrap.add(label);

        return wrap;
    }

    /**
     * The task's start date, mirroring the end date on the other side of the bar so a window
     * reads without going to the axis. It normally sits to the left of the bar, but a bar that
     * starts near the canvas edge has no room there, so the date is drawn inside the bar
     * instead - the same fallback Microsoft Project uses for labels that do not fit outside.
     * A bar too narrow for both the date and its title keeps only the title; the date is still
     * in the tooltip.
     */
    private Span startDate(GanttLanePacker.Placed placed, boolean outside) {
        Span label = new Span(DAY_MONTH.format(placed.task().start()));
        label.getStyle().set("position", "absolute").set("top", "50%").set("transform", "translateY(-50%)")
                .set("font-size", "10.5px").set("white-space", "nowrap")
                .set("left", outside ? "-" + START_LABEL_W + "px" : "6px")
                .set("color", outside ? GanttStyle.MUTED : "rgba(255,255,255,0.82)")
                .set("font-weight", outside ? "400" : "600");
        return label;
    }

    /**
     * Every bar takes the colour of the epic it serves - including the epic's own bar and the
     * user stories under it, which is what makes one initiative recognisable across groups
     * that otherwise have nothing to do with each other. The role is not encoded here on
     * purpose: the roadmap is already grouped by role or by person, so the group heading
     * carries that information and the fill would only have repeated it.
     */
    private String colorFor(GroupLayout group, GanttLanePacker.Placed placed) {
        return placed.task().color();
    }

    private boolean isContextGroup(GroupLayout group) {
        return "Milestones y épicas".equals(group.group().label())
                || "User Stories".equals(group.group().label());
    }

    private String formatHours(double hours) {
        return hours == Math.rint(hours)
                ? String.valueOf((long) hours)
                : String.format(Locale.ROOT, "%.1f", hours);
    }

    private Span note(String text) {
        Span span = new Span(text);
        span.getStyle().set("color", GanttStyle.MUTED).set("font-style", "italic").set("font-size", "14px");
        return span;
    }
}