import React, { useEffect, useState } from 'react';

const AdminNotifications = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:8000/api/notifications', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setNotifications(data);
    };

    fetchNotifications();
  }, []);

  return (
    <div>
      <h1>Admin Notifications</h1>
      <ul>
        {notifications.map((notification) => (
          <li key={notification.id}>{notification.message}</li>
        ))}
      </ul>
    </div>
  );
};

export default AdminNotifications;