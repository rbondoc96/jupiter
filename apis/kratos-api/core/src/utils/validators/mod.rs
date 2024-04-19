mod password;
mod number;

pub use password::password;

pub enum ValidatorResult {
    Valid,
    Invalid(Vec<String>),
}
