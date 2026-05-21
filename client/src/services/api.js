// services/api.js - All API calls to the backend are here

import axios from "axios";

// Base URL for the backend API
// In development, React proxy (package.json) forwards /api to localhost:5000
const API_BASE = "/api";

// ─── AUTH API CALLS ───────────────────────────────────────────────────────────

// Register a new employee
export const registerUser = async (userData) => {
  const response = await axios.post(`${API_BASE}/auth/register`, userData);
  return response.data;
};

// Login with email and password
export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_BASE}/auth/login`, credentials);
  return response.data;
};

// ─── LEAVE API CALLS ──────────────────────────────────────────────────────────

// Apply for a leave (employee)
export const applyLeave = async (leaveData) => {
  const response = await axios.post(`${API_BASE}/leaves`, leaveData);
  return response.data;
};

// Get leaves (role-based)
// - Employee: pass userId and role="employee"
// - Admin: pass role="admin"
export const getLeaves = async (userId, role) => {
  const response = await axios.get(`${API_BASE}/leaves`, {
    params: { userId, role },
  });
  return response.data;
};

// Admin: approve or reject a leave
export const updateLeaveStatus = async (leaveId, status) => {
  const response = await axios.put(`${API_BASE}/leaves/${leaveId}`, { status });
  return response.data;
};
