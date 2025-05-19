export class AuthError extends Error {
  constructor(
    message: string,
    public code: "USER_NOT_FOUND" | "INVALID_PASSWORD" | "UNKNOWN_ERROR"
  ) {
    super(message);
    this.name = "AuthError";
  }
}
