// index.js - Main server entry point

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./db");
const User = require("./models/User");

// Load environment variables from .env file
dotenv.config();

// Connect to MongoDB
connectDB();

const app = express();

// ─── MIDDLEWARE ───────────────────────────────────────────────────────────────
// Allow requests from our React frontend
app.use(cors());

app.use(express.json());

// ─── ROUTES ───────────────────────────────────────────────────────────────────
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/leaves", require("./routes/leaveRoutes"));

// Simple test route to check if server is running
app.get("/", (req, res) => {
  res.send("Leave Management API is running ✅");
});

// ─── CREATE DEFAULT ACCOUNTS ─────────────────────────────────────────────────
const createDefaultUsers = async () => {
  try {
    // Check if admin already exists
    const adminExists = await User.findOne({ email: "admin@test.com" });
    if (!adminExists) {
      await User.create({
        name: "Admin User",
        email: "admin@test.com",
        employeeId: "ADMIN001",
        password: "1234",
        role: "admin",
      });
      console.log("✅ Default admin created: admin@test.com / 1234");
    }

    const userExists = await User.findOne({ email: "user@test.com" });
    if (!userExists) {
      await User.create({
        name: "Test Employee",
        email: "user@test.com",
        employeeId: "EMP001",
        password: "1234",
        role: "employee",
      });
      console.log("✅ Default employee created: user@test.com / 1234");
    }
  } catch (error) {
    console.error("Error creating default users:", error.message);
  }
};

// ─── START SERVER ─────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);
  await createDefaultUsers();
});
