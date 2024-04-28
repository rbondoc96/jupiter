use crate::models::{Muscle, MuscleGroup};
use crate::prelude::*;

#[sqlx::test]
async fn create_muscle_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let group = MuscleGroup::mocked(&database).await?;

    let count = Muscle::count(&database).await?;

    let muscle = Muscle::new()
        .group(&group)
        .name("My Muscle")
        .simple_name(Some("My simple name"))
        .description(Some("My description"))
        .image_source(Some("Image source"))
        .create(&database)
        .await?;

    assert_eq!(count + 1, Muscle::count(&database).await?);
    assert_eq!(group.id, muscle.group_id);
    assert_eq!("My Muscle", muscle.name);
    assert_some_eq("My simple name", muscle.simple_name);
    assert_some_eq("My description", muscle.description);
    assert_some_eq("Image source", muscle.image_source);

    Ok(())
}

#[sqlx::test]
async fn create_muscle_with_parent_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let group = MuscleGroup::mocked(&database).await?;
    let parent = Muscle::mocked(&database).await?;

    let count = Muscle::count(&database).await?;

    let muscle = Muscle::new()
        .parent(Some(&parent))
        .group(&group)
        .name("My Muscle")
        .simple_name(Some("My simple name"))
        .description(Some("My description"))
        .image_source(Some("Image source"))
        .create(&database)
        .await?;

    assert_eq!(count + 1, Muscle::count(&database).await?);
    assert_some_eq(parent.id, muscle.parent_id);
    assert_eq!(group.id, muscle.group_id);
    assert_eq!("My Muscle", muscle.name);
    assert_some_eq("My simple name", muscle.simple_name);
    assert_some_eq("My description", muscle.description);
    assert_some_eq("Image source", muscle.image_source);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_muscle_with_duplicate_name(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let parent = Muscle::mocked(&database).await?;

    let result = Muscle::fake()
        .name(parent.name)
        .create(&database)
        .await;

    assert!(result.is_err());

    Ok(())
}

#[sqlx::test]
async fn edit_muscle_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let parent = Muscle::mocked(&database).await?;
    let group = MuscleGroup::mocked(&database).await?;

    let another_parent = Muscle::mocked(&database).await?;
    let another_group = MuscleGroup::mocked(&database).await?;

    let mut muscle = Muscle::fake()
        .parent(Some(&parent))
        .group(&group)
        .create(&database)
        .await?;

    muscle.group_id = another_group.id;
    muscle.parent_id = Some(another_parent.id);
    muscle.name = "Another muscle".to_string();
    muscle.simple_name = Some("Another simple name".to_string());
    muscle.description = Some("Another description".to_string());
    muscle.image_source = Some("Another source".to_string());

    muscle.save(&database).await?;

    assert_eq!(another_group.id, muscle.group_id);
    assert_some_eq(another_parent.id, muscle.parent_id);
    assert_eq!("Another muscle", muscle.name);
    assert_some_eq("Another simple name", muscle.simple_name);
    assert_some_eq("Another description", muscle.description);
    assert_some_eq("Another source", muscle.image_source);

    Ok(())
}
