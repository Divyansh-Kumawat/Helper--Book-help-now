import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHelper } from '../context/HelperContext';
import { ArrowLeft, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const HelperLoginPage: React.FC = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { login } = useHelper();
  const navigate = useNavigate();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard/helper');
      } else {
        setError('Invalid email or password');
      }
    } catch {
      setError('Login failed. Please try again.');
    }
    setIsLoading(false);
  };

  return (
    <div className="userreg-root">
      <div className="userreg-card">
        <div className="userreg-card-inner">
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
            <h2 className="userreg-heading">Helper Sign In</h2>
            <p className="userreg-subheading">Welcome back! Please login to your helper account.</p>
          </div>
          {error && <div className="userreg-error">{error}</div>}
          <form onSubmit={handleSubmit} className="userreg-form">
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
                  placeholder="Enter your password"
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
            <button type="submit" disabled={isLoading} className="userreg-submit">
              {isLoading ? 'Signing In...' : 'Sign In'}
            </button>
          </form>
          <p className="userreg-login-link">
            New to Helper?{' '}
            <Link to="/register/helper" className="userreg-login-link-highlight">
              Create a helper account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelperLoginPage;
