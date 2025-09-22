import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    fetch('http://localhost:8000/api/notifications', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNotifications(data))
      .catch((err) => console.error('Failed to fetch notifications:', err));
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
const token = localStorage.getItem('token');
  fetch(`http://localhost:8000/api/notifications/${id}/read`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Failed to mark as read');
      }
    })
    .catch((err) => console.error(err));
  };

  const handleSnooze = (id) => {
    const snoozedNotification = notifications.find((notification) => notification.id === id);
    if (snoozedNotification) {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );
      setTimeout(() => {
        setNotifications((prevNotifications) => [...prevNotifications, snoozedNotification]);
      }, 3600000); // 1h
    }
  };

  const handleDismiss = (id) => {
    const token = localStorage.getItem('token');
    fetch(`http://localhost:8000/api/notifications/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (res.ok) {
        setNotifications((prevNotifications) =>
          prevNotifications.filter((notification) => notification.id !== id)
        );
      } else {
        throw new Error('Failed to delete notification');
      }
    })
    .catch((err) => console.error(err));
  };

  return (
    <div className="notifications">
      <Navbar />
      <div className="notifications-container">
        <h2>Notifications</h2>
        <ul className="notifications-list">
          {notifications.length === 0 ? (
            <li>No notifications found.</li>
          ) : (
            notifications.map((notification) => (
              <li
                key={notification.id}
                className={`notification-item ${notification.read ? 'read' : ''}`}
              >
                <div className="notification-content">
                  <p className="notification-message">{notification.content}</p>
                  {/* Prikaži vreme ako ga imaš u backendu */}
                  <span className="notification-time">
                    {notification.send_time
                      ? new Date(notification.send_time).toLocaleString()
                      : ''}
                  </span>
                </div>
                <div className="notification-actions">
                  <button
                    className="notification-button mark-as-read"
                    onClick={() => handleMarkAsRead(notification.id)}
                  >
                    Mark as Read
                  </button>
                  <button
                    className="notification-button snooze"
                    onClick={() => handleSnooze(notification.id)}
                  >
                    Snooze
                  </button>
                  <button
                    className="notification-button dismiss"
                    onClick={() => handleDismiss(notification.id)}
                  >
                    Dismiss
                  </button>
                </div>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;