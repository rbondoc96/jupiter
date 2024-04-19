use crate::enums::SetType;
use crate::models::{ModelResult, PerformedExercise, PerformedSet};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoPerformedSetExercise;
#[derive(Default)]
pub struct HasPerformedSetExercise(i32);

#[derive(Default)]
pub struct NoPerformedSetSequenceNumber;
#[derive(Default)]
pub struct HasPerformedSetSequenceNumber(i16);

#[derive(Default)]
pub struct NoPerformedSetType;
#[derive(Default)]
pub struct HasPerformedSetType(SetType);

#[derive(Default)]
pub struct NoPerformedSetUnitValue;
#[derive(Default)]
pub struct HasPerformedSetUnitValue(f32);

// endregion

#[derive(Default)]
pub struct PerformedSetBuilder<E, S, T, V> {
    exercise_id: E,
    sequence_number: S,
    set_type: T,
    unit_value: V,
    denominator_value: Option<i16>,
    rest_time_seconds: Option<i16>,
}

impl PerformedSetBuilder<NoPerformedSetExercise, NoPerformedSetSequenceNumber, NoPerformedSetType, NoPerformedSetUnitValue> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<E, S, T, V> PerformedSetBuilder<E, S, T, V> {
    pub fn exercise(self, exercise: &PerformedExercise) -> PerformedSetBuilder<HasPerformedSetExercise, S, T, V> {
        PerformedSetBuilder {
            exercise_id: HasPerformedSetExercise(exercise.id),
            sequence_number: self.sequence_number,
            set_type: self.set_type,
            unit_value: self.unit_value,
            denominator_value: self.denominator_value,
            rest_time_seconds: self.rest_time_seconds,
        }
    }

    pub fn sequence_number(self, number: i16) -> PerformedSetBuilder<E, HasPerformedSetSequenceNumber, T, V> {
        PerformedSetBuilder {
            exercise_id: self.exercise_id,
            sequence_number: HasPerformedSetSequenceNumber(number),
            set_type: self.set_type,
            unit_value: self.unit_value,
            denominator_value: self.denominator_value,
            rest_time_seconds: self.rest_time_seconds,
        }
    }

    pub fn set_type(self, set_type: SetType) -> PerformedSetBuilder<E, S, HasPerformedSetType, V> {
        PerformedSetBuilder {
            exercise_id: self.exercise_id,
            sequence_number: self.sequence_number,
            set_type: HasPerformedSetType(set_type),
            unit_value: self.unit_value,
            denominator_value: self.denominator_value,
            rest_time_seconds: self.rest_time_seconds,
        }
    }

    pub fn unit_value(self, value: f32) -> PerformedSetBuilder<E, S, T, HasPerformedSetUnitValue> {
        PerformedSetBuilder {
            exercise_id: self.exercise_id,
            sequence_number: self.sequence_number,
            set_type: self.set_type,
            unit_value: HasPerformedSetUnitValue(value),
            denominator_value: self.denominator_value,
            rest_time_seconds: self.rest_time_seconds,
        }
    }

    pub fn denominator_value(self, value: i16) -> Self {
        Self {
            exercise_id: self.exercise_id,
            sequence_number: self.sequence_number,
            set_type: self.set_type,
            unit_value: self.unit_value,
            denominator_value: Some(value),
            rest_time_seconds: self.rest_time_seconds,
        }
    }

    pub fn rest_time_seconds(self, seconds: i16) -> Self {
        Self {
            exercise_id: self.exercise_id,
            sequence_number: self.sequence_number,
            set_type: self.set_type,
            unit_value: self.unit_value,
            denominator_value: self.denominator_value,
            rest_time_seconds: Some(seconds),
        }
    }
}

impl PerformedSetBuilder<HasPerformedSetExercise, HasPerformedSetSequenceNumber, HasPerformedSetType, HasPerformedSetUnitValue> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<PerformedSet> {
        let model = sqlx::query_as::<_, PerformedSet>(format!(
            "INSERT INTO {} (exercise_id, sequence_number, type, unit_value, denominator_value, rest_time_seconds) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            PerformedSet::TABLE_NAME,
        ).as_str())
            .bind(self.exercise_id.0)
            .bind(self.sequence_number.0)
            .bind(self.set_type.0)
            .bind(self.unit_value.0)
            .bind(self.denominator_value)
            .bind(self.rest_time_seconds)
            .fetch_one(database.connection())
            .await?;
        
        Ok(model)
    }
}
