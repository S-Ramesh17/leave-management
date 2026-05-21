// models/Leave.js - Leave request database schema

const mongoose = require("mongoose");

// Define the structure of a Leave document in MongoDB
const leaveSchema = new mongoose.Schema({
  // Reference to the user who applied for leave
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",    // This links to the User model
    required: true,
  },
  reason: {
    type: String,
    required: true,
    trim: true,
  },
  fromDate: {
    type: Date,
    required: true,
  },
  toDate: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["applied", "approved", "rejected"], // Only these statuses allowed
    default: "applied",                          // New leaves start as "applied"
  },
}, {
  timestamps: true, // Adds createdAt and updatedAt automatically
});

const Leave = mongoose.model("Leave", leaveSchema);

module.exports = Leave;
