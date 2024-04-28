use crate::{
    enums::ExerciseMeasurement,
    lib::measurements::{MeasurementDenominator, MeasurementFormat, MeasurementOperation, MeasurementUnit},
};
use serde::Serialize;

#[derive(Serialize)]
pub struct MeasurementResource {
    denominator: Option<MeasurementDenominator>,
    format: MeasurementFormat,
    operation: MeasurementOperation,
    unit: MeasurementUnit,
}

impl MeasurementResource {
    pub fn new(measurement: ExerciseMeasurement) -> Self {
        let measurement = measurement.to_measurement();

        Self {
            denominator: measurement.denominator,
            format: measurement.format,
            operation: measurement.operation,
            unit: measurement.unit,
        }
    }
}
