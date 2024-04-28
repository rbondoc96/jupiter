mod json;
mod error;

pub use error::ErrorResponse;
pub use json::JsonResponse;

pub type ResponseResult = Result<JsonResponse, ErrorResponse>;
