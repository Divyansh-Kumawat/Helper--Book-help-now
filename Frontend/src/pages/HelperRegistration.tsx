import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
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

  const { register } = useUser();
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
        <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2 text-[#00B9F7] hover:text-blue-600 transition-colors mb-6">
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Home</span>
            </Link>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-[#00B9F7] rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">H</span>
              </div>
              <span className="text-3xl font-bold text-[#00B9F7]">HELPER</span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Join as Service Provider</h2>
            <p className="text-gray-600">Choose your helper category</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <button
              onClick={() => handleTypeSelection('professional')}
              className="bg-gradient-to-br from-[#00B9F7] to-blue-600 text-white p-8 rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all transform hover:scale-105 shadow-lg group"
            >
              <UserCog className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Professional Helper</h3>
              <p className="text-blue-100 text-sm leading-relaxed">
                For skilled professionals with certifications, experience, and specialized expertise in specific trades.
              </p>
              <div className="mt-4 text-sm text-blue-100">
                <div className="mb-1">• Verified credentials</div>
                <div className="mb-1">• Higher earning potential</div>
                <div>• Premium service requests</div>
              </div>
            </button>
            
            <button
              onClick={() => handleTypeSelection('casual')}
              className="bg-gradient-to-br from-green-500 to-green-600 text-white p-8 rounded-xl hover:from-green-600 hover:to-green-700 transition-all transform hover:scale-105 shadow-lg group"
            >
              <User className="w-16 h-16 mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-3">Casual Helper</h3>
              <p className="text-green-100 text-sm leading-relaxed">
                For general helpers who can assist with everyday tasks that don't require specialized skills.
              </p>
              <div className="mt-4 text-sm text-green-100">
                <div className="mb-1">• Flexible schedule</div>
                <div className="mb-1">• Easy to start</div>
                <div>• Basic task requests</div>
              </div>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center p-4">
      <div className="max-w-2xl w-full bg-white rounded-2xl shadow-xl border border-gray-100">
        <div className="p-8">
          <div className="text-center mb-8">
            <button
              onClick={() => setStep('type')}
              className="inline-flex items-center space-x-2 text-[#00B9F7] hover:text-blue-600 transition-colors mb-6"
            >
              <ArrowLeft className="w-5 h-5" />
              <span>Back to Selection</span>
            </button>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {helperType === 'professional' ? 'Professional Helper' : 'Casual Helper'} Registration
            </h2>
            <p className="text-gray-600">Fill in your details to get started</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email Address *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                  placeholder="Enter your email"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                  placeholder="+91-9876543210"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Password *</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                  placeholder="Create a password"
                  required
                />
              </div>
            </div>

            {helperType === 'professional' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Profession/Specialization *</label>
                <input
                  type="text"
                  name="profession"
                  value={formData.profession}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                  placeholder="e.g., Plumber, Electrician, House Cleaner"
                  required={helperType === 'professional'}
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Address *</label>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-gray-400 w-5 h-5" />
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  rows={3}
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all resize-none"
                  placeholder="Enter your complete address"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Aadhar Number *</label>
              <input
                type="text"
                name="aadhar"
                value={formData.aadhar}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all"
                placeholder="Enter your Aadhar number"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Profile Photo *</label>
              <div className="relative">
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-[#00B9F7] file:text-white hover:file:bg-blue-600"
                  required
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#00B9F7] text-white py-3 px-4 rounded-lg hover:bg-blue-600 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Creating Account...' : 'Create Helper Account'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HelperRegistration;