import React from 'react';
import '../styles/HeroSection.css';
import calendarImage from '../assets/calendar-image.jpeg'; // Putanja do slike kalendara

const HeroSection = () => {
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
          <button className="hero-button">Get Started</button>
          <button className="hero-button">Login</button>
        </div>
      </header>
      <div className="hero-content">
        <div className="text-content">
          <h2 className="title">Student Calendar</h2>
          <p className="motto">Transform the way you manage your time - study efficiently, stay organized, and achieve success!</p>
          <h3 className="plan-schedule">Plan & Schedule</h3>
        </div>
        <div className="image-content">
          <img src={calendarImage} alt="Student using calendar" className="calendar-image" />
        </div>
      </div>
    </div>
  );
};

export default HeroSection;