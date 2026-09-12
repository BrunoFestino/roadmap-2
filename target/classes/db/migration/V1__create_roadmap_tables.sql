CREATE TABLE roadmap_schedule (
                                  issue_key VARCHAR(32) PRIMARY KEY,
                                  start_date DATE NOT NULL,
                                  end_date DATE,
                                  effort_md INTEGER,
                                  CONSTRAINT roadmap_schedule_end_date_after_start_date
                                      CHECK (end_date IS NULL OR end_date >= start_date),
                                  CONSTRAINT roadmap_schedule_effort_md_positive
                                      CHECK (effort_md IS NULL OR effort_md > 0)
);

CREATE TABLE team_absence (
                              id VARCHAR(36) PRIMARY KEY,
                              username VARCHAR(255) NOT NULL,
                              start_date DATE NOT NULL,
                              end_date DATE NOT NULL,
                              absence_type VARCHAR(32) NOT NULL,
                              note TEXT NOT NULL DEFAULT '',
                              CONSTRAINT team_absence_end_date_after_start_date CHECK (end_date >= start_date)
);

CREATE INDEX team_absence_username_dates_idx ON team_absence (username, start_date, end_date);