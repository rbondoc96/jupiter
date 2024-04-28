mod builder;
#[cfg(test)]
mod tests;

use builder::*;
use super::{Error, Exercise, ModelResult};
use async_trait::async_trait;
use database::{DatabaseManager, HasRouteKey, Model, SqlxAction};
use sqlx::{FromRow, PgPool};

#[cfg(test)]
pub(crate) use builder::*;

#[derive(Clone, Debug, FromRow)]
pub struct ExerciseEquipment {
    pub id: i16,
    pub name: String,
}

#[async_trait]
impl Model for ExerciseEquipment {
    const MODEL_NAME: &'static str = "ExerciseEquipment";
    const TABLE_NAME: &'static str = "exercise_equipment";

    type PrimaryKey = i16;
    fn primary_key(&self) -> Self::PrimaryKey {
        self.id
    }
}

impl HasRouteKey for ExerciseEquipment {
    const ROUTE_KEY: &'static str = "id";
    type RouteKey = i16;

    fn route_key(&self) -> Self::RouteKey {
        self.id
    }
}

impl ExerciseEquipment {
    pub fn new() -> ExerciseEquipmentBuilder<NoName> {
        ExerciseEquipmentBuilder::new()
    }

    // region Relationships

    pub async fn exercises(&self, database: &DatabaseManager) -> ModelResult<Vec<Exercise>> {
        let results = Exercise::query()
            .select(&["*"])
            .and_where("equipment_id", "=", self.id)
            .all(database.connection())
            .await?;

        Ok(results)
    }

    // endregion

    // region Instance Methods

    pub async fn save(&mut self, database: &DatabaseManager) -> ModelResult<()> {
        let model = sqlx::query_as::<_, Self>(format!(
            "UPDATE {} SET (name) = ($1) WHERE {} = {} RETURNING *",
            Self::TABLE_NAME, Self::PRIMARY_KEY, &self.primary_key(),
        ).as_str())
            .bind(self.name.clone())
            .fetch_one(database.connection())
            .await?;

        self.name = model.name;

        Ok(())
    }

    // endregion
}
