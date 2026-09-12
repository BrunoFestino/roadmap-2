package com.example.roadmap.jira;

import com.example.roadmap.jira.dto.JiraSearchResponseDto;
import java.util.List;

public interface JiraClient {

    JiraSearchResponseDto searchOpenIssuesByAssignees(String projectKey, List<String> usernames);

    JiraSearchResponseDto searchOpenMilestones(String projectKey);
}