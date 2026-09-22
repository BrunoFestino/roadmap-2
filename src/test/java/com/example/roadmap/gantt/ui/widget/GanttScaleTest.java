package com.example.roadmap.gantt.ui.widget;

import com.example.roadmap.gantt.application.dto.GanttChart;
import com.example.roadmap.gantt.application.dto.GanttGroup;
import com.example.roadmap.gantt.application.model.*;
import com.vaadin.flow.dom.Element;
import org.junit.jupiter.api.Test;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Stream;
import static org.assertj.core.api.Assertions.assertThat;

class GanttScaleTest {
    @Test void fridayToMondayUsesFourCalendarDays() {
        assertThat(GanttScale.widthOf(LocalDate.of(2026, 9, 11), LocalDate.of(2026, 9, 14), 16)).isEqualTo(64);
    }

    @Test void clippedTaskKeepsItsCalendarEnd() {
        LocalDate start = LocalDate.of(2026, 9, 11);
        var task = GanttTask.create("CLIP", "CLIP", "Task", GanttTeamRoster.defaults().members().getFirst(), start.minusDays(4),
                start.minusDays(4), StartDateSource.LOCAL_PLAN, 2, "Open", start.plusDays(3), d -> false, null, 0);
        var chart = new GanttChart(start, start.plusDays(7), List.of(), List.of());
        assertThat(GanttLanePacker.pack(chart, List.of(task), 16)).singleElement().satisfies(p -> {
            assertThat(p.width()).isEqualTo(64);
            assertThat(p.x()).isEqualTo(GanttScale.xOf(chart, start, 16));
        });
    }

    @Test void taskWithoutOwnOrInheritedPrjTaskStatesThatInItsTooltip() {
        LocalDate start = LocalDate.now();
        var task = GanttTask.create("NO-PRJ", "No PRJtask", "Task", GanttTeamRoster.defaults().members().getFirst(),
                start, start, StartDateSource.LOCAL_PLAN, 1, "Open", start.plusDays(1), d -> false, null, 0);
        var chart = new GanttChart(start, start.plusDays(7),
                List.of(new GanttGroup("Tasks", "#000000", List.of(task))), List.of());

        var widget = new GanttChartWidget(chart, 16);

        assertThat(descendants(widget.getElement()).map(element -> element.getAttribute("title"))
                .filter(java.util.Objects::nonNull)).anySatisfy(tooltip -> {
                    assertThat(tooltip).contains("Task Key: NO-PRJ");
                    assertThat(tooltip).contains("PRJtask: No PRJtask found");
                });
    }

    private static Stream<Element> descendants(Element element) {
        return Stream.concat(Stream.of(element), element.getChildren().flatMap(GanttScaleTest::descendants));
    }
}
