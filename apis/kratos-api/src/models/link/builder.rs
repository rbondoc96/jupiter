use crate::enums::{LinkFormat, LinkType, Table};
use crate::models::{Link, ModelResult};
use database::{DatabaseManager, Model};

// region Builder type states

#[derive(Default)]
pub struct NoModelData;
#[derive(Default)]
pub struct ModelData(Table, i16);

#[derive(Default)]
pub struct NoType;
#[derive(Default)]
pub struct Type(LinkType);

#[derive(Default)]
pub struct NoFormat;
#[derive(Default)]
pub struct Format(LinkFormat);

#[derive(Default)]
pub struct NoLabel;
#[derive(Default)]
pub struct Label(String);

#[derive(Default)]
pub struct NoSrc;
#[derive(Default)]
pub struct Src(String);

// endregion

#[derive(Default)]
pub struct LinkBuilder<M, T, F, L, S> {
    model: M,
    link_type: T,
    format: F,
    label: L,
    src: S,
    description: Option<String>,
}

impl LinkBuilder<NoModelData, NoType, NoFormat, NoLabel, NoSrc> {
    pub fn new() -> Self {
        Self::default()
    }
}

impl<M, T, F, L, S> LinkBuilder<M, T, F, L, S> {
    pub fn model(self, model_name: Table, model_id: i16) -> LinkBuilder<ModelData, T, F, L, S> {
        LinkBuilder {
            model: ModelData(model_name, model_id),
            link_type: self.link_type,
            format: self.format,
            label: self.label,
            src: self.src,
            description: self.description,
        }
    }

    pub fn link_type(self, link_type: LinkType) -> LinkBuilder<M, Type, F, L, S> {
        LinkBuilder {
            model: self.model,
            link_type: Type(link_type),
            format: self.format,
            label: self.label,
            src: self.src,
            description: self.description,
        }
    }

    pub fn format(self, format: LinkFormat) -> LinkBuilder<M, T, Format, L, S> {
        LinkBuilder {
            model: self.model,
            link_type: self.link_type,
            format: Format(format),
            label: self.label,
            src: self.src,
            description: self.description,
        }
    }

    pub fn label(self, label: impl Into<String>) -> LinkBuilder<M, T, F, Label, S> {
        LinkBuilder {
            model: self.model,
            link_type: self.link_type,
            format: self.format,
            label: Label(label.into()),
            src: self.src,
            description: self.description,
        }
    }

    pub fn src(self, src: impl Into<String>) -> LinkBuilder<M, T, F, L, Src> {
        LinkBuilder {
            model: self.model,
            link_type: self.link_type,
            format: self.format,
            label: self.label,
            src: Src(src.into()),
            description: self.description,
        }
    }

    pub fn description(mut self, description: Option<impl Into<String>>) -> Self {
        self.description = description.map(|d| d.into());
        self
    }
}

impl LinkBuilder<ModelData, Type, Format, Label, Src> {
    pub async fn create(self, database: &DatabaseManager) -> ModelResult<Link> {
        let model = sqlx::query_as::<_, Link>(format!(
            "INSERT INTO {} (model_name, model_id, type, format, label, description, src) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *",
            Link::TABLE_NAME,
        ).as_str())
            .bind(self.model.0)
            .bind(self.model.1)
            .bind(self.link_type.0)
            .bind(self.format.0)
            .bind(self.label.0)
            .bind(self.description)
            .bind(self.src.0)
            .fetch_one(database.connection())
            .await?;

        Ok(model)
    }
}
