"use client"

import { useState } from "react"
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiAlertCircle } from "react-icons/fi"
import { FcGoogle } from "react-icons/fc"
import { FaGithub } from "react-icons/fa"

export default function SignUpPreview() {
  // State for password visibility
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  // Demo state for password strength
  const [password, setPassword] = useState("P@ssw0rd")
  const passwordStrength = 4

  // Demo state for form errors
  const [hasError, setHasError] = useState(false)

  // Toggle demo error
  const toggleError = () => setHasError(!hasError)

  // Helper function to render input fields
  const renderInput = ({
    id, label, type, value, onChange, placeholder, error, icon, showPassword = false, togglePassword
  }) => (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{label}</label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          id={id}
          name={id}
          type={showPassword ? "text" : type}
          className={`w-full pl-10 pr-4 py-2 border ${error ? 'border-red-500' : 'border-gray-300'} rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-green-400`}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        {togglePassword && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
            onClick={togglePassword}
          >
            {showPassword ? <FiEyeOff /> : <FiEye />}
          </button>
        )}
      </div>
      {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
    </div>
  )

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-xl w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-2">Create Account</h1>
        <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Join our community today</p>

        {hasError && (
          <div className="mb-4 p-3 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg flex items-center text-red-700 dark:text-red-400">
            <FiAlertCircle className="mr-2 flex-shrink-0" />
            <span>Email address is already in use</span>
          </div>
        )}

        <form className="space-y-4">
          {/* Name Fields */}
          <div className="grid grid-cols-2 gap-4">
            {renderInput({
              id: 'firstName',
              label: 'First Name',
              type: 'text',
              value: '',
              onChange: () => {},
              placeholder: 'First name',
              error: null,
              icon: <FiUser className="text-gray-400" />
            })}
            {renderInput({
              id: 'lastName',
              label: 'Last Name',
              type: 'text',
              value: '',
              onChange: () => {},
              placeholder: 'Last name',
              error: null,
              icon: <FiUser className="text-gray-400" />
            })}
          </div>

          {/* Email Field */}
          {renderInput({
            id: 'email',
            label: 'Email Address',
            type: 'email',
            value: '',
            onChange: () => {},
            placeholder: 'you@example.com',
            error: hasError ? "This email is already registered" : null,
            icon: <FiMail className="text-gray-400" />
          })}

          {/* Password Field */}
          {renderInput({
            id: 'password',
            label: 'Password',
            type: 'password',
            value: password,
            onChange: (e) => setPassword(e.target.value),
            placeholder: 'you password',
            error: null,
            icon: <FiLock className="text-gray-400" />,
            showPassword,
            togglePassword: () => setShowPassword(!showPassword)
          })}
          {/* Confirm Password Field */}
          {renderInput({
            id: 'confirmPassword',
            label: 'Confirm Password',
            type: 'password',
            value: password,
            onChange: () => {},
            placeholder: 'you password',
            error: null,
            icon: <FiLock className="text-gray-400" />,
            showPassword: showConfirmPassword,
            togglePassword: () => setShowConfirmPassword(!showConfirmPassword)
          })}

          {/* Terms and Conditions Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                defaultChecked={true}
                className="h-4 w-4 text-green-500 focus:ring-green-400 border-gray-300 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="agreeToTerms" className="font-medium text-gray-700 dark:text-gray-300">
                I agree to the{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Terms and Conditions
                </a>{" "}
                and{" "}
                <a href="#" className="text-blue-600 hover:text-blue-500">
                  Privacy Policy
                </a>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="button"
            className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onClick={toggleError}
          >
            Create Account
          </button>
        </form>

        {/* Social Signup Divider */}
        <div className="mt-6 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white dark:bg-gray-800 text-gray-500">Or continue with</span>
          </div>
        </div>

        {/* Social Signup Buttons */}
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FcGoogle className="h-5 w-5 mr-2" />
            Google
          </button>
          <button
            type="button"
            className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            <FaGithub className="h-5 w-5 mr-2" />
            GitHub
          </button>
        </div>

        {/* Sign In Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <a href="#" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </a>
        </p>
      </div>
    </div>
  )
}
