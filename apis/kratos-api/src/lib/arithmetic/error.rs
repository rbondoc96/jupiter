use rust_decimal::Error as RustDecimalError;

pub enum ArithmeticError {
    ArithmeticOverflow,
    ArithmeticUnderflow,
    Conversion(String),
    DivisionByZero,
    Infinite,
    NotANumber,
    Subnormal,
    UnsupportedOperation,
}

impl Into<ArithmeticError> for RustDecimalError {
    fn into(self) -> ArithmeticError {
        match self {
            RustDecimalError::ConversionTo(message) => ArithmeticError::Conversion(message),
            RustDecimalError::ErrorString(message) => ArithmeticError::Conversion(message),
            RustDecimalError::ExceedsMaximumPossibleValue => ArithmeticError::ArithmeticOverflow,
            RustDecimalError::LessThanMinimumPossibleValue
                | RustDecimalError::Underflow => ArithmeticError::ArithmeticUnderflow,
            RustDecimalError::ScaleExceedsMaximumPrecision(_) => {
                ArithmeticError::Conversion("Scale exceeds maximum precision".to_string())
            },
        }
    }
}
