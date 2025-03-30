import React from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Activities.css'; 

const Activities = () => {
  return (
    <div className="activities">
      <Navbar />
      <div className="activities-content">
        <h1>Activities</h1>
        <p>Here you can manage all your activities.</p>
      </div>
    </div>
  );
};

export default Activities;