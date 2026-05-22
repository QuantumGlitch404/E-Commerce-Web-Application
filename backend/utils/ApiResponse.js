/**
 * Standardized API Response class
 * Ensures all API responses follow a consistent format:
 * { success, message, data, pagination }
 */
class ApiResponse {
  /**
   * Send a success response
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Success message
   * @param {object|array} data - Response payload
   * @param {object} pagination - Pagination metadata (optional)
   */
  static success(res, statusCode, message, data = null, pagination = null) {
    const response = {
      success: true,
      message,
    };

    if (data !== null) {
      response.data = data;
    }

    if (pagination !== null) {
      response.pagination = pagination;
    }

    return res.status(statusCode).json(response);
  }

  /**
   * Send an error response
   * @param {object} res - Express response object
   * @param {number} statusCode - HTTP status code
   * @param {string} message - Error message
   * @param {array} errors - Validation errors (optional)
   */
  static error(res, statusCode, message, errors = null) {
    const response = {
      success: false,
      message,
    };

    if (errors !== null) {
      response.errors = errors;
    }

    return res.status(statusCode).json(response);
  }
}

export default ApiResponse;
