import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar'; // Navbar komponenta
import '../styles/AdminDashboard.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

// Registruj potrebne komponente za Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]); // Stanje za korisnike
  const [userStats, setUserStats] = useState({}); // Stanje za statistiku korisnika

  // Dohvati korisnike i statistiku sa backend-a
  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch('http://localhost:8000/api/users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          setUsers(data);
          setUserStats({
            totalUsers: data.length,
            activeUsers: data.filter((user) => user.is_active).length,
          });
        } else {
          console.error('Failed to fetch users');
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  // Funkcija za brisanje korisnika
  const handleDeleteUser = async (userId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://localhost:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        setUsers(users.filter((user) => user.id !== userId)); // Ažuriraj stanje nakon brisanja
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Podaci za grafikon
  const chartData = {
    labels: ['Total Users', 'Active Users'],
    datasets: [
      {
        label: 'User Statistics',
        data: [userStats.totalUsers, userStats.activeUsers],
        backgroundColor: ['#007bff', '#28a745'],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'User Statistics',
      },
    },
  };

  return (
    <div className="admin-dashboard">
      <Navbar /> {/* Navbar na vrhu stranice */}
      <div className="admin-dashboard-container">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard-content">
          {/* Sekcija za upravljanje korisnicima */}
          <div className="manage-users-section">
            <h2>Manage Users</h2>
            <table className="users-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      <button>Update</button>
                      <button>View Activities</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Sekcija za statistiku */}
          <div className="statistics-section">
            <h2>Statistics</h2>
            <Bar data={chartData} options={chartOptions} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;