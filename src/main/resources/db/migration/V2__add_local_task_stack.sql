ALTER TABLE roadmap_schedule
    ADD COLUMN stack_local VARCHAR(16);

ALTER TABLE roadmap_schedule
    ADD CONSTRAINT roadmap_schedule_stack_local_valid
        CHECK (stack_local IS NULL OR stack_local IN ('BACKEND', 'FRONTEND', 'MOBILE', 'DEVOPS'));

COMMENT ON COLUMN roadmap_schedule.stack_local IS
    'Optional local task stack override. NULL falls back to Jira labels and then to the assignee role.';
