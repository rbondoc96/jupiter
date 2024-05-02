ARG RUST_VERSION=1.77.1
ARG APP_NAME=kratos_api

FROM rust:${RUST_VERSION}-slim-bullseye AS build
ARG APP_NAME
WORKDIR /app

# Install host build dependencies.
# pkg-config is needed - Rust compiler warning when not included.
RUN apt-get update && \
    apt-get install -y pkg-config openssl musl-dev git libssl-dev curl

# Build the application.
# Leverage a cache mount to /usr/local/cargo/registry/
# for downloaded dependencies, a cache mount to /usr/local/cargo/git/db
# for git repository dependencies, and a cache mount to /app/target/ for
# compiled dependencies which will speed up subsequent builds.
# Leverage a bind mount to the src directory to avoid having to copy the
# source code into the container. Once built, copy the executable to an
# output directory before the cache mounted /app/target is unmounted.
RUN --mount=type=bind,source=.cargo,target=.cargo \
    --mount=type=bind,source=.env,target=.env \
    --mount=type=bind,source=database,target=database \
    --mount=type=bind,source=lang,target=lang \
    --mount=type=bind,source=src,target=src \
    --mount=type=bind,source=Cargo.toml,target=Cargo.toml \
    --mount=type=bind,source=Cargo.lock,target=Cargo.lock \
    --mount=type=cache,target=/app/target/ \
    --mount=type=cache,target=/usr/local/cargo/git/db \
    --mount=type=cache,target=/usr/local/cargo/registry/ \
    cargo build --locked --release && \
    cp ./target/release/$APP_NAME /bin/server

################################################
#                                              #
#      Build Stage for Local Development       #
#                                              #
################################################

FROM rust:${RUST_VERSION}-slim-bullseye AS local

USER root
WORKDIR /code

RUN apt-get update && \
    apt-get install -y pkg-config openssl musl-dev git libssl-dev curl

RUN cargo install cargo-watch

EXPOSE 4000

ENTRYPOINT ["cargo", "watch", "-q", "-c", "-w", "src", "-w", "database/src", "-w", ".env", "--ignore", "src/tests", "-x", "'run'"]

################################################
#                                              #
#           Build Stage for Production         #
#                                              #
################################################

################################################################################
# Create a new stage for running the application that contains the minimal
# runtime dependencies for the application. This often uses a different base
# image from the build stage where the necessary files are copied from the build
# stage.
FROM debian:bullseye-slim AS deploy

WORKDIR /app

# Copy the executable from the "build" stage.
COPY --from=build /bin/server server

# Create a non-privileged user that the app will run under.
# See https://docs.docker.com/go/dockerfile-user-best-practices/
ARG UID=10001
RUN adduser \
    --disabled-password \
    --gecos "" \
    --home "/nonexistent" \
    --shell "/sbin/nologin" \
    --no-create-home \
    --uid "${UID}" \
    appuser

RUN chown -R appuser:appuser .
RUN chmod -R 755 .

USER appuser

EXPOSE 4000

CMD ["/app/server"]
