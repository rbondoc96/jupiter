pub mod builder;
#[cfg(test)]
mod tests;

use self::builder::*;
use crate::models::{ModelResult, PerformedExercise, PerformedSet, User};
use crate::prelude::*;
use database::{DatabaseManager, HasRouteKey, Model};
use serde::Serialize;
use sqlx::FromRow;

#[derive(Clone, Debug, FromRow, Serialize)]
pub struct PerformedWorkout {
    pub id: i32,
    pub ulid: String,
    pub user_id: i16,
    pub title: String,
    pub notes: Option<String>,
    pub duration: i16,
    pub performed_at: ISO8601DateTimeUTC,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

impl HasRouteKey for PerformedWorkout {
    const ROUTE_KEY: &'static str = "ulid";
    type RouteKey = String;

    fn route_key(&self) -> String {
        self.ulid.clone()
    }
}

impl Model for PerformedWorkout {
    const MODEL_NAME: &'static str = "PerformedWorkout";
    const TABLE_NAME: &'static str = "performed_workouts";

    type PrimaryKey = i32;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

use builder::{
    PerformedWorkoutBuilder,
    NoPerformedWorkoutDuration,
    NoPerformedWorkoutPerformedAt,
    NoPerformedWorkoutTitle,
    NoPerformedWorkoutUserId,
};

impl PerformedWorkout {
    pub fn new() -> PerformedWorkoutBuilder<
        NoPerformedWorkoutUserId,
        NoPerformedWorkoutTitle,
        NoPerformedWorkoutDuration,
        NoPerformedWorkoutPerformedAt,
    > {
        PerformedWorkoutBuilder::new()
    }

    // region Relationships

    pub async fn user(&self, database: &DatabaseManager) -> ModelResult<User> {
        let user = User::find_by_pk(self.user_id, database).await?;

        Ok(user)
    }

    pub async fn exercises(&self, database: &DatabaseManager) -> ModelResult<Vec<PerformedExercise>> {
        let exercises = PerformedExercise::query()
            .select(&["*"])
            .and_where("workout_id", "=", self.id)
            .all(database.connection())
            .await?;

        Ok(exercises)
    }

    pub async fn sets(&self, database: &DatabaseManager) -> ModelResult<Vec<PerformedSet>> {
        let exercises = self.exercises(database).await?;
        let mut sets = Vec::new();

        for exercise in exercises {
            let mut exercise_sets = exercise.sets(database).await?;
            sets.append(&mut exercise_sets);
        }

        Ok(sets)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, PerformedWorkout>(format!(
            "UPDATE {} SET (title, notes, duration, performed_at, updated_at) = ($1, $2, $3, $4, $5) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, self.primary_key(),
        ).as_str())
            .bind(self.title.clone())
            .bind(self.notes.clone())
            .bind(self.duration)
            .bind(self.performed_at)
            .bind(now())
            .fetch_one(database.connection())
            .await?;

        self.title = model.title;
        self.notes = model.notes;
        self.duration = model.duration;
        self.performed_at = model.performed_at;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
