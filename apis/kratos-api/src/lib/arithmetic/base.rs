use crate::lib::arithmetic::{ArithmeticError, ArithmeticResult, Number};

pub fn validate_f32(value: f32) -> ArithmeticResult<f32> {
    if value.is_subnormal() {
        return Err(ArithmeticError::Subnormal);
    }

    if value.is_infinite() {
        return Err(ArithmeticError::Infinite);
    }

    if value.is_nan() {
        return Err(ArithmeticError::NotANumber);
    }

    Ok(Number(value))
}

pub fn add_f32s(x: f32, y: f32) -> ArithmeticResult<f32> {
    validate_f32(x + y)
}

pub fn add_u32s(x: u32, y: u32) -> ArithmeticResult<u64> {
    Ok(Number((x as u64) + (y as u64)))
}

pub fn add_u64s(x: u64, y: u64) -> ArithmeticResult<u64> {
    let sum = x.checked_add(y)
        .ok_or(ArithmeticError::ArithmeticOverflow)?;
    Ok(Number(sum))
}

pub fn divide_f32s(numerator: f32, denominator: f32) -> ArithmeticResult<f32> {
    if denominator == 0.00_f32 {
        return Err(ArithmeticError::DivisionByZero);
    }

    validate_f32(numerator / denominator)
}

pub fn divide_u32s(numerator: u32, denominator: u32) -> ArithmeticResult<u64> {
    divide_u64s(numerator as u64, denominator as u64)
}

pub fn divide_u64s(numerator: u64, denominator: u64) -> ArithmeticResult<u64> {
    if denominator == 0 {
        return Err(ArithmeticError::DivisionByZero);
    }

    let quotient = numerator.checked_div(denominator)
        .ok_or(ArithmeticError::ArithmeticOverflow)?;
    Ok(Number(quotient))
}

pub fn multiply_f32s(x: f32, y: f32) -> ArithmeticResult<f32> {
    validate_f32(x * y)
}

pub fn multiply_u32s(x: u32, y: u32) -> ArithmeticResult<u64> {
    multiply_u64s(x as u64, y as u64)
}

pub fn multiply_u64s(x: u64, y: u64) -> ArithmeticResult<u64> {
    let product = x.checked_mul(y)
        .ok_or(ArithmeticError::ArithmeticOverflow)?;
    Ok(Number(product))
}

pub fn subtract_f32s(x: f32, y: f32) -> ArithmeticResult<f32> {
    validate_f32(x - y)
}

pub fn subtract_u32s(x: u32, y: u32) -> ArithmeticResult<i64> {
    subtract_u64s(x as u64, y as u64)
}

/// Subtracts two `u64`-type integers.
///
/// This function converts the integers into `f32`-type numbers, then does
/// a cast to truncate the difference.
pub fn subtract_u64s(x: u64, y: u64) -> ArithmeticResult<i64> {
    let difference = (x as f32) - (y as f32);

    let result = validate_f32(difference)?;
    Ok(Number(result.0 as i64))
}
