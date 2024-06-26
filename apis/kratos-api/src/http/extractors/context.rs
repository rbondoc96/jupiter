use super::{Error, Result};
use crate::models::User;
use async_trait::async_trait;
use axum::{
    extract::FromRequestParts,
    http::request::Parts,
};

#[derive(Clone, Debug)]
pub struct Context {
    user: User,
}

impl Context {
    pub fn new(user: User) -> Self {
        Self { user }
    }

    pub fn user(&self) -> &User {
        &self.user
    }
}

#[async_trait]
impl<TState> FromRequestParts<TState> for Context
where
    TState: Send + Sync,
{
    type Rejection = crate::http::ErrorResponse;

    async fn from_request_parts(parts: &mut Parts, _state: &TState) -> core::result::Result<Self, Self::Rejection> {
        println!(
            "->> {:>12} -- Context::from_request_parts",
            "CTX_FROM_REQ_PARTS"
        );

        let result = parts
            .extensions
            .get::<Self>()
            .ok_or(Error::RequestExtensionMissingContext)
            .cloned()?;

        Ok(result)
    }
}
