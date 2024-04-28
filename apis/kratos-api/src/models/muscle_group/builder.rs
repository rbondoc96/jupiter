use crate::models::{Error, ModelResult, MuscleGroup};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoName;
#[derive(Default)]
pub struct Name(String);

// endregion

#[derive(Default)]
pub struct MuscleGroupBuilder<N> {
    name: N,
    image_source: Option<String>,
}

impl MuscleGroupBuilder<NoName> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<N> MuscleGroupBuilder<N> {
    pub fn image_source(mut self, source: impl Into<String>) -> Self {
        self.image_source = Some(source.into());
        self
    }

    pub fn name(self, name: impl Into<String>) -> MuscleGroupBuilder<Name> {
        MuscleGroupBuilder {
            name: Name(name.into()),
            image_source: self.image_source,
        }
    }
}

impl MuscleGroupBuilder<Name> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<MuscleGroup> {
        let model = sqlx::query_as::<_, MuscleGroup>(format!(
            "INSERT INTO {} (name, image_source) VALUES ($1, $2) RETURNING *",
            MuscleGroup::TABLE_NAME,
        ).as_str())
            .bind(self.name.0)
            .bind(self.image_source)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
