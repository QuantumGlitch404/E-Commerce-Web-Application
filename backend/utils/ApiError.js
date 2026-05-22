/**
 * Custom API Error class
 * Extends the native Error class for consistent error handling
 * across the application. Includes HTTP status codes and
 * operational error flagging.
 */
class ApiError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
