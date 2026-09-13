package com.example.roadmap.config;

import org.springframework.boot.context.properties.ConfigurationProperties;

/** Jira labels recognized for each selectable task stack. */
@ConfigurationProperties("roadmap.stack-aliases")
public record TaskStackAliasProperties(
        String frontend,
        String backend,
        String mobile,
        String devops) {

    private static final String DEFAULT_FRONTEND = "front,frontend,front end,stack front,stack frontend";
    private static final String DEFAULT_BACKEND = "be,backend,back end,stack be,stack backend";
    private static final String DEFAULT_MOBILE = "mobile,stack mobile";
    private static final String DEFAULT_DEVOPS = "devops,dev ops,stack devops";

    public TaskStackAliasProperties {
        frontend = defaultIfBlank(frontend, DEFAULT_FRONTEND);
        backend = defaultIfBlank(backend, DEFAULT_BACKEND);
        mobile = defaultIfBlank(mobile, DEFAULT_MOBILE);
        devops = defaultIfBlank(devops, DEFAULT_DEVOPS);
    }

    public static TaskStackAliasProperties defaults() {
        return new TaskStackAliasProperties(null, null, null, null);
    }

    private static String defaultIfBlank(String value, String fallback) {
        return value == null || value.isBlank() ? fallback : value.trim();
    }
}
