pub mod conversions;
mod error;
mod number;
pub(self) mod base;

pub use error::ArithmeticError;
pub use number::Number;

pub type ArithmeticResult<T> = Result<Number<T>, ArithmeticError>;
