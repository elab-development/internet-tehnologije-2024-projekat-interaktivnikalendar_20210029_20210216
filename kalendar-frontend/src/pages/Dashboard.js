import React from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Dashboard.css'; 

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
      <div className="welcome-panel">
        <h2>Hello,username!</h2>
        <p>Success starts with good planning – let’s go!</p>
      </div>
    </div>
    </div>
  );
};

export default Dashboard;