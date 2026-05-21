// pages/EmployeeDashboard.js - Employee can apply for leave and view their leaves

import React, { useState, useEffect } from "react";
import { applyLeave, getLeaves } from "../services/api";
import LeaveCard from "../components/LeaveCard";

function EmployeeDashboard({ user, onLogout }) {
  // State for the apply leave form
  const [reason, setReason] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // State for the list of leave requests
  const [leaves, setLeaves] = useState([]);

  // Loading and message states
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");
  const [formSuccess, setFormSuccess] = useState("");
  const [leavesLoading, setLeavesLoading] = useState(true);

  // Fetch employee's leaves when component loads
  useEffect(() => {
    fetchMyLeaves();
  }, []);

  // Get all leaves for this employee
  const fetchMyLeaves = async () => {
    try {
      setLeavesLoading(true);
      const data = await getLeaves(user._id, "employee");
      setLeaves(data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    } finally {
      setLeavesLoading(false);
    }
  };

  // Handle apply leave form submit
  const handleApply = async (e) => {
    e.preventDefault();
    setFormError("");
    setFormSuccess("");
    setFormLoading(true);

    try {
      await applyLeave({
        userId: user._id,
        reason,
        fromDate,
        toDate,
      });
      setFormSuccess("Leave applied successfully! ✅");
      // Clear form fields
      setReason("");
      setFromDate("");
      setToDate("");
      // Refresh the leave list
      fetchMyLeaves();
    } catch (err) {
      setFormError(err.response?.data?.message || "Failed to apply leave.");
    } finally {
      setFormLoading(false);
    }
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="dashboard">
      {/* Top navigation bar */}
      <header className="navbar">
        <div className="navbar-left">
          <span className="navbar-icon">📋</span>
          <span className="navbar-title">Leave Manager</span>
        </div>
        <div className="navbar-right">
          <span className="navbar-user">👋 {user.name}</span>
          <span className="navbar-badge employee">Employee</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{leaves.length}</span>
            <span className="stat-label">Total Applied</span>
          </div>
          <div className="stat-card approved">
            <span className="stat-number">
              {leaves.filter((l) => l.status === "approved").length}
            </span>
            <span className="stat-label">Approved</span>
          </div>
          <div className="stat-card rejected">
            <span className="stat-number">
              {leaves.filter((l) => l.status === "rejected").length}
            </span>
            <span className="stat-label">Rejected</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">
              {leaves.filter((l) => l.status === "applied").length}
            </span>
            <span className="stat-label">Pending</span>
          </div>
        </div>

        <div className="dashboard-grid">
          {/* Apply Leave Form */}
          <div className="card">
            <h2 className="card-title">📝 Apply for Leave</h2>
            <form onSubmit={handleApply} className="leave-form">
              <div className="form-group">
                <label>Reason for Leave</label>
                <textarea
                  placeholder="Describe your reason for leave..."
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows="3"
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>From Date</label>
                  <input
                    type="date"
                    value={fromDate}
                    min={today}
                    onChange={(e) => setFromDate(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>To Date</label>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate || today}
                    onChange={(e) => setToDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              {formError && <div className="error-message">{formError}</div>}
              {formSuccess && <div className="success-message">{formSuccess}</div>}

              <button type="submit" className="btn-primary" disabled={formLoading}>
                {formLoading ? "Submitting..." : "Submit Leave Request"}
              </button>
            </form>
          </div>

          {/* My Leave Requests */}
          <div className="card">
            <h2 className="card-title">📄 My Leave Requests</h2>
            {leavesLoading ? (
              <p className="loading-text">Loading your leaves...</p>
            ) : leaves.length === 0 ? (
              <div className="empty-state">
                <p>📭 No leave requests yet.</p>
                <p>Apply for leave using the form.</p>
              </div>
            ) : (
              <div className="leaves-list">
                {leaves.map((leave) => (
                  <LeaveCard key={leave._id} leave={leave} showEmployee={false} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default EmployeeDashboard;
