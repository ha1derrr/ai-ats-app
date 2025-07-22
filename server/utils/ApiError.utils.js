export class ApiError extends Error {
  constructor(statusCode, message) {
    super(message);
    this.statusCode = statusCode;
    // Captures the stack trace and points it to where the error originated
    Error.captureStackTrace(this, this.constructor);
  }
}
