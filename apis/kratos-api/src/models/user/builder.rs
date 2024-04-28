use crate::enums::Role;
use crate::models::{Error, ModelResult, User};
use crate::lib::crypt;
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoPassword;
#[derive(Default)]
pub struct Password(String);

#[derive(Default)]
pub struct NoUserRole;
#[derive(Default)]
pub struct UserRole(Role);

#[derive(Default)]
pub struct NoEmail;
#[derive(Default)]
pub struct Email(String);

#[derive(Default)]
pub struct NoName;
#[derive(Default)]
pub struct Name(String, String);

// endregion

#[derive(Default)]
pub struct UserBuilder<P, R, E, N> {
    password: P,
    role: R,
    email: E,
    name: N,
}

impl UserBuilder<NoPassword, NoUserRole, NoEmail, NoName> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<P, R, E, N> UserBuilder<P, R, E, N> {
    pub fn password(self, password: impl Into<String>) -> UserBuilder<Password, R, E, N> {
        UserBuilder {
            password: Password(password.into()),
            role: self.role,
            email: self.email,
            name: self.name,
        }
    }

    pub fn role(self, role: Role) -> UserBuilder<P, UserRole, E, N> {
        UserBuilder {
            password: self.password,
            role: UserRole(role),
            email: self.email,
            name: self.name,
        }
    }

    pub fn admin(self) -> UserBuilder<P, UserRole, E, N> {
        UserBuilder {
            password: self.password,
            role: UserRole(Role::Admin),
            email: self.email,
            name: self.name,
        }
    }

    pub fn email(self, email: impl Into<String>) -> UserBuilder<P, R, Email, N> {
        UserBuilder {
            password: self.password,
            role: self.role,
            email: Email(email.into()),
            name: self.name,
        }
    }

    pub fn name(self, first: impl Into<String>, last: impl Into<String>) -> UserBuilder<P, R, E, Name> {
        UserBuilder {
            password: self.password,
            role: self.role,
            email: self.email,
            name: Name(first.into(), last.into()),
        }
    }
}

impl UserBuilder<Password, UserRole, Email, Name> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<User> {
        let password = crypt::encrypt(self.password.0.as_ref())?;

        let model = sqlx::query_as::<_, User>(format!(
            "INSERT INTO {} (email, role, first_name, last_name, password) VALUES ($1, $2, $3, $4, $5) RETURNING *",
            User::TABLE_NAME,
        ).as_str())
            .bind(self.email.0)
            .bind(self.role.0)
            .bind(self.name.0)
            .bind(self.name.1)
            .bind(password)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
