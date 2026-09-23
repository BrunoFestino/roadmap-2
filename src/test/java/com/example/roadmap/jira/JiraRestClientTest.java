package com.example.roadmap.jira;

import com.example.roadmap.config.JiraProperties;
import com.example.roadmap.gantt.application.model.WorkflowStatus;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.test.web.client.MockRestServiceServer;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestClient;
import java.util.List;
import java.util.stream.IntStream;
import static org.assertj.core.api.Assertions.*;
import static org.springframework.test.web.client.response.MockRestResponseCreators.*;

class JiraRestClientTest {
    private static final JiraProperties PROPERTIES = new JiraProperties(
            "http://synthetic.invalid", "test", "TEST", null, null);

    @Test void summaryLookupIsBatchedAndDoesNotFilterClosedOrUnassignedIssues() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> assertThat(request.getURI().getQuery())
                        .contains("key IN (TEST-1, TEST-2)", "fields=summary")
                        .doesNotContain("status", "assignee", "project ="))
                .andRespond(withSuccess("""
                        {"issues":[{"key":"TEST-1","fields":{"summary":"Closed initiative"}}]}
                        """, MediaType.APPLICATION_JSON));
        assertThat(new JiraRestClient(builder.build(), PROPERTIES)
                .findIssueSummaries(List.of("TEST-1", "TEST-1", "TEST-2")))
                .containsExactlyEntriesOf(java.util.Map.of("TEST-1", "Closed initiative"));
        server.verify();
    }

    @Test void emptyOrInvalidSummaryKeysDoNotSendAJiraRequest() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        var client = new JiraRestClient(builder.build(), PROPERTIES);
        assertThat(client.findIssueSummaries(List.of())).isEmpty();
        assertThat(client.findIssueSummaries(List.of(" ", "TEST-1) OR key != (TEST-1"))).isEmpty();
        server.verify();
    }

    @Test void requestsSubtasksAndReadsCustomSubtaskTypes() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("subtasks"))
                .andRespond(withSuccess("""
                        {"issues":[
                          {"key":"P","fields":{"subtasks":[{"key":"OUTSIDE"}]}},
                          {"key":"S","fields":{"issuetype":{"name":"Technical work","subtask":true},"parent":{"key":"P"}}}
                        ]}
                        """, MediaType.APPLICATION_JSON));
        var issues = new JiraRestClient(builder.build(), PROPERTIES)
                .searchWorkloadIssuesByAssignees("TEST", List.of("test")).issues();
        assertThat(issues.getFirst().fields().subtasks()).extracting(com.example.roadmap.jira.dto.JiraIssueDto.Parent::key)
                .containsExactly("OUTSIDE");
        assertThat(com.example.roadmap.gantt.application.model.EffortEstimates.isSubtask(issues.get(1).fields())).isTrue();
        server.verify();
    }

    @Test void requestsAndReadsJiraLabels() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("labels"))
                .andRespond(withSuccess("""
                        {"startAt":0,"maxResults":100,"total":1,"issues":[
                          {"key":"T-1","fields":{"labels":["BE","roadmap"]}}
                        ]}
                        """, MediaType.APPLICATION_JSON));

        var issue = new JiraRestClient(builder.build(), PROPERTIES)
                .searchOpenIssuesByAssignees("TEST", List.of("test")).issues().getFirst();

        assertThat(issue.fields().labels()).containsExactly("BE", "roadmap");
        server.verify();
    }

    @Test void readsAllPages() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        String items = String.join(",", IntStream.range(0, 100).mapToObj(i -> "{\"key\":\"T-" + i + "\"}").toList());
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("startAt=0"))
                .andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":101,\"issues\":[" + items + "]}", MediaType.APPLICATION_JSON));
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("startAt=100"))
                .andRespond(withSuccess("{\"startAt\":100,\"maxResults\":100,\"total\":101,\"issues\":[{\"key\":\"T-100\"}]}", MediaType.APPLICATION_JSON));
        assertThat(new JiraRestClient(builder.build(), PROPERTIES)
                .searchOpenIssuesByAssignees("TEST", List.of("test")).issues()).hasSize(101);
        server.verify();
    }

    @Test void authenticationFailuresPropagate() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {}).andRespond(withStatus(HttpStatus.UNAUTHORIZED));
        assertThatThrownBy(() -> new JiraRestClient(builder.build(), PROPERTIES).searchOpenMilestones("TEST"))
                .isInstanceOf(HttpClientErrorException.Unauthorized.class);
        server.verify();
    }

    @Test void supportsAnEmptyResponse() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {}).andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":0,\"issues\":[]}", MediaType.APPLICATION_JSON));
        assertThat(new JiraRestClient(builder.build(), PROPERTIES).searchOpenMilestones("TEST").issues()).isEmpty();
        server.verify();
    }

    @Test void requestsAndCapturesConfiguredCustomFields() {
        var configured = new JiraProperties("http://synthetic.invalid", "test", "TEST", null, null,
                "customfield_9001", "customfield_9002", "customfield_9003", "customfield_9004", "customfield_9005");
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> assertThat(request.getURI().getQuery())
                        .contains("customfield_9001", "customfield_9002", "customfield_9003", "customfield_9004", "customfield_9005"))
                .andRespond(withSuccess("""
                        {"startAt":0,"maxResults":100,"total":1,"issues":[
                          {"key":"T-1","fields":{"customfield_9001":"8","customfield_9004":"2026-09-21"}}
                        ]}
                        """, MediaType.APPLICATION_JSON));

        var fields = new JiraRestClient(builder.build(), configured)
                .searchOpenIssuesByAssignees("TEST", List.of("test")).issues().getFirst().fields();

        assertThat(fields.customField(configured.fieldEffortEstimate())).isEqualTo("8");
        assertThat(fields.customField(configured.fieldTargetStart())).isEqualTo("2026-09-21");
        server.verify();
    }

    @Test void workloadQueryIncludesFinalizedSubtasksButKeepsParentTasksOpenOnly() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {
                    String query = request.getURI().getQuery();
                    assertThat(query).contains("issuetype IN subTaskIssueTypes()", WorkflowStatus.jiraOpenClause());
                    assertThat(query).contains("assignee IN (test)").doesNotContain("project =");
                    assertThat(query.indexOf("status NOT IN")).isLessThan(query.indexOf("OR issuetype IN subTaskIssueTypes()"));
                })
                .andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":0,\"issues\":[]}",
                        MediaType.APPLICATION_JSON));

        assertThat(new JiraRestClient(builder.build(), PROPERTIES)
                .searchWorkloadIssuesByAssignees("TEST", List.of("test")).issues()).isEmpty();
        server.verify();
    }

    @Test void workloadQueryIncludesStoryBugAndSpikeIssueTypes() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {
                    String query = request.getURI().getQuery();
                    assertThat(query).contains("User Story", "Story", "Bug", "Spike");
                })
                .andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":0,\"issues\":[]}",
                        MediaType.APPLICATION_JSON));

        assertThat(new JiraRestClient(builder.build(), PROPERTIES)
                .searchOpenIssuesByAssignees("TEST", List.of("test")).issues()).isEmpty();
        server.verify();
    }
}
