use serde::{Deserialize, Serialize};
use strum_macros::Display;

#[derive(Clone, Debug, Deserialize, Display, PartialEq, Serialize)]
#[serde(rename_all = "snake_case")]
#[strum(serialize_all = "snake_case")]
pub enum MeasurementQuantity {
    Distance,
    Duration,
    Number,
    Repetitions,
    Weight,
}
