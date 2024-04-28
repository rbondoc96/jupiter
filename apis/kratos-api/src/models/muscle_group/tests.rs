use crate::models::MuscleGroup;
use crate::prelude::*;

#[sqlx::test]
async fn create_muscle_group_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let count = MuscleGroup::count(&database).await?;

    let group = MuscleGroup::new()
        .name("My Group")
        .create(&database)
        .await?;

    assert_eq!("My Group", group.name);
    assert_eq!(count + 1, MuscleGroup::count(&database).await?);

    Ok(())
}

#[sqlx::test]
async fn edit_muscle_group_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let mut group = MuscleGroup::mocked(&database).await?;

    group.name = "My New Group".to_string();

    group.save(&database).await?;

    Ok(())
}

#[sqlx::test]
async fn cannot_create_group_with_duplicate_name(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let group = MuscleGroup::mocked(&database).await?;

    let result = MuscleGroup::fake()
        .name(group.name)
        .create(&database)
        .await;

    assert!(result.is_err());

    Ok(())
}
