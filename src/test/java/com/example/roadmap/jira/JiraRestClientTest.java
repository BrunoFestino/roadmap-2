package com.example.roadmap.jira;

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
    @Test void readsAllPages() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        String items = String.join(",", IntStream.range(0, 100).mapToObj(i -> "{\"key\":\"T-" + i + "\"}").toList());
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("startAt=0"))
                .andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":101,\"issues\":[" + items + "]}", MediaType.APPLICATION_JSON));
        server.expect(request -> assertThat(request.getURI().getQuery()).contains("startAt=100"))
                .andRespond(withSuccess("{\"startAt\":100,\"maxResults\":100,\"total\":101,\"issues\":[{\"key\":\"T-100\"}]}", MediaType.APPLICATION_JSON));
        assertThat(new JiraRestClient(builder.build()).searchOpenIssuesByAssignees("TTAR", List.of("test")).issues()).hasSize(101);
        server.verify();
    }

    @Test void authenticationFailuresPropagate() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {}).andRespond(withStatus(HttpStatus.UNAUTHORIZED));
        assertThatThrownBy(() -> new JiraRestClient(builder.build()).searchOpenMilestones("TTAR"))
                .isInstanceOf(HttpClientErrorException.Unauthorized.class);
        server.verify();
    }

    @Test void supportsAnEmptyResponse() {
        var builder = RestClient.builder().baseUrl("http://synthetic.invalid");
        var server = MockRestServiceServer.bindTo(builder).build();
        server.expect(request -> {}).andRespond(withSuccess("{\"startAt\":0,\"maxResults\":100,\"total\":0,\"issues\":[]}", MediaType.APPLICATION_JSON));
        assertThat(new JiraRestClient(builder.build()).searchOpenMilestones("TTAR").issues()).isEmpty();
        server.verify();
    }
}
