mod measurement;
mod value;

use crate::utils::arithmetic::ArithmeticError;

pub use measurement::Measurement;
pub use value::MeasuredValue;

pub type MeasurementResult<T> = Result<T, ArithmeticError>;
