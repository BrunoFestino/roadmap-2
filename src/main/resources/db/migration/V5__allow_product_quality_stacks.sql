ALTER TABLE roadmap_schedule
    DROP CONSTRAINT roadmap_schedule_stack_local_valid;

ALTER TABLE roadmap_schedule
    ADD CONSTRAINT roadmap_schedule_stack_local_valid
        CHECK (stack_local IS NULL OR stack_local IN (
            'BACKEND', 'FRONTEND', 'MOBILE', 'DEVOPS', 'PO', 'SQC'
        ));
