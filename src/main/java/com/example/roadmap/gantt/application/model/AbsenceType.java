package com.example.roadmap.gantt.application.model;



/**
 * Why a team member is unavailable for a given date range in the roadmap.
 */
public enum AbsenceType {

    VACATION("Vacaciones"),
    BIRTHDAY("Cumpleaños"),
    SICK_LEAVE("Licencia médica"),
    HOLIDAY("Feriado"),
    OTHER("Otro");

    private final String label;

    AbsenceType(String label) {
        this.label = label;
    }

    /** Short human-readable label, shown in the availability management UI. */
    public String label() {
        return label;
    }
}