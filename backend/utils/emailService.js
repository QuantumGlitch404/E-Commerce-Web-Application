import nodemailer from 'nodemailer';

/**
 * Email Service using Nodemailer
 * Sends actual emails via SMTP (Gmail or any provider).
 * Uses HTML templates for professional-looking emails.
 */

const createTransporter = () => {
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASSWORD,
    },
  });
};

/**
 * Core email sending function
 * @param {object} options - { email, subject, html }
 */
const sendEmail = async (options) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `"${process.env.FROM_NAME}" <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    html: options.html,
  };

  await transporter.sendMail(mailOptions);
};

// ─── Email Template Wrapper ────────────────────────────────────────
const wrapTemplate = (content) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { margin: 0; padding: 0; background-color: #000000; font-family: 'Inter', Arial, sans-serif; color: #ffffff; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; padding: 30px 0; border-bottom: 1px solid #1A1A1A; }
    .logo { font-family: 'Orbitron', monospace; font-size: 28px; font-weight: 700;
      background: linear-gradient(135deg, #00D9FF, #B84FFF);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .content { padding: 30px 0; }
    .btn { display: inline-block; padding: 14px 32px; background: linear-gradient(135deg, #00D9FF, #B84FFF);
      color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600;
      font-size: 16px; margin: 20px 0; }
    .btn:hover { opacity: 0.9; }
    .footer { text-align: center; padding: 30px 0; border-top: 1px solid #1A1A1A; color: #666666; font-size: 12px; }
    h2 { color: #ffffff; font-size: 24px; margin-bottom: 16px; }
    p { color: #B3B3B3; line-height: 1.6; font-size: 15px; }
    .highlight { color: #00D9FF; font-weight: 600; }
    .card { background: #111111; border: 1px solid #1A1A1A; border-radius: 12px; padding: 20px; margin: 16px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">LUXESHOP</div>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>&copy; ${new Date().getFullYear()} LuxeShop. All rights reserved.</p>
      <p>This email was sent by LuxeShop. Please do not reply directly.</p>
    </div>
  </div>
</body>
</html>
`;

// ─── Specific Email Senders ────────────────────────────────────────

/**
 * Send welcome + email verification email
 */
export const sendVerificationEmail = async (user, verificationUrl) => {
  const html = wrapTemplate(`
    <h2>Welcome to LuxeShop! 🎉</h2>
    <p>Hi <span class="highlight">${user.name}</span>,</p>
    <p>Thank you for creating your account. Please verify your email address to get started with premium shopping.</p>
    <div style="text-align: center;">
      <a href="${verificationUrl}" class="btn">Verify Email Address</a>
    </div>
    <p>This link will expire in <strong>24 hours</strong>.</p>
    <p>If you didn't create an account, please ignore this email.</p>
  `);

  await sendEmail({
    email: user.email,
    subject: 'LuxeShop - Verify Your Email Address',
    html,
  });
};

/**
 * Send password reset email
 */
export const sendPasswordResetEmail = async (user, resetUrl) => {
  const html = wrapTemplate(`
    <h2>Password Reset Request</h2>
    <p>Hi <span class="highlight">${user.name}</span>,</p>
    <p>You requested a password reset. Click the button below to set a new password:</p>
    <div style="text-align: center;">
      <a href="${resetUrl}" class="btn">Reset Password</a>
    </div>
    <p>This link will expire in <strong>30 minutes</strong>.</p>
    <p>If you didn't request this, please ignore this email. Your password will remain unchanged.</p>
  `);

  await sendEmail({
    email: user.email,
    subject: 'LuxeShop - Password Reset',
    html,
  });
};

/**
 * Send order confirmation email
 */
export const sendOrderConfirmationEmail = async (user, order) => {
  const itemsHtml = order.orderItems
    .map(
      (item) => `
    <div class="card" style="display: flex; gap: 16px; align-items: center;">
      <div>
        <p style="color: #ffffff; font-weight: 600; margin: 0;">${item.name}</p>
        <p style="margin: 4px 0;">Qty: ${item.quantity} × ₹${item.price.toLocaleString()}</p>
      </div>
    </div>
  `
    )
    .join('');

  const html = wrapTemplate(`
    <h2>Order Confirmed! 🛍️</h2>
    <p>Hi <span class="highlight">${user.name}</span>,</p>
    <p>Your order has been placed successfully. Here are the details:</p>
    <div class="card">
      <p style="color: #ffffff; margin: 0;">Order ID: <span class="highlight">#${order._id}</span></p>
      <p style="margin: 4px 0;">Date: ${new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
    </div>
    ${itemsHtml}
    <div class="card">
      <p style="color: #ffffff; margin: 0;">Subtotal: ₹${order.itemsPrice.toLocaleString()}</p>
      <p style="margin: 4px 0;">Shipping: ₹${order.shippingPrice.toLocaleString()}</p>
      <p style="margin: 4px 0;">Tax: ₹${order.taxPrice.toLocaleString()}</p>
      <p style="color: #00D9FF; font-size: 18px; font-weight: 700; margin: 8px 0 0;">
        Total: ₹${order.totalPrice.toLocaleString()}
      </p>
    </div>
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}/orders/${order._id}" class="btn">View Order</a>
    </div>
  `);

  await sendEmail({
    email: user.email,
    subject: `LuxeShop - Order Confirmed #${order._id}`,
    html,
  });
};

/**
 * Send order status update email
 */
export const sendOrderStatusEmail = async (user, order) => {
  const statusMessages = {
    Processing: 'Your order is being processed and will be shipped soon.',
    Shipped: `Your order has been shipped! Tracking ID: ${order.trackingNumber || 'Will be updated shortly.'}`,
    Delivered: 'Your order has been delivered. We hope you love it!',
    Cancelled: 'Your order has been cancelled. If you paid online, a refund will be processed within 5-7 business days.',
  };

  const html = wrapTemplate(`
    <h2>Order Status Update</h2>
    <p>Hi <span class="highlight">${user.name}</span>,</p>
    <div class="card">
      <p style="color: #ffffff; margin: 0;">Order: <span class="highlight">#${order._id}</span></p>
      <p style="color: #00D9FF; font-size: 18px; font-weight: 700; margin: 8px 0;">
        Status: ${order.orderStatus}
      </p>
    </div>
    <p>${statusMessages[order.orderStatus] || 'Your order status has been updated.'}</p>
    <div style="text-align: center;">
      <a href="${process.env.FRONTEND_URL}/orders/${order._id}" class="btn">Track Order</a>
    </div>
  `);

  await sendEmail({
    email: user.email,
    subject: `LuxeShop - Order ${order.orderStatus} #${order._id}`,
    html,
  });
};

export default sendEmail;
