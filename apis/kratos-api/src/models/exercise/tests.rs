use crate::enums::{ExerciseForce, ExerciseMechanic, ExerciseType, ExerciseMeasurement};
use crate::models::{Exercise, ExerciseEquipment, MuscleGroup};
use crate::prelude::*;

#[sqlx::test]
async fn create_exercise_success(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let group = MuscleGroup::mocked(&database).await?;
    let equipment = ExerciseEquipment::mocked(&database).await?;
    let count = Exercise::count(&database).await?;

    // Act
    let exercise = Exercise::new()
        .exercise_type(ExerciseType::Strength)
        .target_muscle_group_id(Some(group.id))
        .equipment_id(Some(equipment.id))
        .name("My Exercise")
        .name_alternative(Some("My other exercise".to_string()))
        .description(Some("My description".to_string()))
        .force(Some(ExerciseForce::Hold))
        .mechanic(Some(ExerciseMechanic::Compound))
        .measurement(Some(ExerciseMeasurement::WeightedRepetitions))
        .create(&database)
        .await?;

    // Assert
    assert!(exercise.external_id.is_none());
    assert_eq!(ExerciseType::Strength, exercise.exercise_type);
    assert_some_eq(group.id, exercise.target_muscle_group_id);
    assert_some_eq(equipment.id, exercise.equipment_id);
    assert_eq!("My Exercise", exercise.name);
    assert_eq!(count + 1, Exercise::count(&database).await?);

    Ok(())
}

#[sqlx::test]
async fn edit_exercise_success(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let mut exercise = Exercise::mocked(&database).await?;

    // Act
    exercise.exercise_type = ExerciseType::Class;
    exercise.name = "New Exercise".to_string();
    exercise.name_alternative = Some("New alternative".to_string());
    exercise.description = Some("New description".to_string());
    exercise.force = Some(ExerciseForce::Pull);
    exercise.mechanic = Some(ExerciseMechanic::Isolation);
    exercise.measurement = Some(ExerciseMeasurement::Duration);

    exercise.save(&database).await?;

    // Assert
    assert_eq!(ExerciseType::Class, exercise.exercise_type);
    assert_eq!("New Exercise", exercise.name);
    assert_some_eq("New alternative", exercise.name_alternative);
    assert_some_eq("New description", exercise.description);
    assert_some_eq(ExerciseForce::Pull, exercise.force);
    assert_some_eq(ExerciseMechanic::Isolation, exercise.mechanic);
    assert_some_eq(ExerciseMeasurement::Duration, exercise.measurement);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_exercise_with_duplicate_name(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;

    // Act
    let result = Exercise::fake()
        .name(exercise.name)
        .create(&database)
        .await;

    // Assert
    assert!(result.is_err());

    Ok(())
}