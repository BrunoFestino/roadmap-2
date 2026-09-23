package com.example.roadmap.config;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.Role;
import com.example.roadmap.gantt.application.model.TaskStack;
import com.example.roadmap.gantt.application.model.TaskStackResolver;
import java.util.List;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.ConfigDataApplicationContextInitializer;
import org.springframework.boot.test.context.runner.ApplicationContextRunner;

class ExternalConfigurationTest {

    @Test void applicationPropertiesMapsTheDocumentedEnvironmentVariables() {
        new ApplicationContextRunner()
                .withInitializer(new ConfigDataApplicationContextInitializer())
                .withUserConfiguration(RoadmapConfiguration.class, JiraClientConfiguration.class)
                .withSystemProperties(
                        "ROADMAP_JIRA_BASE_URL=https://jira.configured.example",
                        "ROADMAP_JIRA_TOKEN=secret-from-environment",
                        "ROADMAP_JIRA_PROJECT=TEST",
                        "ROADMAP_JIRA_FIELD_EFFORT_ESTIMATE=customfield_9101",
                        "ROADMAP_TEAM_MEMBERS=configured|Configured Person|DEVOPS",
                        "ROADMAP_STACK_ALIASES_BACKEND=services")
                .run(context -> {
                    assertThat(context).hasNotFailed();
                    assertThat(context.getBean(JiraProperties.class).baseUrl())
                            .isEqualTo("https://jira.configured.example");
                    assertThat(context.getBean(JiraProperties.class).fieldEffortEstimate())
                            .isEqualTo("customfield_9101");
                    assertThat(context.getBean(GanttTeamRoster.class).usernames())
                            .containsExactly("configured");
                    assertThat(context.getBean(TaskStackResolver.class)
                            .classifyJira(List.of("services")).stack()).isEqualTo(TaskStack.BACKEND);
                });
    }

    @Test void jiraProjectMustBeExplicitlyConfigured() {
        for (String project : new String[]{null, "", "   "}) {
            assertThatThrownBy(() -> new JiraProperties("https://jira.example", "token", project, null, null))
                    .isInstanceOf(IllegalArgumentException.class).hasMessageContaining("roadmap.jira.project");
        }
    }

    @Test void rosterCanChangeMembersWithoutChangingCode() {
        var roster = new GanttTeamRoster(new TeamRosterProperties(
                "new.user|Nueva Persona|DEVOPS,frontend.user|Persona Front|FRONTEND"));

        assertThat(roster.usernames()).containsExactly("new.user", "frontend.user");
        assertThat(roster.byUsername("new.user").name()).isEqualTo("Nueva Persona");
        assertThat(roster.byUsername("frontend.user").role()).isEqualTo(Role.FRONTEND);
    }

    @Test void rosterRejectsDuplicateUsernames() {
        assertThatThrownBy(() -> new GanttTeamRoster(new TeamRosterProperties(
                "same|Persona Uno|MOBILE,same|Persona Dos|BACKEND")))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("Duplicate Jira username");
    }

    @Test void stackAliasesCanChangeWithoutChangingCode() {
        var resolver = new TaskStackResolver(new TaskStackAliasProperties(
                "web-ui", "services", "android,ios", "platform", null, null));

        assertThat(resolver.classifyJira(List.of("services")).stack()).isEqualTo(TaskStack.BACKEND);
        assertThat(resolver.classifyJira(List.of("ios")).stack()).isEqualTo(TaskStack.MOBILE);
        assertThat(resolver.classifyJira(List.of("BE")).stack()).isNull();
    }

    @Test void stackAliasesCannotPointToDifferentStacks() {
        assertThatThrownBy(() -> new TaskStackResolver(new TaskStackAliasProperties(
                "shared", "shared", "mobile", "devops", null, null)))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("configured for both");
    }

    @Test void jiraFieldIdsMustBeValidAndDifferent() {
        assertThatThrownBy(() -> new JiraProperties("https://jira.example", "token", "TEST", null, null,
                "customfield_1", "customfield_1", "customfield_2", "customfield_3", "customfield_4"))
                .isInstanceOf(IllegalArgumentException.class);
        assertThatThrownBy(() -> new JiraProperties("https://jira.example", "token", "TEST", null, null,
                "story_points", "customfield_2", "customfield_3", "customfield_4", "customfield_5"))
                .isInstanceOf(IllegalArgumentException.class)
                .hasMessageContaining("customfield_<number>");
    }
}
