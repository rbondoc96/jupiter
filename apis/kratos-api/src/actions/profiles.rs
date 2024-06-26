use super::Result;
use crate::{
    enums::Gender,
    models::{Profile, User},
};
use chrono::NaiveDate;
use database::DatabaseManager;

#[derive(Debug)]
pub struct CreateUserProfileData<'a> {
    pub user: &'a User,
}

pub async fn create_user_profile(data: CreateUserProfileData<'_>, database: &DatabaseManager) -> Result<Profile> {
    let profile = Profile::new()
        .user_id(data.user.id)
        .create(&database)
        .await?;

    Ok(profile)
}
