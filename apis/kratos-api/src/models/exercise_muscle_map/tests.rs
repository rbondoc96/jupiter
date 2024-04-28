use crate::enums::ExerciseMuscleTarget;
use crate::models::{Exercise, ExerciseMuscleMap, Muscle};
use crate::prelude::*;

#[sqlx::test]
async fn create_exercise_muscle_map_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;
    let muscle = Muscle::mocked(&database).await?;

    let count = ExerciseMuscleMap::count(&database).await?;

    let map = ExerciseMuscleMap::new()
        .exercise(&exercise)
        .muscle(&muscle)
        .target(ExerciseMuscleTarget::Primary)
        .create(&database)
        .await?;

    assert_eq!(count + 1, ExerciseMuscleMap::count(&database).await?);
    assert_eq!(exercise.id, map.exercise_id);
    assert_eq!(muscle.id, map.muscle_id);
    assert_eq!(ExerciseMuscleTarget::Primary, map.target);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_exercise_muscle_map_with_duplicate_columns(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;
    let muscle = Muscle::mocked(&database).await?;

    let map = ExerciseMuscleMap::fake()
        .exercise(&exercise)
        .muscle(&muscle)
        .target(ExerciseMuscleTarget::Primary)
        .create(&database)
        .await?;

    let result = ExerciseMuscleMap::fake()
        .exercise(&exercise)
        .muscle(&muscle)
        .target(ExerciseMuscleTarget::Primary)
        .create(&database)
        .await;

    assert!(result.is_err());

    Ok(())
}

#[sqlx::test]
async fn edit_exercise_muscle_map_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;
    let muscle = Muscle::mocked(&database).await?;

    let mut map = ExerciseMuscleMap::fake()
        .target(ExerciseMuscleTarget::Secondary)
        .create(&database)
        .await?;

    map.exercise_id = exercise.id;
    map.muscle_id = muscle.id;
    map.target = ExerciseMuscleTarget::Tertiary;

    map.save(&database).await?;

    assert_eq!(exercise.id, map.exercise_id);
    assert_eq!(muscle.id, map.muscle_id);
    assert_eq!(ExerciseMuscleTarget::Tertiary, map.target);

    Ok(())
}
