package com.example.roadmap.gantt.application.model;



/**
 * Why a team member is unavailable for a given date range in the roadmap.
 */
public enum AbsenceType {

    VACATION("Vacation"),
    BIRTHDAY("Birthday"),
    SICK_LEAVE("Sick leave"),
    HOLIDAY("Holiday"),
    OTHER("Other");

    private final String label;

    AbsenceType(String label) {
        this.label = label;
    }

    /** Short human-readable label, shown in the availability management UI. */
    public String label() {
        return label;
    }
}
