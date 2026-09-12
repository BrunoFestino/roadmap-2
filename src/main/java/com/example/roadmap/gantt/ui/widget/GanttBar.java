package com.example.roadmap.gantt.ui.widget;
import com.example.roadmap.config.*;
import com.example.roadmap.jira.*;
import com.example.roadmap.jira.dto.*;
import com.example.roadmap.gantt.application.analytics.*;
import com.example.roadmap.gantt.application.data.*;
import com.example.roadmap.gantt.application.dto.*;
import com.example.roadmap.gantt.application.model.*;
import com.example.roadmap.gantt.application.usecase.*;
import com.example.roadmap.gantt.ui.*;
import com.example.roadmap.gantt.ui.style.*;
import com.example.roadmap.gantt.ui.widget.*;
import com.example.roadmap.ui.*;

import com.fasterxml.jackson.annotation.*;
import com.vaadin.flow.component.*;
import com.vaadin.flow.component.applayout.*;
import com.vaadin.flow.component.button.*;
import com.vaadin.flow.component.checkbox.*;
import com.vaadin.flow.component.combobox.*;
import com.vaadin.flow.component.datepicker.*;
import com.vaadin.flow.component.dependency.*;
import com.vaadin.flow.component.dialog.*;
import com.vaadin.flow.component.grid.*;
import com.vaadin.flow.component.html.*;
import com.vaadin.flow.component.icon.*;
import com.vaadin.flow.component.notification.*;
import com.vaadin.flow.component.orderedlayout.*;
import com.vaadin.flow.component.select.*;
import com.vaadin.flow.component.sidenav.*;
import com.vaadin.flow.component.textfield.*;
import com.vaadin.flow.router.*;
import com.vaadin.flow.server.*;
import com.vaadin.flow.component.page.*;
import com.vaadin.flow.component.details.*;
import com.vaadin.flow.data.binder.*;
import com.vaadin.flow.data.renderer.*;
import com.vaadin.flow.theme.*;
import org.springframework.boot.context.properties.*;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.*;
import org.springframework.jdbc.core.*;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.*;
import org.springframework.web.client.*;
import java.net.*;
import java.net.http.*;
import java.nio.charset.*;
import java.sql.*;
import java.time.*;
import java.time.format.*;
import java.time.temporal.*;
import java.util.*;
import java.util.function.*;
import java.util.stream.*;
/**
 * A single Gantt bar: an absolutely positioned div, sized to exactly {@code working days *
 * PX_PER_DAY} pixels — no artificial minimum width, so a short task is never visually
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