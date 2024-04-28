#[derive(Debug, strum_macros::Display, thiserror::Error)]
pub enum Error {
    NoMatchingSessionUserFound,
    RequestExtensionMissingContext,
}

impl From<Error> for crate::http::ErrorResponse {
    fn from(error: Error) -> Self {
        use crate::error::{ClientError, Domain};

        Self::not_authenticated(
            ClientError::NotAuthenticated,
            Domain::UserAuthentication,
        )
    }
}
