#[cfg(test)]
pub mod tests;
pub mod types;

use chrono::Utc;

#[cfg(test)]
pub use tests::*;

pub use crate::types::*;
pub use crate::lib::__;

pub fn now() -> ISO8601DateTimeUTC {
    Utc::now()
}
