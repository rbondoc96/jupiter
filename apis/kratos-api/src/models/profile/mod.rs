mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, ModelResult, User};
use crate::prelude::*;
use crate::enums::Gender;
use async_trait::async_trait;
use chrono::{DateTime, NaiveDate, Utc};
use database::{DatabaseManager, HasRouteKey, Model, SqlxAction};
use serde::{Deserialize, Serialize};
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub(crate) use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct Profile {
    pub id: i16,
    pub ulid: String,
    pub user_id: i16,
    pub birthday: Option<NaiveDate>,
    pub created_at: DateTime<Utc>,
    pub updated_at: DateTime<Utc>,
}

#[async_trait]
impl Model for Profile {
    const MODEL_NAME: &'static str = "Profile";
    const TABLE_NAME: &'static str = "profiles";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for Profile {
    const ROUTE_KEY: &'static str = "ulid";
    type RouteKey = String;

    fn route_key(&self) -> Self::RouteKey {
        self.ulid.clone()
    }
}

impl Profile {
    // region Static Methods

    pub fn new() -> ProfileBuilder<NoUserId> {
        ProfileBuilder::new()
    }

    pub async fn find_by_user(user_id: i16, database: &DatabaseManager) -> ModelResult<Self> {
        let user = Self::query()
            .select(&["*"])
            .and_where("user_id", "=", user_id)
            .one(database.connection())
            .await?;

        Ok(user)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (birthday, updated_at) = ($1, $2) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.birthday)
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.birthday = model.birthday;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion

    // region Relationships

    pub async fn user(&self, database: &DatabaseManager) -> ModelResult<User> {
        let user = User::find_by_pk(self.user_id, database).await?;

        Ok(user)
    }

    // endregion
}
