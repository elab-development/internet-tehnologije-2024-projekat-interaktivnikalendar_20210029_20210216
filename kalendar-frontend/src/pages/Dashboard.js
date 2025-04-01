import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  const [newActivity, setNewActivity] = useState({
    name: '',
    description: '',
    type: 'Exam',
    startDate: '',
    startTime: '',
    endDate: '',
    endTime: '',
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer); // Čisti interval kada se komponenta demontira
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewActivity({ ...newActivity, [name]: value });
  };

  const handleSave = () => {
    console.log('New Activity:', newActivity);
    setShowPopup(false);
  };

  const handleCancel = () => {
    setShowPopup(false);
  };

  const events = [
    { title: 'Exam: Projektovanje softvera', date: '2025-03-25' },
    { title: 'Exercise: ITEH', date: '2025-03-26' },
    { title: 'Project: Web Development', date: '2025-03-26' },
    { title: 'Exam: Simulacija i simulacioni jezici', date: '2025-03-27' },
  ];

  return (
    <div className="dashboard">
      <Navbar />
      <div className="dashboard-content">
        <div>
          <div className="welcome-panel">
            <h2>Hello, username!</h2>
            <p>Success starts with good planning – let’s go!</p>
          </div>
          <div className="time-panel">
            <h3>Current Time</h3>
            <p>{currentTime.toLocaleTimeString()}</p>
          </div>
          <button className="new-activity-button" onClick={() => setShowPopup(true)}>
            + New Activity
          </button>
        </div>
        <div className="calendar-panel">
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={events}
            dateClick={(info) => console.log(info.date)}
            height="540px"
          />
        </div>
      </div>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>New Activity</h2>
            <div className="popup-content">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={newActivity.name}
                onChange={handleInputChange}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={newActivity.description}
                onChange={handleInputChange}
              />
              <label>Type</label>
              <select
                name="type"
                value={newActivity.type}
                onChange={handleInputChange}
              >
                <option value="Exam">Exam</option>
                <option value="Lecture">Lecture</option>
                <option value="Exercise">Exercise</option>
                <option value="Project">Project</option>
              </select>
              <label>Scheduling</label>
              <div className="date-picker-container">
                <div>
                  <label>Start Date</label>
                  <input
                    type="date"
                    name="startDate"
                    value={newActivity.startDate}
                    onChange={handleInputChange}
                  />
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={newActivity.startTime}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={newActivity.endDate}
                    onChange={handleInputChange}
                  />
                  <label>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={newActivity.endTime}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="popup-actions">
              <button onClick={handleCancel}>Cancel</button>
              <button onClick={handleSave}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;