use axum::http::StatusCode;
use std::collections::HashMap;

#[derive(Debug, strum_macros::Display, thiserror::Error)]
pub enum Error {
    UsersAccountWithEmailExists,
    UsersInvalidPasswordFormat(Vec<String>),
    UsersPasswordMismatch,
}

impl From<Error> for crate::http::ErrorResponse {
    fn from(error: Error) -> Self {
        use crate::error::{ClientError, Domain};

        match &error {
            Error::UsersInvalidPasswordFormat(messages) => {
                let mut map: HashMap<String, Vec<String>> = HashMap::with_capacity(1);
                map.insert("password".to_string(), messages.clone());

                Self::unprocessable(ClientError::UserRegistration, Domain::UserRegistration)
                    .with_messages(map)
                    .with_message(t!("errors.auth.registration.invalidPasswordFormat"))
            },
            Error::UsersPasswordMismatch => Self::unprocessable(ClientError::Validation, Domain::UserRegistration)
                .with_message(t!("errors.auth.registration.passwordMismatch")),
            Error::UsersAccountWithEmailExists => Self::unprocessable(ClientError::UserRegistration, Domain::UserRegistration)
                .with_message(t!("errors.auth.registration.userWithEmailExists"))
        }
    }
}
