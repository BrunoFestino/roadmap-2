package com.example.roadmap.gantt.ui;

import com.example.roadmap.gantt.application.analytics.BuildWorkloadReportUseCase;
import com.example.roadmap.gantt.application.analytics.PersonWorkload;
import com.example.roadmap.gantt.application.analytics.RoleWorkload;
import com.example.roadmap.gantt.application.analytics.TaskLoad;
import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.analytics.WeekLoad;
import com.example.roadmap.gantt.application.analytics.WorkloadReport;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.EpicPalette;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.WorkContour;
import com.example.roadmap.gantt.application.usecase.BuildPersonGanttUseCase;
import com.example.roadmap.gantt.application.usecase.BuildRoleGanttUseCase;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.example.roadmap.gantt.ui.widget.GanttChartWidget;
import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.StyleSheet;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.router.PageTitle;
import com.vaadin.flow.router.Route;
import com.vaadin.flow.router.RouterLink;
import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.Month;
import java.time.format.DateTimeFormatter;
import java.time.temporal.TemporalAdjusters;
import java.util.Comparator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.stream.Collectors;

/**
 * Roadmap and workload screen for the AR1 (Argentina) team, loaded straight from Jira.
 *
 * <p>It follows Microsoft Project's separation of concerns, because mixing the two is what
 * made the previous version unreadable: a Gantt bar is a <em>commitment in the calendar</em>
 * and says nothing about occupancy, while occupancy lives in dedicated resource views.
 *
 * <p>The sections, in the order a manager reads them:
 * <ol>
 *   <li><strong>Carga del equipo</strong> - Resource Usage: hours per person per week,
 *       expandable to the tasks that produce them.</li>
 *   <li><strong>Histograma de carga</strong> - Resource Graph: weekly bars against each
 *       person's capacity line, with the overflow in red.</li>
 *   <li><strong>Libre desde</strong> - Remaining Availability: who can take new work and
 *       from when.</li>
 *   <li><strong>Roadmap por rol y por persona</strong> - the calendar commitment itself,
 *       both views required by the business.</li>
 *   <li><strong>Tareas sin ventana planificada</strong> - the data-quality tray for work whose
 *       dedication had to be assumed at 100%.</li>
 * </ol>
 */
@Route(value = "", layout = MainLayout.class)
@PageTitle("Team Roadmap")
@StyleSheet("https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap")
public class RoadmapView extends VerticalLayout {

    /** Height of a person's load histogram, in pixels. */
    private static final int HISTOGRAM_HEIGHT_PX = 72;
    /** Width of the leading name column, shared by the header and every grid row. */
    private static final int USAGE_NAME_COL_PX = 200;
    /** Visual inset for person and task rows while preserving the role's weekly axis. */
    private static final int USAGE_NESTED_INSET_PX = 8;
    private static final DateTimeFormatter MONTH_BAND =
            DateTimeFormatter.ofPattern("MMMM yyyy", Locale.forLanguageTag("es-AR"));
    private static final DateTimeFormatter DAY_MONTH_SHORT =
            DateTimeFormatter.ofPattern("MMM", Locale.forLanguageTag("es-AR"));

    private static final DateTimeFormatter AVAILABILITY_DATE =
            DateTimeFormatter.ofPattern("EEEE d 'de' MMMM", Locale.forLanguageTag("es-AR"));

    private final transient BuildRoleGanttUseCase buildRoleGantt;
    private final transient BuildPersonGanttUseCase buildPersonGantt;
    private final transient BuildWorkloadReportUseCase buildWorkloadReport;

    private final Span updatedAt = new Span();
    private final Div legend = new Div();
    private final Div results = new Div();
    private final Div footnote = new Div();

    public RoadmapView(BuildRoleGanttUseCase buildRoleGantt, BuildPersonGanttUseCase buildPersonGantt,
                       BuildWorkloadReportUseCase buildWorkloadReport) {
        this.buildRoleGantt = buildRoleGantt;
        this.buildPersonGantt = buildPersonGantt;
        this.buildWorkloadReport = buildWorkloadReport;

        addClassNames("app-page", "roadmap-page");
        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        results.getStyle().set("margin-top", "12px").set("width", "100%")
                .set("display", "flex").set("flex-direction", "column").set("gap", "24px");

        Button reload = new Button("Actualizar roadmap", e -> render());
        reload.addThemeVariants(com.vaadin.flow.component.button.ButtonVariant.LUMO_TERTIARY);
        HorizontalLayout toolbar = new HorizontalLayout(reload, updatedAt);
        toolbar.addClassName("page-toolbar");
        updatedAt.addClassName("updated-at");
        add(title(), subtitle(), toolbar, legend, results, footnote);
        render();
    }

    private H1 title() {
        H1 title = new H1("Team Roadmap");
        title.addClassName("page-title");
        title.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return title;
    }

    private Span subtitle() {
        Span span = new Span("Equipo AR1 · Jira y planificación local · capacidad sobre tareas fechadas");
        span.addClassName("page-subtitle");
        span.getStyle().set("color", GanttStyle.MUTED).set("font-size", "14px");
        return span;
    }

    private void render() {
        renderLegend();
        results.removeAll();
        footnote.removeAll();

        try {
            RoadmapSnapshot snapshot = buildWorkloadReport.loadSnapshot();
            GanttChart roleChart = buildRoleGantt.build(snapshot.tasks(), snapshot.milestones());
            GanttChart personChart = buildPersonGantt.build(snapshot.tasks(), snapshot.milestones());
            WorkloadReport workload = buildWorkloadReport.build(snapshot, LocalDate.now());
            updatedAt.setText("Actualizado: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss")));

            results.add(resourceUsageSection(workload));
            results.add(loadHistogramSection(workload));
            results.add(freeFromSection(workload));

            results.add(epicLegend(roleChart));
            results.add(ganttSection("Roadmap - Por rol", roleChart, "gantt-role-section"));
            results.add(ganttSection("Roadmap - Por persona", personChart, "gantt-person-section"));

            results.add(unplannedSection(workload));
            renderFootnote(roleChart);
        } catch (RuntimeException e) {
            results.add(errorNote(e));
        }
    }

    /**
     * Maps every colour on the roadmap back to the epic that owns it. Without this the bars
     * are merely colourful: a manager can see that two tasks belong together but not to
     * which initiative, which is the whole point of colouring them by epic.
     */
    private Component epicLegend(GanttChart chart) {
        Map<String, String> names = new LinkedHashMap<>();
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (GanttGroup group : chart.groups()) {
            for (GanttTask task : group.tasks()) {
                String epic = task.effectiveEpicKey();
                String label = epic == null ? EpicPalette.UNASSIGNED_LABEL : epic;
                counts.merge(label, 1, Integer::sum);
                if (epic != null && epic.equals(task.key())) {
                    names.put(label, task.summary());
                }
            }
        }
        if (counts.isEmpty()) {
            return new Div();
        }

        Div legend = new Div();
        legend.addClassName("epic-legend");
        legend.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("align-items", "center")
                .set("gap", "6px 14px").set("font-size", "11.5px").set("color", GanttStyle.MUTED)
                .set("background", GanttStyle.WEEKEND_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "9px 12px");

        Span intro = new Span("Colores por épica:");
        intro.getStyle().set("font-weight", "700").set("color", GanttStyle.INK);
        legend.add(intro);

        counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .forEach(entry -> {
                    String label = entry.getKey();
                    String name = names.get(label);
                    String text = label + (name == null ? "" : " · " + name) + " (" + entry.getValue() + ")";
                    legend.add(legendSwatch(
                            EpicPalette.UNASSIGNED_LABEL.equals(label)
                                    ? EpicPalette.UNASSIGNED
                                    : EpicPalette.colorFor(label),
                            text));
                });
        return legend;
    }

    private H2 sectionTitle(String text) {
        H2 h2 = new H2(text);
        h2.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-size", "16px")
                .set("font-weight", "700").set("margin", "0 0 4px");
        return h2;
    }

    private Component ganttSection(String title, GanttChart chart, String className) {
        H2 heading = sectionTitle(title);
        heading.addClassName("gantt-section-heading");
        GanttChartWidget gantt = new GanttChartWidget(chart, 16, 7);
        gantt.addClassName("gantt-section-chart");
        VerticalLayout section = compactLayout();
        section.addClassNames("gantt-section", className);
        section.add(heading, gantt);
        return section;
    }

    private String formatShortDate(LocalDate date) {
        return date == null ? "sin fecha" : date.format(DateTimeFormatter.ofPattern("d MMM yyyy", Locale.forLanguageTag("es-AR")));
    }

    // ── carga del equipo (Resource Usage) ────────────────────────────────────────

    /**
     * Person × week grid in hours: the roadmap's Resource Usage view. Each row expands into
     * the tasks that make up that person's load, so a red week can always be traced back to
     * the specific commitments causing it.
     */
    private Component resourceUsageSection(WorkloadReport workload) {
        VerticalLayout content = compactLayout();
        content.getStyle().set("gap", "10px").set("min-width", "1120px");
        content.add(weekHeader(workload.weekStarts(), workload.asOf(), "Rol / persona", "plan y capacidad semanal"));

        boolean anyone = false;
        for (RoleWorkload role : workload.roles()) {
            List<PersonWorkload> people = role.people();
            if (people.isEmpty()) {
                continue;
            }
            anyone = true;
            content.add(roleUsageRow(role, people, workload.weekStarts(), workload.asOf()));
        }
        if (!anyone) {
            content.add(emptyNote("No hay personas con carga planificada."));
        } else {
            content.add(usageLegend());
        }

        return executiveSection("Carga del equipo",
                "Tres niveles de zoom sobre la misma grilla: el rol resume a toda su gente, cada persona resume sus "
                        + "tareas, y cada tarea muestra en qué semanas pesa. El esfuerzo se reparte a lo largo de la "
                        + "ventana planificada en vez de asumir dedicación completa, y se mide contra las horas realmente "
                        + "disponibles (6 h productivas por día hábil, descontando ausencias). El reparto está "
                        + "nivelado por persona y comprueba asignaciones alternativas dentro de las fechas comprometidas. "
                        + "El rojo muestra sobrecarga de la distribución calculada. "
                        + "En la semana ya empezada lo que queda libre se calcula sobre el trabajo todavía pendiente "
                        + "-el estimado menos las horas registradas en Jira- y no sobre el supuesto de que lo "
                        + "planificado se hizo.",
                scrollable(content));
    }

    /**
     * A role and, folded inside it, its people. The role total is rebuilt from the people shown
     * here so every aggregate is directly traceable to its rows.
     */
    private Component roleUsageRow(RoleWorkload role, List<PersonWorkload> people, List<LocalDate> weekStarts,
                                   LocalDate asOf) {
        List<WeekLoad> roleWeeks = RoleWorkload.aggregate(people, weekStarts);

        Div grid = new Div();
        grid.addClassName("usage-role-grid");
        grid.getStyle().set("display", "grid").set("grid-template-columns", gridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");
        grid.add(roleNameCell(role, people, roleWeeks));
        for (int week = 0; week < roleWeeks.size(); week++) {
            grid.add(roleWeekCell(role, people, roleWeeks.get(week), week));
        }

        VerticalLayout inner = compactLayout();
        inner.addClassName("usage-people");
        inner.getStyle().set("gap", "6px");
        for (PersonWorkload person : people) {
            inner.add(personUsageRow(person, weekStarts, asOf));
        }

        Details details = new Details(grid, inner);
        details.addClassNames("usage-row", "usage-role-row");
        details.setOpened(true);
        details.getStyle().set("width", "100%");
        details.getElement().getStyle().set("--lumo-space-m", "6px");
        return details;
    }

    private Div roleNameCell(RoleWorkload role, List<PersonWorkload> people, List<WeekLoad> roleWeeks) {
        Span name = new Span(role.roleLabel());
        name.getStyle().set("font-size", "13px").set("font-weight", "800").set("color", GanttStyle.PRIMARY_900);
        Div identity = new Div(levelChip("ROL", "usage-role-chip"), name);
        identity.addClassName("usage-row-identity");

        double weeklyCapacity = roleWeeks.isEmpty() ? 0 : roleWeeks.get(roleWeeks.size() - 1).capacityHours();
        Span detail = new Span(people.size() + (people.size() == 1 ? " persona" : " personas")
                + " · " + formatHours(weeklyCapacity) + " h/semana");
        detail.getStyle().set("font-size", "10.5px").set("color", GanttStyle.MUTED);

        Div cell = new Div(identity, detail);
        cell.addClassName("usage-role-name");
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", "#FFFFFF").set("padding", "8px 10px")
                .set("border-left", "4px solid " + role.roleColor());
        return cell;
    }

    /**
     * One week of a whole role. It carries more than a person's cell on purpose: a role average
     * is the one number that can look healthy while hiding somebody at 160%, so the count of
     * overallocated members is printed right next to the percentage that would have buried it.
     */
    private Div roleWeekCell(RoleWorkload role, List<PersonWorkload> people, WeekLoad week, int index) {
        Div cell = new Div();
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("gap", "3px").set("background", loadBackground(week))
                .set("padding", "8px").set("min-height", "50px").set("min-width", "0");

        if (week.unavailable()) {
            cell.add(mutedLine("Sin capacidad", true));
            return cell;
        }

        Span headline = new Span(Math.round(week.utilizationPct()) + "%");
        headline.getStyle().set("font-size", "14px").set("font-weight", "800")
                .set("line-height", "1").set("color", loadTextColor(week));

        Span detail = new Span(formatHours(week.assignedHours()) + " / "
                + formatHours(week.capacityHours()) + " h");
        detail.getStyle().set("font-size", "10px").set("color", GanttStyle.MUTED).set("line-height", "1.25");

        cell.add(headline, loadFillBar(week), detail, balanceLine(week), mdLine(week));

        long over = people.stream()
                .filter(person -> index < person.weeks().size() && person.weeks().get(index).overallocated())
                .count();
        if (over > 0) {
            cell.add(warningChip(over + " de " + people.size() + " pasado"));
        }
        cell.add(riskChip(week));

        cell.getElement().setAttribute("title", role.roleLabel() + " · semana del "
                + formatShortDate(week.weekStart()) + " al " + formatShortDate(week.weekEnd())
                + "\n" + formatHours(week.assignedHours()) + " h comprometidas de "
                + formatHours(week.capacityHours()) + " h del rol"
                + "\n" + people.size() + " personas · " + over + " sobreasignadas");
        return cell;
    }

    /**
     * How much still fits, as a single number. The subtraction behind it is deliberately not
     * shown: both operands are already printed on the line above, so spelling out the
     * arithmetic only widened the cell to restate what the reader could already see.
     *
     * <p>In the week already under way this counts the hours still ahead against the work Jira
     * says is still owed - never the hours of a Monday that is already gone.
     */
    private Span balanceLine(WeekLoad week) {
        boolean over = week.overallocated();
        Span line = new Span(over
                ? "excede por " + formatHours(week.overflowHours()) + " h"
                : formatHours(week.freeHours()) + " h libres");
        line.getStyle().set("font-size", "11px").set("font-weight", "800")
                .set("color", over ? "#B3261E" : "#1E7A45")
                .set("line-height", "1.25").set("overflow-wrap", "anywhere");
        return line;
    }

    /** The same free hours restated in MD, the unit the CSV and the team already speak in. */
    private Span mdLine(WeekLoad week) {
        Span line = new Span(week.freeHours() <= 0
                ? ""
                : "≈ " + formatMd(WorkContour.toMd(week.freeHours())) + " MD libres");
        line.getStyle().set("font-size", "9.5px").set("color", "#9AA4AA").set("line-height", "1.2");
        return line;
    }

    /**
     * Flags work that was planned for days already gone, has no logged time against it in Jira,
     * and therefore now weighs on the days that are left. It is measured, not assumed: the app
     * no longer guesses whether Monday's plan happened, it reads what was logged.
     */
    private Span riskChip(WeekLoad week) {
        if (!week.hasCarriedOverWork()) {
            return new Span();
        }
        Span chip = new Span("⚠ " + formatHours(week.carriedOverHours()) + " h arrastradas");
        chip.getStyle().set("font-size", "9.5px").set("font-weight", "700").set("color", "#A16207")
                .set("line-height", "1.2").set("overflow-wrap", "anywhere");
        return chip;
    }

    private Span warningChip(String text) {
        Span chip = new Span(text);
        chip.getStyle().set("font-size", "9.5px").set("font-weight", "800").set("color", "#B3261E")
                .set("background", "#FDECEA").set("border-radius", "999px").set("padding", "1px 7px")
                .set("align-self", "flex-start");
        return chip;
    }

    private Span mutedLine(String text, boolean strong) {
        Span line = new Span(text);
        line.getStyle().set("font-size", "10.5px").set("color", "#9AA4AA")
                .set("font-weight", strong ? "700" : "400");
        return line;
    }

    /**
     * Two-level column header shared by every row of the grid: a month band on top and, below
     * it, the week number with its real day range, with the current week marked. Without it the
     * cells are squares that never say which week they belong to, which is the single thing that
     * turns the grid into a table someone can read.
     */
    private Div weekHeader(List<LocalDate> weekStarts, LocalDate asOf, String cornerTitle, String cornerNote) {
        Div grid = new Div();
        grid.getStyle().set("display", "grid").set("grid-template-columns", gridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");

        grid.add(monthBandCell(cornerTitle, 1, true));
        int index = 0;
        while (index < weekStarts.size()) {
            Month month = weekStarts.get(index).getMonth();
            int span = 0;
            while (index + span < weekStarts.size() && weekStarts.get(index + span).getMonth() == month) {
                span++;
            }
            grid.add(monthBandCell(capitalize(MONTH_BAND.format(weekStarts.get(index))), span, false));
            index += span;
        }

        grid.add(headerCornerCell(cornerTitle, cornerNote));
        LocalDate currentWeek = asOf.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        for (int week = 0; week < weekStarts.size(); week++) {
            grid.add(weekHeaderCell(weekStarts.get(week), week + 1, weekStarts.get(week).equals(currentWeek)));
        }
        return grid;
    }

    /** One column template, reused by the header and every row, so the columns actually line up. */
    private String gridTemplate(int weeks) {
        return USAGE_NAME_COL_PX + "px repeat(" + weeks + ", minmax(86px, 1fr))";
    }

    /** Keeps nested week columns aligned after their container receives a visual inset. */
    private String nestedGridTemplate(int weeks) {
        return (USAGE_NAME_COL_PX - USAGE_NESTED_INSET_PX)
                + "px repeat(" + weeks + ", minmax(86px, 1fr))";
    }

    private Div monthBandCell(String text, int span, boolean first) {
        Span label = new Span(text);
        label.getStyle().set("font-size", "10px").set("font-weight", "800").set("color", GanttStyle.MUTED)
                .set("text-transform", "uppercase").set("letter-spacing", "0.8px");

        Div cell = new Div(label);
        cell.getStyle().set("background", GanttStyle.WEEKEND_BG).set("padding", "4px 8px")
                .set("text-align", first ? "left" : "center").set("grid-column", "span " + span);
        return cell;
    }

    private Div headerCornerCell(String heading, String note) {
        Span title = new Span(heading);
        title.getStyle().set("font-size", "10px").set("font-weight", "800").set("color", GanttStyle.MUTED)
                .set("text-transform", "uppercase").set("letter-spacing", "0.7px");
        Span detail = new Span(note);
        detail.getStyle().set("font-size", "10.5px").set("color", "#9AA4AA");

        Div cell = new Div(title, detail);
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", "#FFFFFF").set("padding", "5px 10px");
        return cell;
    }

    /** A single compact header for a person's task rows, using the same weekly axis as its parent. */
    private Div compactTaskWeekHeader(List<LocalDate> weekStarts, LocalDate asOf) {
        Div grid = new Div();
        grid.addClassName("usage-task-header");
        grid.getStyle().set("display", "grid").set("grid-template-columns", nestedGridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");

        grid.add(headerCornerCell("Tareas de la persona", "ventana · esfuerzo · dedicación"));
        LocalDate currentWeek = asOf.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        for (int week = 0; week < weekStarts.size(); week++) {
            grid.add(weekHeaderCell(weekStarts.get(week), week + 1, weekStarts.get(week).equals(currentWeek)));
        }
        return grid;
    }

    private Div weekHeaderCell(LocalDate weekStart, int number, boolean current) {
        Span tag = new Span("S" + number + (current ? " · hoy" : ""));
        tag.getStyle().set("display", "block").set("font-size", "9.5px").set("font-weight", "800")
                .set("letter-spacing", "0.6px").set("color", current ? GanttStyle.TODAY : "#9AA4AA");
        Span range = new Span(weekRange(weekStart));
        range.getStyle().set("display", "block").set("font-size", "11px").set("font-weight", "700")
                .set("color", current ? GanttStyle.TODAY : GanttStyle.PRIMARY_900);

        Div cell = new Div(tag, range);
        cell.getStyle().set("background", current ? "#EAF1FB" : "#FFFFFF").set("padding", "5px 8px")
                .set("text-align", "center").set("line-height", "1.3");
        if (current) {
            cell.getStyle().set("box-shadow", "inset 0 -2px 0 " + GanttStyle.TODAY);
        }
        return cell;
    }

    /** {@code "15–21 sep"}, collapsing the month when the week does not straddle two of them. */
    private String weekRange(LocalDate weekStart) {
        LocalDate weekEnd = weekStart.plusDays(6);
        String end = weekEnd.getDayOfMonth() + " " + DAY_MONTH_SHORT.format(weekEnd);
        String start = weekStart.getMonth() == weekEnd.getMonth()
                ? String.valueOf(weekStart.getDayOfMonth())
                : weekStart.getDayOfMonth() + " " + DAY_MONTH_SHORT.format(weekStart);
        return start + "–" + end;
    }

    /** Spells out what a square is, where the denominator comes from, and what each colour means. */
    private Div usageLegend() {
        Div legend = new Div();
        legend.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("align-items", "center")
                .set("gap", "6px 16px").set("font-size", "11.5px").set("color", GanttStyle.MUTED)
                .set("background", GanttStyle.WEEKEND_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "9px 12px").set("margin-top", "4px");

        legend.add(legendText("Cada cuadrado", "una semana de un rol o de una persona"));
        legend.add(legendText("Disponible", "días hábiles × 6 h − ausencias"));
        legend.add(legendText("El %", "sobre la semana completa, para poder comparar semanas"));
        legend.add(legendText("Horas libres", "lo que todavía entra, contando solo de hoy en adelante"));
        legend.add(legendText("Pendiente", "estimado − horas realmente registradas en Jira"));
        legend.add(legendText("⚠ arrastradas", "trabajo de días ya pasados que no se registró y sigue debiéndose"));
        legend.add(legendSwatch("#F1F8F2", "Con margen · menos del 80%"));
        legend.add(legendSwatch("#FFF6E5", "Al límite · 80–100%"));
        legend.add(legendSwatch("#FDECEA", "Sobreasignado · más del 100%"));
        legend.add(legendSwatch(GanttStyle.GRIDLINE, "Ausente · sin capacidad"));
        return legend;
    }

    private Div legendText(String term, String meaning) {
        Span strong = new Span(term + " = ");
        strong.getStyle().set("font-weight", "700").set("color", GanttStyle.INK);
        Span rest = new Span(meaning);

        Div item = new Div(strong, rest);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "3px");
        return item;
    }

    private Div legendSwatch(String color, String meaning) {
        Div swatch = new Div();
        swatch.getStyle().set("width", "13px").set("height", "13px").set("border-radius", "3px")
                .set("flex", "0 0 auto").set("background", color)
                .set("border", "1px solid rgba(0,0,0,0.08)");

        Div item = new Div(swatch, new Span(meaning));
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Component personUsageRow(PersonWorkload person, List<LocalDate> weekStarts, LocalDate asOf) {
        Div grid = new Div();
        grid.addClassName("usage-person-grid");
        grid.getStyle().set("display", "grid").set("grid-template-columns", nestedGridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");

        grid.add(usageNameCell(person));
        for (WeekLoad week : person.weeks()) {
            grid.add(usageWeekCell(person, week));
        }

        Details details = new Details(grid, taskBreakdown(person, asOf));
        details.addClassNames("usage-row", "usage-person-row");
        details.getStyle().set("width", "100%");
        details.getElement().getStyle().set("--lumo-space-m", "6px");
        return details;
    }

    private Div usageNameCell(PersonWorkload person) {
        Span name = new Span(person.name());
        name.getStyle().set("font-size", "12.5px").set("font-weight", "600").set("color", GanttStyle.PRIMARY_900);
        Div identity = new Div(levelChip("PERSONA", "usage-person-chip"), name);
        identity.addClassName("usage-row-identity");
        Span role = new Span(person.roleLabel()
                + (person.hasOverallocation() ? " · sobreasignado" : ""));
        role.getStyle().set("font-size", "11px")
                .set("color", person.hasOverallocation() ? "#B3261E" : GanttStyle.MUTED);

        Div cell = new Div(identity, role);
        cell.addClassName("usage-person-name");
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", "#FFFFFF").set("padding", "8px 10px")
                .set("border-left", "3px solid " + person.roleColor());
        return cell;
    }

    /**
     * One week of one person. The utilization percentage is the headline because the question a
     * manager scans for is "is this past the line?", the fill bar answers it without reading a
     * number at all - colour is never the only signal - and the raw hours stay underneath as the
     * evidence. Past 100% the bar fills completely in red, so an overallocation reads as a
     * bar that overflowed rather than as a slightly different shade of background.
     */
    private Div usageWeekCell(PersonWorkload person, WeekLoad week) {
        Div cell = new Div();
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("gap", "3px").set("background", loadBackground(week))
                .set("padding", "8px").set("min-height", "50px").set("min-width", "0");

        if (week.unavailable()) {
            Span headline = new Span("Ausente");
            headline.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", "#9AA4AA")
                    .set("line-height", "1");
            Span detail = new Span("0 h disponibles");
            detail.getStyle().set("font-size", "10px").set("color", GanttStyle.MUTED).set("line-height", "1.25");
            cell.add(headline, detail);
        } else {
            Span headline = new Span(Math.round(week.utilizationPct()) + "%");
            headline.getStyle().set("font-size", "13px").set("font-weight", "800")
                    .set("line-height", "1").set("color", loadTextColor(week));

            Span detail = new Span(formatHours(week.assignedHours()) + " / "
                    + formatHours(week.capacityHours()) + " h");
            detail.getStyle().set("font-size", "10px").set("color", GanttStyle.MUTED).set("line-height", "1.25");

            cell.add(headline, loadFillBar(week), detail, balanceLine(week));
            if (week.partiallyElapsed() && week.hasTimeLeft()) {
                cell.add(mutedLine("quedan " + week.remainingWorkingDays()
                        + (week.remainingWorkingDays() == 1 ? " día" : " días"), false));
            }
            cell.add(riskChip(week));
        }

        cell.getElement().setAttribute("title", person.name() + " · semana del " + formatShortDate(week.weekStart())
                + " al " + formatShortDate(week.weekEnd())
                + "\n" + formatHours(week.assignedHours()) + " h asignadas de "
                + formatHours(week.capacityHours()) + " h disponibles"
                + (week.overallocated()
                ? "\nExcede por " + formatHours(week.overflowHours()) + " h"
                : "\nLibres de hoy en adelante: " + formatHours(week.freeHours()) + " h")
                + (week.partiallyElapsed()
                ? "\nSemana ya empezada: quedan " + week.remainingWorkingDays() + " días hábiles ("
                + formatHours(week.remainingCapacityHours()) + " h) con "
                + formatHours(week.remainingAssignedHours()) + " h de trabajo pendiente"
                : "")
                + (week.hasCarriedOverWork()
                ? "\nArrastra " + formatHours(week.carriedOverHours())
                + " h de días ya pasados sin registrar"
                : "")
                + "\n" + week.tasks().size() + " tareas");
        return cell;
    }

    /**
     * Utilization drawn as a filled track. It saturates at 100% so an overallocated week shows a
     * completely full red bar plus the overflow hours in the caption, instead of a bar that would
     * have to grow past its own container.
     */
    private Div loadFillBar(WeekLoad week) {
        double filled = Math.min(100, week.utilizationPct());
        String color = loadTextColor(week);

        Div fill = new Div();
        fill.getStyle().set("width", filled + "%").set("height", "100%")
                .set("border-radius", "2px").set("background", color);

        Div track = new Div(fill);
        track.getStyle().set("height", "4px").set("border-radius", "2px").set("overflow", "hidden")
                .set("background", week.overallocated() ? "rgba(179,38,30,0.18)" : "rgba(0,0,0,0.09)");
        return track;
    }

    /**
     * The drill-down of a person's row, laid out as Microsoft Project's Resource Usage view:
     * one row per task - never repeated - across the very same week columns as the row above,
     * so the week that turns red lines up with the tasks that caused it. The shaded cells draw
     * the task's committed window, each number is the hours that task demands in that week, and
     * the closing row sums each column back to the person's own cell.
     */
    private Component taskBreakdown(PersonWorkload person, LocalDate asOf) {
        List<LocalDate> weekStarts = person.weeks().stream().map(WeekLoad::weekStart).toList();
        Map<String, TaskLoad> tasks = new LinkedHashMap<>();
        Map<String, double[]> hoursByTask = new LinkedHashMap<>();
        Map<String, double[]> pendingByTask = new LinkedHashMap<>();

        for (int index = 0; index < person.weeks().size(); index++) {
            for (TaskLoad task : person.weeks().get(index).tasks()) {
                tasks.putIfAbsent(task.taskKey(), task);
                hoursByTask.computeIfAbsent(task.taskKey(), key -> new double[weekStarts.size()])[index] +=
                        task.hours();
                pendingByTask.computeIfAbsent(task.taskKey(), key -> new double[weekStarts.size()])[index] += task.remainingHours();
            }
        }

        if (tasks.isEmpty()) {
            VerticalLayout empty = compactLayout();
            empty.addClassName("usage-task-breakdown");
            empty.getStyle().set("padding", "6px 0 6px 12px");
            empty.add(emptyNote("Sin tareas planificadas en el horizonte."));
            return empty;
        }

        Div grid = new Div();
        grid.addClassName("usage-task-grid");
        grid.getStyle().set("display", "grid").set("grid-template-columns", nestedGridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");

        List<TaskLoad> ordered = tasks.values().stream()
                .sorted(Comparator.comparing(TaskLoad::startDate).thenComparing(TaskLoad::taskKey))
                .toList();

        for (TaskLoad task : ordered) {
            grid.add(breakdownNameCell(task));
            double[] hours = hoursByTask.get(task.taskKey());
            for (int index = 0; index < weekStarts.size(); index++) {
                WeekLoad week = person.weeks().get(index);
                grid.add(breakdownHoursCell(task, week, hours[index], pendingByTask.get(task.taskKey())[index]));
            }
        }

        grid.add(breakdownTotalNameCell());
        for (WeekLoad week : person.weeks()) {
            grid.add(breakdownTotalCell(week));
        }

        VerticalLayout content = compactLayout();
        content.addClassName("usage-task-breakdown");
        content.getStyle().set("padding", "6px 0 8px 0").set("width", "100%");
        content.add(compactTaskWeekHeader(weekStarts, asOf), grid,
                breakdownLegend());
        return content;
    }

    /** Explains the two conventions of the breakdown that a colour alone cannot carry. */
    private Div breakdownLegend() {
        Div legend = new Div();
        legend.addClassName("usage-task-legend");
        legend.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("align-items", "center")
                .set("gap", "6px 16px").set("font-size", "11px").set("color", GanttStyle.MUTED)
                .set("padding", "6px 2px");

        legend.add(legendSwatch("#EAF2F6", "La tarea está viva esa semana"));
        legend.add(legendSwatch("#FCFCFD", "Fuera de su ventana"));
        legend.add(legendText("- sin horas", "sin horas asignadas en esta semana; revisar calendario y distribución"));
        return legend;
    }

    private Div breakdownNameCell(TaskLoad task) {
        Div dot = new Div();
        dot.getStyle().set("width", "9px").set("height", "9px").set("border-radius", "50%")
                .set("background", task.color()).set("flex", "0 0 auto");
        dot.getElement().setAttribute("title", task.epicKey() == null
                ? EpicPalette.UNASSIGNED_LABEL
                : "Épica " + task.epicKey());

        Span key = new Span(task.taskKey());
        key.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);
        Div keyLine = new Div(dot, levelChip("TAREA", "usage-task-chip"), key);
        keyLine.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        Span summary = new Span(task.summary());
        summary.getStyle().set("font-size", "11px").set("color", GanttStyle.INK)
                .set("overflow", "hidden").set("text-overflow", "ellipsis").set("white-space", "nowrap");
        Span window = new Span(formatShortDate(task.startDate()) + " → " + formatShortDate(task.endDate())
                + " · " + formatMd(task.md()) + " MD · " + Math.round(task.dedicationPct()) + "%");
        window.getStyle().set("font-size", "10.5px").set("color", GanttStyle.MUTED);

        Div cell = new Div(keyLine, summary, window);
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", "#FFFFFF").set("padding", "8px 10px").set("min-width", "0");
        return cell;
    }

    private Span levelChip(String label, String className) {
        Span chip = new Span(label);
        chip.addClassNames("usage-level-chip", className);
        return chip;
    }

    /**
     * A single task-week cell. Inside the task's window it is shaded even when it contributes
     * no hours - an absence has to read as a hole in the task, not as the task being over.
     */
    private Div breakdownHoursCell(TaskLoad task, WeekLoad week, double hours, double pending) {
        boolean insideWindow = !task.startDate().isAfter(week.weekEnd())
                && !task.endDate().isBefore(week.weekStart());

        Span value = new Span(hours > 0 ? formatHours(hours) + " h" : insideWindow ? "- sin horas" : "");
        value.getStyle().set("font-size", hours > 0 ? "11px" : "10px")
                .set("color", hours > 0 ? GanttStyle.INK : "#9AA4AA");

        Span pendingValue = new Span(formatHours(pending) + " h pendientes");
        pendingValue.addClassName("usage-task-pending");

        Div cell = new Div();
        cell.addClassName("usage-task-hours");
        cell.add(value);
        if (insideWindow) {
            cell.add(pendingValue);
        }
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("gap", "3px").set("padding", "8px").set("min-height", "42px")
                .set("background", insideWindow ? "#EAF2F6" : "#FCFCFD");
        if (insideWindow) {
            cell.getStyle().set("box-shadow", "inset 0 0 0 1px #D3E3EB");
        }
        if (hours > 0) {
            cell.getElement().setAttribute("title", task.taskKey() + " · semana del "
                    + formatShortDate(week.weekStart()) + "\n" + formatHours(hours) + " h de esfuerzo"
                    + "\n" + formatHours(task.dailyHours()) + " h/día en esta semana ("
                    + Math.round(task.dedicationPct()) + "% de dedicación)");
        } else if (insideWindow) {
            cell.getElement().setAttribute("title", task.taskKey() + " · semana del "
                    + formatShortDate(week.weekStart())
                    + "\nDentro de la ventana pero sin horas: semana no laborable, ausencia, o el esfuerzo "
                    + "se acomodó en otras semanas de su ventana porque acá no había lugar.");
        }
        return cell;
    }

    private Div breakdownTotalNameCell() {
        Span label = new Span("Total asignado");
        label.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);
        Span note = new Span("suma de las tareas de arriba");
        note.getStyle().set("font-size", "10.5px").set("color", GanttStyle.MUTED);

        Div cell = new Div(label, note);
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", GanttStyle.WEEKEND_BG).set("padding", "6px 10px");
        return cell;
    }

    private Div breakdownTotalCell(WeekLoad week) {
        Span value = new Span(formatHours(week.assignedHours()) + " h");
        value.getStyle().set("font-size", "11px").set("font-weight", "700")
                .set("color", week.overallocated() ? "#B3261E" : GanttStyle.PRIMARY_900);

        Div cell = new Div(value);
        cell.getStyle().set("background", GanttStyle.WEEKEND_BG).set("padding", "6px 8px").set("min-height", "0");
        cell.getElement().setAttribute("title", "Semana del " + formatShortDate(week.weekStart()) + "\n"
                + formatHours(week.assignedHours()) + " h asignadas de "
                + formatHours(week.capacityHours()) + " h disponibles");
        return cell;
    }

    // ── histograma de carga (Resource Graph) ─────────────────────────────────────

    /**
     * Per-person weekly bars against a capacity line, the roadmap's Resource Graph. The part
     * of a bar that goes past the line is drawn in red, so both when a person breaks and by
     * how much read without looking at a single number.
     */
    private Component loadHistogramSection(WorkloadReport workload) {
        FlexLayout charts = new FlexLayout();
        charts.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("gap", "12px");

        List<PersonWorkload> people = workload.people();
        if (people.isEmpty()) {
            charts.add(emptyNote("No hay personas con carga planificada."));
        } else {
            people.forEach(person -> charts.add(personHistogram(person)));
        }

        return executiveSection("Histograma de carga",
                "Cada barra es una semana. La línea punteada es la capacidad de esa semana; lo que la supera se "
                        + "dibuja en rojo y es trabajo que no entra sin mover algo.",
                charts);
    }

    private Div personHistogram(PersonWorkload person) {
        double scale = Math.max(person.weeks().stream().mapToDouble(WeekLoad::capacityHours).max().orElse(1),
                person.weeks().stream().mapToDouble(WeekLoad::assignedHours).max().orElse(1));

        FlexLayout bars = new FlexLayout();
        bars.getStyle().set("display", "flex").set("align-items", "flex-end").set("gap", "5px")
                .set("height", HISTOGRAM_HEIGHT_PX + "px").set("position", "relative")
                .set("border-bottom", "1px solid " + GanttStyle.BORDER);
        person.weeks().forEach(week -> bars.add(histogramBar(person, week, scale)));

        Span name = new Span(person.name());
        name.getStyle().set("font-size", "12.5px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);
        Span summary = new Span(person.roleLabel() + " · pico " + Math.round(person.peakUtilizationPct()) + "%"
                + " · " + formatHours(person.totalFreeHours()) + " h libres");
        summary.getStyle().set("font-size", "11px")
                .set("color", person.hasOverallocation() ? "#B3261E" : GanttStyle.MUTED);

        Div card = new Div(name, summary, bars);
        card.getStyle().set("display", "flex").set("flex-direction", "column").set("gap", "5px")
                .set("flex", "1 1 300px").set("min-width", "280px").set("background", "#FFFFFF")
                .set("border", "1px solid " + GanttStyle.BORDER).set("border-radius", "8px")
                .set("border-left", "3px solid " + person.roleColor()).set("padding", "10px 12px")
                .set("box-sizing", "border-box");
        return card;
    }

    private Div histogramBar(PersonWorkload person, WeekLoad week, double scale) {
        int assignedPx = heightPx(Math.min(week.assignedHours(), week.capacityHours()), scale);
        int overflowPx = heightPx(week.overflowHours(), scale);
        int capacityPx = heightPx(week.capacityHours(), scale);

        Div stack = new Div();
        stack.getStyle().set("position", "relative").set("flex", "1 1 0")
                .set("height", HISTOGRAM_HEIGHT_PX + "px").set("min-width", "14px");

        if (overflowPx > 0) {
            stack.add(histogramSegment(overflowPx, assignedPx, "#B3261E"));
        }
        if (assignedPx > 0) {
            stack.add(histogramSegment(assignedPx, 0, person.roleColor()));
        }

        Div capacityLine = new Div();
        capacityLine.getStyle().set("position", "absolute").set("left", "0").set("right", "0")
                .set("bottom", capacityPx + "px").set("border-top", "1px dashed " + GanttStyle.MUTED);
        stack.add(capacityLine);

        stack.getElement().setAttribute("title", "Semana del " + formatShortDate(week.weekStart())
                + "\n" + formatHours(week.assignedHours()) + " h de " + formatHours(week.capacityHours()) + " h"
                + " (" + Math.round(week.utilizationPct()) + "%)");
        return stack;
    }

    private Div histogramSegment(int heightPx, int bottomPx, String color) {
        Div segment = new Div();
        segment.getStyle().set("position", "absolute").set("left", "0").set("right", "0")
                .set("bottom", bottomPx + "px").set("height", heightPx + "px")
                .set("background", color).set("border-radius", "2px 2px 0 0");
        return segment;
    }

    private int heightPx(double hours, double scale) {
        return hours <= 0 ? 0 : (int) Math.max(2, Math.round(hours / Math.max(scale, 1) * (HISTOGRAM_HEIGHT_PX - 12)));
    }

    // ── disponibilidad restante (Remaining Availability) ─────────────────────────

    /**
     * "Libre desde": the first week each person drops below 80% utilization with hours to
     * spare. It answers who can take new work and from when, which the roadmap bars alone
     * never could.
     */
    private Component freeFromSection(WorkloadReport workload) {
        FlexLayout cards = new FlexLayout();
        cards.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("gap", "10px");

        List<PersonWorkload> people = workload.people().stream()
                .sorted(Comparator.comparing((PersonWorkload person) -> person.freeFrom() == null
                                ? LocalDate.MAX : person.freeFrom())
                        .thenComparing(PersonWorkload::name))
                .toList();

        if (people.isEmpty()) {
            cards.add(emptyNote("No hay personas con carga planificada."));
        } else {
            people.forEach(person -> cards.add(freeFromCard(person)));
        }

        return executiveSection("Libre desde",
                "Primer día disponible con menos del 80% de carga pendiente y saldo libre en su semana. "
                        + "Las horas se cuentan desde esa fecha hasta el final del horizonte. "
                        + "La estimación usa tareas fechadas; el trabajo sin plan se muestra por separado.",
                cards);
    }

    /**
     * One person's availability, always bounded by the horizon. The hours quoted are the ones
     * free <em>from {@code freeFrom} to the end of the horizon</em> and both dates are printed,
     * because a bare "240 h libres" silently summed the leftovers of weeks the person was
     * already booked in and hid the fact that the horizon is where the claim stops.
     */
    private Div freeFromCard(PersonWorkload person) {
        boolean busyAllHorizon = person.freeFrom() == null;
        LocalDate horizonEnd = person.horizonEnd();

        Span name = new Span(person.name());
        name.getStyle().set("font-size", "13px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);

        Span date = new Span(busyAllHorizon
                ? "Sin margen hasta el " + formatShortDate(horizonEnd)
                : "Libre desde el " + AVAILABILITY_DATE.format(person.freeFrom()));
        date.getStyle().set("font-size", "13px").set("font-weight", "600")
                .set("color", busyAllHorizon ? "#B3261E" : "#2E7D32");

        Span hours = new Span(busyAllHorizon
                ? "0 h libres en el horizonte"
                : formatHours(person.totalFreeHours()) + " h libres entre el "
                + formatShortDate(person.freeFrom()) + " y el " + formatShortDate(horizonEnd));
        hours.getStyle().set("font-size", "11.5px").set("color", GanttStyle.INK);

        Span context = new Span(person.roleLabel() + " · pico "
                + Math.round(person.peakUtilizationPct()) + "%"
                + (person.peakWeekStart() == null
                ? ""
                : " en la semana del " + formatShortDate(person.peakWeekStart())));
        context.getStyle().set("font-size", "11px").set("color", GanttStyle.MUTED);

        Div card = new Div(name, date, hours, context);
        card.getStyle().set("display", "flex").set("flex-direction", "column").set("gap", "3px")
                .set("min-width", "215px").set("background", GanttStyle.CARD_BG)
                .set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-left", "4px solid " + person.roleColor())
                .set("border-radius", "7px").set("padding", "10px 12px").set("box-sizing", "border-box");
        return card;
    }

    // Tareas sin ventana planificada.

    /**
     * Collapsed tray of tasks that have effort but no committed window in the database schedule.
     * Their dedication had to be assumed at 100%, which inflates their owner's load, so each
     * one is listed with its owner and a link to Jira to be agreed and dated with the team.
     */
    private Component unplannedSection(WorkloadReport workload) {
        List<UnplannedTask> unplanned = workload.unplannedTasks();
        VerticalLayout content = compactLayout();
        content.getStyle().set("padding", "6px 0");

        if (unplanned.isEmpty()) {
            content.add(emptyNote("No hay tareas sin fechas en los datos cargados."));
        } else {
            Span explanation = new Span("Las tareas sin inicio no entran en el Gantt ni en la capacidad. "
                    + "Para las que tienen inicio pero no fin se usa una ventana estimada. Acordá las fechas con el equipo.");
            content.add(new RouterLink("Planificar tareas", TaskPlanningView.class));
            explanation.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
            content.add(explanation);
            unplanned.forEach(task -> content.add(unplannedRow(task)));
        }

        Span summary = new Span("Tareas sin ventana planificada (" + unplanned.size() + ")");
        summary.getStyle().set("font-size", "14px").set("font-weight", "700")
                .set("color", unplanned.isEmpty() ? GanttStyle.PRIMARY_900 : "#A15C00");

        Details details = new Details(summary, content);
        details.setOpened(!unplanned.isEmpty());
        details.setWidthFull();
        details.getStyle().set("background", "#F9FBFC").set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "10px").set("padding", "6px 16px").set("box-sizing", "border-box");
        return details;
    }

    private Div unplannedRow(UnplannedTask task) {
        Component key = task.jiraUrl() == null
                ? new Span(task.taskKey())
                : new Anchor(task.jiraUrl(), task.taskKey());
        key.getElement().getStyle().set("font-size", "12px").set("font-weight", "700")
                .set("color", GanttStyle.TODAY).set("min-width", "110px");
        if (key instanceof Anchor anchor) {
            anchor.setTarget("_blank");
            anchor.getElement().setAttribute("title", "Abrir " + task.taskKey() + " en Jira");
        }

        Span summary = new Span(task.summary());
        summary.getStyle().set("font-size", "12px").set("color", GanttStyle.INK).set("flex", "1 1 300px");

        Span owner = new Span(task.assigneeName() + " · " + task.roleLabel());
        owner.getStyle().set("font-size", "11.5px").set("font-weight", "600").set("color", GanttStyle.INK)
                .set("min-width", "180px");

        Span detail = new Span(task.issueType() + " · " + task.md() + " MD"
                + (task.mdEstimated() ? " (estimado)" : "")
                + " · desde " + formatShortDate(task.startDate())
                + " · fin asumido " + formatShortDate(task.assumedEnd())
                + (task.status() == null ? "" : " · " + task.status()));
        detail.getStyle().set("font-size", "11px").set("color", GanttStyle.MUTED);

        Div row = new Div(key, summary, owner, detail);
        row.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("gap", "10px")
                .set("align-items", "baseline").set("padding", "6px 0 6px 8px")
                .set("border-left", "3px solid " + task.roleColor())
                .set("border-bottom", "1px solid " + GanttStyle.BORDER);
        return row;
    }

    // ── shared helpers ───────────────────────────────────────────────────────────

    private Component scrollable(Component content) {
        Div scroll = new Div(content);
        scroll.getStyle().set("width", "100%").set("min-width", "0").set("overflow-x", "auto");
        return scroll;
    }

    private String loadBackground(WeekLoad week) {
        if (week.unavailable()) {
            return "#F1F3F4";
        }
        if (week.overallocated()) {
            return "#FCEBEA";
        }
        if (week.utilizationPct() >= BuildWorkloadReportUseCase.BUSY_THRESHOLD_PCT) {
            return "#FFF4D6";
        }
        return "#E8F5E9";
    }

    private String loadTextColor(WeekLoad week) {
        if (week.unavailable()) {
            return GanttStyle.MUTED;
        }
        if (week.overallocated()) {
            return "#B3261E";
        }
        if (week.utilizationPct() >= BuildWorkloadReportUseCase.BUSY_THRESHOLD_PCT) {
            return "#765100";
        }
        return "#2E7D32";
    }

    private String formatHours(double hours) {
        return hours == Math.rint(hours)
                ? String.valueOf((long) hours)
                : String.format(Locale.ROOT, "%.1f", hours);
    }

    private Span emptyNote(String text) {
        Span note = new Span(text);
        note.getStyle().set("font-size", "12px").set("font-style", "italic").set("color", GanttStyle.MUTED);
        return note;
    }

    private Component executiveSection(String title, String description, Component content) {
        VerticalLayout section = compactLayout();
        section.addClassName("roadmap-section");
        section.getStyle().set("background", "#F9FBFC").set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "10px").set("padding", "16px").set("gap", "8px");
        Span text = new Span(description);
        text.addClassName("section-description");
        text.getStyle().set("font-size", "12.5px").set("color", GanttStyle.MUTED);
        section.add(sectionTitle(title), text, content);
        return section;
    }

    private VerticalLayout compactLayout() {
        VerticalLayout layout = new VerticalLayout();
        layout.setPadding(false);
        layout.setSpacing(false);
        layout.setWidthFull();
        layout.getStyle().set("gap", "6px");
        return layout;
    }

    private String formatMd(double value) {
        return value == Math.rint(value) ? String.valueOf((long) value) : String.format(Locale.ROOT, "%.1f", value);
    }

    private String capitalize(String text) {
        return text.isEmpty() ? text : Character.toUpperCase(text.charAt(0)) + text.substring(1);
    }

    private Div errorNote(RuntimeException e) {
        org.slf4j.LoggerFactory.getLogger(RoadmapView.class).error("Roadmap refresh failed", e);
        updatedAt.setText("La actualización falló");
        Div box = new Div(new Span("No se pudo cargar el roadmap. Reintentá con Actualizar roadmap."));
        box.addClassName("inline-error");
        box.getStyle().set("color", "#B3261E").set("background", "#FDECEA")
                .set("border", "1px solid #F5C6C2").set("border-radius", "8px")
                .set("padding", "12px 16px").set("font-size", "14px");
        return box;
    }

    // ── legend ───────────────────────────────────────────────────────────────────

    private void renderLegend() {
        legend.removeAll();
        legend.addClassName("visual-legend");
        legend.getStyle()
                .set("display", "flex").set("flex-wrap", "wrap").set("gap", "14px")
                .set("align-items", "center").set("margin-top", "4px");

        for (Role role : Role.values()) {
            legend.add(legendItem(role.color(), role.label()));
        }
        legend.add(todayLegend());
        legend.add(milestoneLegend());
        legend.add(estimatedLegend());
    }

    private Div legendItem(String color, String label) {
        Div swatch = new Div();
        swatch.getStyle().set("width", "12px").set("height", "12px")
                .set("border-radius", "3px").set("background", color);

        Span text = new Span(label);
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);

        Div item = new Div(swatch, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Div todayLegend() {
        Div marker = new Div();
        marker.getStyle().set("width", "0").set("height", "14px").set("border-left", "2px solid " + GanttStyle.TODAY);
        Span text = new Span("Hoy");
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
        Div item = new Div(marker, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Div milestoneLegend() {
        Div marker = new Div();
        marker.getStyle().set("width", "0").set("height", "14px").set("border-left", "2px dashed " + GanttStyle.MILESTONE);
        Span text = new Span("Milestone");
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
        Div item = new Div(marker, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Div estimatedLegend() {
        Div marker = new Div();
        marker.getStyle().set("width", "16px").set("height", "12px").set("border-radius", "3px")
                .set("border", "2px dashed " + GanttStyle.BAR_BORDER);
        Span text = new Span("Estimación inferida");
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
        Div item = new Div(marker, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    // ── footnote ─────────────────────────────────────────────────────────────────

    private void renderFootnote(GanttChart chart) {
        List<String> estimatedKeys = chart.groups().stream()
                .flatMap(g -> g.tasks().stream())
                .filter(GanttTask::estimated)
                .map(GanttTask::key)
                .distinct()
                .sorted()
                .collect(Collectors.toList());

        if (estimatedKeys.isEmpty()) {
            return;
        }
        Span text = new Span("Estimación inferida (MD por defecto porque Jira y la planificación no lo traen, o fecha de "
                + "inicio no leída de Jira - pasá el mouse sobre una barra para ver la fuente exacta): "
                + String.join(", ", estimatedKeys) + ".");
        text.getStyle().set("font-size", "11.5px").set("color", GanttStyle.MUTED);

        Div note = new Div(text);
        note.getStyle().set("margin-top", "10px").set("padding-top", "10px")
                .set("border-top", "1px solid " + GanttStyle.BORDER);
        footnote.add(note);
    }
}
