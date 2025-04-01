import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar.js';
import '../styles/Activities.css';

const Activities = ({ activities, setActivities }) => {
  const { id } = useParams();
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);

  useEffect(() => {
    if (id) {
      const activity = activities.find((activity) => activity.id === parseInt(id));
      setSelectedActivity(activity || null);
    } else {
      setSelectedActivity(null);
    }
  }, [id, activities]);

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity); // Postavlja selektovanu aktivnost
  };

  const handleCloseDetails = () => {
    setSelectedActivity(null); // Resetuje selektovanu aktivnost
  };

  const handleEditActivity = () => {
    setEditedActivity({
      ...selectedActivity,
      startTime: selectedActivity.startTime,
      endTime: selectedActivity.endTime,
    });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    const updatedActivities = activities.map((activity) =>
      activity.id === editedActivity.id ? editedActivity : activity
    );

    setActivities(updatedActivities);

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
      <div className="filter-buttons">
        <button onClick={() => handleFilterChange('All')}>All</button>
        <button onClick={() => handleFilterChange('Exam')}>Exams</button>
        <button onClick={() => handleFilterChange('Lecture')}>Lectures</button>
        <button onClick={() => handleFilterChange('Exercise')}>Exercises</button>
        <button onClick={() => handleFilterChange('Project')}>Projects</button>
      </div>

      <div className="activities-container">
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

        {/* Prikaz detalja aktivnosti */}
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