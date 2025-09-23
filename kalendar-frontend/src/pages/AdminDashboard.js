import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
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

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [userStats, setUserStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 5;
  const [sortOrder, setSortOrder] = useState('asc'); // Dodato za sortiranje
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      try {
        const userResponse = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (userResponse.ok) {
          const userData = await userResponse.json();
          if (userData.role !== 'admin') {
            navigate('/student-dashboard');
            return;
          }
        } else {
          navigate('/login');
          return;
        }
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
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [navigate]);

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
        setUsers(users.filter((user) => user.id !== userId));
      } else {
        console.error('Failed to delete user');
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // SORTIRANJE PO IMENU PRE PAGINACIJE
  const sortedUsers = [...users].sort((a, b) => {
    if (sortOrder === 'asc') {
      return a.name.localeCompare(b.name);
    } else {
      return b.name.localeCompare(a.name);
    }
  });
  const totalPages = Math.ceil(sortedUsers.length / usersPerPage);
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (pageNumber) => {
    if (pageNumber < 1 || pageNumber > totalPages) return;
    setCurrentPage(pageNumber);
  };

  // Helper for modern pagination with ellipsis
  const getPagination = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage > 2) {
        pages.push(1);
        if (currentPage > 3) pages.push('ellipsis-prev');
      }
      for (
        let i = Math.max(2, currentPage - 1);
        i <= Math.min(totalPages - 1, currentPage + 1);
        i++
      ) {
        pages.push(i);
      }
      if (currentPage < totalPages - 1) {
        if (currentPage < totalPages - 2) pages.push('ellipsis-next');
        pages.push(totalPages);
      }
    }
    return pages;
  };

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

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="admin-dashboard">
      <Navbar />
      <div className="admin-dashboard-container">
        <h1>Admin Dashboard</h1>
        <div className="admin-dashboard-content">
          <div className="manage-users-section">
            {/* HEADER SA DROPDOWN SORTIRANJEM */}
            <div className="manage-users-header">
              <h2>Manage Users</h2>
              <div className="sort-dropdown">
                <label htmlFor="sortOrder" style={{ marginRight: '6px' }}>Sort:</label>
                <select
                  id="sortOrder"
                  value={sortOrder}
                  onChange={e => setSortOrder(e.target.value)}
                >
                  <option value="asc">A - Z</option>
                  <option value="desc">Z - A</option>
                </select>
              </div>
            </div>
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
                {currentUsers.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <button onClick={() => handleDeleteUser(user.id)}>Delete</button>
                      <button>Update</button>
                      <button onClick={() => navigate(`/activities?studentId=${user.id}`, { state: { studentName: user.name } })}>
                        View Activities
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* MODERN PAGINATION */}
            <div className="pagination">
              <button
                onClick={() => handlePageChange(1)}
                disabled={currentPage === 1}
                className="arrow"
                title="First"
              >
                &#171;
              </button>
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="arrow"
                title="Previous"
              >
                &#60;
              </button>
              {getPagination().map((item, idx) =>
                typeof item === 'number' ? (
                  <button
                    key={item}
                    onClick={() => handlePageChange(item)}
                    className={currentPage === item ? 'active' : ''}
                  >
                    {item}
                  </button>
                ) : (
                  <span key={item + idx} className="pagination-ellipsis">...</span>
                )
              )}
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="arrow"
                title="Next"
              >
                &#62;
              </button>
              <button
                onClick={() => handlePageChange(totalPages)}
                disabled={currentPage === totalPages}
                className="arrow"
                title="Last"
              >
                &#187;
              </button>
            </div>
          </div>
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