package com.example.roadmap.config;

import java.time.Duration;
import org.springframework.boot.context.properties.ConfigurationProperties;

@ConfigurationProperties("jira")
public record JiraProperties(
        String baseUrl,
        String token,
        String project,
        Duration connectTimeout,
        Duration readTimeout) {

    public JiraProperties {
        if (baseUrl == null || baseUrl.isBlank()) {
            throw new IllegalArgumentException("jira.base-url must be configured");
        }
        if (token == null || token.isBlank()) {
            throw new IllegalArgumentException("jira.token must be configured");
        }
        if (project == null || project.isBlank()) {
            throw new IllegalArgumentException("jira.project must be configured");
        }
        connectTimeout = connectTimeout == null ? Duration.ofSeconds(10) : connectTimeout;
        readTimeout = readTimeout == null ? Duration.ofSeconds(30) : readTimeout;
    }
}