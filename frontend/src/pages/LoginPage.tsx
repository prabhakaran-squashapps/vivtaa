import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await authAPI.login(email, password);
      login(response.data.token, response.data.user);
      navigate('/products');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      {/* Header */}
      <div className="login-header">
        <div className="login-header-content">
          <div className="login-logo">
            <span className="fitzdo-text">FITZDO</span>
            <span className="business-text">& BUSINESS</span>
          </div>
          <div className="login-header-right">
            <div className="language-selector">
              <img src="/images/in.png" alt="EN" className="flag-icon" /> <span>IN</span>
            </div>
            <div className="language-selector">
              <img src="/images/lang.png" alt="EN" className="flag-icon" />
              <span>EN</span>
            </div>
            <div className="secure-text">
              <span>Fitzdo Is Secure</span>
              <span className="lock-icon">🔒</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="login-main">
        <div className="login-form-container">
          {/* Logo */}
          <div className="login-main-logo">
             <img src="/images/fitzdo-circle.webp" alt="EN" className="flag-icon" />
          </div>

          {/* Form */}
          <div className="login-form-card">
            <h2 className="login-title">Login to your Account</h2>
            
            <form onSubmit={handleSubmit}>
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
                  placeholder="Enter Your Email - ID"
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
                    {showPassword ? '👁️' : '👁️‍🗨️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="error">{error}</div>
              )}

              <div className="form-actions">
                <button
                  type="submit"
                  disabled={loading}
                  className="login-button"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <div className="login-footer">
              <span>Don't have an account? </span>
              <Link to="/register" className="register-link">
                Sign up
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;