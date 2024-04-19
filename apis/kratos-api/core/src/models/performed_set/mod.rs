pub mod builder;
#[cfg(test)]
mod tests;

use self::builder::*;
use crate::enums::SetType;
use crate::models::{ModelResult, PerformedExercise, PerformedWorkout, User};
use crate::prelude::*;
use database::{DatabaseManager, Model};
use rust_decimal::Decimal;
use rust_decimal::prelude::ToPrimitive;
use sqlx::FromRow;

#[derive(Clone, Debug, FromRow)]
pub struct PerformedSet {
    pub id: i64,
    pub exercise_id: i32,
    pub sequence_number: i16,
    #[sqlx(rename = "type")]
    pub set_type: SetType,
    unit_value: f32,
    pub denominator_value: Option<i16>,
    pub rest_time_seconds: Option<i16>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

impl Model for PerformedSet {
    const MODEL_NAME: &'static str = "PerformedSet";
    const TABLE_NAME: &'static str = "performed_sets";

    type PrimaryKey = i64;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl PerformedSet {
    pub fn new() -> PerformedSetBuilder<NoPerformedSetExercise, NoPerformedSetSequenceNumber, NoPerformedSetType, NoPerformedSetUnitValue> {
        PerformedSetBuilder::new()
    }

    // region Relationships

    pub async fn exercise(&self, database: &DatabaseManager) -> ModelResult<PerformedExercise> {
        let exercise = PerformedExercise::find_by_pk(self.exercise_id, database).await?;

        Ok(exercise)
    }

    // TODO: This might be able to be optimized into a single SQL query instead of 2.
    pub async fn workout(&self, database: &DatabaseManager) -> ModelResult<PerformedWorkout> {
        let exercise = self.exercise(database).await?;
        exercise.workout(database).await
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, PerformedSet>(format!(
            "UPDATE {} SET (unit_value, denominator_value, rest_time_seconds, updated_at) = ($1, $2, $3, $4) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, self.primary_key(),
        ).as_str())
            .bind(self.unit_value)
            .bind(self.denominator_value)
            .bind(self.rest_time_seconds)
            .bind(now())
            .fetch_one(database.connection())
            .await?;

        self.unit_value = model.unit_value;
        self.denominator_value = model.denominator_value;
        self.rest_time_seconds = model.rest_time_seconds;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
