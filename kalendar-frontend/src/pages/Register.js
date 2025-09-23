import React, { useEffect } from 'react';
//import { useNavigate } from 'react-router-dom';
import '../styles/Register.css';

const Register = () => {
  useEffect(() => {
    document.body.classList.add('register-page');
    return () => {
      document.body.classList.remove('register-page');
    };
  }, []);

  //const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();

    const user = {
      name: e.target.name.value,
      email: e.target.email.value,
      password: e.target.password.value,
      password_confirmation: e.target.password_confirmation.value,
    };

    try {
      console.log('Sending registration request with data:', user);
      
      const response = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify(user),
      });

      console.log('Response status:', response.status);
      console.log('Response content-type:', response.headers.get('content-type'));

      // da li je response HTML umesto JSON
      const contentType = response.headers.get('content-type');
      if (!contentType || !contentType.includes('application/json')) {
        const responseText = await response.text();
        console.error('Server returned HTML instead of JSON:', responseText);
        alert('Server error: Backend is not responding properly. Please check if Laravel server is running on port 8000.');
        return;
      }

      if (response.ok) {
        const data = await response.json();
        console.log('User registered successfully:', data);
        
        
        localStorage.setItem('token', data.access_token);

        
        localStorage.setItem('user', JSON.stringify(data.user));

        console.log('Token saved, redirecting to dashboard...');

        
        if (data.user && data.user.role === 'admin') {
          window.location.href = '/admin-dashboard';
        } else {
          window.location.href = '/student-dashboard';
        }
      } else {
        const errorData = await response.json();
        console.error('Registration failed:', errorData);
        
        if (errorData.errors) {
          const errorMessages = Object.values(errorData.errors).flat().join('\n');
          alert('Registration failed:\n' + errorMessages);
        } else {
          alert('Registration failed: ' + (errorData.message || 'Unknown error'));
        }
      }
    } catch (error) {
      console.error('Network or other error:', error);
      
      if (error.message.includes('Unexpected token')) {
        alert('Backend server error: Please make sure Laravel server is running on http://localhost:8000');
      } else {
        alert(`An error occurred: ${error.message}`);
      }
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