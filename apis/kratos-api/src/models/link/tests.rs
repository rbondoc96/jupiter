use crate::prelude::*;
use crate::enums::{LinkFormat, LinkType, Table};
use crate::models::{Exercise, Link, Muscle, Profile};

#[sqlx::test]
async fn create_link_success(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let model = Exercise::mocked(&database).await?;

    let count = Link::count(&database).await?;

    // Act
    let link = Link::new()
        .link_type(LinkType::Image)
        .format(LinkFormat::Png)
        .label("My label")
        .description(Some("My description"))
        .src("My source")
        .model(Table::Exercises, model.id)
        .create(&database)
        .await?;

    // Assert
    assert_eq!(count + 1, Link::count(&database).await?);
    assert_eq!(LinkType::Image, link.link_type);
    assert_eq!(LinkFormat::Png, link.format);
    assert_eq!("My label", link.label);
    assert_some_eq("My description", link.description);
    assert_eq!("My source", link.src);
    assert_eq!(Table::Exercises, link.model_name);
    assert_eq!(model.id, link.model_id);

    Ok(())
}

#[sqlx::test]
async fn edit_link_success(pool: PgPool) -> TestResult<()> {
    // Arrange
    let database = DatabaseManager::from_pool(pool);
    let model = Exercise::mocked(&database).await?;
    let mut link = Link::fake()
        .model(Table::Muscles, Muscle::mocked(&database).await?.id)
        .link_type(LinkType::Image)
        .format(LinkFormat::Png)
        .label("My Label")
        .description(Some("My description"))
        .src("My src")
        .create(&database)
        .await?;

    // Act
    link.model_name = Table::Exercises;
    link.model_id = model.id;
    link.link_type = LinkType::Webpage;
    link.format = LinkFormat::Html;
    link.label = "A new label".to_string();
    link.description = Some("A new description".to_string());
    link.src = "A new source".to_string();

    link.save(&database).await?;

    // Assert
    assert_eq!(Table::Exercises, link.model_name);
    assert_eq!(model.id, link.model_id);
    assert_eq!(LinkType::Webpage, link.link_type);
    assert_eq!(LinkFormat::Html, link.format);
    assert_eq!("A new label", link.label);
    assert_some_eq("A new description", link.description);
    assert_eq!("A new source", link.src);

    Ok(())
}
