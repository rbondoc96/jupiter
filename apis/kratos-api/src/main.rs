#![allow(unused)]
#[macro_use]
extern crate dotenvy_macro;
#[macro_use]
extern crate rust_i18n;

#[cfg(test)]
pub(crate) mod mocks;

mod actions;
mod enums;
mod error;
mod http;
mod utilities;
// mod logger;
mod models;
mod prelude;
mod config;
mod types;

#[cfg(test)]
mod tests;

use axum::Server;
use axum_server::tls_rustls::RustlsConfig;
use database::DatabaseManager;
use config::config;
use log::Level;
use std::net::SocketAddr;
use std::path::PathBuf;
use tracing_subscriber::filter::EnvFilter;

i18n!("lang", fallback = "en");

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error + Send + Sync + 'static>> {
    tracing_subscriber::fmt()
        .without_time()
        .with_target(false)
        .with_env_filter(EnvFilter::from_default_env())
        .init();

    let router = crate::http::init().await?;
    let server_config = config().server();
    let server_address = SocketAddr::from((
        server_config.hostname(),
        server_config.port()
    ));
    let tls_config = RustlsConfig::from_pem_file(
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("certs")
            .join("localhost.pem"),
        PathBuf::from(env!("CARGO_MANIFEST_DIR"))
            .join("certs")
            .join("localhost-key.pem"),
    ).await.expect("Failed to package TLS certs.");

    let server = axum_server::bind_rustls(server_address.clone(), tls_config)
        .serve(router.into_make_service());

    tracing::debug!("Server listening at http://{}", &server_address);

    if let Err(e) = server.await {
        tracing::error!("Server error: {}", e);
        std::process::abort();
    }

    Ok(())
}
