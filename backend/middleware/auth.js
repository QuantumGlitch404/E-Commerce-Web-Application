import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import ApiError from '../utils/ApiError.js';
import asyncHandler from './asyncHandler.js';

/**
 * Protect Routes - Authentication Middleware
 * Verifies JWT from Authorization header (Bearer token) or HttpOnly cookie.
 * Attaches the authenticated user to req.user.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check Authorization header first, then cookie
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1];
  } else if (req.cookies && req.cookies.token) {
    token = req.cookies.token;
  }

  if (!token) {
    return next(
      new ApiError('Please log in to access this resource.', 401)
    );
  }

  // Verify token
  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  // Check if user still exists and is active
  const currentUser = await User.findById(decoded.id);

  if (!currentUser) {
    return next(
      new ApiError('The user belonging to this token no longer exists.', 401)
    );
  }

  if (!currentUser.isActive) {
    return next(
      new ApiError('This account has been deactivated.', 401)
    );
  }

  // Attach user to the request
  req.user = currentUser;
  next();
});

/**
 * Authorize Roles - Role-based Access Control
 * Restricts access to specific user roles.
 * Must be used AFTER the protect middleware.
 *
 * @param  {...string} roles - Allowed roles (e.g., 'admin')
 */
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ApiError(
          `Role '${req.user.role}' is not authorized to access this resource.`,
          403
        )
      );
    }
    next();
  };
};
