use crate::http::Context;
use crate::models::User;
use axum::extract::State;
use axum::http::{Method, Request, Uri};
use axum::http::request::Parts;
use axum::middleware::Next;
use axum::response::{IntoResponse, Json, Response};
use axum::RequestPartsExt;
use axum_session::SessionPgSession as Session;
use database::{DatabaseManager, Model};
use serde_json::json;

pub(self) use crate::http::errors::Error;
pub(self) type Result<TValue> = ::core::result::Result<TValue, crate::http::Error>;

pub async fn context_resolver<TBody>(
    State(database): State<DatabaseManager>,
    session: Session,
    mut request: Request<TBody>,
    next: Next<TBody>,
) -> Result<Response> {
    println!("->> {:<12} - context_resolver", "CONTEXT_RESOLVER");

    let user_id = session.get::<i16>("user_id");

    if user_id.is_none() {
        return Ok(next.run(request).await);
    }

    let user_id = user_id.unwrap();

    eprintln!("context_resolver: {}", user_id);

    let matching_session_count =
        match sqlx::query_as::<_, (String,)>("SELECT id FROM sessions where id = $1")
            .bind(session.get_session_id().await.to_string())
            .fetch_all(database.connection())
            .await
        {
            Ok(row_count) => row_count.len(),
            Err(_) => 0,
        };

    if matching_session_count != 1 {
        session.clear();
        return Ok(next.run(request).await);
    }

    match User::find_by_pk(user_id, &database).await {
        Ok(user) => {
            request.extensions_mut().insert(Context::new(user));
            Ok(next.run(request).await)
        },
        Err(err) => {
            eprintln!("{}", err);
            session.clear();
            Err(Error::NoMatchingSessionUserFound)?
        }
    }
}

// pub async fn response_mapper(
//     context: Option<Context>,
//     session: Session,
//     uri: Uri,
//     method: Method,
//     response: Response,
// ) -> Response {
//     println!("->> {:<12} - response_mapper", "RES_MAPPER");
//
//     let error = response.extensions().get::<Error>();
//
//     let error_context = error.map(|err| err.to_error_context());
//     let client_error = error_context.as_ref().map(|context| context.client_error());
//     let error_response = error_context.map(|context| context.into_response());
//
//     // Logger::log_request(context, method, uri, error, client_error).await;
//
//     error_response.unwrap_or(response)
// }

pub async fn require_auth<TBody>(
    context: Result<Context>,
    request: Request<TBody>,
    next: Next<TBody>,
) -> Result<Response> {
    println!("->> {:<12} - require_auth", "RES_MAPPER");

    context?;

    Ok(next.run(request).await)
}
