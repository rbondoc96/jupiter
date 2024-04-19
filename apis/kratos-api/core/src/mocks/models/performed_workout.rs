use crate::mocks::models::MockModelResult;
use crate::models::{PerformedWorkout, User};
use crate::models::performed_workout::builder::{
    HasPerformedWorkoutDuration,
    HasPerformedWorkoutPerformedAt,
    HasPerformedWorkoutTitle,
    NoPerformedWorkoutDuration,
    NoPerformedWorkoutPerformedAt,
    NoPerformedWorkoutTitle,
    NoPerformedWorkoutUserId,
    PerformedWorkoutBuilder,
};
use crate::prelude::*;
use chrono::Duration;
use database::{DatabaseManager, Model};
use fake::Fake;
use fake::faker::chrono::en::{DateTime, Duration};
use fake::faker::lorem::en::Words;
use fake::faker::number::en::Digit;

impl PerformedWorkout {
    pub fn fake() -> PerformedWorkoutBuilder<
        NoPerformedWorkoutUserId,
        HasPerformedWorkoutTitle,
        HasPerformedWorkoutDuration,
        HasPerformedWorkoutPerformedAt,
    > {
        let title = Words(2..5).fake::<Vec<String>>();
        let title = title.join(" ");

        let mut duration = Duration().fake::<Duration>();
        let mut duration = duration.num_seconds().abs();

        let performed_at = DateTime().fake::<ISO8601DateTimeUTC>();

        if duration > i16::MAX as i64 {
            duration = i16::MAX as i64;
        }

        PerformedWorkout::new()
            .title(title)
            .duration(duration as i16)
            .performed_at(performed_at)
    }

    pub async fn mocked(database: &DatabaseManager) -> MockModelResult<PerformedWorkout> {
        let user = User::mocked(database).await?;

        let workout = Self::fake()
            .user(&user)
            .create(database)
            .await?;

        Ok(workout)
    }
}

impl PerformedWorkoutBuilder<
    NoPerformedWorkoutUserId,
    HasPerformedWorkoutTitle,
    HasPerformedWorkoutDuration,
    HasPerformedWorkoutPerformedAt,
> {
    pub async fn create(self, database: &DatabaseManager) -> MockModelResult<PerformedWorkout> {
        let user = User::mocked(database).await?;

        let workout = self.user(&user)
            .create(database)
            .await?;

        Ok(workout)
    }
}
