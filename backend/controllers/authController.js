import crypto from 'crypto';
import User from '../models/User.js';
import asyncHandler from '../middleware/asyncHandler.js';
import ApiError from '../utils/ApiError.js';
import ApiResponse from '../utils/ApiResponse.js';
import { sendTokenResponse } from '../utils/generateToken.js';
import {
  sendVerificationEmail,
  sendPasswordResetEmail,
} from '../utils/emailService.js';

// @desc    Register user
// @route   POST /api/auth/register
// @access  Public
export const register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    return next(new ApiError('Email already registered', 400));
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  // Generate verification token
  const verificationToken = user.generateEmailVerificationToken();
  await user.save({ validateBeforeSave: false });

  // Send verification email
  const verificationUrl = `${process.env.FRONTEND_URL}/verify-email/${verificationToken}`;
  
  try {
    await sendVerificationEmail(user, verificationUrl);
  } catch (error) {
    user.emailVerificationToken = undefined;
    user.emailVerificationExpire = undefined;
    await user.save({ validateBeforeSave: false });
    console.error('Email send failed:', error);
    // Continue registration even if email fails, but warn
  }

  sendTokenResponse(
    user,
    201,
    'Registration successful. Please check your email to verify your account.',
    res
  );
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ApiError('Please provide an email and password', 400));
  }

  // Check for user & select password
  const user = await User.findOne({ email }).select('+password');

  if (!user || !(await user.comparePassword(password))) {
    return next(new ApiError('Invalid email or password', 401));
  }

  if (!user.isActive) {
    return next(new ApiError('Your account has been deactivated.', 401));
  }

  sendTokenResponse(user, 200, 'Login successful', res);
});

// @desc    Logout user / clear cookie
// @route   POST /api/auth/logout
// @access  Private
export const logout = asyncHandler(async (req, res, next) => {
  res.cookie('token', 'none', {
    expires: new Date(Date.now() + 10 * 1000), // expires in 10 seconds
    httpOnly: true,
  });

  ApiResponse.success(res, 200, 'User logged out successfully', {});
});

// @desc    Get current logged in user
// @route   GET /api/auth/me
// @access  Private
export const getMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);
  ApiResponse.success(res, 200, 'Profile fetched successfully', user);
});

// @desc    Verify Email
// @route   GET /api/auth/verify-email/:token
// @access  Public
export const verifyEmail = asyncHandler(async (req, res, next) => {
  const emailVerificationToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    emailVerificationToken,
    emailVerificationExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError('Invalid or expired verification token', 400));
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, 'Email verified successfully', res);
});

// @desc    Forgot Password
// @route   POST /api/auth/forgot-password
// @access  Public
export const forgotPassword = asyncHandler(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });

  if (!user) {
    return next(new ApiError('There is no user with that email', 404));
  }

  const resetToken = user.generatePasswordResetToken();
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

  try {
    await sendPasswordResetEmail(user, resetUrl);
    ApiResponse.success(res, 200, 'Password reset email sent');
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ApiError('Email could not be sent', 500));
  }
});

// @desc    Reset Password
// @route   PUT /api/auth/reset-password/:token
// @access  Public
export const resetPassword = asyncHandler(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ApiError('Invalid or expired token', 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, 'Password updated successfully', res);
});
