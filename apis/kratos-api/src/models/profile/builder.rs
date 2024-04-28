use crate::enums::Gender;
use crate::models::{Error, Profile, ModelResult, User};
use chrono::NaiveDate;
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoUserId;
#[derive(Default)]
pub struct UserId(pub i16);

// endregion

#[derive(Default)]
pub struct ProfileBuilder<U> {
    pub user_id: U,
    pub birthday: Option<NaiveDate>,
}

impl ProfileBuilder<NoUserId> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<U> ProfileBuilder<U> {
    pub fn birthday(self, birthday: Option<NaiveDate>) -> Self {
        ProfileBuilder {
            user_id: self.user_id,
            birthday,
        }
    }

    pub fn user_id(self, id: i16) -> ProfileBuilder<UserId> {
        ProfileBuilder {
            user_id: UserId(id),
            birthday: self.birthday,
        }
    }

    pub fn user(self, user: &User) -> ProfileBuilder<UserId> {
        ProfileBuilder {
            user_id: UserId(user.id),
            birthday: self.birthday,
        }
    }
}

impl ProfileBuilder<UserId> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<Profile> {
        let model = sqlx::query_as::<_, Profile>(format!(
            "INSERT INTO {} (user_id, birthday) VALUES ($1, $2) RETURNING *",
            Profile::TABLE_NAME,
        ).as_str())
            .bind(self.user_id.0)
            .bind(self.birthday)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
