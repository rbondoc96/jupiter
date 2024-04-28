use crate::models::{Exercise, ExerciseInstruction};
use crate::prelude::*;

#[sqlx::test]
async fn create_exercise_instruction_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;

    let count = ExerciseInstruction::count(&database).await?;

    let instruction = ExerciseInstruction::new()
        .exercise(&exercise)
        .sequence_number(1)
        .content("Some content")
        .create(&database)
        .await?;

    assert_eq!(count + 1, ExerciseInstruction::count(&database).await?);
    assert_eq!(exercise.id, instruction.exercise_id);
    assert_eq!(1, instruction.sequence_number);
    assert_eq!("Some content", instruction.content);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_exercise_instructions_with_same_exercise_and_sequence(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let exercise = Exercise::mocked(&database).await?;
    let instructions = ExerciseInstruction::fake()
        .exercise(&exercise)
        .sequence_number(1)
        .create(&database)
        .await?;

    let result = ExerciseInstruction::fake()
        .exercise(&exercise)
        .sequence_number(1)
        .create(&database)
        .await;

    assert!(result.is_err());

    Ok(())
}

#[sqlx::test]
async fn edit_exercise_instruction_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let mut instructions = ExerciseInstruction::mocked(&database).await?;
    let another_exercise = Exercise::mocked(&database).await?;

    instructions.exercise_id = another_exercise.id;
    instructions.sequence_number = 24;
    instructions.content = "New content!".to_string();

    instructions.save(&database).await?;

    assert_eq!(another_exercise.id, instructions.exercise_id);
    assert_eq!(24, instructions.sequence_number);
    assert_eq!("New content!", instructions.content);

    Ok(())
}
