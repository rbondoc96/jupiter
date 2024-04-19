use serde::{Deserialize, Serialize};
use strum_macros::Display;

#[derive(Clone, Debug, Deserialize, Display, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
#[strum(serialize_all = "snake_case")]
pub enum MeasurementUnit {
    Kilogram,
    Mile,
    Meter,
    Number,
    Pound,
    Repetition,
    Second,
    Yard,
}

impl MeasurementUnit {
    pub fn resolve_other_format(self) -> Self {
        match self {
            Self::Kilogram => Self::Pound,
            Self::Mile => Self::Meter,
            Self::Meter => Self::Mile,
            Self::Pound => Self::Kilogram,
            Self::Yard => Self::Meter,
            _ => self
        }
    }
}
