// routes/leaveRoutes.js - Leave API endpoints

const express = require("express");
const router = express.Router();
const { applyLeave, getLeaves, updateLeaveStatus } = require("../controllers/leaveController");

// POST /api/leaves - Employee applies for leave
router.post("/", applyLeave);

// GET /api/leaves?userId=xxx&role=employee - Get leaves (role-based)
router.get("/", getLeaves);

// PUT /api/leaves/:id - Admin approves or rejects a leave
router.put("/:id", updateLeaveStatus);

module.exports = router;
