
package com.example.roadmap.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.context.properties.bind.ConstructorBinding;

@ConfigurationProperties("roadmap.jira")
public record JiraProperties(
        String baseUrl,
        String token,
        String project,
        Duration connectTimeout,
        Duration readTimeout,
        String fieldEffortEstimate,
        String fieldEpicLink,
        String fieldParentMilestone,
        String fieldTargetStart,
        String fieldFirstTimeInProgress) {

    public static final String DEFAULT_FIELD_EFFORT_ESTIMATE = "customfield_10001";
    public static final String DEFAULT_FIELD_EPIC_LINK = "customfield_10002";
    public static final String DEFAULT_FIELD_PARENT_MILESTONE = "customfield_10003";
    public static final String DEFAULT_FIELD_TARGET_START = "customfield_10004";
    public static final String DEFAULT_FIELD_FIRST_TIME_IN_PROGRESS = "customfield_10005";

    @ConstructorBinding
    public JiraProperties {
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalArgumentException("roadmap.jira.base-url must be configured");
        }
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("roadmap.jira.token must be configured");
        }
        if (project == null || project.isBlank()) {
            throw new IllegalArgumentException("roadmap.jira.project must be configured");
        }
        project = project.trim();
        connectTimeout = connectTimeout == null ? Duration.ofSeconds(10) : connectTimeout;
        readTimeout = readTimeout == null ? Duration.ofSeconds(30) : readTimeout;
        fieldEffortEstimate = customField(fieldEffortEstimate, DEFAULT_FIELD_EFFORT_ESTIMATE,
                "roadmap.jira.field-effort-estimate");
        fieldEpicLink = customField(fieldEpicLink, DEFAULT_FIELD_EPIC_LINK,
                "roadmap.jira.field-epic-link");
        fieldParentMilestone = customField(fieldParentMilestone, DEFAULT_FIELD_PARENT_MILESTONE,
                "roadmap.jira.field-parent-milestone");
        fieldTargetStart = customField(fieldTargetStart, DEFAULT_FIELD_TARGET_START,
                "roadmap.jira.field-target-start");
        fieldFirstTimeInProgress = customField(fieldFirstTimeInProgress,
                DEFAULT_FIELD_FIRST_TIME_IN_PROGRESS, "roadmap.jira.field-first-time-in-progress");
        if (new java.util.HashSet<>(java.util.List.of(fieldEffortEstimate, fieldEpicLink, fieldParentMilestone,
                fieldTargetStart, fieldFirstTimeInProgress)).size() != 5) {
            throw new IllegalArgumentException("Jira custom field IDs must be different");
        }
    }

    /** Compatibility constructor for tests and local fixtures that use the default Jira schema. */
    public JiraProperties(String baseUrl, String token, String project,
                          Duration connectTimeout, Duration readTimeout) {
        this(baseUrl, token, project, connectTimeout, readTimeout, null, null, null, null, null);
    }

    private static String customField(String value, String fallback, String property) {
        String field = defaultIfBlank(value, fallback);
        if (!field.matches("customfield_[0-9]+")) {
            throw new IllegalArgumentException(property + " must use Jira's customfield_<number> format");
        }
        return field;
    }

    private static String defaultIfBlank(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }
}
