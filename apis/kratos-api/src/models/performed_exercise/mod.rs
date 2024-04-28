pub mod builder;
#[cfg(test)]
mod tests;

use self::builder::*;
use crate::models::{Exercise, ModelResult, PerformedSet, PerformedWorkout};
use crate::prelude::*;
use database::{DatabaseManager, Model};
use serde::Serialize;
use sqlx::FromRow;

#[derive(Clone, Debug, FromRow, Serialize)]
pub struct PerformedExercise {
    pub id: i32,
    pub exercise_id: i16,
    pub workout_id: i32,
    pub notes: Option<String>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

impl Model for PerformedExercise {
    const MODEL_NAME: &'static str = "PerformedExercise";
    const TABLE_NAME: &'static str = "performed_exercises";

    type PrimaryKey = i32;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl PerformedExercise {
    pub fn new() -> PerformedExerciseBuilder<NoPerformedExerciseExerciseId, NoPerformedExerciseWorkoutId> {
        PerformedExerciseBuilder::new()
    }

    // region Relationships

    pub async fn exercise(&self, database: &DatabaseManager) -> ModelResult<Exercise> {
        let exercise = Exercise::find_by_pk(self.exercise_id, database).await?;

        Ok(exercise)
    }

    pub async fn sets(&self, database: &DatabaseManager) -> ModelResult<Vec<PerformedSet>> {
        let sets = PerformedSet::query()
            .select(&["*"])
            .and_where("exercise_id", "=", self.id)
            .all(database.connection())
            .await?;

        Ok(sets)
    }

    pub async fn workout(&self, database: &DatabaseManager) -> ModelResult<PerformedWorkout> {
        let workout = PerformedWorkout::find_by_pk(self.workout_id, database).await?;

        Ok(workout)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, PerformedExercise>(format!(
            "UPDATE {} SET (notes, updated_at) = ($1, $2) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, self.primary_key(),
        ).as_str())
            .bind(self.notes.clone())
            .bind(now())
            .fetch_one(database.connection())
            .await?;

        self.notes = model.notes;

        Ok(())
    }

    // endregion
}
