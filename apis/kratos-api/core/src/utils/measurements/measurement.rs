use crate::enums::{
    MeasurementDenominator,
    MeasurementFormat,
    MeasurementOperation,
    MeasurementQuantity,
    MeasurementUnit,
};

// Examples of Measurements:
// 1. 15 lbs for 8 reps
// 2. 10 lbs for 10 seconds
// 3. 10 lbs for 15 yards
// 4. 1 mile in 30 minutes
// 5. 1 hour
// 6. Setting 5 for 10 reps
// 7. Setting 7 for 10 seconds
// 8. 18 reps

#[derive(Debug)]
pub struct Measurement {
    pub denominator: Option<MeasurementDenominator>,
    pub format: MeasurementFormat,
    pub operation: MeasurementOperation,
    pub quantity: MeasurementQuantity,
    pub unit: MeasurementUnit,
}

impl Measurement {
    pub fn switch_to_imperial(&mut self) -> &mut Self {
        if let MeasurementFormat::Metric = self.format {
            self.format = MeasurementFormat::Imperial;
            self.unit = self.unit.clone().resolve_other_format();
        }

        self
    }

    pub fn switch_to_metric(&mut self) -> &mut Self {
        if let MeasurementFormat::Imperial = self.format {
            self.format = MeasurementFormat::Metric;
            self.unit = self.unit.clone().resolve_other_format();
        }

        self
    }

    pub fn assisted_bodyweight_repetitions() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Repetition),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Multiplication,
            quantity: MeasurementQuantity::Weight,
            unit: MeasurementUnit::Kilogram,
        }
    }

    pub fn distance_in_duration() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Second),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Division,
            quantity: MeasurementQuantity::Distance,
            unit: MeasurementUnit::Meter,
        }
    }

    pub fn duration() -> Self {
        Self {
            denominator: None,
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Addition,
            quantity: MeasurementQuantity::Duration,
            unit: MeasurementUnit::Second,
        }
    }

    pub fn repetitions() -> Self {
        Self {
            denominator: None,
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Addition,
            quantity: MeasurementQuantity::Repetitions,
            unit: MeasurementUnit::Repetition,
        }
    }

    pub fn machine_setting_repetitions() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Repetition),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Multiplication,
            quantity: MeasurementQuantity::Number,
            unit: MeasurementUnit::Number,
        }
    }

    pub fn machine_weight_repetitions() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Repetition),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Multiplication,
            quantity: MeasurementQuantity::Weight,
            unit: MeasurementUnit::Kilogram,
        }
    }

    pub fn weighted_bodyweight_repetitions() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Repetition),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Multiplication,
            quantity: MeasurementQuantity::Weight,
            unit: MeasurementUnit::Kilogram,
        }
    }

    pub fn weighted_duration() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Second),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Division,
            quantity: MeasurementQuantity::Weight,
            unit: MeasurementUnit::Kilogram,
        }
    }

    pub fn weighted_repetitions() -> Self {
        Self {
            denominator: Some(MeasurementDenominator::Repetition),
            format: MeasurementFormat::Metric,
            operation: MeasurementOperation::Multiplication,
            quantity: MeasurementQuantity::Weight,
            unit: MeasurementUnit::Kilogram,
        }
    }
}
