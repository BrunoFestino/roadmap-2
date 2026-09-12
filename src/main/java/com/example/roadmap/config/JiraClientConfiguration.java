package com.example.roadmap.config;

import com.example.roadmap.jira.JiraClient;
import com.example.roadmap.jira.JiraRestClient;
import com.vaadin.flow.server.Version;
import java.net.http.HttpClient;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.JdkClientHttpRequestFactory;
import org.springframework.web.client.RestClient;

@Configuration
@EnableConfigurationProperties(JiraProperties.class)
public class JiraClientConfiguration {

    @Bean
    RestClient jiraRestClient(JiraProperties properties) {
        HttpClient httpClient = HttpClient.newBuilder()
                .connectTimeout(properties.connectTimeout())
                .version(HttpClient.Version.HTTP_2)
                .build();
        JdkClientHttpRequestFactory requestFactory = new JdkClientHttpRequestFactory(httpClient);
        requestFactory.setReadTimeout(properties.readTimeout());

        return RestClient.builder()
                .requestFactory(requestFactory)
                .baseUrl(properties.baseUrl())
                .defaultHeader("Authorization", "Bearer " + properties.token())
                .defaultHeader("Accept", "application/json")
                .build();
    }

    @Bean
    JiraClient jiraClient(RestClient jiraRestClient) {
        return new JiraRestClient(jiraRestClient);
    }
}