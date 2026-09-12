package com.example.roadmap.gantt.application.model;



/**
 * The colour every roadmap bar is painted with, keyed by the epic the work belongs to.
 *
 * <p>The roadmap already groups work by role or by person, so the group heading always says
 * which role a bar belongs to and painting the bar with the role colour repeated information
 * the reader already had. The initiative a task serves, on the other hand, was encoded
 * nowhere - two tasks of the same epic sitting in different groups looked unrelated. Giving
 * the fill to the epic is what lets a single initiative be followed across the whole screen.
 *
 * <p>Colours are assigned by a deterministic hash of the epic key, never by order of
 * appearance: an epic keeps the same colour across page loads, filter changes and zoom
 * levels, so the mental map a reader builds survives a new epic entering the project. The
 * trade-off is accepted knowingly - two epics can collide on the same colour - and the
 * legend is what resolves it when they do.
 *
 * <p>Every colour is dark enough to carry white label text, which is the constraint that
 * rules out the lighter half of each hue.
 */
public final class EpicPalette {

    /**
     * Twenty-four hues spanning the full colour wheel. The last six are deep tones that read
     * as a second lap once a project has more initiatives than the first eighteen can cover.
     */
    private static final String[] COLORS = {
            "#B3261E", // carmín
            "#C2410C", // naranja quemado
            "#B45309", // ámbar
            "#92700E", // oro oliva
            "#4D7C0F", // lima
            "#15803D", // verde
            "#047857", // esmeralda
            "#0F766E", // turquesa
            "#0E7490", // cian
            "#0369A1", // celeste profundo
            "#1D4ED8", // azul
            "#4338CA", // índigo
            "#6D28D9", // violeta
            "#7E22CE", // púrpura
            "#A21CAF", // fucsia
            "#BE185D", // rosa
            "#9F1239", // frambuesa
            "#7C2D12", // caoba
            "#3F6212", // musgo
            "#134E4A", // pino
            "#164E63", // petróleo
            "#1E3A8A", // marino
            "#581C87", // berenjena
            "#831843"  // borgoña
    };

    /**
     * Deliberately muted grey for work whose epic could not be resolved. Keeping it drab
     * rather than giving it a pleasant colour is the point: missing data should look like
     * missing data instead of blending in with the initiatives that are properly linked.
     */
    public static final String UNASSIGNED = "#6B7280";

    /** Label used wherever the unresolved bucket needs a name. */
    public static final String UNASSIGNED_LABEL = "Sin épica";

    private EpicPalette() {
    }

    /**
     * The colour for an epic key, stable for the lifetime of that key.
     *
     * @param epicKey Jira key of the epic, e.g. {@code "TTAR-9800"}; blank or {@code null}
     *                yields {@link #UNASSIGNED}
     */
    public static String colorFor(String epicKey) {
        if (epicKey == null || epicKey.isBlank()) {
            return UNASSIGNED;
        }
        return COLORS[bucket(epicKey)];
    }

    /**
     * A positive, JVM-independent hash. {@link String#hashCode()} is specified by the Java
     * language, so the same key always lands in the same bucket on every machine and every
     * run; {@code Math.floorMod} keeps the index positive even when the hash overflows into
     * a negative int.
     */
    private static int bucket(String epicKey) {
        return Math.floorMod(epicKey.trim().hashCode(), COLORS.length);
    }

    /** Number of distinct colours available before the palette has to repeat one. */
    public static int size() {
        return COLORS.length;
    }
}