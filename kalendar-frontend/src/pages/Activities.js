import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Activities.css';
import { useParams, useLocation } from 'react-router-dom';

function formatDate(dateString) {
  if (!dateString) return '';
  // Ako je već u formatu yyyy-MM-dd, vrati ga
  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) return dateString;
  // Inače, izvuci samo datum iz "2025-09-24 00:00:00"
  return dateString.split('T')[0].split(' ')[0];
}

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const { id } = useParams();
  const location = useLocation();
  const studentName = location.state?.studentName;
  const queryParams = new URLSearchParams(location.search);
  const studentId = queryParams.get('studentId');
  const [selectedActivity, setSelectedActivity] = useState(null);
  const [filter, setFilter] = useState('All');
  const [showEditPopup, setShowEditPopup] = useState(false);
  const [editedActivity, setEditedActivity] = useState(null);
  const role = localStorage.getItem('role');

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    let url = 'http://localhost:8000/api/activities';
    if (studentId) {
      url += `?studentId=${studentId}`;
    }
    fetch(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => setActivities(data))
      .catch((err) => console.error('Failed to fetch activities:', err));
  }, [studentId]);

  
  useEffect(() => {
    if (id) {
      const activity = activities.find((activity) => activity.id === parseInt(id));
      setSelectedActivity(activity || null);
    } else {
      setSelectedActivity(null);
    }
  }, [id, activities]);

  const handleSelectActivity = (activity) => {
    setSelectedActivity(activity);
  };

  const handleCloseDetails = () => {
    setSelectedActivity(null);
  };

  const handleEditActivity = () => {
    setEditedActivity({
      ...selectedActivity,
      start_date: selectedActivity.start_date,
      end_date: selectedActivity.end_date,
      start_time: selectedActivity.start_time,
      end_time: selectedActivity.end_time,
    });
    setShowEditPopup(true);
  };

  const handleSaveEdit = () => {
    const token = localStorage.getItem('token');
    const payload = {
      ...editedActivity,
      start_date: editedActivity.start_date,
      end_date: editedActivity.end_date,
      start_time: editedActivity.start_time,
      end_time: editedActivity.end_time,
    };
    fetch(`http://localhost:8000/api/activities/${editedActivity.id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to update activity');
        return res.json();
      })
      .then((updated) => {
        setActivities((prev) =>
          prev.map((activity) =>
            activity.id === updated.id ? updated : activity
          )
        );
        setSelectedActivity(updated);
        setShowEditPopup(false);
        setEditedActivity(null);
      })
      .catch((err) => alert(err.message));
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
    if (!selectedActivity) return;
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/activities/${selectedActivity.id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error('Failed to delete activity');
        setActivities((prev) =>
          prev.filter((activity) => activity.id !== selectedActivity.id)
        );
        setSelectedActivity(null);
      })
      .catch((err) => alert(err.message));
  };

  const handleFilterChange = (type) => {
    setFilter(type);
  };

  const filteredActivities = activities.filter((activity) => {
    const byStudent = studentId ? activity.user_id === Number(studentId) : true;
    const byType = filter === 'All' ? true : activity.type === filter;
    return byStudent && byType;
  });

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
          <h2>
            {studentId
               ? `Activities for ${studentName ? studentName : `Student #${studentId}`}`
               : 'All Activities'}
          </h2>
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
                {role !== 'admin' && (
                  <>
                    <button onClick={handleEditActivity} className="edit-button">
                      ✏️
                    </button>
                    <button onClick={handleDeleteActivity} className="delete-button">
                      🗑️
                    </button>
                  </>
                )}
                <button onClick={handleCloseDetails} className="close-button">
                  ❌
                </button>
              </div>
            </div>
            <div className="activity-details-content">
              <p><strong>Name:</strong> {selectedActivity.name}</p>
              <p><strong>Type:</strong> {selectedActivity.type}</p>
              <p><strong>Start Date:</strong> {formatDate(selectedActivity.start_date)}</p>
              <p><strong>End Date:</strong> {formatDate(selectedActivity.end_date)}</p>
              <p><strong>Start Time:</strong> {selectedActivity.start_time}</p>
              <p><strong>End Time:</strong> {selectedActivity.end_time}</p>
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
                   name="start_date"
                   value={formatDate(editedActivity.start_date) || ''}
                   onChange={handleEditInputChange}
                  />
                  <label>Start Time</label>
                  <input
                    type="time"
                    name="start_time"
                    value={editedActivity.start_time || ''}
                    onChange={handleEditInputChange}
                  />
                </div>
                <div>
                  <label>End Date</label>
                  <input
                   type="date"
                   name="end_date"
                   value={formatDate(editedActivity.end_date) || ''}
                   onChange={handleEditInputChange}
                  />
                  <label>End Time</label>
                  <input
                    type="time"
                    name="end_time"
                    value={editedActivity.end_time || ''}
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