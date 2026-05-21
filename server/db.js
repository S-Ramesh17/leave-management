// db.js - Connect to MongoDB Atlas

const mongoose = require("mongoose");

// This function connects our app to MongoDB
const connectDB = async () => {
  try {
    // Use the MONGO_URI from our .env file
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected successfully");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
    // Exit process if we can't connect to database
    process.exit(1);
  }
};

module.exports = connectDB;
