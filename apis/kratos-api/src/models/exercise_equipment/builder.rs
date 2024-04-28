use crate::models::{ExerciseEquipment, ModelResult};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoName;
#[derive(Default)]
pub struct Name(String);

// endregion

#[derive(Default)]
pub struct ExerciseEquipmentBuilder<N> {
    name: N,
}

impl ExerciseEquipmentBuilder<NoName> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<N> ExerciseEquipmentBuilder<N> {
    pub fn name(mut self, name: impl Into<String>) -> ExerciseEquipmentBuilder<Name> {
        ExerciseEquipmentBuilder {
            name: Name(name.into())
        }
    }
}

impl ExerciseEquipmentBuilder<Name> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<ExerciseEquipment> {
        let model = sqlx::query_as::<_, ExerciseEquipment>(format!(
            "INSERT INTO {} (name) VALUES ($1) RETURNING *",
            ExerciseEquipment::TABLE_NAME,
        ).as_str())
            .bind(self.name.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}