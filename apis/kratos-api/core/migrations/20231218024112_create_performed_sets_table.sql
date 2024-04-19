CREATE TABLE IF NOT EXISTS performed_sets (
    id BIGSERIAL PRIMARY KEY NOT NULL,
    exercise_id INTEGER REFERENCES performed_exercises(id) ON DELETE CASCADE NOT NULL,
    sequence_number SMALLINT NOT NULL,
    type VARCHAR(10) NOT NULL,
    unit_value REAL NOT NULL,
    denominator_value SMALLINT,
    rest_time_seconds SMALLINT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
