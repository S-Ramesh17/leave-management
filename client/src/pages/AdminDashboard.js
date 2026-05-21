// pages/AdminDashboard.js - Admin can view all leaves and approve/reject them

import React, { useState, useEffect } from "react";
import { getLeaves, updateLeaveStatus } from "../services/api";
import LeaveCard from "../components/LeaveCard";

function AdminDashboard({ user, onLogout }) {
  // All leave requests from all employees
  const [leaves, setLeaves] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filter state: show all, or filter by status
  const [filter, setFilter] = useState("all");

  // Fetch all leaves when component loads
  useEffect(() => {
    fetchAllLeaves();
  }, []);

  // Get all leaves (admin sees everyone's)
  const fetchAllLeaves = async () => {
    try {
      setLoading(true);
      const data = await getLeaves(null, "admin");
      setLeaves(data);
    } catch (err) {
      console.error("Error fetching leaves:", err);
    } finally {
      setLoading(false);
    }
  };

  // Admin approves or rejects a leave
  const handleStatusUpdate = async (leaveId, newStatus) => {
    try {
      await updateLeaveStatus(leaveId, newStatus);
      // Refresh list after update
      fetchAllLeaves();
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update leave status.");
    }
  };

  // Filter leaves based on selected tab
  const filteredLeaves = leaves.filter((leave) => {
    if (filter === "all") return true;
    return leave.status === filter;
  });

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
          <span className="navbar-badge admin">Admin</span>
          <button className="btn-logout" onClick={onLogout}>Logout</button>
        </div>
      </header>

      <div className="dashboard-content">
        {/* Stats row */}
        <div className="stats-row">
          <div className="stat-card">
            <span className="stat-number">{leaves.length}</span>
            <span className="stat-label">Total Requests</span>
          </div>
          <div className="stat-card pending">
            <span className="stat-number">
              {leaves.filter((l) => l.status === "applied").length}
            </span>
            <span className="stat-label">Pending Review</span>
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
        </div>

        {/* Main card */}
        <div className="card">
          <div className="card-header-row">
            <h2 className="card-title">📋 All Leave Requests</h2>

            {/* Filter tabs */}
            <div className="filter-tabs">
              {["all", "applied", "approved", "rejected"].map((tab) => (
                <button
                  key={tab}
                  className={`filter-tab ${filter === tab ? "active" : ""}`}
                  onClick={() => setFilter(tab)}
                >
                  {tab === "all" ? "All" : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Leave list */}
          {loading ? (
            <p className="loading-text">Loading leave requests...</p>
          ) : filteredLeaves.length === 0 ? (
            <div className="empty-state">
              <p>📭 No leave requests found.</p>
            </div>
          ) : (
            <div className="leaves-list">
              {filteredLeaves.map((leave) => (
                <LeaveCard
                  key={leave._id}
                  leave={leave}
                  showEmployee={true}       // Show employee name/ID for admin
                  onApprove={() => handleStatusUpdate(leave._id, "approved")}
                  onReject={() => handleStatusUpdate(leave._id, "rejected")}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
