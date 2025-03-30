import React from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Profile.css'; 

const Profile = () => {
  return (
    <div className="profile">
      <Navbar />
      <div className="profile-content">
        <h1>Profile</h1>
        <p>Manage your profile information here.</p>
      </div>
    </div>
  );
};

export default Profile;