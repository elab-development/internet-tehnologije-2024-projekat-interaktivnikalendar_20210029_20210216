import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Profile.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData({
      name: '',
      username: '',
      email: '',
      oldPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    });
  };

  const handleSave = () => {
    console.log('Saved Info:', formData);
    // Ovde možeš dodati logiku za slanje podataka na server
  };

  const handleLogout = () => {
    console.log('User logged out');
    // Ovde možeš dodati logiku za odjavljivanje korisnika
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <div className="profile-content">
          {/* Leva strana */}
          <div className="profile-left">
            <div className="form-group">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
            <button className="logout-button" onClick={handleLogout}>
              🚪 Log Out
            </button>
          </div>

          {/* Desna strana */}
          <div className="profile-right">
            <div className="form-group">
              <label>Old Password</label>
              <input
                type="password"
                name="oldPassword"
                value={formData.oldPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>New Password</label>
              <input
                type="password"
                name="newPassword"
                value={formData.newPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label>Confirm New Password</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={formData.confirmNewPassword}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-actions">
              <button className="cancel-button" onClick={handleCancel}>
                Cancel
              </button>
              <button className="save-button" onClick={handleSave}>
                Save Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;