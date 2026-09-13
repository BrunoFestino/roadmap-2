package com.example.roadmap.config;

import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@EnableConfigurationProperties({TeamRosterProperties.class, TaskStackAliasProperties.class})
public class RoadmapConfiguration {

    @Bean
    GanttTeamRoster ganttTeamRoster(TeamRosterProperties properties) {
        return new GanttTeamRoster(properties);
    }

    @Bean
    TaskStackResolver taskStackResolver(TaskStackAliasProperties properties) {
        return new TaskStackResolver(properties);
    }
}
