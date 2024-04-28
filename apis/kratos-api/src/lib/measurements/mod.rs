mod measurement;
mod value;

use crate::lib::arithmetic::ArithmeticError;

pub use measurement::{Measurement, MeasurementDenominator, MeasurementFormat, MeasurementOperation, MeasurementUnit};
pub use value::MeasuredValue;

pub type MeasurementResult<T> = Result<T, ArithmeticError>;
