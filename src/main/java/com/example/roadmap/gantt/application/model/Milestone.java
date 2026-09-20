package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;

/**
 * A dated milestone marker to draw on the timeline (never as a row/bar).
 *
 * @param key Jira key that identifies the milestone
 * @param name owning milestone summary
 * @param date the milestone's due date
 */
public record Milestone(String key, String name, LocalDate date) {

    /** Uses the same stable initiative palette as its related roadmap work. */
    public String color() {
        return EpicPalette.colorFor(key);
    }
}
