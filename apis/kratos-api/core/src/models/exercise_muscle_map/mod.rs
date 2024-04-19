mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Exercise, Muscle, ModelResult};
use crate::prelude::*;
use crate::enums::ExerciseMuscleTarget;
use async_trait::async_trait;
use database::{DatabaseManager, Model, SqlxAction};
use serde::Deserialize;
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct ExerciseMuscleMap {
    pub id: i16,
    pub exercise_id: i16,
    pub muscle_id: i16,
    pub target: ExerciseMuscleTarget,
}

#[async_trait]
impl Model for ExerciseMuscleMap {
    const MODEL_NAME: &'static str = "ExerciseMuscleMap";
    const TABLE_NAME: &'static str = "exercises_muscles";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl ExerciseMuscleMap {
    pub fn new() -> ExerciseMuscleMapBuilder<NoExerciseId, NoMuscleId, NoTarget> {
        ExerciseMuscleMapBuilder::new()
    }

    pub async fn find_by_exercise_and_target(
        exercise_id: i16,
        target: ExerciseMuscleTarget,
        database: &DatabaseManager,
    ) -> ModelResult<Vec<ExerciseMuscleMap>> {
        let relations = Self::query()
            .select(&["*"])
            .and_where("exercise_id", "=", exercise_id)
            .and_where("target", "=", target)
            .all(database.connection())
            .await?;

        Ok(relations)
    }

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (exercise_id, muscle_id, target) = ($1, $2, $3) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.exercise_id)
            .bind(self.muscle_id)
            .bind(self.target.clone())
            .fetch_one(database.connection())
            .await?;

        self.exercise_id = model.exercise_id;
        self.muscle_id = model.muscle_id;
        self.target = model.target;

        Ok(())
    }

    // endregion
}
