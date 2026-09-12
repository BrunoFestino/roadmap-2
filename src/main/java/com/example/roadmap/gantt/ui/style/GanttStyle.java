package com.example.roadmap.gantt.ui.style;
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
 * Layout and colour constants for the Gantt feature: a fixed pixel-per-day scale so every
 * bar's width is always {@code working days * PX_PER_DAY} — never stretched to fit the
 * container — plus the spacing constants the lane-packing renderer uses to keep tasks from
 * ever hiding one another.
 */
public final class GanttStyle {

    public static final String FONT = "Inter, 'Helvetica Neue', Arial, system-ui, sans-serif";
    public static final String PRIMARY_900 = "#0F4660";
    public static final String INK = "#1F2A30";
    public static final String MUTED = "#5F6B72";
    public static final String BORDER = "#E5E8EA";
    public static final String GRIDLINE = "#EEF1F3";
    public static final String TODAY = "#2F6FD0";
    public static final String MILESTONE = "#D64545";
    public static final String BAR_BORDER = "rgba(15,70,96,0.55)";
    public static final String CARD_BG = "#FFFFFF";
    public static final String WEEKEND_BG = "#F7F7F8";

    /** Horizontal scale: pixels per calendar day. */
    public static final int PX_PER_DAY = 18;
    /** Fixed width of the left group-label column. */
    public static final int LEFT_COL = 150;
    /** Height reserved for the month and week axes / milestone header band. */
    public static final int HEADER_H = 80;
    /** Vertical padding inside a group, above/below its lanes. */
    public static final int ROW_PAD = 8;
    /** Height of a single sub-lane. */
    public static final int LANE_HEIGHT = 26;
    /** Gap between sub-lanes within a group. */
    public static final int LANE_GAP = 4;
    /** Height of the bar itself (smaller than the lane so it has breathing room). */
    public static final int BAR_HEIGHT = 18;
    /** Gap between groups (roles or people). */
    public static final int GROUP_GAP = 14;
    /** Rough px-per-character used to reserve label space during lane packing. */
    public static final double CHAR_W = 6.6;

    private GanttStyle() {
    }
}