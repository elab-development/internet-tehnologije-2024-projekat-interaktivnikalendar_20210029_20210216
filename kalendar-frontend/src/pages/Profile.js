import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import '../styles/Profile.css';

const Profile = ({ onLogout }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    oldPassword: '',
    newPassword: '',
    newPassword_confirmation: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const userData = await response.json();
          setFormData((prev) => ({
            ...prev,
            name: userData.name || '',
            email: userData.email || '',
          }));
        }
      }
    };
    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCancel = () => {
    setFormData((prev) => ({
      ...prev,
      oldPassword: '',
      newPassword: '',
      newPassword_confirmation: '',
    }));
  };

  const handleSave = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    const token = localStorage.getItem('token');
    try {
      const response = await fetch('http://localhost:8000/api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          oldPassword: formData.oldPassword,
          newPassword: formData.newPassword,
          newPassword_confirmation: formData.newPassword_confirmation,
        }),
      });

      if (response.ok) {
        alert('Profile updated successfully!');
        setFormData((prev) => ({
          ...prev,
          oldPassword: '',
          newPassword: '',
          newPassword_confirmation: '',
        }));
      } else {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          alert('Failed to update profile: ' + (errorData.message || 'Unknown error'));
        } catch {
          alert('Failed to update profile: ' + text);
        }
      }
    } catch (error) {
      alert('Error updating profile: ' + error.message);
    }
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    navigate('/');
  };

  return (
    <div className="profile">
      <Navbar />
      <div className="profile-container">
        <h2>Edit Profile</h2>
        <form className="profile-form" action="#" onSubmit={handleSave}>
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
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
              <button className="logout-button" type="button" onClick={handleLogout}>
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
                  name="newPassword_confirmation"
                  value={formData.newPassword_confirmation}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-actions">
                <button className="cancel-button" type="button" onClick={handleCancel}>
                  Cancel
                </button>
                <button className="save-button" type="submit">
                  Save Info
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;