import React from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Notifications.css'; // Kreiraj ovaj fajl ako želiš posebne stilove za Notifications

const Notifications = () => {
  return (
    <div className="notifications">
      <Navbar />
      <div className="notifications-content">
        <h1>Notifications</h1>
        <p>Here you can view all your notifications.</p>
      </div>
    </div>
  );
};

export default Notifications;