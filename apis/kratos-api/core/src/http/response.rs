use axum::http::StatusCode;
use axum::response::{IntoResponse, Json, Response};
use database::DatabaseManager;
use serde::{Deserialize, Serialize};
use serde_json::{json, Value};

#[derive(Serialize)]
pub struct PaginatedResponseMeta {
    current_page: u8,
    last_page: u8,
    per_page: u8,
    total: usize,
}

pub struct JsonResponse {
    body: Value,
    code: StatusCode,
    meta: Option<PaginatedResponseMeta>,
    success: bool,
}

#[derive(Serialize)]
pub struct ApiErrorContext {
    pub name: String,
    pub message: String,
    #[serde(skip_serializing_if = "Option::is_none")]
    pub errors: Option<std::collections::HashMap<String, Vec<String>>>,
}

impl JsonResponse {
    // region Static Methods

    fn new(
        body: Value,
        code: StatusCode,
        success: bool,
    ) -> Self {
        Self {
            body,
            code,
            meta: None,
            success,
        }
    }

    pub fn error(error: super::Error) -> Self {
        Self::new(
            json!(ApiErrorContext {
                name: error.client().to_string(),
                message: error.message(),
                errors: error.messages(),
            }),
            error.code(),
            false,
        )
    }

    pub fn success(code: StatusCode) -> Self {
        Self::new(
            json!(None::<()>),
            code,
            true,
        )
    }

    pub fn ok() -> Self {
        Self::success(StatusCode::OK)
    }

    pub fn created() -> Self {
        Self::success(StatusCode::CREATED)
    }

    pub fn no_content() -> Self {
        Self::success(StatusCode::NO_CONTENT)
    }

    // endregion

    // region Instance Accessor Methods

    pub fn code(&self) -> StatusCode {
        self.code
    }

    // endregion

    // region Instance Mutator Methods

    pub fn with_data(mut self, data: impl Serialize) -> Self {
        self.body = json!(data);
        self
    }

    pub fn with_pagination(mut self, total_items: usize, current_page: u8, per_page: u8) -> Self {
        let last_page = (total_items as f64 / per_page as f64).ceil() as u8;

        self.meta = Some(PaginatedResponseMeta {
            current_page,
            last_page,
            per_page,
            total: total_items,
        });

        self
    }

    // endregion
}

impl IntoResponse for JsonResponse {
    fn into_response(self) -> Response {
        if self.code == StatusCode::NO_CONTENT {
            return self.code.into_response()
        }

        let json = match (self.meta.is_none() ,self.success) {
            (true, true) => json!({
                "success": true,
                "data": self.body,
            }),
            (false, true) => json!({
                "success": true,
                "data": self.body,
                "meta": self.meta,
            }),
            (_, false) => json!({
                "success": false,
                "error": self.body,
            }),
        };

        (self.code, Json(json)).into_response()
    }
}
