// controllers/leaveController.js - Handles leave apply, view, and update

const Leave = require("../models/Leave");

// ─── APPLY FOR LEAVE ─────────────────────────────────────────────────────────
// POST /api/leaves
const applyLeave = async (req, res) => {
  try {
    const { userId, reason, fromDate, toDate } = req.body;

    if (!userId || !reason || !fromDate || !toDate) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (new Date(fromDate) > new Date(toDate)) {
      return res.status(400).json({ message: "From date must be before To date" });
    }

    const leave = await Leave.create({
      userId,
      reason,
      fromDate,
      toDate,
      status: "applied",
    });

    res.status(201).json({ message: "Leave applied successfully", leave });
  } catch (error) {
    console.error("Apply leave error:", error);
    res.status(500).json({ message: "Server error while applying leave" });
  }
};


const getLeaves = async (req, res) => {
  try {
    const { userId, role } = req.query;

    let leaves;

    if (role === "admin") {
      leaves = await Leave.find()
        .populate("userId", "name email employeeId")
        .sort({ createdAt: -1 });
    } else {
      leaves = await Leave.find({ userId })
        .sort({ createdAt: -1 });
    }

    res.status(200).json(leaves);
  } catch (error) {
    console.error("Get leaves error:", error);
    res.status(500).json({ message: "Server error while fetching leaves" });
  }
};

// PUT /api/leaves/:id
const updateLeaveStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!["approved", "rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const leave = await Leave.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!leave) {
      return res.status(404).json({ message: "Leave not found" });
    }

    res.status(200).json({ message: `Leave ${status} successfully`, leave });
  } catch (error) {
    console.error("Update leave error:", error);
    res.status(500).json({ message: "Server error while updating leave" });
  }
};

module.exports = { applyLeave, getLeaves, updateLeaveStatus };
