package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;

/**
 * A dated milestone marker to draw on the timeline (never as a row/bar).
 *
 * @param name owning milestone summary
 * @param date the milestone's due date
 */
public record Milestone(String name, LocalDate date) {
}