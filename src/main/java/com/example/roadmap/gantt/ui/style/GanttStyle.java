package com.example.roadmap.gantt.ui.style;



/**
 * Layout and colour constants for the Gantt feature: a fixed pixel-per-day scale so every
 * bar's width is always {@code working days * PX_PER_DAY} - never stretched to fit the
 * container - plus the spacing constants the lane-packing renderer uses to keep tasks from
 * ever hiding one another.
 */
public final class GanttStyle {

    public static final String FONT = "'Segoe UI', system-ui, -apple-system, BlinkMacSystemFont, sans-serif";
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
    /** Space reserved for a task's start-date label before the timeline begins. */
    public static final int TIMELINE_GAP = 38;
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
