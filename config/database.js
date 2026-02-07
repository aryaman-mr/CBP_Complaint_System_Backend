const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Database connection failed:', error.message);
    console.log('Server will continue running without database connection');
    console.log('Please update MONGODB_URI in .env file with valid connection string');
  }
};

module.exports = connectDB;