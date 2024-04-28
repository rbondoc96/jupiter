use crate::models::{Exercise, ExerciseInstruction, ModelResult};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoExerciseId;
#[derive(Default)]
pub struct ExerciseId(i16);

#[derive(Default)]
pub struct NoSequenceNumber;
#[derive(Default)]
pub struct SequenceNumber(i16);

#[derive(Default)]
pub struct NoContent;
#[derive(Default)]
pub struct Content(String);

// endregion

#[derive(Default)]
pub struct ExerciseInstructionBuilder<E, S, C> {
    exercise_id: E,
    sequence_number: S,
    content: C,
}

impl ExerciseInstructionBuilder<NoExerciseId, NoSequenceNumber, NoContent> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<E, S, C,> ExerciseInstructionBuilder<E, S, C> {
    pub fn exercise_id(self, id: i16) -> ExerciseInstructionBuilder<ExerciseId, S, C> {
        ExerciseInstructionBuilder {
            exercise_id: ExerciseId(id),
            sequence_number: self.sequence_number,
            content: self.content,
        }
    }

    pub fn exercise(self, exercise: &Exercise) -> ExerciseInstructionBuilder<ExerciseId, S, C> {
        ExerciseInstructionBuilder {
            exercise_id: ExerciseId(exercise.id),
            sequence_number: self.sequence_number,
            content: self.content,
        }
    }

    pub fn sequence_number(self, number: i16) -> ExerciseInstructionBuilder<E, SequenceNumber, C> {
        ExerciseInstructionBuilder {
            exercise_id: self.exercise_id,
            sequence_number: SequenceNumber(number),
            content: self.content,
        }
    }

    pub fn content(self, content: impl Into<String>) -> ExerciseInstructionBuilder<E, S, Content> {
        ExerciseInstructionBuilder {
            exercise_id: self.exercise_id,
            sequence_number: self.sequence_number,
            content: Content(content.into()),
        }
    }
}

impl ExerciseInstructionBuilder<ExerciseId, SequenceNumber, Content> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<ExerciseInstruction> {
        let model = sqlx::query_as::<_, ExerciseInstruction>(format!(
            "INSERT INTO {} (exercise_id, sequence_number, content) VALUES ($1, $2, $3) RETURNING *",
            ExerciseInstruction::TABLE_NAME,
        ).as_str())
            .bind(self.exercise_id.0)
            .bind(self.sequence_number.0)
            .bind(self.content.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
