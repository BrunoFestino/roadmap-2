package com.example.roadmap.gantt.application.model;

import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.Set;

/** Reserves explicit subtask estimates first, then shares only the unassigned budget. */
public final class SubtaskBudget {
    private SubtaskBudget() { }

    public record Entry(String key, String parentKey, String issueType, Double estimateMd) {
        boolean subtask() { return "Sub-task".equalsIgnoreCase(issueType); }
        boolean context() { return "Epic".equalsIgnoreCase(issueType) || "User Story".equalsIgnoreCase(issueType); }
        boolean estimated() { return estimateMd != null && Double.isFinite(estimateMd) && estimateMd > 0; }
    }

    public record Allocation(Map<String, Double> effectiveMd, Set<String> inheritedKeys,
                             Map<String, Double> overrunsMd) {
        public Allocation {
            effectiveMd = Map.copyOf(effectiveMd);
            inheritedKeys = Set.copyOf(inheritedKeys);
            overrunsMd = Map.copyOf(overrunsMd);
        }
    }

    public static Allocation allocate(List<Entry> entries, Map<String, Double> consumedByParent) {
        Map<String, Double> effective = new LinkedHashMap<>();
        Map<String, Double> overruns = new LinkedHashMap<>();
        Set<String> inherited = new LinkedHashSet<>();
        Map<String, List<Entry>> childrenByParent = new LinkedHashMap<>();
        for (Entry entry : entries) {
            if (entry.estimated()) effective.put(entry.key(), entry.estimateMd());
            if (entry.subtask() && entry.parentKey() != null) {
                childrenByParent.computeIfAbsent(entry.parentKey(), key -> new ArrayList<>()).add(entry);
            }
        }
        for (Entry parent : entries) {
            if (parent.context() || parent.subtask() || !parent.estimated()) continue;
            List<Entry> children = childrenByParent.getOrDefault(parent.key(), List.of());
            double consumed = consumedByParent.getOrDefault(parent.key(), 0.0);
            if (children.isEmpty() && consumed <= 0) continue;
            double explicit = children.stream().filter(Entry::estimated).mapToDouble(Entry::estimateMd).sum();
            double available = Math.max(0, parent.estimateMd() - consumed - explicit);
            List<Entry> unestimated = children.stream().filter(child -> !child.estimated()).toList();
            effective.put(parent.key(), unestimated.isEmpty() ? available : 0.0);
            for (Entry child : unestimated) {
                effective.put(child.key(), available / unestimated.size());
                inherited.add(child.key());
            }
            double overrun = consumed + explicit - parent.estimateMd();
            if (overrun > 0.000001) overruns.put(parent.key(), overrun);
        }
        return new Allocation(effective, inherited, overruns);
    }
}
