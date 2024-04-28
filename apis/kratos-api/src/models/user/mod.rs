mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Profile, ModelResult};
use crate::enums::Role;
use crate::prelude::*;
use database::{DatabaseManager, HasRouteKey, Model};
use async_trait::async_trait;
use serde::{Deserialize, Serialize};
use sqlx::{postgres::PgPool, FromRow};

#[cfg(test)]
pub(crate) use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct User {
    pub id: i16,
    pub email: String,
    pub role: Role,
    pub first_name: String,
    pub last_name: String,
    pub password: String,
    pub last_logged_in_at: Option<ISO8601DateTimeUTC>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for User {
    const MODEL_NAME: &'static str = "User";
    const TABLE_NAME: &'static str = "users";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for User {
    const ROUTE_KEY: &'static str = "id";
    type RouteKey = i16;

    fn route_key(&self) -> Self::RouteKey {
        self.id
    }
}

impl User {
    // region Static Methods

    pub fn new() -> UserBuilder<NoPassword, NoUserRole, NoEmail, NoName> {
        UserBuilder::new()
    }

    pub async fn exists_with_email(email: impl ToString, database: &DatabaseManager) -> ModelResult<bool> {
        let result = Self::query()
            .select(&["*"])
            .and_where("email", "=", email.to_string())
            .optional::<&PgPool, Self>(database.connection())
            .await
            .map(|user| user.is_some())?;

        Ok(result)
    }

    pub async fn find_by_email(email: impl ToString, database: &DatabaseManager) -> ModelResult<User> {
        let user = Self::find(
            "email",
            email.to_string(),
            database
        ).await?;

        Ok(user)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (email, first_name, last_name, password, updated_at) = ($1, $2, $3, $4, $5) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, self.primary_key(),
        ).as_str())
            .bind(self.email.clone())
            .bind(self.first_name.clone())
            .bind(self.last_name.clone())
            .bind(self.password.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.email = model.email;
        self.first_name = model.first_name;
        self.last_name = model.last_name;
        self.password = model.password;
        self.updated_at = model.updated_at;

        Ok(())
    }

    pub async fn update_last_logged_in(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let now = chrono::Utc::now();

        let result = sqlx::query(format!(
            "UPDATE {} SET last_logged_in_at = $1 WHERE {} = {}",
            Self::TABLE_NAME, Self::PRIMARY_KEY, self.primary_key()
        ).as_str())
            .bind(now)
            .execute(database.connection())
            .await?;

        self.last_logged_in_at = Some(now);

        Ok(())
    }

    // endregion

    // region Relationships

    pub async fn profile(&self, database: &DatabaseManager) -> ModelResult<Profile> {
        Profile::find_by_user(self.id, database).await
    }

    // endregion
}
