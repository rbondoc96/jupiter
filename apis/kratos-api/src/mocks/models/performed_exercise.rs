use crate::mocks::models::MockModelResult;
use crate::models::{Exercise, PerformedExercise, PerformedWorkout, User};
use crate::models::performed_exercise::builder::{
    HasPerformedExerciseExerciseId,
    HasPerformedExerciseWorkoutId,
    NoPerformedExerciseExerciseId,
    NoPerformedExerciseWorkoutId,
    PerformedExerciseBuilder,
};
use database::DatabaseManager;

impl PerformedExercise {
    pub fn fake() -> PerformedExerciseBuilder<
        NoPerformedExerciseExerciseId,
        NoPerformedExerciseWorkoutId,
    > {
        println!("fake()");
        PerformedExercise::new()
    }

    pub async fn mocked(database: &DatabaseManager) -> MockModelResult<PerformedExercise> {
        let exercise = Exercise::mocked(database).await?;
        let workout = PerformedWorkout::mocked(database).await?;

        let performed_exercise = Self::fake()
            .exercise(&exercise)
            .workout(&workout)
            .create(database)
            .await?;

        Ok(performed_exercise)
    }
}

impl PerformedExerciseBuilder<NoPerformedExerciseExerciseId, NoPerformedExerciseWorkoutId> {
    pub async fn create(self, database: &DatabaseManager) -> MockModelResult<PerformedExercise> {
        let exercise = Exercise::mocked(database).await?;
        let workout = PerformedWorkout::mocked(database).await?;

        let performed_exercise = self.exercise(&exercise)
            .workout(&workout)
            .create(database)
            .await?;

        Ok(performed_exercise)
    }
}

impl PerformedExerciseBuilder<HasPerformedExerciseExerciseId, NoPerformedExerciseWorkoutId> {
    pub async fn create(self, database: &DatabaseManager) -> MockModelResult<PerformedExercise> {
        let workout = PerformedWorkout::mocked(database).await?;

        let performed_exercise = self.workout(&workout)
            .create(database)
            .await?;

        Ok(performed_exercise)
    }
}

impl PerformedExerciseBuilder<NoPerformedExerciseExerciseId, HasPerformedExerciseWorkoutId> {
    pub async fn create(self, database: &DatabaseManager) -> MockModelResult<PerformedExercise> {
        let exercise = Exercise::mocked(database).await?;

        let performed_exercise = self.exercise(&exercise)
            .create(database)
            .await?;

        Ok(performed_exercise)
    }
}
