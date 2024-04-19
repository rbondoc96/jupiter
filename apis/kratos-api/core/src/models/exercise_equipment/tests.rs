use crate::models::ExerciseEquipment;
use crate::prelude::*;

#[sqlx::test]
async fn create_exercise_equipment_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let count = ExerciseEquipment::count(&database).await?;

    let equipment = ExerciseEquipment::new()
        .name("My Equipment")
        .create(&database)
        .await?;

    assert_eq!("My Equipment", equipment.name);
    assert_eq!(count + 1, ExerciseEquipment::count(&database).await?);

    Ok(())
}

async fn edit_exercise_equipment_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let mut equipment = ExerciseEquipment::mocked(&database).await?;

    equipment.name = "Another name".to_string();

    equipment.save(&database);

    assert_eq!("Another name", equipment.name);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_equipment_with_duplicate_name(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let equipment = ExerciseEquipment::mocked(&database).await?;

    let result = ExerciseEquipment::fake()
        .name(equipment.name)
        .create(&database)
        .await;

    assert!(result.is_err());

    Ok(())
}