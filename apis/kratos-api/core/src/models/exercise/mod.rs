mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, ExerciseEquipment, ExerciseInstruction, ExerciseMuscleMap, Muscle, MuscleGroup, ModelResult};
use crate::prelude::*;
use crate::enums::{ExerciseForce, ExerciseMechanic, ExerciseMuscleTarget, ExerciseType, ExerciseMeasurement};
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model};
use serde::Deserialize;
use sqlx::{postgres::PgPool, FromRow};

#[cfg(test)]
pub(crate) use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct Exercise {
    pub id: i16,
    pub ulid: String,
    pub external_id: Option<i16>,
    #[sqlx(rename = "type")]
    pub exercise_type: ExerciseType,
    pub target_muscle_group_id: Option<i16>,
    pub equipment_id: Option<i16>,
    pub name: String,
    pub name_alternative: Option<String>,
    pub description: Option<String>,
    pub mechanic: Option<ExerciseMechanic>,
    pub force: Option<ExerciseForce>,
    pub measurement: Option<ExerciseMeasurement>,
    pub created_at: ISO8601DateTimeUTC,
    pub updated_at: ISO8601DateTimeUTC,
}

#[async_trait]
impl Model for Exercise {
    const MODEL_NAME: &'static str = "Exercise";
    const TABLE_NAME: &'static str = "exercises";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for Exercise {
    const ROUTE_KEY: &'static str = "ulid";
    type RouteKey = String;

    fn route_key(&self) -> Self::RouteKey {
        self.ulid.clone()
    }
}

impl Exercise {
    pub fn new() -> ExerciseBuilder<NoType, NoName> {
        ExerciseBuilder::new()
    }

    // region Relationships

    pub async fn equipment(&self, database: &DatabaseManager) -> ModelResult<Option<ExerciseEquipment>> {
        let equipment_id = self.equipment_id;

        if equipment_id.is_none() {
            return Ok(None);
        }

        let equipment = ExerciseEquipment::find_by_pk(
            equipment_id.unwrap(),
            database,
        ).await?;

        Ok(Some(equipment))
    }

    pub async fn target_muscle_group(&self, database: &DatabaseManager) -> ModelResult<Option<MuscleGroup>> {
        let group_id = self.target_muscle_group_id;

        if group_id.is_none() {
            return Ok(None);
        }

        let group = MuscleGroup::find_by_pk(
            group_id.unwrap().into(),
            database,
        )
        .await?;

        Ok(Some(group))
    }

    fn measurement(&self) -> ModelResult<ExerciseMeasurement> {
        self.measurement.clone().ok_or(Error::MissingMeasurement("Measurement is missing".to_string()))
    }

    async fn muscles(&self, target: ExerciseMuscleTarget, database: &DatabaseManager) -> ModelResult<Vec<Muscle>> {
        let results = sqlx::query_as::<_, Muscle>(
            "SELECT muscles.* FROM muscles INNER JOIN exercises_muscles ON muscles.id = exercises_muscles.muscle_id WHERE exercises_muscles.exercise_id = $1 AND exercises_muscles.target = $2",
        )
        .bind(self.id)
        .bind(target)
        .fetch_all(database.connection())
        .await?;

        Ok(results)
    }

    pub async fn primary_muscles(&self, database: &DatabaseManager) -> ModelResult<Vec<Muscle>> {
        self.muscles(ExerciseMuscleTarget::Primary, database).await
    }

    pub async fn secondary_muscles(&self, database: &DatabaseManager) -> ModelResult<Vec<Muscle>> {
        self.muscles(ExerciseMuscleTarget::Secondary, database).await
    }

    pub async fn tertiary_muscles(&self, database: &DatabaseManager) -> ModelResult<Vec<Muscle>> {
        self.muscles(ExerciseMuscleTarget::Tertiary, database).await
    }

    pub async fn instructions(&self, database: &DatabaseManager) -> ModelResult<Vec<ExerciseInstruction>> {
        let instructions = ExerciseInstruction::query()
            .select(&["*"])
            .and_where("exercise_id", "=", self.id)
            .order_by("sequence_number", true)
            .all(database.connection())
            .await?;

        Ok(instructions)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (external_id, type, target_muscle_group_id, name, name_alternative, description, equipment_id, mechanic, force, measurement, updated_at) = ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.external_id)
            .bind(self.exercise_type.clone())
            .bind(self.target_muscle_group_id)
            .bind(self.name.clone())
            .bind(self.name_alternative.clone())
            .bind(self.description.clone())
            .bind(self.equipment_id)
            .bind(self.mechanic.clone())
            .bind(self.force.clone())
            .bind(self.measurement.clone())
            .bind(chrono::Utc::now())
            .fetch_one(database.connection())
            .await?;

        self.external_id = model.external_id;
        self.exercise_type = model.exercise_type;
        self.target_muscle_group_id = model.target_muscle_group_id;
        self.name = model.name;
        self.name_alternative = model.name_alternative;
        self.description = model.description;
        self.equipment_id = model.equipment_id;
        self.mechanic = model.mechanic;
        self.force = model.force;
        self.measurement = model.measurement;
        self.updated_at = model.updated_at;

        Ok(())
    }

    // endregion
}
