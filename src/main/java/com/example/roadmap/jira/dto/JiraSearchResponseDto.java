package com.example.roadmap.jira.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

/**
 * Response of a Jira {@code /search} call.
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public record JiraSearchResponseDto(
        List<JiraIssueDto> issues,
        int startAt,
        int maxResults,
        int total
) {
  public JiraSearchResponseDto(List<JiraIssueDto> issues) {
    this(issues, 0, issues == null ? 0 : issues.size(), issues == null ? 0 : issues.size());
  }
}