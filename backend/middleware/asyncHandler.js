/**
 * Async Handler Wrapper
 * Wraps async route handlers to automatically catch errors
 * and pass them to the Express error handling middleware.
 * Eliminates the need for try-catch blocks in every controller.
 *
 * @param {Function} fn - Async controller function
 * @returns {Function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

export default asyncHandler;
