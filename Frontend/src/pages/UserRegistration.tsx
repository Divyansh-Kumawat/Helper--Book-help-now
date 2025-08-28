import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { ArrowLeft, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { GoogleLogin } from '@react-oauth/google';  
import { jwtDecode } from 'jwt-decode';


// UserRegistration component handles user sign-up functionality
const UserRegistration: React.FC = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  // State to toggle password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // State for loading indicator during registration
  const [isLoading, setIsLoading] = useState(false);
  // State for error messages
  const [error, setError] = useState('');

  // Access register function from UserContext
  const { register } = useUser();
  // Navigation hook for redirecting after registration
  const navigate = useNavigate();

  // Handles input changes for all form fields
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handles form submission for registration
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Check if passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);
    try {
      // Attempt to register user
      const success = await register({
        ...formData,
        type: 'user'
      });
      
      // Redirect to user dashboard on success
      if (success) {
        navigate('/dashboard/user');
      }
    } catch (err) {
      // Show error if registration fails
      setError('Registration failed. Please try again.');
    }
    setIsLoading(false);
  };

  // Handles Google sign-up simulation
  // const handleGoogleSignUp = () => {
  //   // Simulate Google OAuth registration
  //   register({
  //     name: 'Google User',
  //     email: 'user@gmail.com',
  //     phone: '+91-9876543210',
  //     type: 'user'
  //   });
  //   navigate('/dashboard/user');
  // };

  return (
    <div className="userreg-root">
      <div className="userreg-card">
        <div className="userreg-card-inner">
          {/* Header section with navigation and branding */}
          <div className="userreg-header">
            <Link to="/" className="userreg-backlink">
              <ArrowLeft className="userreg-backicon" />
              <span>Back to Home</span>
            </Link>
            <div className="userreg-brand">
              <div className="userreg-logo">
                <span className="userreg-logo-text">H</span>
              </div>
              <span className="userreg-title">HELPER</span>
            </div>
            <h2 className="userreg-heading">Create Your Account</h2>
            <p className="userreg-subheading">Join thousands of satisfied customers</p>
          </div>

          {/* Error message display */}
          {error && (
            <div className="userreg-error">
              {error}
            </div>
          )}

          {/* Registration form */}
          <form onSubmit={handleSubmit} className="userreg-form">
            {/* Full Name input */}
            <div>
              <label className="userreg-label">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="userreg-input"
                placeholder="Enter your full name"
                required
              />
            </div>

            {/* Email input with icon */}
            <div>
              <label className="userreg-label">Email Address</label>
              <div className="userreg-input-icon">
                <Mail className="userreg-icon" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="userreg-input userreg-input-padding"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            {/* Phone input with icon */}
            <div>
              <label className="userreg-label">Phone Number</label>
              <div className="userreg-input-icon">
                <Phone className="userreg-icon" />
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="userreg-input userreg-input-padding"
                  placeholder="+91-9876543210"
                  required
                />
              </div>
            </div>

            {/* Password input with visibility toggle */}
            <div>
              <label className="userreg-label">Password</label>
              <div className="userreg-input-icon">
                <Lock className="userreg-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="userreg-input userreg-input-padding-right"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="userreg-eye-btn"
                >
                  {showPassword ? <EyeOff className="userreg-eye-icon" /> : <Eye className="userreg-eye-icon" />}
                </button>
              </div>
            </div>

            {/* Confirm Password input with visibility toggle */}
            <div>
              <label className="userreg-label">Confirm Password</label>
              <div className="userreg-input-icon">
                <Lock className="userreg-icon" />
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="userreg-input userreg-input-padding-right"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="userreg-eye-btn"
                >
                  {showConfirmPassword ? <EyeOff className="userreg-eye-icon" /> : <Eye className="userreg-eye-icon" />}
                </button>
              </div>
            </div>

            {/* Submit button for registration */}
            <button
              type="submit"
              disabled={isLoading}
              className="userreg-submit"
            >
              {isLoading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          {/* Divider and Google sign-up button */}
          <div className="userreg-divider-wrap">
            <div className="userreg-divider">
              <div className="userreg-divider-line" />
              <div className="userreg-divider-text">Or continue with</div>
            </div>

            {/* Google sign-up button */}
            <GoogleLogin
              onSuccess={async (credentialResponse) => {
                console.log(credentialResponse);
                console.log(jwtDecode(credentialResponse.credential as string));
                navigate('/dashboard/user');
              }}
              onError={() => {
                setError('Google Login Failed');
              }}
            />
          </div>

          {/* Link to login page for existing users */}
          <p className="userreg-login-link">
            Already have an account?{' '}
            <Link to="/user-login" className="userreg-login-link-highlight">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserRegistration;