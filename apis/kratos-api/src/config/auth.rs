pub struct AuthenticationConfig {
    admin_password: String,
    admin_username: String,
    session_cookie_max_age_seconds: i64,
    session_cookie_name: String,
    session_database_table_name: String,
    session_secret: String,
}

use super::{Error, Result};

impl AuthenticationConfig {
    pub fn new(
        admin_password: String,
        admin_username: String,
        session_cookie_max_age_seconds: String,
        session_cookie_name: String,
        session_database_table_name: String,
        session_secret: String,
    ) -> Result<Self> {
        Ok(Self {
            admin_password,
            admin_username,
            session_cookie_max_age_seconds: session_cookie_max_age_seconds.parse::<i64>().map_err(
                |_| Error::StringParseFailure {
                    parse_type: "i64",
                    value: session_cookie_max_age_seconds,
                },
            )?,
            session_cookie_name,
            session_database_table_name,
            session_secret,
        })
    }

    pub fn admin_password(&self) -> String {
        self.admin_password.clone()
    }

    pub fn admin_username(&self) -> String {
        self.admin_username.clone()
    }

    pub fn session_cookie_max_age_seconds(&self) -> i64 {
        self.session_cookie_max_age_seconds
    }

    pub fn session_cookie_name(&self) -> &str {
        self.session_cookie_name.as_ref()
    }

    pub fn session_database_table_name(&self) -> &str {
        self.session_database_table_name.as_ref()
    }

    pub fn session_secret(&self) -> &str {
        self.session_secret.as_ref()
    }
}
