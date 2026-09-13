package com.example.roadmap.jira.dto;

import com.fasterxml.jackson.annotation.JsonAnySetter;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/** The narrow Jira issue shape used by the roadmap and its milestone markers. */
@JsonIgnoreProperties(ignoreUnknown = true)
public record JiraIssueDto(String key, Fields fields) {

    /**
     * Standard Jira fields plus a dynamic map for instance-specific custom fields.
     * The configured field IDs are interpreted by the application layer.
     */
    @JsonIgnoreProperties(ignoreUnknown = true)
    public static final class Fields {
        private String summary;
        private IssueType issuetype;
        private TimeTracking timetracking;
        private User assignee;
        private Status status;
        private Parent parent;
        private String created;
        private String duedate;
        private List<String> labels = List.of();
        private final Map<String, Object> customFields = new LinkedHashMap<>();

        public Fields() {
        }

        public Fields(String summary, IssueType issuetype, TimeTracking timetracking, User assignee,
                Status status, Parent parent, String created, String duedate, List<String> labels,
                Map<String, Object> customFields) {
            this.summary = summary;
            this.issuetype = issuetype;
            this.timetracking = timetracking;
            this.assignee = assignee;
            this.status = status;
            this.parent = parent;
            this.created = created;
            this.duedate = duedate;
            setLabels(labels);
            if (customFields != null) {
                this.customFields.putAll(customFields);
            }
        }

        public String summary() {
            return summary;
        }

        public void setSummary(String summary) {
            this.summary = summary;
        }

        public IssueType issuetype() {
            return issuetype;
        }

        public void setIssuetype(IssueType issuetype) {
            this.issuetype = issuetype;
        }

        public TimeTracking timetracking() {
            return timetracking;
        }

        public void setTimetracking(TimeTracking timetracking) {
            this.timetracking = timetracking;
        }

        public User assignee() {
            return assignee;
        }

        public void setAssignee(User assignee) {
            this.assignee = assignee;
        }

        public Status status() {
            return status;
        }

        public void setStatus(Status status) {
            this.status = status;
        }

        public Parent parent() {
            return parent;
        }

        public void setParent(Parent parent) {
            this.parent = parent;
        }

        public String created() {
            return created;
        }

        public void setCreated(String created) {
            this.created = created;
        }

        public String duedate() {
            return duedate;
        }

        public void setDuedate(String duedate) {
            this.duedate = duedate;
        }

        public List<String> labels() {
            return labels;
        }

        public void setLabels(List<String> labels) {
            this.labels = labels == null ? List.of() : List.copyOf(labels);
        }

        @JsonAnySetter
        public void setAdditionalField(String name, Object value) {
            if (name != null && name.startsWith("customfield_")) {
                if (value == null) {
                    customFields.remove(name);
                } else {
                    customFields.put(name, value);
                }
            }
        }

        /** Returns one configured custom field as text, preserving Jira numbers and strings. */
        public String customField(String fieldId) {
            Object value = customFields.get(fieldId);
            return value == null ? null : String.valueOf(value);
        }

        public Map<String, Object> customFields() {
            return Map.copyOf(customFields);
        }
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record User(String displayName, String name, String emailAddress) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Status(String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Parent(String key) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record IssueType(String name) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record TimeTracking(Integer originalEstimateSeconds, Integer timeSpentSeconds) {
    }
}
