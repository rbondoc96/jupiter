use crate::models::{ModelResult, Muscle, MuscleGroup};
use database::{DatabaseManager, Model};

// region Type States

#[derive(Default)]
pub struct NoGroupId;
#[derive(Default)]
pub struct GroupId(i16);

#[derive(Default)]
pub struct NoName;
#[derive(Default)]
pub struct Name(String);

// endregion

#[derive(Default)]
pub struct MuscleBuilder<G, N> {
    group_id: G,
    name: N,
    parent_id: Option<i16>,
    simple_name: Option<String>,
    description: Option<String>,
    image_source: Option<String>,
}

impl MuscleBuilder<NoGroupId, NoName> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<G, N> MuscleBuilder<G, N> {
    pub fn group_id(self, id: i16) -> MuscleBuilder<GroupId, N> {
        MuscleBuilder {
            group_id: GroupId(id),
            name: self.name,
            parent_id: self.parent_id,
            simple_name: self.simple_name,
            description: self.description,
            image_source: self.image_source,
        }
    }

    pub fn group(self, group: &MuscleGroup) -> MuscleBuilder<GroupId, N> {
        MuscleBuilder {
            group_id: GroupId(group.id),
            name: self.name,
            parent_id: self.parent_id,
            simple_name: self.simple_name,
            description: self.description,
            image_source: self.image_source,
        }
    }

    pub fn name(self, name: impl Into<String>) -> MuscleBuilder<G, Name> {
        MuscleBuilder {
            group_id: self.group_id,
            name: Name(name.into()),
            parent_id: self.parent_id,
            simple_name: self.simple_name,
            description: self.description,
            image_source: self.image_source,
        }
    }

    pub fn parent_id(mut self, id: Option<i16>) -> Self {
        self.parent_id = id;
        self
    }

    pub fn parent(mut self, parent: Option<&Muscle>) -> Self {
        self.parent_id = parent.map(|p| p.id.clone());
        self
    }

    pub fn simple_name(mut self, name: Option<impl Into<String>>) -> Self {
        self.simple_name = name.map(|n| n.into());
        self
    }

    pub fn description(mut self, description: Option<impl Into<String>>) -> Self {
        self.description = description.map(|d| d.into());
        self
    }

    pub fn image_source(mut self, source: Option<impl Into<String>>) -> Self {
        self.image_source = source.map(|s| s.into());
        self
    }
}

impl MuscleBuilder<GroupId, Name> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<Muscle> {
        let mut model = sqlx::query_as::<_, Muscle>(format!(
            "INSERT INTO {} (group_id, parent_id, name, simple_name, description, image_source) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
            Muscle::TABLE_NAME,
        ).as_str())
            .bind(self.group_id.0)
            .bind(self.parent_id)
            .bind(self.name.0)
            .bind(self.simple_name)
            .bind(self.description)
            .bind(self.image_source)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
