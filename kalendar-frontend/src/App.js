import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import HeroSection from './pages/HeroSection';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/StudentDashboard';
import Activities from './pages/Activities';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminNotifications from './pages/AdminNotifications';
import './App.css';

function App() {
  const [activities, setActivities] = useState([]); // Zajedničko stanje za aktivnosti
  const [role, setRole] = useState(null); // Stanje za ulogu korisnika
  const [loading, setLoading] = useState(true); // Da li se podaci učitavaju

  // Provera uloge korisnika
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setRole(null);
        setLoading(false);
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setRole(userData.role); // Postavi ulogu korisnika (admin ili student)
        } else {
          setRole(null);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setRole(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserRole();
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Prikaz dok se uloga učitava
  }

  return (
    <Router>
      <Routes>
        {/* Javno dostupne rute */}
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Rute za studente */}
        {role === 'student' && (
          <>
            <Route
              path="/student-dashboard"
              element={<Dashboard activities={activities} setActivities={setActivities} />}
            />
            <Route
              path="/activities"
              element={<Activities activities={activities} />}
            />
            <Route path="/notifications" element={<Notifications />} />
          </>
        )}

        {/* Rute za admina */}
        {role === 'admin' && (
          <>
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin-notifications" element={<AdminNotifications />} />
          </>
        )}

        {/* Zajednička rute */}
        <Route path="/profile" element={<Profile />} />
        <Route
              path="/activities"
              element={<Activities activities={activities} />}
            />

        {/* Preusmeravanje ako korisnik pokuša da pristupi nepostojećoj ruti */}
        <Route path="*" element={<Navigate to={role === 'admin' ? '/admin-dashboard' : '/student-dashboard'} />} />
      </Routes>
    </Router>
  );
}

export default App;