import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Login.css';

const Login = () => {
  // Dodavanje klase za stilizaciju stranice
  useEffect(() => {
    document.body.classList.add('login-page');
    return () => {
      document.body.classList.remove('login-page');
    };
  }, []);

  // Stanja za email i lozinku
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  // Funkcija za obradu prijave
  const handleLogin = async (e) => {
    e.preventDefault();

    const user = { email, password };

    try {
      // Slanje POST zahteva na backend za prijavu
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

        // Sačuvaj token u localStorage
        localStorage.setItem('token', data.access_token);

        // Dohvati podatke o korisniku sa /user rute
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
            navigate('/admin-dashboard');
          } else if (userData.role === 'student') {
            navigate('/student-dashboard');
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
          <input
            type="password"
            id="password"
            name="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;