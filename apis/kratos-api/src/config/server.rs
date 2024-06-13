use axum::http::HeaderValue;
use std::net::Ipv4Addr;

pub struct ServerConfig {
    allowed_origin: HeaderValue,
    hostname: Ipv4Addr,
    port: u16,
    should_sync_exercises: bool,
}

use super::{Error, Result};

impl ServerConfig {
    pub fn new(allowed_origin: String, hostname: String, port: String, should_sync_exercises: String) -> Result<Self> {
        Ok(Self {
            allowed_origin: allowed_origin.parse::<HeaderValue>().expect("Allowed origin conversion to HeaderValue failed."),
            hostname: hostname.parse().expect("Hostname conversion to IPv4 failed."),
            port: port.parse::<u16>().map_err(|_| Error::StringParseFailure {
                parse_type: "u16",
                value: port,
            })?,
            should_sync_exercises: should_sync_exercises.to_lowercase() == "true"
        })
    }

    pub fn allowed_origin(&self) -> HeaderValue {
        self.allowed_origin.clone()
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
