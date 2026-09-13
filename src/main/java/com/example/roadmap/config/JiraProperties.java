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
        String fieldTargetStart,
        String fieldFirstTimeInProgress) {

    public static final String DEFAULT_PROJECT = "TTAR";
    public static final String DEFAULT_FIELD_EFFORT_ESTIMATE = "customfield_14230";
    public static final String DEFAULT_FIELD_EPIC_LINK = "customfield_10830";
    public static final String DEFAULT_FIELD_TARGET_START = "customfield_12832";
    public static final String DEFAULT_FIELD_FIRST_TIME_IN_PROGRESS = "customfield_13034";

    @ConstructorBinding
    public JiraProperties {
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalArgumentException("roadmap.jira.base-url must be configured");
        }
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("roadmap.jira.token must be configured");
        }
        project = defaultIfBlank(project, DEFAULT_PROJECT);
        connectTimeout = connectTimeout == null ? Duration.ofSeconds(10) : connectTimeout;
        readTimeout = readTimeout == null ? Duration.ofSeconds(30) : readTimeout;
        fieldEffortEstimate = customField(fieldEffortEstimate, DEFAULT_FIELD_EFFORT_ESTIMATE,
                "roadmap.jira.field-effort-estimate");
        fieldEpicLink = customField(fieldEpicLink, DEFAULT_FIELD_EPIC_LINK,
                "roadmap.jira.field-epic-link");
        fieldTargetStart = customField(fieldTargetStart, DEFAULT_FIELD_TARGET_START,
                "roadmap.jira.field-target-start");
        fieldFirstTimeInProgress = customField(fieldFirstTimeInProgress,
                DEFAULT_FIELD_FIRST_TIME_IN_PROGRESS, "roadmap.jira.field-first-time-in-progress");
        if (new java.util.HashSet<>(java.util.List.of(fieldEffortEstimate, fieldEpicLink,
                fieldTargetStart, fieldFirstTimeInProgress)).size() != 4) {
            throw new IllegalArgumentException("Jira custom field IDs must be different");
        }
    }

    /** Compatibility constructor for tests and local fixtures that use the default Jira schema. */
    public JiraProperties(String baseUrl, String token, String project,
            Duration connectTimeout, Duration readTimeout) {
        this(baseUrl, token, project, connectTimeout, readTimeout, null, null, null, null);
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
