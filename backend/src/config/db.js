// src/config/db.js
const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // .env se URI lo
    await mongoose.connect(process.env.MONGO_URI, {
      maxPoolSize: 50,
      serverSelectionTimeoutMS: 30000,
    });

    console.log('✅ MongoDB connected');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1); // startup fail
  }
};

module.exports = connectDB;
