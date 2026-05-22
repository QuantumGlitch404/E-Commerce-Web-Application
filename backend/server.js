import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import connectDB from './config/db.js';
import configureCloudinary from './config/cloudinary.js';
import errorHandler from './middleware/error.js';

// Route imports
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import categoryRoutes from './routes/categoryRoutes.js';

// ─── Load Environment Variables
dotenv.config();

// ─── Initialize Express App
const app = express();

// ─── Connect to Database
connectDB();

// ─── Configure Cloudinary
configureCloudinary();

// ═══ SECURITY MIDDLEWARE ═══
app.use(helmet({ crossOriginResourcePolicy: { policy: 'cross-origin' } }));

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 300,
  message: { success: false, message: 'Too many requests, please try again later.' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api', globalLimiter);

// ═══ BODY PARSING & CORS ═══
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  allowedHeaders: ['Content-Type', 'Authorization'],
}));

// ═══ API ROUTES ═══
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'LuxeShop API is running' });
});

// ═══ ROUTES ═══
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/auth', authRoutes);

// ═══ SERVE FRONTEND IN PRODUCTION ═══
const __dirname = path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  // Express 5 requires named params or regex for catch-all
  app.get('{*path}', (req, res) =>
    res.sendFile(path.resolve(__dirname, '../frontend', 'dist', 'index.html'))
  );
} else {
  app.get('/', (req, res) => {
    res.send('LuxeShop API is running...');
  });
}

// ═══ ERROR HANDLING ═══
app.use(errorHandler);

// ═══ START SERVER ═══
const PORT = process.env.PORT || 5000;
const server = app.listen(PORT, () => {
  console.log(`\n🚀 LuxeShop API running on port ${PORT}`);
});

process.on('unhandledRejection', (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});

export default app;
