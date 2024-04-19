use crate::enums::Role;
use crate::models::{Profile, User};
use crate::prelude::*;
use crate::utils::crypt::decrypt_and_verify;

#[sqlx::test]
async fn create_user_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let user = User::new()
        .name("Test", "User")
        .email("test_user@example.com")
        .role(Role::User)
        .password("password")
        .create(&database)
        .await?;

    let count = User::count(&database).await?;

    assert_eq!("Test", user.first_name);
    assert_eq!("User", user.last_name);
    assert_eq!("test_user@example.com", user.email);
    assert!(decrypt_and_verify("password", user.password.as_ref())?);
    assert_eq!(Role::User, user.role);
    assert_eq!(1, count);

    Ok(())
}

#[sqlx::test]
async fn edit_user_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let mut user = User::mocked(&database).await?;

    user.email = "different_email@example.com".to_string();
    user.role = Role::Admin;
    user.first_name = "Bob".to_string();
    user.last_name = "Smith".to_string();
    user.password = "different".to_string();

    user.save(&database).await?;

    assert_eq!("Bob", user.first_name);
    assert_eq!("Smith", user.last_name);
    assert_eq!("different_email@example.com", user.email);
    assert_eq!("different", user.password);
    assert_eq!(Role::Admin, user.role);

    Ok(())
}

#[sqlx::test]
async fn find_by_email_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let user = User::new()
        .name("Test", "User")
        .email("test_user@example.com")
        .role(Role::User)
        .password("password")
        .create(&database)
        .await?;

    let result = User::find_by_email("test_user@example.com".to_string(), &database).await?;

    assert_eq!(result.id, user.id);

    Ok(())
}

#[sqlx::test]
async fn exists_with_email_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let user = User::new()
        .name("Test", "User")
        .email("test_user@example.com")
        .role(Role::User)
        .password("password")
        .create(&database)
        .await?;

    let exists = User::exists_with_email("test_user@example.com".to_string(), &database).await?;

    assert!(exists);

    Ok(())
}

#[sqlx::test]
async fn updates_last_logged_in(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let start_time = chrono::Utc::now();

    let mut user = User::mocked(&database).await?;

    user.update_last_logged_in(&database).await?;

    assert!(user.last_logged_in_at.is_some());
    assert!(user.last_logged_in_at.unwrap() > start_time);

    Ok(())
}

#[sqlx::test]
async fn cannot_create_user_with_duplicate_email(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);

    let user = User::new()
        .name("Test", "User")
        .email("test_user@example.com")
        .role(Role::User)
        .password("password")
        .create(&database)
        .await?;

    let result = User::new()
        .name("Test", "User")
        .email("test_user@example.com")
        .role(Role::User)
        .password("password")
        .create(&database)
        .await;

    assert_eq!(true, result.is_err());

    Ok(())
}
