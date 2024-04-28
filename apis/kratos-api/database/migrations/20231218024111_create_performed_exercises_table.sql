CREATE TABLE IF NOT EXISTS performed_exercises (
    id SERIAL PRIMARY KEY,
    exercise_id SMALLINT REFERENCES exercises(id) ON DELETE CASCADE NOT NULL,
    workout_id INTEGER REFERENCES performed_workouts(id) ON DELETE CASCADE NOT NULL,
    notes TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
