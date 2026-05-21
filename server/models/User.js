// models/User.js - User database schema

const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define the structure of a User document in MongoDB
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Name is mandatory
    trim: true,     // Remove extra spaces
  },
  email: {
    type: String,
    required: true,
    unique: true,   // No two users can have the same email
    lowercase: true,
    trim: true,
  },
  employeeId: {
    type: String,
    required: true,
    unique: true,   // Each employee has a unique ID
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ["admin", "employee"], // Only these two values are allowed
    default: "employee",         // Default role is employee
  },
}, {
  timestamps: true, // Automatically adds createdAt and updatedAt fields
});

// Before saving a user, hash the password
// This runs automatically before every .save() call
userSchema.pre("save", async function (next) {
  // Only hash if the password was changed (or is new)
  if (!this.isModified("password")) return next();

  // bcrypt salt rounds = 10 (more rounds = more secure but slower)
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare entered password with hashed password in DB
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
