use crate::enums::{ExerciseMeasurement, SetType};
use crate::models::{Exercise, PerformedExercise, PerformedSet, User};
use crate::prelude::tests::*;

#[sqlx::test]
async fn create_performed_set_success(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::fake()
        .measurement(Some(ExerciseMeasurement::WeightedRepetitions))
        .create(&database)
        .await?;
    let performed_exercise = PerformedExercise::fake()
        .exercise(&exercise)
        .create(&database)
        .await?;

    // Act
    let set = PerformedSet::new()
        .exercise(&performed_exercise)
        .sequence_number(1)
        .set_type(SetType::Normal)
        .unit_value(12.5)
        .denominator_value(11)
        .create(&database)
        .await?;

    // Assert

    Ok(())
}

// #[sqlx::test]
// async fn edit_performed_set_success(pool: PgPool) -> TestResult<()> {
//     // Arrange
//     let database = DatabaseManager::from_pool(pool);
//
//     // Act
//
//
//     // Assert
// }
