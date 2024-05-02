use std::net::Ipv4Addr;

pub struct ServerConfig {
    hostname: Ipv4Addr,
    port: u16,
    should_sync_exercises: bool,
}

use super::{Error, Result};

impl ServerConfig {
    pub fn new(hostname: String, port: String, should_sync_exercises: String) -> Result<Self> {
        Ok(Self {
            hostname: hostname.parse().expect("Hostname conversion to IPv4 failed."),
            port: port.parse::<u16>().map_err(|_| Error::StringParseFailure {
                parse_type: "u16",
                value: port,
            })?,
            should_sync_exercises: should_sync_exercises.to_lowercase() == "true"
        })
    }

    pub fn hostname(&self) -> Ipv4Addr {
        self.hostname.clone()
    }

    pub fn port(&self) -> u16 {
        self.port
    }

    pub fn should_sync_exercises(&self) -> bool {
        self.should_sync_exercises
    }
}
