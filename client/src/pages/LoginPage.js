// pages/LoginPage.js - Login form for all users

import React, { useState } from "react";
import { loginUser } from "../services/api";

function LoginPage({ onLogin, goToRegister }) {
  // State for form fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // State for showing errors and loading
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    setError("");        // Clear previous errors
    setLoading(true);

    try {
      const data = await loginUser({ email, password });
      // Save user info to localStorage (simple auth, no JWT)
      localStorage.setItem("user", JSON.stringify(data.user));
      // Tell App.js the user is logged in
      onLogin(data.user);
    } catch (err) {
      // Show error message from server or a generic one
      setError(err.response?.data?.message || "Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-icon">📋</div>
          <h1>Leave Manager</h1>
          <p>Sign in to your account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="auth-form">
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
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Show error if any */}
          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-primary" disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Default credentials hint */}
        <div className="credentials-hint">
          <p><strong>Demo Accounts:</strong></p>
          <p>Admin: admin@test.com / 1234</p>
          <p>Employee: user@test.com / 1234</p>
        </div>

        {/* Link to register */}
        <p className="auth-switch">
          New employee?{" "}
          <button className="link-btn" onClick={goToRegister}>
            Register here
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
