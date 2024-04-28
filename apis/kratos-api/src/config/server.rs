pub struct ServerConfig {
    port: u16,
    should_sync_exercises: bool,
}

use super::{Error, Result};

impl ServerConfig {
    pub fn new(port: String, should_sync_exercises: String) -> Result<Self> {
        Ok(Self {
            port: port.parse::<u16>().map_err(|_| Error::StringParseFailure {
                parse_type: "u16",
                value: port,
            })?,
            should_sync_exercises: should_sync_exercises.to_lowercase() == "true"
        })
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub fn should_sync_exercises(&self) -> bool {
        self.should_sync_exercises
    }
}
