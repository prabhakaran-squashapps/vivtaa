import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authAPI } from '../services/api';
import { useAuth } from '../hooks/useAuth';

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
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white py-4 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row justify-between items-center gap-4">
          <div className="flex flex-col text-center lg:text-left">
            <span className="text-xl lg:text-2xl font-bold text-black tracking-wider">FITZDO</span>
            <span className="text-xs text-gray-600 tracking-wide -mt-1">& BUSINESS</span>
          </div>
          <div className="flex items-center gap-4 lg:gap-6">
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
              <img src="/images/in.png" alt="EN" className="w-4 lg:w-5 h-3 lg:h-4 rounded-sm" /> <span>IN</span>
            </div>
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
              <img src="/images/lang.png" alt="EN" className="w-4 lg:w-5 h-3 lg:h-4 rounded-sm" />
              <span>EN</span>
            </div>
            <div className="flex items-center gap-2 text-xs lg:text-sm text-gray-600">
              <span className="hidden sm:block">Fitzdo Is Secure</span>
              <span className="text-base">🔒</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex justify-center items-center min-h-[calc(100vh-80px)] p-4 lg:p-8 bg-white">
        <div className="text-center max-w-sm lg:max-w-md w-full">
          {/* Logo */}
          <div className="mb-8 lg:mb-12">
             <img src="/images/fitzdo-circle.webp" alt="Fitzdo" className="w-32 lg:w-48 h-auto max-w-full mx-auto" />
          </div>

          {/* Form */}
          <div className="bg-white p-6 lg:p-10 rounded-lg shadow-lg">
            <h2 className="text-xl lg:text-2xl font-semibold text-gray-800 mb-6 lg:mb-8 text-center">Login to your Account</h2>
            
            <form onSubmit={handleSubmit}>
              <div className="mb-4 lg:mb-6 text-left">
                <label className="block text-sm text-gray-800 mb-2 font-medium">
                  Email - ID <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-3 lg:px-4 py-2 lg:py-3 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
                  placeholder="Enter Your Email - ID"
                />
              </div>

              <div className="mb-4 lg:mb-6 text-left">
                <label className="block text-sm text-gray-800 mb-2 font-medium">
                  Enter Your Password <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 lg:px-4 py-2 lg:py-3 pr-10 lg:pr-12 border border-gray-300 rounded text-sm text-gray-800 bg-white focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 placeholder-gray-400"
                    placeholder="Enter Your Password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-2 lg:right-3 top-1/2 transform -translate-y-1/2 bg-none border-none cursor-pointer text-sm lg:text-base text-gray-600"
                  >
                    {showPassword ? '👁️' : '👁️🗨️'}
                  </button>
                </div>
              </div>

              {error && (
                <div className="text-red-500 text-sm text-center my-4">{error}</div>
              )}

              <div className="mt-4 text-left">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-4 lg:px-5 py-2 bg-black text-white border border-black rounded-sm text-xs font-medium cursor-pointer hover:bg-gray-800 disabled:opacity-50"
                >
                  {loading ? 'Logging in...' : 'Login'}
                </button>
              </div>
            </form>

            <div className="mt-4 lg:mt-6 text-sm text-gray-600">
              <span>Don't have an account? </span>
              <Link to="/register" className="text-blue-600 no-underline hover:underline">
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