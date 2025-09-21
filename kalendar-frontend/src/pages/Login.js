import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { FiEye, FiEyeOff } from "react-icons/fi";

const Login = () => {
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('User logged in successfully:', data);

        localStorage.setItem('token', data.access_token);

        const userResponse = await fetch('http://localhost:8000/api/user', {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
          },
        });

        if (userResponse.ok) {
          const userData = await userResponse.json();
          console.log('User data:', userData);

          // Preusmeri na odgovarajući dashboard na osnovu uloge
          if (userData.role === 'admin') {
            window.location.href = '/admin-dashboard';
          } else if (userData.role === 'student') {
            window.location.href = '/student-dashboard';
          } else {
            console.error('Unknown user role:', userData.role);
            alert('Unknown user role. Please contact support.');
          }
        } else {
          console.error('Failed to fetch user data');
          alert('Failed to fetch user data');
        }
      } else {
        console.error('Login failed');
        alert('Invalid email or password');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <div style={{ position: 'relative' }}>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              style={{
                position: "absolute",
                right: "10px",
                top: "50%",
                transform: "translateY(-50%)",
                cursor: "pointer",
                userSelect: "none",
                fontSize: "1.3em"
              }}
              title={showPassword ? "Sakrij lozinku" : "Prikaži lozinku"}
            >
              {showPassword ? <FiEye /> : <FiEyeOff />}
            </span>
          </div>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;