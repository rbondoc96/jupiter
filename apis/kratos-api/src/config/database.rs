pub struct DatabaseConfig {
    max_pool: u32,
    min_pool: u32,
    url: String,
}

use super::{Error, Result};

impl DatabaseConfig {
    pub fn new(url: String, max_pool: String, min_pool: String) -> Result<Self> {
        Ok(Self {
            url,
            max_pool: max_pool
                .parse::<u32>()
                .map_err(|_| Error::StringParseFailure {
                    parse_type: "u32",
                    value: max_pool,
                })?,
            min_pool: min_pool
                .parse::<u32>()
                .map_err(|_| Error::StringParseFailure {
                    parse_type: "u32",
                    value: min_pool,
                })?,
        })
    }

    pub fn url(&self) -> &str {
        self.url.as_ref()
    }

    pub fn max_connections(&self) -> u32 {
        self.max_pool
    }

    pub fn min_connections(&self) -> u32 {
        self.min_pool
    }
}
