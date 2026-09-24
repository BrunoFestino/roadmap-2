package com.example.roadmap.jira;

import com.example.roadmap.jira.dto.JiraIssueDto;
import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import org.junit.jupiter.api.Test;
import org.mockito.stubbing.Answer;

import java.util.List;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.Executors;

import static java.util.concurrent.TimeUnit.SECONDS;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.Mockito.*;

class JiraIssueLoaderTest {
    @Test void roadmapStartsAllIndependentRequestsBeforeWaitingForAnyResponse() throws Exception {
        var jira = mock(JiraClient.class);
        var started = new CountDownLatch(3);
        var release = new CountDownLatch(1);
        when(jira.searchWorkloadIssuesByAssignees("TEST", List.of("user")))
                .thenAnswer(delayed("TASK-1", started, release));
        when(jira.searchOpenEpics("TEST")).thenAnswer(delayed("EPIC-1", started, release));
        when(jira.searchOpenMilestones("TEST")).thenAnswer(delayed("MILESTONE-1", started, release));
        try (var executor = Executors.newFixedThreadPool(4)) {
            var loader = new JiraIssueLoader(jira, executor);
            var result = executor.submit(() -> loader.roadmap("TEST", List.of("user")));
            try {
                assertThat(started.await(5, SECONDS)).as("all three queries must run concurrently").isTrue();
                assertThat(result.isDone()).isFalse();
            } finally {
                release.countDown();
            }
            var issues = result.get(5, SECONDS);
            assertThat(issues.work()).extracting(JiraIssueDto::key).containsExactly("TASK-1");
            assertThat(issues.epics()).extracting(JiraIssueDto::key).containsExactly("EPIC-1");
            assertThat(issues.milestones()).extracting(JiraIssueDto::key).containsExactly("MILESTONE-1");
        }
    }

    @Test void failedQueriesPropagateAndTheNextLoadFetchesFreshData() {
        var jira = mock(JiraClient.class);
        var failure = new IllegalStateException("Jira unavailable");
        when(jira.searchWorkloadIssuesByAssignees("TEST", List.of("user")))
                .thenThrow(failure).thenReturn(response("TASK-2"));
        when(jira.searchOpenEpics("TEST")).thenReturn(response("EPIC-1"));
        when(jira.searchOpenMilestones("TEST")).thenReturn(response("MILESTONE-1"));
        var loader = new JiraIssueLoader(jira, Runnable::run);
        assertThatThrownBy(() -> loader.roadmap("TEST", List.of("user"))).isSameAs(failure);
        assertThat(loader.roadmap("TEST", List.of("user")).work())
                .extracting(JiraIssueDto::key).containsExactly("TASK-2");
        verify(jira, times(2)).searchWorkloadIssuesByAssignees("TEST", List.of("user"));
        verify(jira, times(2)).searchOpenEpics("TEST");
        verify(jira, times(2)).searchOpenMilestones("TEST");
    }

    @Test void planningDoesNotFetchMilestones() {
        var jira = mock(JiraClient.class);
        when(jira.searchWorkloadIssuesByAssignees("TEST", List.of("user"))).thenReturn(response("TASK-1"));
        when(jira.searchOpenEpics("TEST")).thenReturn(response("EPIC-1"));
        var loaded = new JiraIssueLoader(jira, Runnable::run).planning("TEST", List.of("user"));
        assertThat(loaded.milestones()).isEmpty();
        verify(jira, never()).searchOpenMilestones(anyString());
    }

    private static Answer<JiraSearchResponseDto> delayed(String key, CountDownLatch started, CountDownLatch release) {
        return invocation -> {
            started.countDown();
            if (!release.await(5, SECONDS)) throw new IllegalStateException("Test response was not released");
            return response(key);
        };
    }

    private static JiraSearchResponseDto response(String key) {
        return new JiraSearchResponseDto(List.of(new JiraIssueDto(key, null)));
    }
}
