import jwt from 'jsonwebtoken';

/**
 * Generate a JWT token for a given user
 * @param {object} user - Mongoose user document
 * @returns {string} Signed JWT token
 */
export const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRE }
  );
};

/**
 * Generate token and send it as an HttpOnly cookie alongside a JSON response.
 * This is the primary auth response handler used by login/register.
 * @param {object} user - Mongoose user document
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Response message
 * @param {object} res - Express response object
 */
export const sendTokenResponse = (user, statusCode, message, res) => {
  const token = generateToken(user);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  };

  // Remove password from the user object before sending
  const userResponse = user.toObject();
  delete userResponse.password;

  res.status(statusCode).cookie('token', token, cookieOptions).json({
    success: true,
    message,
    token,
    data: userResponse,
  });
};
