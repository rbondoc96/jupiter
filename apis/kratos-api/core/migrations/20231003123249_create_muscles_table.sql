CREATE TABLE IF NOT EXISTS muscles (
    id SMALLSERIAL PRIMARY KEY NOT NULL,
    ulid VARCHAR UNIQUE DEFAULT generate_ulid() NOT NULL,
    group_id SMALLSERIAL REFERENCES muscle_groups(id) ON DELETE CASCADE,
    parent_id SMALLINT REFERENCES muscles(id) ON DELETE CASCADE,
    name VARCHAR UNIQUE NOT NULL,
    simple_name VARCHAR,
    description TEXT,
    image_source VARCHAR,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT now() NOT NULL
)
