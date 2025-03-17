import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/HeroSection.css';
import calendarImage from '../assets/calendar.jpg'; // Putanja do slike kalendara

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/register');
  };

  const handleLogin = () => {
    navigate('/login');
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
          <button className="hero-button" onClick={handleLogin}>Login</button>
        </div>
      </header>
      <div className="hero-content">
        <div className="text-content">
          <h2 className="title">Student Calendar</h2>
          <p className="motto">Transform the way you manage your time - study efficiently, stay organized and achieve success!</p>
          <div className="description">
            <p>📚 Keep track of your classes, assignments, and exams with ease.</p>
            <p>📅 Start Planning Smarter Today! </p>
            <p>✍️ Sign up now and take control of your academic journey.</p>
          </div>
        </div>
        <div className="image-content">
          <img src={calendarImage} alt="Student using calendar" className="calendar-image" />
        </div>
      </div>
      <footer className="hero-footer">
        <div className="footer-left">
          &copy; 2025 StudyTrack
        </div>
        <div className="footer-right">
          <h3>Contact Us</h3>
          <p>Email: studytrack@gmail.com</p>
          <p>Address: Rankeova 5, Belgrade</p>
          <p>Phone: +38161246444</p>
        </div>
      </footer>
    </div>
  );
};

export default HeroSection;