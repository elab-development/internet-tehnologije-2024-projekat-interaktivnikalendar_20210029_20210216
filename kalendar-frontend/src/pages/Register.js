import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password.value,
    };

    try {
      const response = await fetch('http://localhost:8000/api/register', { // Zameni sa URL-om svog backend-a
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        // Ako je registracija uspešna
        console.log('User registered successfully');
        navigate('/dashboard'); // Preusmeri na Home stranicu
      } else {
        // Ako je registracija neuspešna
        const errorData = await response.json();
        console.error('Registration failed:', errorData.message);
        alert('Registration failed: ' + errorData.message);
      }
    } catch (error) {
      console.error('Error:', error);
      alert(`An error occurred: ${error.message}`);
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up</h1>
      <h2>Create your account</h2>
      <form onSubmit={handleSignUp}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" required />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" required />
        </div>
        <div className="form-group">
    <label htmlFor="password_confirmation">Confirm Password</label>
    <input
      type="password"
      id="password_confirmation"
      name="password_confirmation"
      required
    />
  </div>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;