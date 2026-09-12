package com.example.roadmap.gantt.application.model;

import java.time.LocalDate;
import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.NavigableMap;
import java.util.TreeMap;

/** Fractional task/day maximum flow. Residual edges allow earlier assignments to move. */
final class CapacityAllocation {
    private static final double EPS = 1e-7;
    record Demand(String key, List<LocalDate> days, double hours) {}

    private static final class Edge {
        final int to;
        final int reverse;
        double capacity;
        Edge(int to, int reverse, double capacity) {
            this.to = to;
            this.reverse = reverse;
            this.capacity = capacity;
        }
    }

    private final List<List<Edge>> graph;
    private final int[] level;
    private final int[] next;

    private CapacityAllocation(int size) {
        graph = new ArrayList<>();
        for (int i = 0; i < size; i++) graph.add(new ArrayList<>());
        level = new int[size];
        next = new int[size];
    }

    private Edge connect(int from, int to, double capacity) {
        Edge edge = new Edge(to, graph.get(to).size(), capacity);
        graph.get(from).add(edge);
        graph.get(to).add(new Edge(from, graph.get(from).size() - 1, 0));
        return edge;
    }

    private boolean layers(int sink) {
        Arrays.fill(level, -1);
        level[0] = 0;
        ArrayDeque<Integer> queue = new ArrayDeque<>();
        queue.add(0);
        while (!queue.isEmpty()) {
            int from = queue.remove();
            for (Edge edge : graph.get(from)) {
                if (edge.capacity > EPS && level[edge.to] < 0) {
                    level[edge.to] = level[from] + 1;
                    queue.add(edge.to);
                }
            }
        }
        return level[sink] >= 0;
    }

    private double push(int from, int sink, double amount) {
        if (from == sink) return amount;
        List<Edge> edges = graph.get(from);
        for (; next[from] < edges.size(); next[from]++) {
            Edge edge = edges.get(next[from]);
            if (edge.capacity <= EPS || level[edge.to] != level[from] + 1) continue;
            double sent = push(edge.to, sink, Math.min(amount, edge.capacity));
            if (sent > EPS) {
                edge.capacity -= sent;
                graph.get(edge.to).get(edge.reverse).capacity += sent;
                return sent;
            }
        }
        return 0;
    }

    static Map<String, NavigableMap<LocalDate, Double>> allocate(List<Demand> demands) {
        List<LocalDate> days = demands.stream().flatMap(d -> d.days().stream()).distinct().sorted().toList();
        Map<LocalDate, Integer> dayIds = new LinkedHashMap<>();
        int firstDay = demands.size() + 1;
        for (int i = 0; i < days.size(); i++) dayIds.put(days.get(i), firstDay + i);
        int sink = firstDay + days.size();
        CapacityAllocation network = new CapacityAllocation(sink + 1);
        List<Map<LocalDate, Edge>> assignments = new ArrayList<>();
        for (int i = 0; i < demands.size(); i++) {
            Demand demand = demands.get(i);
            network.connect(0, i + 1, demand.hours());
            Map<LocalDate, Edge> edges = new LinkedHashMap<>();
            for (LocalDate day : demand.days()) edges.put(day, network.connect(i + 1, dayIds.get(day), demand.hours()));
            assignments.add(edges);
        }
        for (int day : dayIds.values()) network.connect(day, sink, WorkContour.PRODUCTIVE_HOURS_PER_DAY);
        while (network.layers(sink)) {
            Arrays.fill(network.next, 0);
            while (network.push(0, sink, Double.MAX_VALUE) > EPS) { /* exhaust this layer */ }
        }
        Map<String, NavigableMap<LocalDate, Double>> result = new LinkedHashMap<>();
        for (int i = 0; i < demands.size(); i++) {
            Demand demand = demands.get(i);
            NavigableMap<LocalDate, Double> allocation = new TreeMap<>();
            for (var entry : assignments.get(i).entrySet()) {
                Edge edge = entry.getValue();
                double used = network.graph.get(edge.to).get(edge.reverse).capacity;
                if (used > EPS) allocation.put(entry.getKey(), used);
            }
            // Keep unavoidable overload visible, without moving committed dates.
            double residual = Math.max(0, demand.hours() - allocation.values().stream().mapToDouble(Double::doubleValue).sum());
            if (residual > EPS && !demand.days().isEmpty()) {
                for (LocalDate day : demand.days()) allocation.merge(day, residual / demand.days().size(), Double::sum);
            }
            result.put(demand.key(), allocation);
        }
        return result;
    }
}
