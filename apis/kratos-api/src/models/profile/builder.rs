use crate::enums::Gender;
use crate::models::{Error, Profile, ModelResult, User};
use chrono::NaiveDate;
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoUserId;
#[derive(Default)]
pub struct UserId(pub i16);

#[derive(Default)]
pub struct NoBirthday;
#[derive(Default)]
pub struct Birthday(NaiveDate);

#[derive(Default)]
pub struct NoUserGender;
#[derive(Default)]
pub struct UserGender(Gender);

// endregion

#[derive(Default)]
pub struct ProfileBuilder<U, B, G> {
    pub user_id: U,
    pub birthday: B,
    pub gender: G,
}

impl ProfileBuilder<NoUserId, NoBirthday, NoUserGender> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<B, G> ProfileBuilder<NoUserId, B, G> {
    pub fn user_id(self, id: i16) -> ProfileBuilder<UserId, B, G> {
        ProfileBuilder {
            user_id: UserId(id),
            birthday: self.birthday,
            gender: self.gender,
        }
    }

    pub fn user(self, user: &User) -> ProfileBuilder<UserId, B, G> {
        ProfileBuilder {
            user_id: UserId(user.id),
            birthday: self.birthday,
            gender: self.gender,
        }
    }
}

impl<U, G> ProfileBuilder<U, NoBirthday, G> {
    pub fn birthday(self, birthday: NaiveDate) -> ProfileBuilder<U, Birthday, G> {
        ProfileBuilder {
            user_id: self.user_id,
            birthday: Birthday(birthday),
            gender: self.gender,
        }
    }
}

impl<U, B> ProfileBuilder<U, B, NoUserGender> {
    pub fn gender(self, gender: Gender) -> ProfileBuilder<U, B, UserGender> {
        ProfileBuilder {
            user_id: self.user_id,
            birthday: self.birthday,
            gender: UserGender(gender),
        }
    }
}

impl ProfileBuilder<UserId, Birthday, UserGender> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<Profile> {
        let model = sqlx::query_as::<_, Profile>(format!(
            "INSERT INTO {} (user_id, birthday, gender) VALUES ($1, $2, $3) RETURNING *",
            Profile::TABLE_NAME,
        ).as_str())
            .bind(self.user_id.0)
            .bind(self.birthday.0)
            .bind(self.gender.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
