mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Exercise, Link, ModelResult};
use crate::prelude::*;
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model, SqlxAction};
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub(crate) use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct MuscleGroup {
    pub id: i16,
    pub name: String,
    pub image_source: Option<String>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for MuscleGroup {
    const MODEL_NAME: &'static str = "MuscleGroup";
    const TABLE_NAME: &'static str = "muscle_groups";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for MuscleGroup {
    const ROUTE_KEY: &'static str = "id";
    type RouteKey = i16;

    fn route_key(&self) -> Self::RouteKey {
        self.id
    }
}

impl MuscleGroup {
    pub fn new() -> MuscleGroupBuilder<NoName> {
        MuscleGroupBuilder::new()
    }

    // region Relationships

    pub async fn exercises(&self, database: &DatabaseManager) -> ModelResult<Vec<Exercise>> {
        let results = Exercise::query()
            .select(&["*"])
            .and_where("target_muscle_group_id", "=", self.id)
            .all(database.connection())
            .await?;

        Ok(results)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (name, image_source, updated_at) = ($1, $2, $3) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.name.clone())
            .bind(self.image_source.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.name = model.name;
        self.image_source = model.image_source;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
