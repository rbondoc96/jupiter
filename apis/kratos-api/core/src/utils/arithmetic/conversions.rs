use super::{ArithmeticError, ArithmeticResult, Number};

// region Weight

const GRAMS_PER_POUND: f32 = 453.59237;
const POUNDS_PER_KILOGRAM: f32 = 2.20462262185;

// pub fn grams_to_pounds(grams: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let grams = grams.into();
//     grams.divide_f32(GRAMS_PER_POUND)
// }
//
// pub fn grams_to_kilograms(grams: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let grams = grams.into();
//     grams.divide_u32(1000)
// }

// pub fn kilograms_to_grams(kg: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let kg = kg.into();
//     kg.multiply_u32(1000)
// }

pub fn kilograms_to_pounds(kg: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
    let kg = kg.into();
    kg.multiply_f32(POUNDS_PER_KILOGRAM)
}

// pub fn pounds_to_grams(lbs: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let lbs = lbs.into();
//     lbs.multiply_f32(GRAMS_PER_POUND)
// }

// pub fn pounds_to_kilograms(lbs: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     pounds_to_grams(lbs)?.divide_u32(1000)
// }

// endregion

// region Distance

const KILOMETERS_PER_MILE: f32 = 1.609344;
const METERS_PER_MILE: f32 = 1609.344;
const METERS_PER_YARD: f32 = 0.9144;
const YARDS_PER_MILE: u32 = 1760;

// pub fn kilometers_to_meters(kilometers: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let kilometers = kilometers.into();
//     kilometers.multiply_u32(1000)
// }

// pub fn kilometers_to_miles(kilometers: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let kilometers = kilometers.into();
//     kilometers.divide_f32(KILOMETERS_PER_MILE)
// }

// pub fn kilometers_to_yards(kilometers: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     kilometers_to_miles(kilometers)?.multiply_u32(YARDS_PER_MILE)
// }

// pub fn meters_to_kilometers(meters: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let meters = meters.into();
//     meters.divide_u32(1000)
// }

pub fn meters_to_miles(meters: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
    let meters = meters.into();
    meters.divide_f32(METERS_PER_MILE)
}

// pub fn meters_to_yards(meters: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     meters_to_miles(meters)?.multiply_u32(YARDS_PER_MILE)
// }

// pub fn miles_to_kilometers(miles: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let miles = miles.into();
//     miles.multiply_f32(KILOMETERS_PER_MILE)
// }

// pub fn miles_to_meters(miles: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     miles_to_kilometers(miles)?.multiply_u32(1000)
// }

pub fn miles_to_yards(miles: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
    let miles = miles.into();
    miles.multiply_u32(YARDS_PER_MILE)
}

// pub fn yards_to_kilometers(yards: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let yards = yards.into();
//     yards.multiply_f32(METERS_PER_YARD)?.divide_u32(1000)
// }

// pub fn yards_to_meters(yards: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     yards_to_kilometers(yards)?.multiply_u32(1000)
// }

pub fn yards_to_miles(yards: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
    let yards = yards.into();
    yards.divide_u32(YARDS_PER_MILE)
}

// endregion

// region Time

// const MINUTES_PER_HOUR: u32 = 60;
// const SECONDS_PER_MINUTE: u32 = 60;
//
// pub fn hours_to_minutes(hours: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let hours = hours.into();
//     hours.multiply_u32(MINUTES_PER_HOUR)
// }
//
// pub fn hours_to_seconds(hours: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let hours = hours.into();
//     hours.multiply_u32(MINUTES_PER_HOUR)?.multiply_u32(SECONDS_PER_MINUTE)
// }
//
// pub fn minutes_to_seconds(minutes: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let minutes = minutes.into();
//     minutes.multiply_u32(SECONDS_PER_MINUTE)
// }
//
// pub fn minutes_to_hours(minutes: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let minutes = minutes.into();
//     minutes.multiply_u32(MINUTES_PER_HOUR)
// }
//
// pub fn seconds_to_minutes(seconds: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let seconds = seconds.into();
//     seconds.divide_u32(SECONDS_PER_MINUTE)
// }
//
// pub fn seconds_to_hours(seconds: impl Into<Number<f32>>) -> ArithmeticResult<f32> {
//     let seconds = seconds.into();
//     seconds.divide_u32(SECONDS_PER_MINUTE)?.divide_u32(MINUTES_PER_HOUR)
// }

// endregion
