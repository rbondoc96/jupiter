use super::{
    auth::AuthenticationConfig,
    database::DatabaseConfig,
    server::ServerConfig,
    Error, Result,
};
use std::sync::OnceLock;

fn env(key: &'static str) -> Result<String> {
    std::env::var(key).map_err(|_| Error::MissingEnvironmentVariable(key))
}

pub fn config() -> &'static Config {
    static CONFIG: OnceLock<Config> = OnceLock::new();

    CONFIG.get_or_init(|| {
        dotenvy::dotenv().ok();
        Config::load().expect("Failed to load config")
    })
}

pub struct Config {
    auth: AuthenticationConfig,
    database: DatabaseConfig,
    server: ServerConfig,
}

impl Config {
    fn load() -> Result<Self> {
        Ok(Self {
            auth: AuthenticationConfig::new(
                env("ADMIN_PASSWORD")?,
                env("ADMIN_USERNAME")?,
                env("SESSION_COOKIE_MAX_AGE_SECONDS")?,
                env("SESSION_COOKIE_NAME")?,
                env("SESSION_DATABASE_TABLE_NAME")?,
                env("SESSION_SECRET")?,
            )?,
            database: DatabaseConfig::new(
                env("DATABASE_URL")?,
                env("DATABASE_MAX_POOL")?,
                env("DATABASE_MIN_POOL")?,
            )?,
            server: ServerConfig::new(
                env("SERVER_PORT")?,
                env("SHOULD_SYNC_EXERCISES")?,
            )?,
        })
    }

    pub fn auth(&self) -> &AuthenticationConfig {
        &self.auth
    }

    pub fn database(&self) -> &DatabaseConfig {
        &self.database
    }

    pub fn server(&self) -> &ServerConfig {
        &self.server
    }
}
