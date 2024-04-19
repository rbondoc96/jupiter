use crate::enums::{MeasurementFormat, MeasurementUnit};
use crate::utils::measurements::{Measurement, MeasurementResult};
use crate::utils::arithmetic::{ArithmeticError, Number};
use crate::utils::arithmetic::conversions;

pub struct MeasuredValue {
    pub measurement: Measurement,
    pub value: Number<f32>,
    raw_value: f32,
}

impl MeasuredValue {
    pub fn new(measurement: Measurement, value: f32) -> MeasurementResult<Self> {
        Ok(Self {
            raw_value: value,
            measurement,
            value: Number(value),
        })
    }

    pub fn switch_to_imperial(&mut self) -> MeasurementResult<&mut Self> {
        if (self.measurement.format == MeasurementFormat::Imperial) {
            return Ok(self);
        }

        self.value = match self.measurement.unit {
            MeasurementUnit::Kilogram => {
                conversions::kilograms_to_pounds(self.raw_value)?
            }
            MeasurementUnit::Meter => {
                conversions::meters_to_miles(self.raw_value)?
            }
            _ => self.value.clone()
        };

        self.measurement.switch_to_imperial();
        Ok(self)
    }

    pub fn switch_to_metric(&mut self) -> MeasurementResult<&mut Self> {
        if (self.measurement.format == MeasurementFormat::Metric) {
            return Ok(self);
        }

        self.measurement.switch_to_metric();
        self.value = Number(self.raw_value);
        Ok(self)
    }

    pub fn switch_miles_to_yards(&mut self) -> MeasurementResult<&mut Self> {
        if (self.measurement.unit == MeasurementUnit::Yard) {
            return Ok(self);
        }

        if (self.measurement.unit != MeasurementUnit::Mile) {
            return Err(ArithmeticError::UnsupportedOperation);
        }

        self.value = conversions::miles_to_yards(self.value.0)?;
        self.measurement.unit = MeasurementUnit::Yard;
        Ok(self)
    }

    pub fn switch_yards_to_miles(&mut self) -> MeasurementResult<&mut Self> {
        if (self.measurement.unit == MeasurementUnit::Mile) {
            return Ok(self);
        }

        if (self.measurement.unit != MeasurementUnit::Yard) {
            return Err(ArithmeticError::UnsupportedOperation);
        }

        self.value = conversions::yards_to_miles(self.value.0)?;
        self.measurement.unit = MeasurementUnit::Mile;
        Ok(self)
    }
}
