import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useHelper } from '../context/HelperContext';
import { ArrowLeft, User, UserCog, Upload, MapPin } from 'lucide-react';

const HelperRegistration: React.FC = () => {
  const [step, setStep] = useState<'type' | 'details'>('type');
  const [helperType, setHelperType] = useState<'professional' | 'casual' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    address: '',
    profession: '',
    aadhar: '',
    photo: null as File | null
  });
  const [isLoading, setIsLoading] = useState(false);

  const { register } = useHelper();
  const navigate = useNavigate();

  const handleTypeSelection = (type: 'professional' | 'casual') => {
    setHelperType(type);
    setStep('details');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData({
        ...formData,
        photo: e.target.files[0]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await register({
        ...formData,
        type: helperType === 'professional' ? 'professional_helper' : 'casual_helper'
      });
      
      if (success) {
        navigate('/dashboard/helper');
      }
    } catch (err) {
      console.error('Registration failed:', err);
    }
    setIsLoading(false);
  };

  if (step === 'type') {
    return (
      <div className="helperreg-root">
        <div className="helperreg-card">
          <div className="helperreg-card-inner">
            <div className="helperreg-header">
              <Link to="/" className="helperreg-backlink">
                <ArrowLeft className="helperreg-backicon" />
                <span>Back to Home</span>
              </Link>
              <div className="helperreg-brand">
                <div className="helperreg-logo">
                  <span className="helperreg-logo-text">H</span>
                </div>
                <span className="helperreg-title">HELPER</span>
              </div>
              <h2 className="helperreg-heading">Join as Service Provider</h2>
              <p className="helperreg-subheading">Choose your helper category</p>
            </div>
            <div className="helperreg-type-options">
              <button
                onClick={() => handleTypeSelection('professional')}
                className="helperreg-type-btn professional"
              >
                <UserCog className="helperreg-type-icon" />
                <h3 className="helperreg-type-title">Professional Helper</h3>
                <p className="helperreg-type-desc">
                  For skilled professionals with certifications, experience, and specialized expertise in specific trades.
                </p>
                <div className="helperreg-type-features">
                  <div>• Verified credentials</div>
                  <div>• Higher earning potential</div>
                  <div>• Premium service requests</div>
                </div>
              </button>
              <button
                onClick={() => handleTypeSelection('casual')}
                className="helperreg-type-btn casual"
              >
                <User className="helperreg-type-icon" />
                <h3 className="helperreg-type-title">Casual Helper</h3>
                <p className="helperreg-type-desc">
                  For general helpers who can assist with everyday tasks that don't require specialized skills.
                </p>
                <div className="helperreg-type-features">
                  <div>• Flexible schedule</div>
                  <div>• Easy to start</div>
                  <div>• Basic task requests</div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="helperreg-root">
      <div className="helperreg-card">
        <div className="helperreg-card-inner">
          <div className="helperreg-header">
            <button
              onClick={() => setStep('type')}
              className="helperreg-backlink"
            >
              <ArrowLeft className="helperreg-backicon" />
              <span>Back to Selection</span>
            </button>
            <h2 className="helperreg-heading">
              {helperType === 'professional' ? 'Professional Helper' : 'Casual Helper'} Registration
            </h2>
            <p className="helperreg-subheading">Fill in your details to get started</p>
          </div>
          <form onSubmit={handleSubmit} className="helperreg-form">
            <div className="helperreg-form-row">
              <div>
                <label className="helperreg-label">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="helperreg-input"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="helperreg-label">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="helperreg-input"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>
            <div className="helperreg-form-row">
              <div>
                <label className="helperreg-label">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="helperreg-input"
                  placeholder="+91-9876543210"
                  required
                />
              </div>
              <div>
                <label className="helperreg-label">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="helperreg-input"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>
            {helperType === 'professional' && (
              <div>
                <label className="helperreg-label">Profession/Specialization *</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="helperreg-input"
                  placeholder="e.g., Plumber, Electrician, House Cleaner"
                  required={helperType === 'professional'}
                />
              </div>
            )}
            <div>
              <label className="helperreg-label">Address *</label>
              <div className="helperreg-input-icon-wrap">
                <MapPin className="helperreg-input-icon" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="helperreg-input helperreg-input-padding"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>
            <div>
              <label className="helperreg-label">Aadhar Number *</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                className="helperreg-input"
                placeholder="Enter your Aadhar number"
                required
              />
            </div>
            <div>
              <label className="helperreg-label">Profile Photo *</label>
              <div className="helperreg-input-icon-wrap">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="helperreg-input"
                  required
                />
                <Upload className="helperreg-upload-icon" />
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="helperreg-submit"
            >
              {isLoading ? 'Creating Account...' : 'Create Helper Account'}
            </button>
          </form>
          <p className="helperreg-login-link">
            Already have an account?{' '}
            <Link to="/helper-login" className="helperreg-login-link-highlight">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default HelperRegistration;