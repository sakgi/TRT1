import React, { useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import './ForgotPassword.css';

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!captchaValue) {
      alert("Please complete the CAPTCHA");
      return;
    }
    // Implement forgot password logic here
    console.log("Email:", email);
  };

  const handleCaptchaChange = (value) => {
    setCaptchaValue(value);
    console.log("Captcha value:", value);
  };

  return (
    <div className="forgot-password-page">
      {/* Header Section */}
      <header className="forgot-password-header">
        <h1>Reset Your Password</h1>
        <p>Please enter your email to receive password reset instructions.</p>
      </header>

      {/* Main Form Section */}
      <div className="container">
        <div className="card">
          <h2 className="card-title">Forgot Password</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter your email:</label>
              <input
                type="email"
                id="email"
                className="input-field"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            {/* CAPTCHA Section */}
            <div className="captcha-container">
              <ReCAPTCHA
                sitekey="your-site-key" // Replace with your actual reCAPTCHA site key
                onChange={handleCaptchaChange}
              />
            </div>

            <button type="submit" className="button">Submit</button>
          </form>
          <a href="/" className="link">Go back to Login</a>
        </div>
      </div>
    </div>
  );
}

export default ForgotPassword;
