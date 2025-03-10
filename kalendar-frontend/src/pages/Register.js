import React, { useEffect } from 'react';
import '../styles/Register.css';

const Register = () => {
    useEffect(() => {
        document.body.classList.add('register-page');
        return () => {
          document.body.classList.remove('register-page');
        };
      }, []);
  const handleSignUp = (e) => {
    e.preventDefault();
    // Handle sign up logic here
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
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Register;