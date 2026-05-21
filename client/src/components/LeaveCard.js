// components/LeaveCard.js - Reusable card for displaying a single leave request
// Used in both Employee Dashboard and Admin Dashboard

import React from "react";

function LeaveCard({ leave, showEmployee, onApprove, onReject }) {
  // Format a date for display: "Jan 15, 2024"
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Calculate number of days for the leave
  const calcDays = () => {
    const from = new Date(leave.fromDate);
    const to = new Date(leave.toDate);
    const diff = Math.ceil((to - from) / (1000 * 60 * 60 * 24)) + 1;
    return diff;
  };

  // Return CSS class based on status (for color coding)
  const getStatusClass = (status) => {
    if (status === "approved") return "status-approved";
    if (status === "rejected") return "status-rejected";
    return "status-applied";
  };

  return (
    <div className="leave-card">
      {/* Top row: employee info (admin only) + status badge */}
      <div className="leave-card-header">
        <div className="leave-card-left">
          {/* Show employee details only to admin */}
          {showEmployee && leave.userId && (
            <div className="employee-info">
              <span className="employee-name">👤 {leave.userId.name}</span>
              <span className="employee-id">ID: {leave.userId.employeeId}</span>
              <span className="employee-email">{leave.userId.email}</span>
            </div>
          )}
          <p className="leave-reason">"{leave.reason}"</p>
        </div>

        {/* Status badge */}
        <span className={`status-badge ${getStatusClass(leave.status)}`}>
          {leave.status === "applied" ? "⏳ Pending" : leave.status === "approved" ? "✅ Approved" : "❌ Rejected"}
        </span>
      </div>

      {/* Date info */}
      <div className="leave-dates">
        <div className="date-item">
          <span className="date-label">From</span>
          <span className="date-value">{formatDate(leave.fromDate)}</span>
        </div>
        <div className="date-separator">→</div>
        <div className="date-item">
          <span className="date-label">To</span>
          <span className="date-value">{formatDate(leave.toDate)}</span>
        </div>
        <div className="date-item">
          <span className="date-label">Duration</span>
          <span className="date-value">{calcDays()} day{calcDays() > 1 ? "s" : ""}</span>
        </div>
      </div>

      {/* Admin action buttons — only show if leave is still pending */}
      {showEmployee && leave.status === "applied" && (
        <div className="leave-actions">
          <button
            className="btn-approve"
            onClick={onApprove}
          >
            ✅ Approve
          </button>
          <button
            className="btn-reject"
            onClick={onReject}
          >
            ❌ Reject
          </button>
        </div>
      )}

      {/* Applied date */}
      <p className="leave-applied-on">
        Applied on: {formatDate(leave.createdAt)}
      </p>
    </div>
  );
}

export default LeaveCard;
