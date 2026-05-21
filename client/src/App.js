// App.js - Main component that controls which page to show

import React, { useState, useEffect } from "react";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";

function App() {
  // Track which page to show: "login", "register", "employee", "admin"
  const [page, setPage] = useState("login");

  // Track the currently logged-in user (null if not logged in)
  const [currentUser, setCurrentUser] = useState(null);

  // When app loads, check if there's a user saved in localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      // Go to the right dashboard based on role
      setPage(user.role === "admin" ? "admin" : "employee");
    }
  }, []);

  // Called when login is successful
  const handleLogin = (user) => {
    setCurrentUser(user);
    // Go to the correct dashboard based on role
    setPage(user.role === "admin" ? "admin" : "employee");
  };

  // Called when user clicks logout
  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear from storage
    setCurrentUser(null);
    setPage("login"); // Go back to login
  };

  // Show the right page based on 'page' state
  if (page === "login") {
    return (
      <LoginPage
        onLogin={handleLogin}
        goToRegister={() => setPage("register")}
      />
    );
  }

  if (page === "register") {
    return (
      <RegisterPage
        goToLogin={() => setPage("login")}
      />
    );
  }

  if (page === "admin" && currentUser) {
    return (
      <AdminDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  if (page === "employee" && currentUser) {
    return (
      <EmployeeDashboard
        user={currentUser}
        onLogout={handleLogout}
      />
    );
  }

  // Fallback (shouldn't normally reach here)
  return <LoginPage onLogin={handleLogin} goToRegister={() => setPage("register")} />;
}

export default App;
