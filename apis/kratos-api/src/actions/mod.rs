mod error;
pub mod profiles;
pub mod services;
pub mod users;

pub use error::Error;
pub(self) type Result<T> = core::result::Result<T, crate::http::ErrorResponse>;
