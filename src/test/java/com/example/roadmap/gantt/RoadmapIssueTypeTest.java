package com.example.roadmap.gantt;

import com.example.roadmap.gantt.application.model.GanttTask;
import com.example.roadmap.gantt.application.model.GanttTeamRoster;
import com.example.roadmap.gantt.application.model.RoadmapIssueType;
import com.example.roadmap.gantt.application.model.StartDateSource;
import org.junit.jupiter.api.Test;

import java.time.LocalDate;

import static org.assertj.core.api.Assertions.assertThat;

class RoadmapIssueTypeTest {
    @Test
    void normalizesJiraStoryNamesAndKeepsExecutableTypesDistinct() {
        assertThat(RoadmapIssueType.from("User Story")).isEqualTo(RoadmapIssueType.STORY);
        assertThat(RoadmapIssueType.from("Story")).isEqualTo(RoadmapIssueType.STORY);
        assertThat(RoadmapIssueType.from("Bug")).isEqualTo(RoadmapIssueType.BUG);
        assertThat(RoadmapIssueType.from("Spike")).isEqualTo(RoadmapIssueType.SPIKE);
        assertThat(RoadmapIssueType.from("Sub-task")).isEqualTo(RoadmapIssueType.SUBTASK);
    }

    @Test
    void storiesAreContextAndBugsAndSpikesAreExecutableWork() {
        assertThat(RoadmapIssueType.STORY.isContextOnly()).isTrue();
        assertThat(RoadmapIssueType.BUG.isContextOnly()).isFalse();
        assertThat(RoadmapIssueType.SPIKE.isContextOnly()).isFalse();

        var member = GanttTeamRoster.defaults().members().getFirst();
        var story = GanttTask.create("STORY-1", "Story", "Story", member,
                LocalDate.of(2026, 9, 21), LocalDate.of(2026, 9, 21), StartDateSource.LOCAL_PLAN,
                1, "Open", LocalDate.of(2026, 9, 22), d -> false, null, 0);
        var bug = GanttTask.create("BUG-1", "Bug", "Bug", member,
                LocalDate.of(2026, 9, 21), LocalDate.of(2026, 9, 21), StartDateSource.LOCAL_PLAN,
                1, "Open", LocalDate.of(2026, 9, 22), d -> false, null, 0);

        assertThat(story.isContextWork()).isTrue();
        assertThat(story.isUserStory()).isTrue();
        assertThat(bug.isContextWork()).isFalse();
    }
}
