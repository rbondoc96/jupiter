#[derive(Clone, Debug, strum_macros::Display)]
pub enum ClientError {
    // Generic Errors
    Conflict,
    #[strum(serialize = "Server Error")]
    Internal,
    InvalidRequest,
    #[strum(serialize = "Network Error")]
    Network,
    NotAuthenticated,
    RequestTooLarge,
    Unavailable,
    #[strum(serialize = "Unexpected Error")]
    /// A known one-in-a-million/impossible error, but it was somehow triggered.
    Unexpected,
    #[strum(serialize = "Unknown Error")]
    /// An error that is completely unknown,
    Unknown,

    // Standard Errors
    ResourceNotFound,
    UnauthorizedAction,
    #[strum(serialize = "Validation Error")]
    Validation,

    // Specific Errors
    #[strum(serialize = "Login Failed")]
    InvalidCredentials,
    #[strum(serialize = "User Registration Failed")]
    UserRegistration,
}
