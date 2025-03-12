import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
import calendarImage from '../assets/calendar.jpg'; // Putanja do slike kalendara

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  return (
    <div className="hero-section">
      <header className="hero-header">
        <div className="logo-container">
          <h1 className="app-name">
            <span className="study">Study</span>
            <span className="track">Track</span>
          </h1>
        </div>
        <div className="button-container">
          <button className="hero-button" onClick={handleGetStarted}>Get Started</button>
          <button className="hero-button">Login</button>
        </div>
      </header>
      <div className="hero-content">
        <div className="text-content">
          <h2 className="title">Student Calendar</h2>
          <p className="motto">Transform the way you manage your time - study efficiently, stay organized and achieve success!</p>
          <div className="description">
            <p>📚 Keep track of your classes, assignments, and exams with ease.</p>
            <p>📅 Start Planning Smarter Today! Sign up now and take control of your academic journey.</p>
          </div>
        </div>
        <div className="image-content">
          <img src={calendarImage} alt="Student using calendar" className="calendar-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;