-- Keep previously entered MD for reference, outside the active planning schema.
CREATE TABLE roadmap_legacy_effort (
    issue_key VARCHAR(32) PRIMARY KEY,
    effort_md NUMERIC(10, 3) NOT NULL,
    archived_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO roadmap_legacy_effort (issue_key, effort_md)
SELECT issue_key, effort_md
FROM roadmap_schedule
WHERE effort_md IS NOT NULL;

COMMENT ON TABLE roadmap_legacy_effort IS
    'Historical local estimates retired by V4. Not used for planning or workload.';

ALTER TABLE roadmap_schedule DROP COLUMN effort_md;
