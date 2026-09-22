package com.example.roadmap.gantt.ui;

import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.analytics.BuildWorkloadReportUseCase;
import com.example.roadmap.gantt.application.analytics.PersonWorkload;
import com.example.roadmap.gantt.application.analytics.LoadSignal;
import com.example.roadmap.gantt.application.analytics.PlanningWarning;
import com.example.roadmap.gantt.application.analytics.RoleWorkload;
import com.example.roadmap.gantt.application.analytics.TaskLoad;
import com.example.roadmap.gantt.application.analytics.UnplannedReason;
import com.example.roadmap.gantt.application.analytics.UnplannedTask;
import com.example.roadmap.gantt.application.analytics.WeekLoad;
import com.example.roadmap.gantt.application.analytics.WorkloadReport;
import com.example.roadmap.gantt.application.data.RoadmapSnapshot;
import com.example.roadmap.gantt.application.model.EpicPalette;
import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.WorkContour;
import com.example.roadmap.gantt.application.usecase.BuildPersonGanttUseCase;
import com.example.roadmap.gantt.application.usecase.BuildRoleGanttUseCase;
import com.example.roadmap.gantt.ui.style.GanttStyle;
import com.example.roadmap.gantt.ui.widget.GanttChartWidget;
import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.ui.MainLayout;
import com.vaadin.flow.component.Component;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.combobox.ComboBox;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H1;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.html.Anchor;
import com.vaadin.flow.component.html.Span;
import com.vaadin.flow.component.details.Details;
import com.vaadin.flow.component.orderedlayout.FlexLayout;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.tabs.Tab;
import com.vaadin.flow.component.tabs.Tabs;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.data.value.ValueChangeMode;
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
 * Roadmap and workload screen for the roadmap team, loaded straight from Jira.
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
 *   <li><strong>Roadmap por rol y por persona</strong> - the calendar commitment itself,
 *       both views required by the business.</li>
 *   <li><strong>Necesita atención</strong> - the data-quality tray for tasks missing a
 *       committed calendar window, an explicit effort estimate, or both.</li>
 * </ol>
 */
@Route(value = "", layout = MainLayout.class)
@PageTitle("Team Roadmap")
public class RoadmapView extends VerticalLayout {

    /** Height of a person's load histogram, in pixels. */
    private static final int HISTOGRAM_HEIGHT_PX = 112;
    /** Width of the leading name column, shared by the header and every grid row. */
    private static final int USAGE_NAME_COL_PX = 280;
    private static final DateTimeFormatter MONTH_BAND =
            DateTimeFormatter.ofPattern("MMMM yyyy", Locale.ENGLISH);
    private static final DateTimeFormatter DAY_MONTH_SHORT =
            DateTimeFormatter.ofPattern("MMM", Locale.ENGLISH);

    private static final String SECTION_LOAD = "roadmap-load";
    private static final String SECTION_HISTOGRAM = "roadmap-histogram";
    private static final String SECTION_BY_ROLE = "roadmap-by-role";
    private static final String SECTION_BY_PERSON = "roadmap-by-person";
    private static final String SECTION_UNPLANNED = "roadmap-unplanned";
    private static final List<SectionDestination> SECTION_DESTINATIONS = List.of(
            new SectionDestination(SECTION_LOAD, "Capacity & load"),
            new SectionDestination(SECTION_HISTOGRAM, "Histogram"),
            new SectionDestination(SECTION_BY_ROLE, "By role"),
            new SectionDestination(SECTION_BY_PERSON, "By person"),
            new SectionDestination(SECTION_UNPLANNED, "Needs attention"));

    private final transient BuildRoleGanttUseCase buildRoleGantt;
    private final transient BuildPersonGanttUseCase buildPersonGantt;
    private final transient BuildWorkloadReportUseCase buildWorkloadReport;
    private final transient JiraProperties jiraProperties;

    private final Span updatedAt = new Span();
    private final Div legend = new Div();
    private final Div sectionNavigation = new Div();
    private final Div results = new Div();
    private final Div footnote = new Div();

    public RoadmapView(BuildRoleGanttUseCase buildRoleGantt, BuildPersonGanttUseCase buildPersonGantt,
                       BuildWorkloadReportUseCase buildWorkloadReport, JiraProperties jiraProperties) {
        this.buildRoleGantt = buildRoleGantt;
        this.buildPersonGantt = buildPersonGantt;
        this.buildWorkloadReport = buildWorkloadReport;
        this.jiraProperties = jiraProperties;

        addClassNames("app-page", "roadmap-page");
        setPadding(true);
        setSpacing(true);
        getStyle().set("font-family", GanttStyle.FONT).set("color", GanttStyle.INK);

        results.getStyle().set("width", "100%")
                .set("display", "flex").set("flex-direction", "column").set("gap", "24px");

        Button reload = new Button("Refresh roadmap", e -> render());
        reload.addThemeVariants(com.vaadin.flow.component.button.ButtonVariant.LUMO_TERTIARY);
        HorizontalLayout toolbar = new HorizontalLayout(reload, updatedAt);
        toolbar.addClassName("page-toolbar");
        updatedAt.addClassName("updated-at");
        configureSectionNavigation();
        VerticalLayout titleBlock = new VerticalLayout(title(), subtitle());
        titleBlock.setPadding(false);
        titleBlock.setSpacing(false);
        titleBlock.addClassName("page-heading-copy");
        HorizontalLayout pageHeader = new HorizontalLayout(titleBlock, toolbar);
        pageHeader.addClassName("roadmap-page-header");
        pageHeader.setWidthFull();
        add(sectionNavigation, pageHeader, legend, results, footnote);
        render();
    }

    private void configureSectionNavigation() {
        sectionNavigation.addClassName("roadmap-section-navigation");
        sectionNavigation.getStyle()
                .set("position", "sticky")
                .set("top", "0")
                .set("z-index", "20");
        sectionNavigation.getElement().setAttribute("role", "navigation");
        sectionNavigation.getElement().setAttribute("aria-label", "Roadmap sections");

        Div inner = new Div();
        inner.addClassName("roadmap-section-navigation-inner");

        Span label = new Span("Go to");
        label.addClassName("roadmap-section-navigation-label");
        Div links = new Div();
        links.addClassName("roadmap-section-navigation-links");
        for (SectionDestination destination : SECTION_DESTINATIONS) {
            Anchor link = new Anchor("#" + destination.id(), destination.label());
            link.addClassName("roadmap-section-navigation-link");
            link.getElement().setAttribute("data-section-target", destination.id());
            if (SECTION_LOAD.equals(destination.id())) {
                link.getElement().setAttribute("active", true);
                link.getElement().setAttribute("aria-current", "location");
            }
            links.add(link);
        }
        inner.add(label, links);
        sectionNavigation.add(inner);
    }

    private void installSectionNavigationBehavior() {
        sectionNavigation.getElement().executeJs("""
                const nav = this;
                if (nav.__roadmapNavigationCleanup) {
                    nav.__roadmapNavigationCleanup();
                }

                const links = [...nav.querySelectorAll('[data-section-target]')];
                const sections = links
                    .map(link => document.getElementById(link.dataset.sectionTarget))
                    .filter(Boolean);
                if (!sections.length) {
                    return;
                }

                const controller = new AbortController();
                const revealHorizontally = link => {
                    const scroller = link.parentElement;
                    if (!scroller) {
                        return;
                    }
                    const left = link.offsetLeft;
                    const right = left + link.offsetWidth;
                    if (left < scroller.scrollLeft) {
                        scroller.scrollTo({left, behavior: 'smooth'});
                    } else if (right > scroller.scrollLeft + scroller.clientWidth) {
                        scroller.scrollTo({left: right - scroller.clientWidth, behavior: 'smooth'});
                    }
                };
                const activate = id => {
                    links.forEach(link => {
                        const active = link.dataset.sectionTarget === id;
                        link.toggleAttribute('active', active);
                        if (active) {
                            link.setAttribute('aria-current', 'location');
                            revealHorizontally(link);
                        } else {
                            link.removeAttribute('aria-current');
                        }
                    });
                };
                const update = () => {
                    const threshold = nav.getBoundingClientRect().bottom + 24;
                    let current = sections[0];
                    for (const section of sections) {
                        if (section.getBoundingClientRect().top <= threshold) {
                            current = section;
                        }
                    }
                    const hashTarget = location.hash.length > 1
                        ? document.getElementById(location.hash.substring(1))
                        : null;
                    if (hashTarget && sections.includes(hashTarget)) {
                        const rect = hashTarget.getBoundingClientRect();
                        if (rect.top < window.innerHeight / 2 && rect.bottom > threshold) {
                            current = hashTarget;
                        }
                    }
                    activate(current.id);
                };

                links.forEach(link => link.addEventListener('click', event => {
                    const target = document.getElementById(link.dataset.sectionTarget);
                    if (!target) {
                        return;
                    }
                    event.preventDefault();
                    history.replaceState(history.state, '', '#' + target.id);
                    target.scrollIntoView({
                        behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
                        block: 'start'
                    });
                    activate(target.id);
                }, {signal: controller.signal}));

                const observer = new IntersectionObserver(update, {
                    root: null,
                    rootMargin: '-58px 0px -68% 0px',
                    threshold: [0, 0.01]
                });
                sections.forEach(section => observer.observe(section));
                // AppLayout scrolls its content, so observe nested scroll events too.
                document.addEventListener('scroll', update, {capture: true, passive: true, signal: controller.signal});
                nav.closest('vaadin-app-layout')?.shadowRoot?.addEventListener('scroll', update,
                    {capture: true, passive: true, signal: controller.signal});
                window.addEventListener('resize', update, {passive: true, signal: controller.signal});
                nav.__roadmapNavigationCleanup = () => {
                    observer.disconnect();
                    controller.abort();
                };

                requestAnimationFrame(() => {
                    const hashTarget = location.hash.length > 1
                        ? document.getElementById(location.hash.substring(1))
                        : null;
                    if (hashTarget && sections.includes(hashTarget)) {
                        hashTarget.scrollIntoView({block: 'start'});
                        activate(hashTarget.id);
                    } else {
                        update();
                    }
                });
                """);
    }

    private record SectionDestination(String id, String label) {
    }

    private H1 title() {
        H1 title = new H1("Team Roadmap");
        title.addClassName("page-title");
        title.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-weight", "700");
        return title;
    }

    private Span subtitle() {
        Span span = new Span("Example team · Jira and local planning · capacity across scheduled tasks");
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
            updatedAt.setText("Updated: " + LocalDateTime.now().format(DateTimeFormatter.ofPattern("MM/dd/yyyy HH:mm:ss")));

            results.add(resourceUsageSection(workload));
            results.add(loadHistogramSection(workload));

            results.add(initiativeLegend(roleChart, snapshot.issueSummaries()));
            results.add(ganttSection(SECTION_BY_ROLE, "Roadmap - By role", roleChart, "gantt-role-section"));
            results.add(ganttSection(SECTION_BY_PERSON, "Roadmap - By person", personChart, "gantt-person-section"));

            results.add(unplannedSection(workload));
            renderFootnote(roleChart);
            sectionNavigation.setVisible(true);
            installSectionNavigationBehavior();
        } catch (RuntimeException e) {
            sectionNavigation.setVisible(false);
            results.add(errorNote(e));
        }
    }

    /**
     * Maps every colour on the roadmap back to the epic that owns it. Without this the bars
     * are merely colourful: a manager can see that two tasks belong together but not to
     * which initiative, which is the whole point of colouring them by epic.
     */
    private Component initiativeLegend(GanttChart chart, Map<String, String> issueSummaries) {
        Map<String, String> names = new LinkedHashMap<>(issueSummaries);
        Map<String, Integer> counts = new LinkedHashMap<>();
        for (GanttGroup group : chart.groups()) {
            for (GanttTask task : group.tasks()) {
                if (task.isEpic()) {
                    names.put(task.key(), task.summary());
                    counts.putIfAbsent(task.key(), 0);
                    continue;
                }
                String initiative = task.initiativeKey();
                String label = initiative == null ? EpicPalette.UNASSIGNED_LABEL : initiative;
                counts.merge(label, 1, Integer::sum);
            }
        }
        chart.milestones().forEach(milestone -> {
            names.put(milestone.key(), milestone.name());
            counts.putIfAbsent(milestone.key(), 0);
        });
        if (counts.isEmpty()) {
            return new Div();
        }

        Div legend = new Div();
        legend.addClassName("epic-legend");
        legend.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("align-items", "center")
                .set("gap", "6px 14px").set("font-size", "11.5px").set("color", GanttStyle.MUTED)
                .set("background", GanttStyle.WEEKEND_BG).set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "8px").set("padding", "9px 12px");

        Span intro = new Span("Colors by initiative:");
        intro.getStyle().set("font-weight", "700").set("color", GanttStyle.INK);
        legend.add(intro);

        counts.entrySet().stream()
                .sorted(Map.Entry.<String, Integer>comparingByValue().reversed())
                .forEach(entry -> {
                    String label = entry.getKey();
                    String name = names.get(label);
                    String text = label + (name == null ? "" : " · " + name) + " (" + entry.getValue() + ")";
                    boolean unassigned = EpicPalette.UNASSIGNED_LABEL.equals(label);
                    Div item = legendSwatch(unassigned ? EpicPalette.UNASSIGNED : EpicPalette.colorFor(label), text);
                    item.getStyle().set("min-width", "0").set("overflow-wrap", "anywhere");
                    if (unassigned) {
                        legend.add(item);
                    } else {
                        Anchor link = new Anchor(jiraIssueUrl(label), item);
                        link.setTarget("_blank");
                        link.getElement().setAttribute("rel", "noopener noreferrer");
                        link.getElement().setAttribute("aria-label", "Open " + text + " in Jira (new tab)");
                        link.getElement().setAttribute("title", "Open " + label + " in Jira (new tab)");
                        link.getStyle().set("min-width", "0").set("max-width", "100%")
                                .set("text-decoration", "underline").set("text-underline-offset", "3px");
                        legend.add(link);
                    }
                });
        return legend;
    }

    private H2 sectionTitle(String text) {
        H2 h2 = new H2(text);
        h2.addClassName("section-title");
        h2.getStyle().set("color", GanttStyle.PRIMARY_900).set("font-size", "16px")
                .set("font-weight", "700").set("margin", "0 0 4px");
        return h2;
    }

    private Component ganttSection(String sectionId, String title, GanttChart chart, String className) {
        H2 heading = sectionTitle(title);
        heading.addClassName("gantt-section-heading");
        GanttChartWidget gantt = new GanttChartWidget(chart, 16, 7);
        gantt.addClassName("gantt-section-chart");
        VerticalLayout section = compactLayout();
        section.addClassNames("gantt-section", className);
        section.setId(sectionId);
        section.getStyle().set("scroll-margin-top", "136px");
        section.add(heading, gantt);
        return section;
    }

    private String formatShortDate(LocalDate date) {
        return date == null ? "no date" : date.format(DateTimeFormatter.ofPattern("MMM d, yyyy", Locale.ENGLISH));
    }

    // ── carga del equipo (Resource Usage) ────────────────────────────────────────

    /**
     * Person × week grid in hours: the roadmap's Resource Usage view. Each row expands into
     * the tasks that make up that person's load, so a red week can always be traced back to
     * the specific commitments causing it.
     */
    private Component resourceUsageSection(WorkloadReport workload) {
        VerticalLayout content = compactLayout();
        content.addClassName("usage-content");
        content.getStyle().set("gap", "16px").set("min-width",
                (USAGE_NAME_COL_PX + workload.weekStarts().size() * 145) + "px");
        content.add(weekHeader(workload.weekStarts(), workload.asOf(), "Role / person", "weekly plan and capacity"));

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
            content.add(emptyNote("No people have planned workload."));
        } else {
            content.add(usageLegend());
        }

        return executiveSection(SECTION_LOAD, "Team capacity & load",
                "The result of the plan: estimated effort distributed by role, person, and week, then compared with available hours. "
                        + "Expand a person to see each task's total estimate, weekly share, and work still due. "
                        + "Effort is distributed and leveled within committed dates without assuming full dedication. "
                        + "Capacity uses 6 productive hours per business day and subtracts absences.",
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
        details.getStyle().set("width", "100%").set("padding", "0");
        details.getElement().getStyle().set("--lumo-space-m", "0px");
        return details;
    }

    private Div roleNameCell(RoleWorkload role, List<PersonWorkload> people, List<WeekLoad> roleWeeks) {
        Span name = new Span(role.roleLabel());
        name.getStyle().set("font-size", "13px").set("font-weight", "800").set("color", GanttStyle.PRIMARY_900);
        Div identity = new Div(name);
        identity.addClassName("usage-row-identity");
        identity.getStyle().set("display", "flex").set("align-items", "center");

        double weeklyCapacity = roleWeeks.isEmpty() ? 0 : roleWeeks.get(roleWeeks.size() - 1).capacityHours();
        Span detail = new Span(people.size() + (people.size() == 1 ? " person" : " people")
                + " · " + formatHours(weeklyCapacity) + " h/week");
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
        cell.addClassName("usage-role-week");
        cell.getElement().setAttribute("data-load-level", week.loadSignal().name());
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("gap", "3px").set("background", loadBackground(week))
                .set("padding", "8px").set("min-height", "50px").set("min-width", "0");

        if (week.unavailable()) {
            cell.add(mutedLine("No capacity", true));
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
            boolean critical = people.stream().anyMatch(person -> index < person.weeks().size()
                    && person.weeks().get(index).loadSignal() == LoadSignal.RED);
            cell.add(warningChip(over + " of " + people.size() + " overallocated", critical));
        }
        cell.add(riskChip(week));

        cell.getElement().setAttribute("title", role.roleLabel() + " · week "
                + formatShortDate(week.weekStart()) + " to " + formatShortDate(week.weekEnd())
                + "\n" + formatHours(week.assignedHours()) + " committed h of "
                + formatHours(week.capacityHours()) + " role h"
                + "\n" + people.size() + " people · " + over + " overallocated");
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
                ? "over by " + formatHours(week.overflowHours()) + " h"
                : formatHours(week.freeHours()) + " h available");
        line.getStyle().set("font-size", "11px").set("font-weight", "800")
                .set("color", loadTextColor(week))
                .set("line-height", "1.25").set("overflow-wrap", "anywhere");
        return line;
    }

    /** The same free hours restated in MD, the unit the CSV and the team already speak in. */
    private Span mdLine(WeekLoad week) {
        Span line = new Span(week.freeHours() <= 0
                ? ""
                : "≈ " + formatMd(WorkContour.toMd(week.freeHours())) + " MD available");
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
        Span chip = new Span("⚠ " + formatHours(week.carriedOverHours()) + " h carried over");
        chip.getStyle().set("font-size", "9.5px").set("font-weight", "700").set("color", "#A16207")
                .set("line-height", "1.2").set("overflow-wrap", "anywhere");
        return chip;
    }

    private Span warningChip(String text, boolean critical) {
        Span chip = new Span(text);
        chip.getStyle().set("font-size", "9.5px").set("font-weight", "800")
                .set("color", critical ? "#B3261E" : "#765100")
                .set("background", critical ? "#FDECEA" : "#FFF4D6").set("border-radius", "999px").set("padding", "1px 7px")
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
        return USAGE_NAME_COL_PX + "px repeat(" + weeks + ", minmax(144px, 1fr))";
    }

    /** Keeps nested week columns aligned after their container receives a visual inset. */
    private String nestedGridTemplate(int weeks) {
        return gridTemplate(weeks);
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

        grid.add(headerCornerCell("Person tasks", "window · effort · dedication"));
        LocalDate currentWeek = asOf.with(TemporalAdjusters.previousOrSame(DayOfWeek.MONDAY));
        for (int week = 0; week < weekStarts.size(); week++) {
            grid.add(weekHeaderCell(weekStarts.get(week), week + 1, weekStarts.get(week).equals(currentWeek)));
        }
        return grid;
    }

    private Div weekHeaderCell(LocalDate weekStart, int number, boolean current) {
        Span tag = new Span("W" + number + (current ? " · today" : ""));
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

        legend.add(legendText("Each square", "one week for a role or person"));
        legend.add(legendText("Assigned", "task hours assigned during the week"));
        legend.add(legendText("Available", "business days × 6 productive h, minus absences"));
        legend.add(legendText("Percentage", "assigned hours ÷ available hours"));
        legend.add(legendText("Carried-over hours",
                "work planned for elapsed days that has not yet been logged in Jira"));
        legend.add(legendSwatch(loadBackground(LoadSignal.GREEN), "Within capacity · up to 6 h/day avg."));
        legend.add(legendSwatch(loadBackground(LoadSignal.YELLOW), "Above capacity · over 6 to 8 h/day avg."));
        legend.add(legendSwatch(loadBackground(LoadSignal.RED), "Critical · over 8 h/day avg."));
        legend.add(legendSwatch(GanttStyle.GRIDLINE, "Absent · no capacity"));
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
        grid.getStyle().set("display", "grid").set("grid-template-columns", gridTemplate(weekStarts.size()))
                .set("gap", "1px").set("background", GanttStyle.BORDER).set("width", "100%");

        grid.add(usageNameCell(person));
        for (WeekLoad week : person.weeks()) {
            grid.add(usageWeekCell(person, week));
        }

        Details details = new Details(grid, taskBreakdown(person, asOf));
        details.addClassNames("usage-row", "usage-person-row");
        details.getStyle().set("width", "100%").set("padding", "0");
        details.getElement().getStyle().set("--lumo-space-m", "0px");
        return details;
    }

    private Div usageNameCell(PersonWorkload person) {
        Span name = new Span(person.name());
        name.getStyle().set("font-size", "12.5px").set("font-weight", "600").set("color", GanttStyle.PRIMARY_900);
        Div identity = new Div(name);
        identity.addClassName("usage-row-identity");
        Span role = new Span(person.roleLabel()
                + (person.hasOverallocation() ? " · overallocated" : ""));
        role.getStyle().set("font-size", "11px")
                .set("color", person.hasOverallocation() ? signalTextColor(person.loadSignal()) : GanttStyle.MUTED);

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
     * evidence. Above the six-hour baseline it is yellow; above eight hours per available
     * day it is red. The percentage still uses productive capacity as its denominator.
     */
    private Div usageWeekCell(PersonWorkload person, WeekLoad week) {
        Div cell = new Div();
        cell.addClassName("usage-person-week");
        cell.getElement().setAttribute("data-load-level", week.loadSignal().name());
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("gap", "6px").set("background", loadBackground(week))
                .set("padding", "10px").set("min-height", "82px").set("min-width", "0");

        if (week.unavailable()) {
            Span headline = new Span("Absent");
            headline.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", "#9AA4AA")
                    .set("line-height", "1");
            Span detail = new Span("0 h available");
            detail.getStyle().set("font-size", "10px").set("color", GanttStyle.MUTED).set("line-height", "1.25");
            cell.add(headline, detail);
        } else {
            Span hours = new Span(formatHours(week.assignedHours()) + " / "
                    + formatHours(week.capacityHours()) + " h");
            hours.addClassName("usage-occupied-hours");
            Span label = new Span("assigned");
            label.addClassName("usage-occupied-label");
            Span percentage = new Span(Math.round(week.utilizationPct()) + "%");
            percentage.addClassName("usage-occupied-percentage");

            Div headline = new Div(new Div(hours, label), percentage);
            headline.addClassName("usage-occupied-headline");
            cell.add(headline, loadFillBar(week));
        }

        cell.getElement().setAttribute("title", person.name() + " · week " + formatShortDate(week.weekStart())
                + " to " + formatShortDate(week.weekEnd())
                + "\n" + formatHours(week.assignedHours()) + " assigned h of "
                + formatHours(week.capacityHours()) + " available h"
                + "\nUtilization: " + Math.round(week.utilizationPct()) + "%"
                + "\n" + week.tasks().size() + " tasks");
        return cell;
    }

    /**
     * Utilization drawn as a filled track. It saturates at 100% so an overallocated week shows a
     * completely full warning bar plus the overflow hours in the caption, instead of a bar that would
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
                .set("background", "rgba(0,0,0,0.09)");
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
            empty.addClassNames("usage-task-breakdown", "usage-task-empty");
            empty.getStyle().set("padding", "10px 12px 10px 48px");
            empty.add(emptyNote("No tasks are planned within the horizon."));
            return empty;
        }

        Div grid = new Div();
        grid.addClassName("usage-task-grid");
        grid.getStyle().set("display", "grid").set("grid-template-columns", gridTemplate(weekStarts.size()))
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

        legend.add(legendSwatch("#EAF2F6", "Task is active during this week"));
        legend.add(legendSwatch("#FCFCFD", "Outside its window"));
        legend.add(legendText("Allocated this week", "the task's share of its total effort assigned to this week"));
        legend.add(legendText("Remaining this week", "work left after Jira logged hours, placed on this week's remaining days"));
        legend.add(legendText("- no hours", "no hours assigned this week; review calendar and distribution"));
        return legend;
    }

    private Div breakdownNameCell(TaskLoad task) {
        Div dot = new Div();
        dot.getStyle().set("width", "9px").set("height", "9px").set("border-radius", "50%")
                .set("background", task.color()).set("flex", "0 0 auto");
        dot.getElement().setAttribute("title", task.initiativeKey() == null
                ? EpicPalette.UNASSIGNED_LABEL
                : "Initiative " + task.initiativeKey());

        Anchor key = new Anchor(jiraIssueUrl(task.taskKey()), task.taskKey());
        key.setTarget("_blank");
        key.getElement().setAttribute("rel", "noopener noreferrer");
        key.getElement().setAttribute("title", "Open " + task.taskKey() + " in Jira");
        key.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);
        Div keyLine = new Div(dot, levelChip("TASK", "usage-task-chip"), key);
        keyLine.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        Span summary = new Span(task.summary());
        summary.getStyle().set("font-size", "11px").set("color", GanttStyle.INK)
                .set("overflow", "hidden").set("text-overflow", "ellipsis").set("white-space", "nowrap");
        Span window = new Span(formatShortDate(task.startDate()) + " → " + formatShortDate(task.endDate())
                + " · " + Math.round(task.dedicationPct()) + "% dedication");
        window.getStyle().set("font-size", "10.5px").set("color", GanttStyle.MUTED);
        Span effort = new Span("Total effort " + formatHours(task.estimatedHours())
                + " h (" + formatMd(task.md()) + " MD) · Logged in Jira " + formatHours(task.loggedHours())
                + " h · Total still due " + formatHours(task.totalPendingHours()) + " h ("
                + formatMd(WorkContour.toMd(task.totalPendingHours())) + " MD)");
        effort.addClassName("usage-task-effort-equation");

        Div cell = new Div(keyLine, summary, window, effort);
        cell.addClassName("usage-task-name");
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", "#FFFFFF").set("padding", "8px 10px").set("min-width", "0");
        return cell;
    }

    private String jiraIssueUrl(String issueKey) {
        String baseUrl = jiraProperties.baseUrl().trim();
        return (baseUrl.endsWith("/") ? baseUrl : baseUrl + "/") + "browse/" + issueKey;
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

        Span value = new Span(hours > 0 ? "Allocated this week " + formatHours(hours) + " h"
                : insideWindow ? "Allocated this week 0 h" : "");
        value.addClassName("usage-task-planned");
        Span pendingValue = new Span("Remaining this week " + formatHours(pending) + " h"
                + " · " + formatMd(WorkContour.toMd(pending)) + " MD");
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
            cell.getElement().setAttribute("title", task.taskKey() + " · week "
                    + formatShortDate(week.weekStart()) + "\n" + formatHours(hours) + " effort h"
                    + "\n" + formatHours(task.dailyHours()) + " h/day this week ("
                    + Math.round(task.dedicationPct()) + "% dedication)");
        } else if (insideWindow) {
            cell.getElement().setAttribute("title", task.taskKey() + " · week "
                    + formatShortDate(week.weekStart())
                    + "\nInside the window but with no hours: non-working week, absence, or effort "
                    + "was assigned to other weeks in the window because no capacity was available here.");
        }
        return cell;
    }

    private Div breakdownTotalNameCell() {
        Span label = new Span("Total assigned");
        label.getStyle().set("font-size", "11px").set("font-weight", "700").set("color", GanttStyle.PRIMARY_900);
        Span note = new Span("sum of the tasks above");
        note.getStyle().set("font-size", "10.5px").set("color", GanttStyle.MUTED);

        Div cell = new Div(label, note);
        cell.addClassName("usage-task-total-name");
        cell.getStyle().set("display", "flex").set("flex-direction", "column").set("justify-content", "center")
                .set("background", GanttStyle.WEEKEND_BG).set("padding", "6px 10px");
        return cell;
    }

    private Div breakdownTotalCell(WeekLoad week) {
        Span plan = new Span(formatHours(week.assignedHours()) + " / "
                + formatHours(week.capacityHours()) + " h assigned");
        plan.addClassName("usage-task-total-plan");
        Div cell = new Div(plan);
        cell.getStyle().set("background", GanttStyle.WEEKEND_BG)
                .set("padding", "7px 8px").set("min-height", "0");
        cell.getElement().setAttribute("title", "Week of " + formatShortDate(week.weekStart()) + "\n"
                + formatHours(week.assignedHours()) + " assigned h of "
                + formatHours(week.capacityHours()) + " available h");
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
        charts.addClassName("histogram-grid");
        charts.getStyle().set("display", "flex").set("flex-wrap", "wrap").set("gap", "12px");

        List<PersonWorkload> people = workload.people();
        if (people.isEmpty()) {
            charts.add(emptyNote("No people have planned workload."));
        } else {
            people.forEach(person -> charts.add(personHistogram(person)));
        }

        return executiveSection(SECTION_HISTOGRAM, "Workload histogram",
                "Each bar is one week. The dotted line marks 6 h per available day. "
                        + "Work above that line is yellow up to 8 h per available day, then red. "
                        + "For a full five-day week, the thresholds are 30 h and 40 h.",
                charts);
    }

    private Div personHistogram(PersonWorkload person) {
        double scale = Math.max(person.weeks().stream().mapToDouble(WeekLoad::capacityHours).max().orElse(1),
                person.weeks().stream().mapToDouble(WeekLoad::assignedHours).max().orElse(1));

        FlexLayout bars = new FlexLayout();
        bars.addClassName("histogram-bars");
        bars.getStyle().set("display", "flex").set("align-items", "flex-end").set("gap", "5px")
                .set("height", HISTOGRAM_HEIGHT_PX + "px").set("position", "relative")
                .set("border-bottom", "1px solid " + GanttStyle.BORDER);
        person.weeks().forEach(week -> bars.add(histogramBar(person, week, scale)));

        Span name = new Span(person.name());
        name.addClassName("histogram-person-name");
        Span summary = new Span(person.roleLabel() + " · peak " + Math.round(person.peakUtilizationPct()) + "%"
                + " · " + formatHours(person.totalFreeHours()) + " h available");
        summary.addClassName("histogram-person-summary");
        summary.getStyle().set("color", person.hasOverallocation() ? signalTextColor(person.loadSignal()) : GanttStyle.MUTED);

        Div card = new Div(name, summary, bars);
        card.addClassName("histogram-card");
        card.getStyle().set("--histogram-role-color", person.roleColor());
        return card;
    }

    private Div histogramBar(PersonWorkload person, WeekLoad week, double scale) {
        int assignedPx = heightPx(Math.min(week.assignedHours(), week.capacityHours()), scale);
        int warningPx = heightPx(week.warningBandHours(), scale);
        int criticalPx = heightPx(week.criticalOverflowHours(), scale);
        int capacityPx = heightPx(week.capacityHours(), scale);

        Div stack = new Div();
        stack.addClassName("histogram-bar-plot");
        stack.getElement().setAttribute("data-load-level", week.loadSignal().name());
        stack.getStyle().set("position", "relative").set("flex", "1 1 0")
                .set("height", HISTOGRAM_HEIGHT_PX + "px").set("min-width", "14px");

        if (criticalPx > 0) {
            stack.add(histogramSegment(criticalPx, assignedPx + warningPx, "#B3261E"));
        }
        if (warningPx > 0) {
            stack.add(histogramSegment(warningPx, assignedPx, "#D49B18"));
        }
        if (assignedPx > 0) {
            stack.add(histogramSegment(assignedPx, 0, person.roleColor()));
        }

        Div capacityLine = new Div();
        capacityLine.addClassName("histogram-capacity-line");
        capacityLine.getStyle().set("position", "absolute").set("left", "0").set("right", "0")
                .set("bottom", capacityPx + "px").set("border-top", "1px dashed " + GanttStyle.MUTED);
        stack.add(capacityLine);

        stack.getElement().setAttribute("title", "Week of " + formatShortDate(week.weekStart())
                + "\n" + formatHours(week.assignedHours()) + " h of " + formatHours(week.capacityHours()) + " h"
                + " (" + Math.round(week.utilizationPct()) + "%)"
                + "\nYellow above " + formatHours(week.capacityHours()) + " h; red above "
                + formatHours(week.criticalCapacityHours()) + " h");
        return stack;
    }

    private Div histogramSegment(int heightPx, int bottomPx, String color) {
        Div segment = new Div();
        segment.addClassName("histogram-bar-segment");
        segment.getStyle().set("position", "absolute").set("left", "0").set("right", "0")
                .set("bottom", bottomPx + "px").set("height", heightPx + "px")
                .set("background", color).set("border-radius", "2px 2px 0 0");
        return segment;
    }

    private int heightPx(double hours, double scale) {
        return hours <= 0 ? 0 : (int) Math.max(2, Math.round(hours / Math.max(scale, 1) * (HISTOGRAM_HEIGHT_PX - 12)));
    }

    // Tareas que necesitan atención del equipo: sin fecha, sin estimación, o ambas.

    /**
     * Collapsed tray, split into two tabs, for tasks the roadmap could not fully place:
     * those with no committed calendar window (dedication assumed at 100%) and those with no
     * explicit effort estimate at all, which never reach the Gantt or anyone's workload.
     * Each one is listed with its owner and a link to Jira so the team can agree on dates or
     * load a real estimate.
     */
    private Component unplannedSection(WorkloadReport workload) {
        Map<UnplannedReason, List<UnplannedTask>> byReason = workload.unplannedTasks().stream()
                .collect(Collectors.groupingBy(UnplannedTask::reason, LinkedHashMap::new, Collectors.toList()));
        List<UnplannedTask> noDate = byReason.getOrDefault(UnplannedReason.NO_DATE, List.of());
        List<UnplannedTask> noEstimate = byReason.getOrDefault(UnplannedReason.NO_ESTIMATE, List.of());
        int total = noDate.size() + noEstimate.size();

        VerticalLayout content = compactLayout();
        content.getStyle().set("padding", "6px 0");

        if (total == 0) {
            content.add(emptyNote("All loaded tasks have both dates and estimates."));
        } else {
            content.add(new RouterLink("Task planning", TaskPlanningView.class));

            Div noDatePanel = unplannedPanel(noDate,
                    "Tasks without a start date are excluded from the Gantt and capacity. Tasks with a start "
                            + "but no end date use an estimated window. Agree on committed dates with the team.",
                    "No tasks are missing dates.");
            Div noEstimatePanel = unplannedPanel(noEstimate,
                    "These tasks are excluded from the Gantt and capacity until estimated. "
                            + "For tasks and subtasks, enter Original Estimate in Jira Time Tracking.",
                    "No tasks are missing estimates.");
            noEstimatePanel.setVisible(false);

            Tab tabNoDate = new Tab("Missing dates (" + noDate.size() + ")");
            Tab tabNoEstimate = new Tab("Missing estimates (" + noEstimate.size() + ")");
            Tabs tabs = new Tabs(tabNoDate, tabNoEstimate);
            tabs.setWidthFull();
            tabs.getStyle().set("margin-bottom", "6px");
            tabs.addSelectedChangeListener(event -> {
                noDatePanel.setVisible(tabs.getSelectedTab() == tabNoDate);
                noEstimatePanel.setVisible(tabs.getSelectedTab() == tabNoEstimate);
            });

            content.add(tabs, noDatePanel, noEstimatePanel);
        }

        Span summary = new Span("Needs attention (" + total + ")");
        summary.getStyle().set("font-size", "14px").set("font-weight", "700")
                .set("color", total == 0 ? GanttStyle.PRIMARY_900 : "#A15C00");

        Details details = new Details(summary, content);
        details.setId(SECTION_UNPLANNED);
        details.setOpened(total > 0);
        details.setWidthFull();
        details.getStyle().set("background", "#F9FBFC").set("border", "1px solid " + GanttStyle.BORDER)
                .set("border-radius", "10px").set("padding", "6px 16px").set("box-sizing", "border-box");
        return details;
    }

    private Div unplannedPanel(List<UnplannedTask> tasks, String explanationText, String emptyText) {
        VerticalLayout panel = compactLayout();
        panel.setPadding(false);
        panel.setSpacing(false);

        Span explanation = new Span(explanationText);
        explanation.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED)
                .set("display", "block").set("margin-bottom", "6px");
        panel.add(explanation);

        if (tasks.isEmpty()) {
            panel.add(emptyNote(emptyText));
        } else {
            List<UnplannedTask> sortedTasks = tasks.stream()
                    .sorted(Comparator
                            .comparing(UnplannedTask::assigneeName,
                                    Comparator.nullsLast(String.CASE_INSENSITIVE_ORDER))
                            .thenComparing(UnplannedTask::taskKey, String.CASE_INSENSITIVE_ORDER))
                    .toList();

            TextField taskFilter = new TextField("Search task");
            taskFilter.setPlaceholder("ID or title");
            taskFilter.setClearButtonVisible(true);
            taskFilter.setValueChangeMode(ValueChangeMode.EAGER);

            ComboBox<String> assigneeFilter = new ComboBox<>("Person");
            assigneeFilter.setPlaceholder("All people");
            assigneeFilter.setClearButtonVisible(true);
            assigneeFilter.setAllowCustomValue(false);
            assigneeFilter.setItems(sortedTasks.stream()
                    .map(UnplannedTask::assigneeName)
                    .filter(name -> name != null && !name.isBlank())
                    .distinct()
                    .sorted(String.CASE_INSENSITIVE_ORDER)
                    .toList());

            HorizontalLayout filters = new HorizontalLayout(taskFilter, assigneeFilter);
            filters.addClassName("unplanned-task-filters");
            filters.setAlignItems(Alignment.END);
            filters.setSpacing(true);
            filters.setWrap(true);

            Div table = new Div();
            table.addClassName("unplanned-task-table");
            Span noMatches = emptyNote("No tasks match the filters.");
            noMatches.setVisible(false);

            Runnable applyFilters = () -> {
                String query = taskFilter.getValue() == null
                        ? "" : taskFilter.getValue().trim().toLowerCase(Locale.ROOT);
                String assignee = assigneeFilter.getValue();
                List<UnplannedTask> filteredTasks = sortedTasks.stream()
                        .filter(task -> query.isEmpty()
                                || task.taskKey().toLowerCase(Locale.ROOT).contains(query)
                                || task.summary().toLowerCase(Locale.ROOT).contains(query))
                        .filter(task -> assignee == null || assignee.equals(task.assigneeName()))
                        .toList();
                table.removeAll();
                if (!filteredTasks.isEmpty()) {
                    table.add(unplannedTableHeader());
                    filteredTasks.forEach(task -> table.add(unplannedRow(task)));
                }
                table.setVisible(!filteredTasks.isEmpty());
                noMatches.setVisible(filteredTasks.isEmpty());
            };
            taskFilter.addValueChangeListener(event -> applyFilters.run());
            assigneeFilter.addValueChangeListener(event -> applyFilters.run());
            applyFilters.run();

            panel.add(filters, table, noMatches);
        }

        Div wrapper = new Div(panel);
        wrapper.setWidthFull();
        return wrapper;
    }

    private Div unplannedRow(UnplannedTask task) {
        Component key = task.jiraUrl() == null
                ? new Span(task.taskKey())
                : new Anchor(task.jiraUrl(), task.taskKey());
        key.getElement().getStyle().set("font-size", "12px").set("font-weight", "700")
                .set("color", GanttStyle.TODAY);
        if (key instanceof Anchor anchor) {
            anchor.setTarget("_blank");
            anchor.getElement().setAttribute("title", "Open " + task.taskKey() + " in Jira");
        }

        Span summary = new Span(task.summary());
        summary.getStyle().set("font-size", "13px").set("font-weight", "700")
                .set("color", GanttStyle.INK).set("overflow-wrap", "anywhere");

        Div row = new Div(
                unplannedCell(key),
                unplannedCell(summary),
                unplannedCell(new Span(task.assigneeName())),
                unplannedCell(new Span(task.status() == null ? "No status" : task.status())));
        row.addClassName("unplanned-task-card");
        row.getStyle().set("display", "grid")
                .set("grid-template-columns", "110px minmax(260px, 2fr) minmax(160px, 1fr) 140px")
                .set("align-items", "center").set("min-width", "670px")
                .set("padding", "10px 14px")
                .set("border-left", "3px solid " + task.roleColor())
                .set("border-bottom", "1px solid " + GanttStyle.BORDER)
                .set("background", "#FFFFFF");
        return row;
    }

    private Div unplannedTableHeader() {
        Div header = new Div(
                unplannedHeaderCell("Key"),
                unplannedHeaderCell("Task"),
                unplannedHeaderCell("Person"),
                unplannedHeaderCell("Status"));
        header.addClassName("unplanned-task-header");
        header.getStyle().set("display", "grid")
                .set("grid-template-columns", "110px minmax(260px, 2fr) minmax(160px, 1fr) 140px")
                .set("align-items", "center").set("min-width", "670px")
                .set("padding", "8px 14px").set("background", "#EEF4F7")
                .set("border-bottom", "1px solid " + GanttStyle.BORDER);
        return header;
    }

    private Span unplannedHeaderCell(String text) {
        Span cell = new Span(text);
        cell.getStyle().set("font-size", "10px").set("font-weight", "800")
                .set("text-transform", "uppercase").set("letter-spacing", "0.04em")
                .set("color", GanttStyle.MUTED);
        return cell;
    }

    private Div unplannedCell(Component content) {
        Div cell = new Div(content);
        cell.getStyle().set("min-width", "0").set("overflow-wrap", "anywhere");
        return cell;
    }

    // ── shared helpers ───────────────────────────────────────────────────────────

    private Component scrollable(Component content) {
        Div scroll = new Div(content);
        scroll.getStyle().set("width", "100%").set("min-width", "0").set("overflow-x", "auto");
        return scroll;
    }

    private String loadBackground(WeekLoad week) {
        return loadBackground(week.loadSignal());
    }

    private String loadBackground(LoadSignal signal) {
        return switch (signal) {
            case UNAVAILABLE -> "#F1F3F4";
            case RED -> "#FCEBEA";
            case YELLOW -> "#FFF4D6";
            case GREEN -> "#E8F5E9";
        };
    }

    private String loadTextColor(WeekLoad week) {
        return signalTextColor(week.loadSignal());
    }

    private String signalTextColor(LoadSignal signal) {
        return switch (signal) {
            case UNAVAILABLE -> GanttStyle.MUTED;
            case RED -> "#B3261E";
            case YELLOW -> "#765100";
            case GREEN -> "#2E7D32";
        };
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

    private Component executiveSection(String sectionId, String title, String description, Component content) {
        VerticalLayout section = compactLayout();
        section.addClassName("roadmap-section");
        section.setId(sectionId);
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
        updatedAt.setText("Refresh failed");
        Div box = new Div(new Span("The roadmap could not be loaded. Try Refresh roadmap again."));
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

        legend.add(legendItem(EpicPalette.UNASSIGNED, EpicPalette.UNASSIGNED_LABEL));
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
        Span text = new Span("Today");
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
        Div item = new Div(marker, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Div milestoneLegend() {
        Div marker = new Div();
        marker.getStyle().set("width", "10px").set("height", "10px")
                .set("background", GanttStyle.MILESTONE).set("transform", "rotate(45deg)")
                .set("border-radius", "2px");
        Span text = new Span("Milestone · Delivery Date");
        text.getStyle().set("font-size", "12px").set("color", GanttStyle.MUTED);
        Div item = new Div(marker, text);
        item.getStyle().set("display", "flex").set("align-items", "center").set("gap", "6px");
        return item;
    }

    private Div estimatedLegend() {
        Div marker = new Div();
        marker.getStyle().set("width", "16px").set("height", "12px").set("border-radius", "3px")
                .set("border", "2px dashed " + GanttStyle.BAR_BORDER);
        Span text = new Span("Start rescheduled locally");
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
        Span text = new Span("Start date rescheduled locally or unavailable from Jira. Hover over a bar to "
                + "see the exact source: "
                + String.join(", ", estimatedKeys) + ".");
        text.getStyle().set("font-size", "11.5px").set("color", GanttStyle.MUTED);

        Div note = new Div(text);
        note.getStyle().set("margin-top", "10px").set("padding-top", "10px")
                .set("border-top", "1px solid " + GanttStyle.BORDER);
        footnote.add(note);
    }
}
