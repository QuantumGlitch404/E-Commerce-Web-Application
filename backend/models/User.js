import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import validator from 'validator';

const addressSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  pincode: { type: String, required: true },
  country: { type: String, default: 'India' },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide your name'],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, 'Please provide your email'],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, 'Please provide a valid email'],
    },
    password: {
      type: String,
      required: [true, 'Please provide a password'],
      minLength: [8, 'Password must be at least 8 characters'],
      select: false, // Don't return in queries by default
    },
    avatar: {
      public_id: String,
      url: {
        type: String,
        default: 'https://res.cloudinary.com/demo/image/upload/v1312461204/sample.jpg', // Default placeholder
      },
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    phone: {
      type: String,
      validate: {
        validator: function (v) {
          return /\d{10}/.test(v); // Basic 10-digit validation
        },
        message: 'Phone number is not valid!',
      },
    },
    addresses: [addressSchema],
    wishlist: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    emailVerified: {
      type: Boolean,
      default: false,
    },
    emailVerificationToken: String,
    emailVerificationExpire: Date,
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual field for full name (assuming name can be split if needed)
userSchema.virtual('fullName').get(function () {
  return this.name;
});

// Virtual field for total addresses
userSchema.virtual('totalAddresses').get(function () {
  return this.addresses ? this.addresses.length : 0;
});

// ─── Indexes ─────────────────────────────────────────────────────────
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ createdAt: -1 });

// ─── Document Middlewares ──────────────────────────────────────────
userSchema.pre('save', async function () {
  // Only hash password if it was modified (or is new)
  if (!this.isModified('password')) return;

  // Hash password with cost of 10
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// ─── Instance Methods ──────────────────────────────────────────────
userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.generatePasswordResetToken = function () {
  // Generate token
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Hash and set to resetPasswordToken
  this.resetPasswordToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');

  // Set expire to 30 minutes
  this.resetPasswordExpire = Date.now() + 30 * 60 * 1000;

  return resetToken;
};

userSchema.methods.generateEmailVerificationToken = function () {
  const verificationToken = crypto.randomBytes(20).toString('hex');

  this.emailVerificationToken = crypto
    .createHash('sha256')
    .update(verificationToken)
    .digest('hex');

  // Set expire to 24 hours
  this.emailVerificationExpire = Date.now() + 24 * 60 * 60 * 1000;

  return verificationToken;
};

const User = mongoose.model('User', userSchema);
export default User;
