import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="app-name">
          <span className="study">Study</span>
          <span className="track">Track</span>
        </h1>
      </div>
      <div className="nav-links">
        <Link to="/student-dashboard" className="nav-link">Home</Link>
        <Link to="/activities" className="nav-link">Activities</Link>
        <Link to="/notifications" className="nav-link">
          <i className="fas fa-bell"></i> Notifications
        </Link>
        <Link to="/profile" className="nav-link">
          <i className="fas fa-user"></i> Profile
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;