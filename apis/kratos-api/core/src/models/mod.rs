pub mod exercise;
pub mod exercise_equipment;
pub mod exercise_instruction;
pub mod exercise_muscle_map;
mod errors;
pub mod link;
pub mod muscle;
pub mod muscle_group;
pub mod performed_exercise;
pub mod performed_set;
pub mod performed_workout;
pub mod profile;
pub mod user;

pub use exercise::Exercise;
pub use exercise_equipment::ExerciseEquipment;
pub use exercise_instruction::ExerciseInstruction;
pub use exercise_muscle_map::ExerciseMuscleMap;
pub use errors::Error;
pub use link::Link;
pub use muscle::Muscle;
pub use muscle_group::MuscleGroup;
pub use performed_exercise::PerformedExercise;
pub use performed_set::PerformedSet;
pub use performed_workout::PerformedWorkout;
pub use profile::Profile;
pub use user::User;

pub type ModelResult<TValue> = ::core::result::Result<TValue, Error>;
