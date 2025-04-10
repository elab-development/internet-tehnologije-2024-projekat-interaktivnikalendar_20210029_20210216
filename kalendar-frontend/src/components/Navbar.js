import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import '../styles/Navbar.css';

const Navbar = () => {
  const [role, setRole] = useState(null); // Stanje za ulogu korisnika
  const navigate = useNavigate();
  const location = useLocation(); // Praćenje trenutne rute

  // Dohvati ulogu korisnika iz localStorage ili API-ja
  useEffect(() => {
    const fetchUserRole = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Ako nema tokena, preusmeri na login
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          const userData = await response.json();
          setRole(userData.role); // Postavi ulogu korisnika
        } else {
          console.error('Failed to fetch user data');
          navigate('/login'); // Ako je token nevažeći, preusmeri na login
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        navigate('/login');
      }
    };

    fetchUserRole();
  }, [navigate, location]); // Proveri ulogu svaki put kada se promeni ruta

  return (
    <nav className="navbar">
      <div className="logo-container">
        <h1 className="app-name">
          <span className="study">Study</span>
          <span className="track">Track</span>
        </h1>
      </div>
      <div className="nav-links">
        {role === 'admin' ? (
          // Linkovi za admina
          <>
            <Link to="/admin-dashboard" className="nav-link">Home</Link>
            <Link to="/activities" className="nav-link">Activities</Link>
            <Link to="/admin-notifications" className="nav-link">
              <i className="fas fa-bell"></i> Notifications
            </Link>
            <Link to="/profile" className="nav-link">
              <i className="fas fa-user"></i> Profile
            </Link>
          </>
        ) : (
          // Linkovi za studenta
          <>
            <Link to="/student-dashboard" className="nav-link">Home</Link>
            <Link to="/activities" className="nav-link">Activities</Link>
            <Link to="/notifications" className="nav-link">
              <i className="fas fa-bell"></i> Notifications
            </Link>
            <Link to="/profile" className="nav-link">
              <i className="fas fa-user"></i> Profile
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;