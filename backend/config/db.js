import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongoServer = null;

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    global.dbConnected = true;
    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);

    mongoose.connection.on('error', (err) => {
      console.error(`❌ MongoDB connection error: ${err.message}`);
      global.dbConnected = false;
    });

    mongoose.connection.on('disconnected', () => {
      console.warn('⚠️  MongoDB disconnected. Attempting to reconnect...');
      global.dbConnected = false;
    });

    mongoose.connection.on('reconnected', () => {
      console.log('✅ MongoDB reconnected');
      global.dbConnected = true;
    });
  } catch (error) {
    console.error(`❌ Atlas Connection Failed: ${error.message}`);
    console.log(`🚀 Starting Local In-Memory Database Fallback...`);
    try {
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();
      await mongoose.connect(mongoUri);
      global.dbConnected = true;
      console.log(`✅ Local MongoDB Memory Server Connected: ${mongoUri}`);

      console.log(`📦 Seeding In-Memory Database...`);
      const { seedDB } = await import('../utils/seedData.js');
      await seedDB();
    } catch (memErr) {
      console.error(`❌ Memory Server Failed: ${memErr.message}`);
      global.dbConnected = false;
    }
  }
};

export default connectDB;
