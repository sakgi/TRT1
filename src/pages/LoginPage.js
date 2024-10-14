import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For routing after login
import './LoginPage.css';

function LoginPage() {
  const [employeeId, setEmployeeId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    // Basic form validation
    if (!employeeId || !password) {
      setErrorMessage("Please enter both Employee ID and Password.");
      return;
    }

    // Simulated login validation (replace this with actual authentication logic)
    if (employeeId === 'admin' && password === 'admin123') {
      console.log("Admin logged in.");
      navigate('/admin-tickets/tickets'); // Redirect to Tickets page after successful login
    } else {
      setErrorMessage("Invalid Employee ID or Password.");
    }
  };

  return (
    <div className="login-page-container">
      <div className="login-page-image">
        {/* You can add content here if needed, such as an image description */}
      </div>
      <div className="login-page-form-container">
        <div className="login-page">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label htmlFor="employeeId">Enter Employee ID:</label>
              <input
                type="text"
                className="input-employee-id"
                id="employeeId"
                value={employeeId}
                onChange={(e) => setEmployeeId(e.target.value)}
                placeholder="e.g. admin"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="input-password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="********"
              />
            </div>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <button type="submit" className="login-button">Login</button>
          </form>
          <div className="register">
            <a href="/register">New User? Register</a>
            <a href="/forgot-password">Forgot Password</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
