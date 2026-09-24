package com.example.roadmap.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.concurrent.ThreadPoolTaskExecutor;

@Configuration
public class JiraQueryConfiguration {
    /** Shared across sessions: limit Jira traffic and queued work under load. */
    @Bean
    public ThreadPoolTaskExecutor jiraQueryExecutor() {
        var executor = new ThreadPoolTaskExecutor();
        executor.setCorePoolSize(4);
        executor.setMaxPoolSize(4);
        executor.setQueueCapacity(64);
        executor.setThreadNamePrefix("jira-query-");
        return executor;
    }
}
