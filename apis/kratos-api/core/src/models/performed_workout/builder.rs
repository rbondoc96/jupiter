use crate::models::{ModelResult, PerformedWorkout, User};
use crate::prelude::types::ISO8601DateTimeUTC;
use database::{DatabaseManager, Model};

// region Type State

#[derive(Default)]
pub struct NoPerformedWorkoutUserId;
#[derive(Default)]
pub struct HasPerformedWorkoutUserId(i16);

#[derive(Default)]
pub struct NoPerformedWorkoutTitle;
#[derive(Default)]
pub struct HasPerformedWorkoutTitle(String);

#[derive(Default)]
pub struct NoPerformedWorkoutDuration;
#[derive(Default)]
pub struct HasPerformedWorkoutDuration(i16);

#[derive(Default)]
pub struct NoPerformedWorkoutPerformedAt;
#[derive(Default)]
pub struct HasPerformedWorkoutPerformedAt(ISO8601DateTimeUTC);

// endregion

#[derive(Default)]
pub struct PerformedWorkoutBuilder<U, T, D, P> {
    user_id: U,
    title: T,
    notes: Option<String>,
    duration: D,
    performed_at: P,
}

impl PerformedWorkoutBuilder<
    NoPerformedWorkoutUserId,
    NoPerformedWorkoutTitle,
    NoPerformedWorkoutDuration,
    NoPerformedWorkoutPerformedAt,
> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<U, T, D, P> PerformedWorkoutBuilder<U, T, D, P> {
    pub fn user(self, user: &User) -> PerformedWorkoutBuilder<HasPerformedWorkoutUserId, T, D, P> {
        PerformedWorkoutBuilder {
            user_id: HasPerformedWorkoutUserId(user.id),
            title: self.title,
            notes: self.notes,
            duration: self.duration,
            performed_at: self.performed_at,
        }
    }

    pub fn title(self, title: impl Into<String>) -> PerformedWorkoutBuilder<U, HasPerformedWorkoutTitle, D, P> {
        PerformedWorkoutBuilder {
            user_id: self.user_id,
            title: HasPerformedWorkoutTitle(title.into()),
            notes: self.notes,
            duration: self.duration,
            performed_at: self.performed_at,
        }
    }

    pub fn notes(self, notes: Option<String>) -> Self {
        Self {
            user_id: self.user_id,
            title: self.title,
            notes,
            duration: self.duration,
            performed_at: self.performed_at,
        }
    }

    pub fn duration(self, duration: i16) -> PerformedWorkoutBuilder<U, T, HasPerformedWorkoutDuration, P> {
        PerformedWorkoutBuilder {
            user_id: self.user_id,
            title: self.title,
            notes: self.notes,
            duration: HasPerformedWorkoutDuration(duration),
            performed_at: self.performed_at,
        }
    }

    pub fn performed_at(self, performed_at: ISO8601DateTimeUTC) -> PerformedWorkoutBuilder<U, T, D, HasPerformedWorkoutPerformedAt> {
        PerformedWorkoutBuilder {
            user_id: self.user_id,
            title: self.title,
            notes: self.notes,
            duration: self.duration,
            performed_at: HasPerformedWorkoutPerformedAt(performed_at),
        }
    }
}

impl PerformedWorkoutBuilder<
    HasPerformedWorkoutUserId,
    HasPerformedWorkoutTitle,
    HasPerformedWorkoutDuration,
    HasPerformedWorkoutPerformedAt,
> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<PerformedWorkout> {
        let model = sqlx::query_as::<_, PerformedWorkout>(format!(
            "INSERT INTO {} (user_id, title, notes, duration, performed_at) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            PerformedWorkout::TABLE_NAME,
        ).as_str())
            .bind(self.user_id.0)
            .bind(self.title.0)
            .bind(self.notes)
            .bind(self.duration.0)
            .bind(self.performed_at.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}

