mod auth;
mod error;
mod exercise;
mod exercise_equipment;
mod link;
mod muscle;
mod muscle_group;
mod health;

pub use auth::AuthController;
pub use exercise::ExerciseController;
pub use exercise_equipment::ExerciseEquipmentController;
pub use health::HealthController;
pub use link::LinkController;
pub use muscle::MuscleController;
pub use muscle_group::MuscleGroupController;

pub use error::Error;
pub(self) type Result<TValue> = core::result::Result<TValue, crate::http::ErrorResponse>;

pub trait Controller {
    fn router(state: database::DatabaseManager) -> axum::Router;
}
