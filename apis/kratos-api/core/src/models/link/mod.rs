mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, ModelResult};
use crate::prelude::*;
use crate::enums::{LinkFormat, LinkType, Table};
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct Link {
    pub id: i32,
    pub ulid: String,
    pub model_name: Table,
    pub model_id: i16,
    #[sqlx(rename = "type")]
    pub link_type: LinkType,
    pub format: LinkFormat,
    pub label: String,
    pub description: Option<String>,
    pub src: String,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for Link {
    const MODEL_NAME: &'static str = "Link";
    const TABLE_NAME: &'static str = "links";

    type PrimaryKey = i32;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for Link {
    const ROUTE_KEY: &'static str = "ulid";
    type RouteKey = String;

    fn route_key(&self) -> Self::RouteKey {
        self.ulid.clone()
    }
}

impl Link {
    pub fn new() -> LinkBuilder<NoModelData, NoType, NoFormat, NoLabel, NoSrc> {
        LinkBuilder::new()
    }

    // region Relationships

    async fn model_links(id: i16, model_name: Table, database: &DatabaseManager) -> ModelResult<Vec<Link>> {
        let links = Self::query()
            .select(&["*"])
            .and_where("model_name", "=", model_name.clone())
            .and_where("model_id", "=", id)
            .all::<&PgPool, Self>(database.connection())
            .await?;

        Ok(links)
    }

    pub async fn muscle_links(id: i16, database: &DatabaseManager) -> ModelResult<Vec<Link>> {
        Self::model_links(id, Table::Muscles, database).await
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (model_name, model_id, type, format, label, description, src, updated_at) = ($1, $2, $3, $4, $5, $6, $7, $8) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.model_name.clone())
            .bind(self.model_id.clone())
            .bind(self.link_type.clone())
            .bind(self.format.clone())
            .bind(self.label.clone())
            .bind(self.description.clone())
            .bind(self.src.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.link_type = model.link_type;
        self.format = model.format;
        self.label = model.label;
        self.description = model.description;
        self.src = model.src;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
