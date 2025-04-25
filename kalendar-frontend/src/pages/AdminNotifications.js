import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Dodata Navbar komponenta
import '../styles/AdminNotifications.css';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]); // Stanje za postojeće notifikacije
  const [message, setMessage] = useState(''); // Stanje za novu notifikaciju
  const [userId, setUserId] = useState(''); // Stanje za ID korisnika
  const [users, setUsers] = useState([]); // Stanje za listu korisnika

  // Dohvati postojeće notifikacije i korisnike
  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/notifications', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setNotifications(data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchNotifications();
    fetchUsers();
  }, []);

  // Funkcija za slanje nove notifikacije
  const handleSendNotification = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://localhost:8000/api/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message, user_id: userId }),
      });

      if (response.ok) {
        const newNotification = await response.json();
        setNotifications((prev) => [newNotification, ...prev]); // Dodaj novu notifikaciju na vrh liste
        setMessage(''); // Resetuj polje za unos poruke
        setUserId(''); // Resetuj polje za korisnika
        alert('Notification sent successfully!');
      } else {
        alert('Failed to send notification.');
      }
    } catch (error) {
      console.error('Error sending notification:', error);
      alert('An error occurred while sending the notification.');
    }
  };

  return (
    <div className="admin-notifications-container">
      {/* Navbar */}
      <Navbar />

      <h1>Admin Notifications</h1>

      {/* Forma za slanje notifikacija */}
      <div className="send-notification-form">
        <h2>Send Notification</h2>
        <form onSubmit={handleSendNotification}>
          <div className="form-group">
            <label htmlFor="user">Select User</label>
            <select
              id="user"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            >
              <option value="">-- Select User --</option>
              {users.map((user) => (
                <option key={user.id} value={user.id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your notification message here..."
              required
            ></textarea>
          </div>
          <button type="submit">Send Notification</button>
        </form>
      </div>

      {/* Lista postojećih notifikacija */}
      <div className="notifications-list">
        <h2>Existing Notifications</h2>
        <ul>
  {notifications.length > 0 ? (
    notifications.map((notification) => (
      <li key={notification.id}>
        <strong>
          {notification.user ? notification.user.name : 'Unknown User'}:
        </strong>{' '}
        {notification.message}
      </li>
    ))
  ) : (
    <p>No notifications found.</p>
  )}
</ul>
      </div>
    </div>
  );
};

export default AdminNotifications;