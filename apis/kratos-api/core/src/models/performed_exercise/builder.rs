use crate::models::{Exercise, ModelResult, PerformedExercise, PerformedWorkout};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoPerformedExerciseExerciseId;
#[derive(Default)]
pub struct HasPerformedExerciseExerciseId(i16);

#[derive(Default)]
pub struct NoPerformedExerciseWorkoutId;
#[derive(Default)]
pub struct HasPerformedExerciseWorkoutId(i32);

// endregion

#[derive(Default)]
pub struct PerformedExerciseBuilder<E, W> {
    exercise_id: E,
    notes: Option<String>,
    workout_id: W,
}

impl PerformedExerciseBuilder<NoPerformedExerciseExerciseId, NoPerformedExerciseWorkoutId> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<E, W> PerformedExerciseBuilder<E, W> {
    pub fn exercise(self, exercise: &Exercise) -> PerformedExerciseBuilder<HasPerformedExerciseExerciseId, W> {
        PerformedExerciseBuilder {
            exercise_id: HasPerformedExerciseExerciseId(exercise.id),
            notes: self.notes,
            workout_id: self.workout_id,
        }
    }

    pub fn workout(self, workout: &PerformedWorkout) -> PerformedExerciseBuilder<E, HasPerformedExerciseWorkoutId> {
        PerformedExerciseBuilder {
            exercise_id: self.exercise_id,
            notes: self.notes,
            workout_id: HasPerformedExerciseWorkoutId(workout.id),
        }
    }

    pub fn notes(self, notes: impl Into<String>) -> Self {
        Self {
            exercise_id: self.exercise_id,
            notes: Some(notes.into()),
            workout_id: self.workout_id,
        }
    }
}

impl PerformedExerciseBuilder<HasPerformedExerciseExerciseId, HasPerformedExerciseWorkoutId> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<PerformedExercise> {
        let model = sqlx::query_as::<_, PerformedExercise>(format!(
            "INSERT INTO {} (exercise_id, workout_id, notes) VALUES ($1, $2, $3) RETURNING *",
            PerformedExercise::TABLE_NAME,
        ).as_str())
            .bind(self.exercise_id.0)
            .bind(self.workout_id.0)
            .bind(self.notes)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
