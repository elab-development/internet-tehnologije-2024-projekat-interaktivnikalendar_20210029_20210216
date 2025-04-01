import React, { useState } from 'react';
import Navbar from '../components/Navbar.js';
import '../styles/Notifications.css';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, message: 'You have a new message from your professor.', time: '2 hours ago', read: false },
    { id: 2, message: 'Your assignment deadline is approaching.', time: '1 day ago', read: false },
    { id: 3, message: 'Your profile was updated successfully.', time: '3 days ago', read: false },
    { id: 4, message: 'New course materials are available.', time: '5 days ago', read: false },
    { id: 5, message: 'You have a new friend request.', time: '1 week ago', read: false },
    { id: 6, message: 'Your password was changed successfully.', time: '2 weeks ago', read: false },
    { id: 7, message: 'A new event has been scheduled.', time: '3 weeks ago', read: false },
    { id: 8, message: 'Your subscription is about to expire.', time: '1 month ago', read: false },
  ]);

  const handleMarkAsRead = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleSnooze = (id) => {
    const snoozedNotification = notifications.find((notification) => notification.id === id);

    if (snoozedNotification) {
      setNotifications((prevNotifications) =>
        prevNotifications.filter((notification) => notification.id !== id)
      );

      setTimeout(() => {
        setNotifications((prevNotifications) => [...prevNotifications, snoozedNotification]);
      },3600000); // 1h
    }
  };

  const handleDismiss = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="notifications">
      <Navbar />
      <div className="notifications-container">
        <h2>Notifications</h2>
        <ul className="notifications-list">
          {notifications.map((notification) => (
            <li
              key={notification.id}
              className={`notification-item ${notification.read ? 'read' : ''}`}
            >
              <div className="notification-content">
                <p className="notification-message">{notification.message}</p>
                <span className="notification-time">{notification.time}</span>
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
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Notifications;