import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Activities.css';

const Activities = () => {
  const [activities, setActivities] = useState([
    {
      id: 1,
      name: 'Math Exam',
      type: 'Exam',
      startDate: '2025-04-10',
      endDate: '2025-04-10',
      startTime: '10:00 AM',
      endTime: '12:00 PM',
      description: 'Final math exam for the semester.',
    },
    {
      id: 2,
      name: 'Project Meeting',
      type: 'Project',
      startDate: '2025-04-12',
      endDate: '2025-04-12',
      startTime: '2:00 PM',
      endTime: '3:00 PM',
      description: 'Meeting with the project team to discuss progress.',
    },
    {
      id: 3,
      name: 'ITEH Lecture',
      type: 'Lecture',
      startDate: '2025-04-15',
      endDate: '2025-04-15',
      startTime: '6:00 PM',
      endTime: '7:00 PM',
      description: 'Lecture on Internet Technologies.',
    },
    {
      id: 4,
      name: 'Simulacije i simulacioni jezici',
      type: 'Exercise',
      startDate: '2025-04-20',
      endDate: '2025-04-20',
      startTime: '5:00 PM',
      endTime: '6:00 PM',
      description: null,
    },
  ]);

  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);

  // Funkcija za konverziju vremena u 24-časovni format
  const convertTo24HourFormat = (time) => {
    const [hours, minutesPart] = time.split(':');
    const [minutes, period] = minutesPart.split(' ');
    let hours24 = parseInt(hours, 10);

    if (period === 'PM' && hours24 !== 12) {
      hours24 += 12;
    } else if (period === 'AM' && hours24 === 12) {
      hours24 = 0;
    }

    return `${hours24.toString().padStart(2, '0')}:${minutes}`;
  };

  // Funkcija za konverziju vremena u 12-časovni format
  const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const hours12 = (hours % 12) || 12;
    const period = hours >= 12 ? 'PM' : 'AM';
    return `${hours12}:${minutes} ${period}`;
  };

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseDetails = () => {
    setSelectedActivity(null);
  };

  const handleEditActivity = () => {
    setEditedActivity({
      ...selectedActivity,
      startTime: convertTo24HourFormat(selectedActivity.startTime),
      endTime: convertTo24HourFormat(selectedActivity.endTime),
    });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    const updatedActivities = activities.map((activity) =>
      activity.id === editedActivity.id
        ? {
            ...editedActivity,
            startTime: convertTo12HourFormat(editedActivity.startTime),
            endTime: convertTo12HourFormat(editedActivity.endTime),
          }
        : activity
    );
  
    setActivities(updatedActivities);
  
    // Ažurira automatski selektovanu aktivnost nakon izmene
    setSelectedActivity(
      updatedActivities.find((activity) => activity.id === editedActivity.id)
    );
  
    setShowEditPopup(false);
    setEditedActivity(null);
  };

  const handleCancelEdit = () => {
    setShowEditPopup(false);
    setEditedActivity(null);
  };

  const handleEditInputChange = (e) => {
    const { name, value } = e.target;
    setEditedActivity((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteActivity = () => {
    setActivities((prevActivities) =>
      prevActivities.filter((activity) => activity.id !== selectedActivity.id)
    );
    setSelectedActivity(null);
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredActivities =
    filter === 'All'
      ? activities
      : activities.filter((activity) => activity.type === filter);

  return (
    <div className="activities">
      <Navbar />
      {/* Dugmad za filtriranje */}
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Exam')}>Exams</button>
        <button onClick={() => handleFilterChange('Lecture')}>Lectures</button>
        <button onClick={() => handleFilterChange('Exercise')}>Exercises</button>
        <button onClick={() => handleFilterChange('Project')}>Projects</button>
      </div>

      <div className="activities-container">
        {/* Leva strana: Lista aktivnosti */}
        <div className="activities-list">
          <h2>All Activities</h2>
          <ul>
            {filteredActivities.map((activity) => (
              <li
                key={activity.id}
                className="activity-item"
                onClick={() => handleSelectActivity(activity)}
              >
                {activity.name}
              </li>
            ))}
          </ul>
        </div>

        {/* Desna strana: Detalji aktivnosti */}
        {selectedActivity && (
          <div className="activity-details">
            <div className="activity-details-header">
              <h2>Activity Details</h2>
              <div className="activity-details-actions">
                <button onClick={handleEditActivity} className="edit-button">
                  ✏️
                </button>
                <button onClick={handleDeleteActivity} className="delete-button">
                  🗑️
                </button>
                <button onClick={handleCloseDetails} className="close-button">
                  ❌
                </button>
              </div>
            </div>
            <div className="activity-details-content">
              <p><strong>Name:</strong> {selectedActivity.name}</p>
              <p><strong>Type:</strong> {selectedActivity.type}</p>
              <p><strong>Start Date:</strong> {selectedActivity.startDate}</p>
              <p><strong>End Date:</strong> {selectedActivity.endDate}</p>
              <p><strong>Start Time:</strong> {selectedActivity.startTime}</p>
              <p><strong>End Time:</strong> {selectedActivity.endTime}</p>
              <p>
                <strong>Description:</strong>{' '}
                {selectedActivity.description ? selectedActivity.description : 'No description'}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Popup za uređivanje */}
      {showEditPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Edit Activity</h2>
            <div className="popup-content">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editedActivity.name || ''}
                onChange={handleEditInputChange}
              />
              <label>Description</label>
              <textarea
                name="description"
                value={editedActivity.description || ''}
                onChange={handleEditInputChange}
              />
              <label>Type</label>
              <select
                name="type"
                value={editedActivity.type || ''}
                onChange={handleEditInputChange}
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
                    value={editedActivity.startDate || ''}
                    onChange={handleEditInputChange}
                  />
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={editedActivity.startTime || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                    type="date"
                    name="endDate"
                    value={editedActivity.endDate || ''}
                    onChange={handleEditInputChange}
                  />
                  <label>End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={editedActivity.endTime || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
              </div>
            </div>
            <div className="popup-actions">
              <button onClick={handleCancelEdit}>Cancel</button>
              <button onClick={handleSaveEdit}>Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Activities;