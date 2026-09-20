ALTER TABLE roadmap_schedule
    ALTER COLUMN effort_md TYPE NUMERIC(10, 3)
    USING effort_md::NUMERIC(10, 3);
