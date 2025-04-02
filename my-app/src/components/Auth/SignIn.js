import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';
import authService from '../../services/authService';

function SignIn() {
  // State management
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
    
    // Clear field-specific error when user types
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    
    // Email validation
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    
    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setAuthError('');
    
    // Validate form before submission
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      const success = await authService.signIn(
        formData.email, 
        formData.password,
        formData.rememberMe
      );
      
      if (success) {
        navigate('/');
      } else {
        setAuthError('Invalid email or password');
      }
    } catch (error) {
      setAuthError(error.message || 'An error occurred during sign in');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle social login
  const handleSocialLogin = async (provider) => {
    setIsLoading(true);
    setAuthError('');
    
    try {
      const success = await authService.socialSignIn(provider);
      if (success) {
        navigate('/');
      } else {
        setAuthError(`Could not sign in with ${provider}`);
      }
    } catch (error) {
      setAuthError(error.message || `An error occurred during ${provider} sign in`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md transition-all">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">SpeakPro</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Intelligent English Speaking Assistant</p>
        
        {authError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <span>{authError}</span>
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiMail className="text-gray-400" />
              </div>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.email ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-700`}
              />
              {errors.email && <span className="text-sm text-red-500">{errors.email}</span>}
            </div>
          </div>
          
          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiLock className="text-gray-400" />
              </div>
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2 border ${
                  errors.password ? 'border-red-500 dark:border-red-400' : 'border-gray-300 dark:border-gray-600'
                } rounded-lg bg-white dark:bg-gray-700`}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <FiEyeOff className="text-gray-400" /> : <FiEye className="text-gray-400" />}
              </div>
              {errors.password && <span className="text-sm text-red-500">{errors.password}</span>}
            </div>
          </div>
          
          {/* Remember me */}
          <div className="flex items-center">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formData.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 text-indigo-600 border-gray-300 rounded"
            />
            <label htmlFor="rememberMe" className="ml-2 text-sm text-gray-600 dark:text-gray-300">Remember me</label>
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
          
          {/* Social login */}
          <div className="flex items-center justify-center space-x-4 mt-4">
            <button
              onClick={() => handleSocialLogin('google')}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <FcGoogle size={24} />
            </button>
            <button
              onClick={() => handleSocialLogin('github')}
              className="p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
            >
              <FaGithub size={24} />
            </button>
          </div>

          {/* Forgot password link */}
          <div className="text-center mt-4">
            <Link to="/reset-password" className="text-sm text-indigo-600 hover:text-indigo-700">
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
