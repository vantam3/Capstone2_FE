import React, { useState } from 'react';
import { FiMail, FiArrowLeft, FiLock, FiEye, FiEyeOff, FiKey } from 'react-icons/fi';

function ResetPassword() {
  // State for UI
  const [step, setStep] = useState(1); // 1: Request code, 2: Verify code & reset password
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Dummy state for demo
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // State for errors
  const [errors, setErrors] = useState({
    email: '',
    verificationCode: '',
    newPassword: '',
    confirmPassword: ''
  });

  // Handle request code (just for UI demo)
  const handleRequestCode = (e) => {
    e.preventDefault();
    if (email) {
      setStep(2);
    }
  };

  // Handle reset password (just for UI demo)
  const handleResetPassword = (e) => {
    e.preventDefault();

    if (!newPassword || newPassword !== confirmPassword) {
      setErrors({
        ...errors,
        confirmPassword: 'Passwords do not match.'
      });
      return;
    }

    alert('Password reset successful!');
    // Proceed with real API call
  };

  // Handle input change for various fields
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'verificationCode') {
      setVerificationCode(value.replace(/[^0-9]/g, ''));
    } else if (name === 'newPassword') {
      setNewPassword(value);
    } else if (name === 'confirmPassword') {
      setConfirmPassword(value);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-yellow-400 to-red-500 px-4 py-12">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <a 
          href="#" 
          className="inline-flex items-center text-sm text-gray-600 hover:text-yellow-600 mb-6"
        >
          <FiArrowLeft className="mr-2" /> Back to login
        </a>
        
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-2">Reset Password</h1>
        
        {step === 1 ? (
          <p className="text-center text-gray-600 mb-6">
            Enter your email address and we'll send you a verification code
          </p>
        ) : (
          <p className="text-center text-gray-600 mb-6">
            Enter the verification code sent to <span className="font-medium">{email}</span>
          </p>
        )}
        
        {step === 1 ? (
          // Step 1: Request verification code
          <form onSubmit={handleRequestCode} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Send Verification Code
            </button>
          </form>
        ) : (
          // Step 2: Enter verification code and new password
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <label htmlFor="verificationCode" className="block text-sm font-medium text-gray-700">
                  Verification Code
                </label>
                <button
                  type="button"
                  className="text-xs text-blue-600 hover:text-blue-700"
                >
                  Resend Code
                </button>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiKey className="text-gray-400" />
                </div>
                <input
                  id="verificationCode"
                  name="verificationCode"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  value={verificationCode}
                  onChange={handleChange}  
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 tracking-widest font-mono text-center"
                  required
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="newPassword"
                  name="newPassword"
                  type={showPassword ? 'text' : 'password'}
                  value={newPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
              <p className="mt-1 text-xs text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>
            
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                Confirm New Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiLock className="text-gray-400" />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black-500"
                  required
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="flex-1 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 transition duration-200"
              >
                Back
              </button>
              
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
              >
                Reset Password
              </button>
            </div>
          </form>
        )}
        
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Remember your password?{' '}
            <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
              Sign in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ResetPassword;
