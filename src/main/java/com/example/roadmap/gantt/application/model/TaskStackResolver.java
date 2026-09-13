package com.example.roadmap.gantt.application.model;

import com.example.roadmap.config.TaskStackAliasProperties;
import java.util.LinkedHashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Set;

/** Applies the configured Jira aliases and the shared stack precedence rule. */
public final class TaskStackResolver {

    private final Map<String, TaskStack> aliases;

    public TaskStackResolver(TaskStackAliasProperties properties) {
        Map<String, TaskStack> configured = new LinkedHashMap<>();
        register(configured, properties.frontend(), TaskStack.FRONTEND);
        register(configured, properties.backend(), TaskStack.BACKEND);
        register(configured, properties.mobile(), TaskStack.MOBILE);
        register(configured, properties.devops(), TaskStack.DEVOPS);
        aliases = Map.copyOf(configured);
    }

    public static TaskStackResolver defaults() {
        return new TaskStackResolver(TaskStackAliasProperties.defaults());
    }

    /** Resolves local plan, then Jira, then the assignee's role. */
    public Resolution resolve(TaskStack localStack, List<String> jiraLabels, Role role) {
        JiraClassification jira = classifyJira(jiraLabels);
        if (localStack != null && localStack.selectable()) {
            return new Resolution(localStack, TaskStackSource.LOCAL_PLAN, jira);
        }
        if (jira.stack() != null) {
            return new Resolution(jira.stack(), TaskStackSource.JIRA_LABEL, jira);
        }
        if (role != null) {
            return new Resolution(role.stack(), TaskStackSource.PERSON_ROLE, jira);
        }
        return new Resolution(TaskStack.UNCLASSIFIED, TaskStackSource.NONE, jira);
    }

    /**
     * Recognizes only configured stack labels. Different recognized stacks are explicitly
     * ambiguous; unrelated Jira labels do not affect the result.
     */
    public JiraClassification classifyJira(List<String> labels) {
        if (labels == null || labels.isEmpty()) {
            return new JiraClassification(null, List.of());
        }
        Set<TaskStack> stacks = new LinkedHashSet<>();
        List<String> recognizedLabels = labels.stream()
                .filter(label -> fromJiraLabel(label) != null)
                .map(String::trim)
                .distinct()
                .toList();
        recognizedLabels.forEach(label -> stacks.add(fromJiraLabel(label)));
        if (stacks.size() > 1) {
            return new JiraClassification(TaskStack.AMBIGUOUS, recognizedLabels);
        }
        return new JiraClassification(stacks.stream().findFirst().orElse(null), recognizedLabels);
    }

    private TaskStack fromJiraLabel(String label) {
        return label == null ? null : aliases.get(normalize(label));
    }

    private static void register(Map<String, TaskStack> target, String values, TaskStack stack) {
        for (String value : values.split(",", -1)) {
            String alias = normalize(value);
            if (alias.isEmpty()) {
                throw new IllegalArgumentException("Empty Jira stack alias configured for " + stack.name());
            }
            TaskStack previous = target.putIfAbsent(alias, stack);
            if (previous != null && previous != stack) {
                throw new IllegalArgumentException("Jira stack alias '" + value.trim()
                        + "' is configured for both " + previous.name() + " and " + stack.name());
            }
        }
    }

    private static String normalize(String value) {
        return value.trim().toLowerCase(Locale.ROOT)
                .replace('_', ' ')
                .replace('-', ' ')
                .replaceAll("\\s+", " ");
    }

    public record JiraClassification(TaskStack stack, List<String> recognizedLabels) {
        public JiraClassification {
            recognizedLabels = List.copyOf(recognizedLabels);
        }

        public String displayLabel() {
            return recognizedLabels.isEmpty() ? "Sin label de stack" : String.join(", ", recognizedLabels);
        }
    }

    public record Resolution(TaskStack stack, TaskStackSource source, JiraClassification jira) {
    }
}
