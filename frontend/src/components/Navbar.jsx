import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  // SessionStorage se User Details aur Token fetch karo
  const token = sessionStorage.getItem("token");
  const user = JSON.parse(sessionStorage.getItem("user") || "null");

  // Logout Function
  const handleLogout = () => {
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("userBudget");
    setIsOpen(false);
    navigate("/login");
  };

  // Link pe click karte hi menu close ho jaye (mobile pe)
  const closeMenu = () => setIsOpen(false);

  return (
    <nav className="navbar">
      <div className="container nav-content">
        {/* Logo Circle */}
        <Link to="/" className="logo-circle" onClick={closeMenu}>
          <img src="/logo.png" alt="AI Finance Logo" />
        </Link>

        {/* Hamburger Button - sirf mobile pe dikhega (CSS se controlled) */}
        <button
          className={`nav-toggle ${isOpen ? "active" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
          <span className="nav-toggle-bar"></span>
        </button>

        <ul className={`nav-links ${isOpen ? "nav-links-open" : ""}`}>
          {token && user ? (
            <>
              <li>
                <Link to="/" onClick={closeMenu}>
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/history" onClick={closeMenu}>
                  History
                </Link>
              </li>
              <li>
                <Link to="/gopro" className="btn-upgrade" onClick={closeMenu}>
                  Go Pro
                </Link>
              </li>
              <li className="user-profile-section">
                <div className="user-badge">
                  👤 <span>{user.name}</span>
                </div>
                <button onClick={handleLogout} className="btn-logout">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li className="auth-buttons">
              <Link to="/login" className="btn-login" onClick={closeMenu}>
                Login
              </Link>
              <Link to="/signup" className="btn-signup" onClick={closeMenu}>
                Sign Up
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
