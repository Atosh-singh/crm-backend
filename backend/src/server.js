// src/server.js
require('dotenv').config();           // .env load
const app = require('./app');
const connectDB = require('./config/db');

const PORT = process.env.PORT || 3000;

const startServer = async () => {
  // 1) DB connect
  await connectDB();

  // 2) Server listen
  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
