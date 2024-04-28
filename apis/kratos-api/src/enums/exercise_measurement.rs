use crate::lib::measurements::Measurement;
use database::impl_bindable;
use serde::{Deserialize, Serialize};
use sqlx::Type;
use strum_macros::Display;

#[derive(Clone, Debug, Deserialize, Display, PartialEq, Serialize, Type)]
#[serde(rename_all = "snake_case")]
#[sqlx(rename_all = "snake_case", type_name = "varchar")]
#[strum(serialize_all = "snake_case")]
pub enum ExerciseMeasurement {
    AssistedBodyweightRepetitions,
    DistanceInDuration,
    Duration,
    Repetitions,
    MachineSettingRepetitions,
    MachineWeightRepetitions,
    WeightedBodyweightRepetitions,
    WeightedDuration,
    WeightedRepetitions,
}

impl Default for ExerciseMeasurement {
    fn default() -> Self {
        Self::WeightedRepetitions
    }
}

impl ExerciseMeasurement {
    pub fn to_measurement(self) -> Measurement {
        match self {
            Self::AssistedBodyweightRepetitions => Measurement::assisted_bodyweight_repetitions(),
            Self::DistanceInDuration => Measurement::distance_in_duration(),
            Self::Duration => Measurement::duration(),
            Self::Repetitions => Measurement::repetitions(),
            Self::MachineSettingRepetitions => Measurement::machine_setting_repetitions(),
            Self::MachineWeightRepetitions => Measurement::machine_weight_repetitions(),
            Self::WeightedBodyweightRepetitions => Measurement::weighted_bodyweight_repetitions(),
            Self::WeightedDuration => Measurement::weighted_duration(),
            Self::WeightedRepetitions => Measurement::weighted_repetitions(),
        }
    }
}

impl_bindable!(ExerciseMeasurement);
