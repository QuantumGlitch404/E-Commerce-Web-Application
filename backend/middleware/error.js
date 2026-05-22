import ApiError from '../utils/ApiError.js';

/**
 * Global Error Handling Middleware
 * Catches all errors passed via next(error) and sends
 * consistent, formatted error responses.
 * Handles specific MongoDB/Mongoose errors gracefully.
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // ─── MongoDB CastError (Invalid ObjectId) ────────────────
  if (err.name === 'CastError') {
    const message = `Resource not found with id: ${err.value}`;
    error = new ApiError(message, 404);
  }

  // ─── MongoDB Duplicate Key Error ─────────────────────────
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `An account with that ${field} already exists`;
    error = new ApiError(message, 400);
  }

  // ─── Mongoose Validation Error ───────────────────────────
  if (err.name === 'ValidationError') {
    const messages = Object.values(err.errors).map((val) => val.message);
    const message = messages.join('. ');
    error = new ApiError(message, 400);
  }

  // ─── JWT Errors ──────────────────────────────────────────
  if (err.name === 'JsonWebTokenError') {
    error = new ApiError('Invalid token. Please log in again.', 401);
  }

  if (err.name === 'TokenExpiredError') {
    error = new ApiError('Your session has expired. Please log in again.', 401);
  }

  // ─── Multer File Size Error ──────────────────────────────
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = new ApiError('File too large. Maximum size is 5MB.', 400);
  }

  // ─── Send Response ──────────────────────────────────────
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: err.stack,
      error: err,
    }),
  });
};

export default errorHandler;
