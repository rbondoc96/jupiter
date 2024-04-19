use crate::enums::ExerciseMuscleTarget;
use crate::models::{Exercise, ExerciseMuscleMap, ModelResult, Muscle};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoExerciseId;
#[derive(Default)]
pub struct ExerciseId(i16);

#[derive(Default)]
pub struct NoMuscleId;
#[derive(Default)]
pub struct MuscleId(i16);

#[derive(Default)]
pub struct NoTarget;
#[derive(Default)]
pub struct Target(ExerciseMuscleTarget);

// endregion

#[derive(Default)]
pub struct ExerciseMuscleMapBuilder<E, M, T> {
    exercise_id: E,
    muscle_id: M,
    target: T,
}

impl ExerciseMuscleMapBuilder<NoExerciseId, NoMuscleId, NoTarget> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<E, M, T> ExerciseMuscleMapBuilder<E, M, T> {
    pub fn exercise_id(self, id: i16) -> ExerciseMuscleMapBuilder<ExerciseId, M, T> {
        ExerciseMuscleMapBuilder {
            exercise_id: ExerciseId(id),
            muscle_id: self.muscle_id,
            target: self.target,
        }
    }

    pub fn exercise(self, exercise: &Exercise) -> ExerciseMuscleMapBuilder<ExerciseId, M, T> {
        ExerciseMuscleMapBuilder {
            exercise_id: ExerciseId(exercise.id),
            muscle_id: self.muscle_id,
            target: self.target,
        }
    }

    pub fn muscle_id(self, id: i16) -> ExerciseMuscleMapBuilder<E, MuscleId, T> {
        ExerciseMuscleMapBuilder {
            exercise_id: self.exercise_id,
            muscle_id: MuscleId(id),
            target: self.target,
        }
    }

    pub fn muscle(self, muscle: &Muscle) -> ExerciseMuscleMapBuilder<E, MuscleId, T> {
        ExerciseMuscleMapBuilder {
            exercise_id: self.exercise_id,
            muscle_id: MuscleId(muscle.id),
            target: self.target,
        }
    }

    pub fn target(self, target: ExerciseMuscleTarget) -> ExerciseMuscleMapBuilder<E, M, Target> {
        ExerciseMuscleMapBuilder {
            exercise_id: self.exercise_id,
            muscle_id: self.muscle_id,
            target: Target(target),
        }
    }
}

impl ExerciseMuscleMapBuilder<ExerciseId, MuscleId, Target> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<ExerciseMuscleMap> {
        let mut model = sqlx::query_as::<_, ExerciseMuscleMap>(format!(
            "INSERT INTO {} (exercise_id, muscle_id, target) VALUES ($1, $2, $3) RETURNING *",
            ExerciseMuscleMap::TABLE_NAME,
        ).as_str())
            .bind(self.exercise_id.0)
            .bind(self.muscle_id.0)
            .bind(self.target.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
