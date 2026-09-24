package com.example.roadmap.jira;

import com.example.roadmap.jira.dto.JiraIssueDto;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.Map;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.Executor;

/** Fetch independent Jira datasets concurrently; every load still reads fresh data. */
@Component
public class JiraIssueLoader {
    private final JiraClient client;
    private final Executor executor;

    public JiraIssueLoader(JiraClient client, @Qualifier("jiraQueryExecutor") Executor executor) {
        this.client = client;
        this.executor = executor;
    }

    public Issues planning(String project, List<String> usernames) {
        return load(project, usernames, false);
    }

    public Issues roadmap(String project, List<String> usernames) {
        return load(project, usernames, true);
    }

    private Issues load(String project, List<String> usernames, boolean includeMilestones) {
        var work = CompletableFuture.supplyAsync(
                () -> client.searchWorkloadIssuesByAssignees(project, usernames).issues(), executor);
        var epics = CompletableFuture.supplyAsync(() -> client.searchOpenEpics(project).issues(), executor);
        var milestones = includeMilestones
                ? CompletableFuture.supplyAsync(() -> milestones(project), executor)
                : CompletableFuture.completedFuture(List.<JiraIssueDto>of());
        try {
            // Publish only complete results. A failed query must never become an empty dataset.
            CompletableFuture.allOf(work, epics, milestones).get();
            return new Issues(work.join(), epics.join(), milestones.join());
        } catch (InterruptedException e) {
            Thread.currentThread().interrupt();
            throw new IllegalStateException("Jira loading interrupted", e);
        } catch (ExecutionException e) {
            if (e.getCause() instanceof RuntimeException cause) throw cause;
            throw new IllegalStateException("Jira loading failed", e.getCause());
        }
    }

    public List<JiraIssueDto> milestones(String project) {
        return client.searchOpenMilestones(project).issues();
    }

    public Map<String, String> summaries(List<String> keys) {
        return client.findIssueSummaries(keys);
    }

    public record Issues(List<JiraIssueDto> work, List<JiraIssueDto> epics, List<JiraIssueDto> milestones) {
        public Issues {
            work = clean(work);
            epics = clean(epics);
            milestones = clean(milestones);
        }

        private static List<JiraIssueDto> clean(List<JiraIssueDto> issues) {
            return issues == null ? List.of() : issues.stream().filter(java.util.Objects::nonNull).toList();
        }
    }
}
