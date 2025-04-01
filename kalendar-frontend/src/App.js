import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HeroSection from './pages/HeroSection';
import Register from './pages/Register';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Activities from './pages/Activities';
import Notifications from './pages/Notifications';
import Profile from './pages/Profile';
import './App.css';

function App() {
  // Zajedničko stanje za aktivnosti
  const [activities, setActivities] = useState([]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HeroSection />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* Prosleđivanje aktivnosti Dashboard komponenti */}
        <Route
          path="/dashboard"
          element={<Dashboard activities={activities} setActivities={setActivities} />}
        />
        {/* Prosleđivanje aktivnosti Activities komponenti */}
        <Route
          path="/activities/:id"
          element={<Activities activities={activities} />}
        />
        <Route
          path="/activities"
          element={<Activities activities={activities} />}
        />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;