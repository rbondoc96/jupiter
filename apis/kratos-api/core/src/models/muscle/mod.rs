mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Link, MuscleGroup, ModelResult};
use crate::prelude::*;
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct Muscle {
    pub id: i16,
    pub ulid: String,
    pub group_id: i16,
    pub parent_id: Option<i16>,
    pub name: String,
    pub simple_name: Option<String>,
    pub description: Option<String>,
    pub image_source: Option<String>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for Muscle {
    const MODEL_NAME: &'static str = "Muscle";
    const TABLE_NAME: &'static str = "muscles";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for Muscle {
    const ROUTE_KEY: &'static str = "ulid";
    type RouteKey = String;

    fn route_key(&self) -> Self::RouteKey {
        self.ulid.clone()
    }
}

impl Muscle {
    pub fn new() -> MuscleBuilder<NoGroupId, NoName> {
        MuscleBuilder::new()
    }

    // region Relationships

    pub async fn links(&self, database: &DatabaseManager) -> ModelResult<Vec<Link>> {
        Link::muscle_links(self.id, database).await
    }

    pub async fn muscle_group(&self, database: &DatabaseManager) -> ModelResult<MuscleGroup> {
        let group = MuscleGroup::find_by_pk(self.group_id, database).await?;

        Ok(group)
    }

    pub async fn parent(&self, database: &DatabaseManager) -> ModelResult<Option<Self>> {
        if self.parent_id.is_none() {
            return Ok(None);
        }

        Ok(Self::find_by_pk(self.parent_id.unwrap(), database).await.ok())
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (group_id, parent_id, name, simple_name, description, image_source, updated_at) = ($1, $2, $3, $4, $5, $6, $7) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.group_id)
            .bind(self.parent_id)
            .bind(self.name.clone())
            .bind(self.simple_name.clone())
            .bind(self.description.clone())
            .bind(self.image_source.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.group_id = model.group_id;
        self.parent_id = model.parent_id;
        self.name = model.name;
        self.simple_name = model.simple_name;
        self.description = model.description;
        self.image_source = model.image_source;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
