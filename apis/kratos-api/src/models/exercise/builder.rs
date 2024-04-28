use crate::enums::{ExerciseForce, ExerciseMechanic, ExerciseType, ExerciseMeasurement};
use crate::models::{Error, Exercise, ExerciseEquipment, ModelResult, MuscleGroup};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoType;
#[derive(Default)]
pub struct Type(ExerciseType);

#[derive(Default)]
pub struct NoName;
#[derive(Default)]
pub struct Name(String);

// endregion

#[derive(Default)]
pub struct ExerciseBuilder<T, N> {
    exercise_type: T,
    name: N,
    name_alternative: Option<String>,
    external_id: Option<i16>,
    target_muscle_group_id: Option<i16>,
    equipment_id: Option<i16>,
    mechanic: Option<ExerciseMechanic>,
    force: Option<ExerciseForce>,
    measurement: Option<ExerciseMeasurement>,
    description: Option<String>,
}

impl ExerciseBuilder<NoType, NoName> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<T, N> ExerciseBuilder<T, N> {
    pub fn name(self, name: impl Into<String>) -> ExerciseBuilder<T, Name> {
        ExerciseBuilder {
            exercise_type: self.exercise_type,
            name: Name(name.into()),
            name_alternative: self.name_alternative,
            external_id: self.external_id,
            target_muscle_group_id: self.target_muscle_group_id,
            equipment_id: self.equipment_id,
            mechanic: self.mechanic,
            force: self.force,
            measurement: self.measurement,
            description: self.description,
        }
    }

    pub fn exercise_type(self, exercise_type: ExerciseType) -> ExerciseBuilder<Type, N> {
        ExerciseBuilder {
            exercise_type: Type(exercise_type),
            name: self.name,
            name_alternative: self.name_alternative,
            external_id: self.external_id,
            target_muscle_group_id: self.target_muscle_group_id,
            equipment_id: self.equipment_id,
            mechanic: self.mechanic,
            force: self.force,
            measurement: self.measurement,
            description: self.description,
        }
    }

    pub fn external_id(mut self, id: Option<i16>) -> Self {
        self.external_id = id;
        self
    }

    pub fn target_muscle_group_id(mut self, id: Option<i16>) -> Self {
        self.target_muscle_group_id = id;
        self
    }

    pub fn target_muscle_group(mut self, group: &MuscleGroup) -> Self {
        self.target_muscle_group_id = Some(group.id);
        self
    }

    pub fn name_alternative(mut self, name: Option<String>) -> Self {
        self.name_alternative = name;
        self
    }

    pub fn description(mut self, description: Option<String>) -> Self {
        self.description = description;
        self
    }

    pub fn equipment_id(mut self, id: Option<i16>) -> Self {
        self.equipment_id = id;
        self
    }

    pub fn equipment(mut self, equipment: &ExerciseEquipment) -> Self {
        self.equipment_id = Some(equipment.id);
        self
    }

    pub fn mechanic(mut self, mechanic: Option<ExerciseMechanic>) -> Self {
        self.mechanic = mechanic;
        self
    }

    pub fn force(mut self, force: Option<ExerciseForce>) -> Self {
        self.force = force;
        self
    }

    pub fn measurement(mut self, measurement: Option<ExerciseMeasurement>) -> Self {
        self.measurement = measurement;
        self
    }
}

impl ExerciseBuilder<Type, Name> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<Exercise> {
        let model = sqlx::query_as::<_, Exercise>(format!(
            "INSERT INTO {} (external_id, type, target_muscle_group_id, name, name_alternative, description, equipment_id, mechanic, force, measurement) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *",
            Exercise::TABLE_NAME,
        ).as_str())
            .bind(self.external_id)
            .bind(self.exercise_type.0)
            .bind(self.target_muscle_group_id)
            .bind(self.name.0)
            .bind(self.name_alternative)
            .bind(self.description)
            .bind(self.equipment_id)
            .bind(self.mechanic)
            .bind(self.force)
            .bind(self.measurement)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
