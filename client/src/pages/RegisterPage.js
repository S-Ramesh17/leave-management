// pages/RegisterPage.js - Registration form for new employees

import React, { useState } from "react";
import { registerUser } from "../services/api";

function RegisterPage({ goToLogin }) {
  // State for all form fields
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [employeeId, setEmployeeId] = useState("");
  const [password, setPassword] = useState("");

  // State for messages and loading
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);

    try {
      await registerUser({ name, email, employeeId, password });
      setSuccess("Registration successful! You can now log in.");
      // Clear the form
      setName("");
      setEmail("");
      setEmployeeId("");
      setPassword("");
    } catch (err) {
      setError(err.response?.data?.message || "Registration failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">👤</div>
          <h1>Create Account</h1>
          <p>Register as a new employee</p>
        </div>

        {/* Register Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Full Name</label>
            <input
              type="text"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Employee ID</label>
            <input
              type="text"
              placeholder="e.g. EMP002"
              value={employeeId}
              onChange={(e) => setEmployeeId(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Role note */}
          <p className="role-note">🔒 Role: Employee (assigned automatically)</p>

          {/* Error or success message */}
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">{success}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        {/* Link back to login */}
        <p className="auth-switch">
          Already have an account?{" "}
          <button className="link-btn" onClick={goToLogin}>
            Sign in here
          </button>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;
