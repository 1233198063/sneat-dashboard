const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // Use the MongoDB connection string from service.js
    const conn = await mongoose.connect('mongodb+srv://demo0618:demo0618@cluster0.riqhps6.mongodb.net/userdb?retryWrites=true&w=majority&appName=Cluster0');

    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error('Database connection error:', error.message);
    // Don't exit process, just log the error
    console.log('Continuing without database...');
  }
};

module.exports = connectDB;