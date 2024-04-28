mod pagination;
mod context;
mod error;

pub use context::Context;
pub use error::Error;
pub use pagination::Pagination;

pub (self) type Result<T> = core::result::Result<T, Error>;
