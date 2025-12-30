import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      await authAPI.register(email, password);
      setSuccess('Registration successful! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Main Content */}
      <div className="login-main">
        <div className="login-form-container">
          {/* Logo */}
          <div className="login-main-logo">
             <img src="/images/fitzdo-circle.webp" alt="FITZDO Circle" className="flag-icon" />
          </div>

          {/* Form */}
          <div className="login-form-card">
            <h2 className="login-title">Register Account Here</h2>
            
            <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                <label className="form-label">
                  Email - ID <span className="required">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="login-input"
                  placeholder="Create Your Email - ID"
                />
              </div>

              <div className="form-group">
                <label className="form-label">
                  Enter Your Password <span className="required">*</span>
                </label>
                <div className="password-input-container">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    minLength={6}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="login-input password-input"
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="password-toggle"
                  >
                    {showPassword ? '👁️' : '👁️🗨️'}
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label className="checkbox-label">
                  <input type="checkbox" required className="checkbox" />
                  <span>By continuing, I agree to FITZDO's <Link to="#" className="register-link">Privacy Policy</Link> and <Link to="#" className="register-link">Terms of Use</Link></span>
                </label>
              </div>

              {error && (
                <div className="error">{error}</div>
              )}

              {success && (
                <div className="success">{success}</div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="login-button"
                >
                  {loading ? 'Registering...' : 'Register'}
                </button>
              </div>
            </form>

            <div className="login-footer">
              <span>Already have an account? </span>
              <Link to="/login" className="register-link">
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;