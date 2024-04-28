use crate::enums::SetType;
use crate::mocks::models::MockModelResult;
use crate::models::{PerformedExercise, PerformedSet};
use crate::models::performed_set::builder::{
    HasPerformedSetExercise,
    HasPerformedSetSequenceNumber,
    HasPerformedSetType,
    HasPerformedSetUnitValue,
    NoPerformedSetExercise,
    NoPerformedSetSequenceNumber,
    NoPerformedSetType,
    NoPerformedSetUnitValue,
    PerformedSetBuilder,
};
use database::DatabaseManager;

impl PerformedSet {
    pub fn fake() -> PerformedSetBuilder<
        NoPerformedSetExercise,
        HasPerformedSetSequenceNumber,
        HasPerformedSetType,
        HasPerformedSetUnitValue,
    > {
        PerformedSetBuilder::new()
            .sequence_number(1)
            .set_type(SetType::Normal)
            .unit_value(12.5)
    }

    pub async fn mocked(database: &DatabaseManager) -> MockModelResult<PerformedSet> {
        let exercise = PerformedExercise::mocked(database).await?;

        let set = PerformedSet::fake()
            .exercise(&exercise)
            .create(database)
            .await?;

        Ok(set)
    }
}

impl PerformedSetBuilder<
    NoPerformedSetExercise,
    HasPerformedSetSequenceNumber,
    HasPerformedSetType,
    HasPerformedSetUnitValue,
> {
    pub async fn create(self, database: &DatabaseManager) -> MockModelResult<PerformedSet>{
        let exercise = PerformedExercise::mocked(database).await?;

        let set = self.exercise(&exercise)
            .create(database)
            .await?;

        Ok(set)
    }
}
