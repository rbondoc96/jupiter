use super::{Error, Result};
use crate::{
    enums::Role,
    utilities::{crypt, validators},
    models::User,
};
use database::DatabaseManager;

#[derive(Debug)]
pub struct CreateUserData<'a> {
    pub email: &'a str,
    pub first_name: &'a str,
    pub last_name: &'a str,
    pub role: Option<Role>,
    pub password: &'a str,
    pub password_confirm: &'a str,
}

pub async fn create_user(data: CreateUserData<'_>, database: &DatabaseManager) -> Result<User> {
    use validators::ValidatorResult;

    if User::exists_with_email(data.email, database).await? {
        return Err(Error::UsersAccountWithEmailExists)?;
    }

    if data.password != data.password_confirm {
        return Err(Error::UsersPasswordMismatch)?;
    }

    if let ValidatorResult::Invalid(messages) = validators::password(data.password) {
        return Err(Error::UsersInvalidPasswordFormat(messages))?;
    }

    let user = User::new()
        .name(data.first_name, data.last_name)
        .email(data.email)
        .role(data.role.unwrap_or_default())
        .password(data.password)
        .create(&database)
        .await?;

    Ok(user)
}
