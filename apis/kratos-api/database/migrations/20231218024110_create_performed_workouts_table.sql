CREATE TABLE IF NOT EXISTS performed_workouts (
    id SERIAL PRIMARY KEY,
    ulid VARCHAR UNIQUE DEFAULT generate_ulid() NOT NULL,
    user_id SMALLINT REFERENCES users(id) ON DELETE CASCADE NOT NULL,
    title VARCHAR(75) NOT NULL,
    notes TEXT,
    duration SMALLINT NOT NULL,
    performed_at TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
);
