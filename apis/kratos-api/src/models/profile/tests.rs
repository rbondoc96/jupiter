use crate::enums::{Gender, Role};
use crate::models::{Profile, User};
use crate::prelude::*;

#[sqlx::test]
async fn create_profile_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let user = User::mocked(&database).await?;

    let birthday = chrono::NaiveDate::from_ymd_opt(2000, 01, 01).unwrap();
    let profile = Profile::new()
        .user(&user)
        .birthday(birthday)
        .gender(Gender::Other)
        .create(&database)
        .await?;

    let count = Profile::count(&database).await?;

    assert_eq!(user.id, profile.user_id);
    assert_eq!(Gender::Other, profile.gender);
    assert_eq!(birthday, profile.birthday);
    assert_eq!(1, count);

    Ok(())
}

#[sqlx::test]
async fn edit_profile_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let user = User::mocked(&database).await?;

    let mut profile = Profile::new()
        .user(&user)
        .birthday(chrono::NaiveDate::from_ymd_opt(2000, 01, 01).unwrap())
        .gender(Gender::Other)
        .create(&database)
        .await?;

    let birthday = chrono::NaiveDate::from_ymd_opt(1999, 10, 03).unwrap();
    profile.birthday = birthday;
    profile.gender = Gender::NonBinary;

    profile.save(&database).await?;

    assert_eq!(birthday, profile.birthday);
    assert_eq!(Gender::NonBinary, profile.gender);

    Ok(())
}

#[sqlx::test]
async fn find_by_user_success(pool: PgPool) -> TestResult<()> {
    let database = DatabaseManager::from_pool(pool);
    let user = User::mocked(&database).await?;

    let profile = Profile::new()
        .user(&user)
        .birthday(chrono::NaiveDate::from_ymd_opt(2000, 01, 01).unwrap())
        .gender(Gender::Other)
        .create(&database)
        .await?;

    let result = Profile::find_by_user(user.id, &database).await?;

    assert_eq!(profile.id, result.id);

    Ok(())
}
