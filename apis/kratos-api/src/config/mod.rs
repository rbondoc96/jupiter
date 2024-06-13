mod error;
mod auth;
mod database;
mod server;

pub use error::Error;
pub(self) type Result<T> = ::core::result::Result<T, Error>;

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
    auth: auth::AuthenticationConfig,
    database: database::DatabaseConfig,
    server: server::ServerConfig,
}

impl Config {
    fn load() -> Result<Self> {
        Ok(Self {
            auth: auth::AuthenticationConfig::new(
                env("ADMIN_PASSWORD")?,
                env("ADMIN_USERNAME")?,
                env("SESSION_COOKIE_MAX_AGE_SECONDS")?,
                env("SESSION_COOKIE_NAME")?,
                env("SESSION_DATABASE_TABLE_NAME")?,
                env("SESSION_SECRET")?,
            )?,
            database: database::DatabaseConfig::new(
                env("DATABASE_URL")?,
                env("DATABASE_MAX_POOL")?,
                env("DATABASE_MIN_POOL")?,
            )?,
            server: server::ServerConfig::new(
                env("APP_URL")?,
                env("SERVER_HOSTNAME").unwrap_or(String::from("127.0.0.1")),
                env("SERVER_PORT")?,
                env("SHOULD_SYNC_EXERCISES").unwrap_or(String::from("false")),
            )?,
        })
    }

    pub fn auth(&self) -> &auth::AuthenticationConfig {
        &self.auth
    }

    pub fn database(&self) -> &database::DatabaseConfig {
        &self.database
    }

    pub fn server(&self) -> &server::ServerConfig {
        &self.server
    }
}
