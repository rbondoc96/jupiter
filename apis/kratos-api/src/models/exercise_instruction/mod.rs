mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Exercise, ModelResult};
use crate::prelude::*;
use crate::enums::{ExerciseForce, ExerciseMechanic, ExerciseMuscleTarget, ExerciseType};
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model};
use sqlx::{postgres::PgPool, FromRow};

#[cfg(test)]
pub use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct ExerciseInstruction {
    #[sqlx(skip)]
    database: Option<DatabaseManager>,
    pub id: i16,
    pub exercise_id: i16,
    pub sequence_number: i16,
    pub content: String,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for ExerciseInstruction {
    const MODEL_NAME: &'static str = "ExerciseInstruction";
    const TABLE_NAME: &'static str = "exercise_instructions";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for ExerciseInstruction {
    const ROUTE_KEY: &'static str = "id";
    type RouteKey = i16;

    fn route_key(&self) -> Self::RouteKey {
        self.id
    }
}

impl ExerciseInstruction {
    pub fn new() -> ExerciseInstructionBuilder<NoExerciseId, NoSequenceNumber, NoContent> {
        ExerciseInstructionBuilder::new()
    }

    // region Relationships

    pub async fn exercise(&self, database: &DatabaseManager) -> ModelResult<Exercise> {
        let exercise = Exercise::find_by_pk(self.exercise_id, database).await?;

        Ok(exercise)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (exercise_id, sequence_number, content, updated_at) = ($1, $2, $3, $4) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.exercise_id)
            .bind(self.sequence_number)
            .bind(self.content.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.exercise_id = model.exercise_id;
        self.sequence_number = model.sequence_number;
        self.content = model.content;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
