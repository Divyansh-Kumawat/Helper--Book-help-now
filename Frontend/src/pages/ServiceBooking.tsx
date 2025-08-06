import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

const ServiceBooking: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();
  
  const [step, setStep] = useState<'service' | 'location' | 'details' | 'confirmation'>('service');
  const [bookingData, setBookingData] = useState({
    service: location.state?.service || '',
    category: location.state?.category || 'professional',
    location: '',
    address: '',
    description: '',
    urgency: 'medium',
    preferredTime: ''
  });

  const services = {
    professional: [
      'Plumbing', 'Electrical Work', 'AC Repair', 'Appliance Repair',
      'Home Cleaning', 'Painting', 'Carpentry', 'Pest Control'
    ],
    casual: [
      'House Cleaning', 'Gardening', 'Car Washing', 'Package Delivery',
      'Grocery Shopping', 'Pet Walking', 'Moving Help', 'General Labor'
    ]
  };

  const handleServiceSelection = (service: string) => {
    setBookingData({ ...bookingData, service });
    setStep('location');
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('details');
  };

  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    
    // Simulate booking submission
    setTimeout(() => {
      navigate('/dashboard/user');
    }, 3000);
  };

  const renderServiceSelection = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Select a Service</h2>
      
      <div className="flex space-x-4 mb-8">
        <button
          onClick={() => setBookingData({ ...bookingData, category: 'professional' })}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            bookingData.category === 'professional'
              ? 'bg-[#00B9F7] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          Professional Services
        </button>
        <button
          onClick={() => setBookingData({ ...bookingData, category: 'casual' })}
          className={`px-6 py-3 rounded-lg font-medium transition-colors ${
            bookingData.category === 'casual'
              ? 'bg-green-500 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          General Help
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services[bookingData.category as keyof typeof services].map((service) => (
          <button
            key={service}
            onClick={() => handleServiceSelection(service)}
            className="p-4 border border-gray-200 rounded-xl hover:border-[#00B9F7] hover:bg-blue-50 transition-all text-left"
          >
            <div className={`w-8 h-8 rounded-lg mb-3 flex items-center justify-center ${
              bookingData.category === 'professional' ? 'bg-blue-100' : 'bg-green-100'
            }`}>
              <span className={`text-lg ${
                bookingData.category === 'professional' ? 'text-[#00B9F7]' : 'text-green-600'
              }`}>
                ⚡
              </span>
            </div>
            <h3 className="font-semibold text-gray-900">{service}</h3>
            <p className="text-gray-600 text-sm">Professional service</p>
          </button>
        ))}
      </div>
    </div>
  );

  const renderLocationForm = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Location</h2>
      <p className="text-gray-600 mb-8">Where do you need the service?</p>

      <form onSubmit={handleLocationSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Service Location/Area *
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              value={bookingData.location}
              onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent"
              placeholder="e.g., Sector 14, Gurgaon"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Complete Address *
          </label>
          <textarea
            value={bookingData.address}
            onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent resize-none"
            placeholder="Enter your complete address with landmarks..."
            required
          />
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep('service')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#00B9F7] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );

  const renderDetailsForm = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Service Details</h2>
      
      <form onSubmit={handleDetailsSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Describe what you need *
          </label>
          <textarea
            value={bookingData.description}
            onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent resize-none"
            placeholder="Please describe the work you need done in detail..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Urgency Level
          </label>
          <select
            value={bookingData.urgency}
            onChange={(e) => setBookingData({ ...bookingData, urgency: e.target.value })}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent"
          >
            <option value="low">Low - Within a week</option>
            <option value="medium">Medium - Within 2-3 days</option>
            <option value="high">High - Within 24 hours</option>
            <option value="emergency">Emergency - ASAP</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preferred Time
          </label>
          <div className="relative">
            <Clock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="datetime-local"
              value={bookingData.preferredTime}
              onChange={(e) => setBookingData({ ...bookingData, preferredTime: e.target.value })}
              className="w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent"
            />
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h4 className="font-semibold text-blue-900 mb-2">What happens next?</h4>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• Your request will be sent to available helpers in your area</li>
            <li>• Helpers will contact you via our chat system</li>
            <li>• You can discuss requirements and negotiate pricing</li>
            <li>• Service will be completed within 2 working days</li>
          </ul>
        </div>

        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setStep('location')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Back
          </button>
          <button
            type="submit"
            className="px-8 py-3 bg-[#00B9F7] text-white rounded-lg hover:bg-blue-600 transition-colors"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );

  const renderConfirmation = () => (
    <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <CheckCircle className="w-8 h-8 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Request Submitted Successfully!</h2>
      <p className="text-gray-600 mb-8">
        We're connecting you with the best helpers in your area. You'll receive notifications once a helper accepts your request.
      </p>

      <div className="bg-gray-50 rounded-xl p-6 mb-8">
        <h3 className="font-semibold text-gray-900 mb-4">Request Summary</h3>
        <div className="space-y-2 text-left">
          <div className="flex justify-between">
            <span className="text-gray-600">Service:</span>
            <span className="font-medium">{bookingData.service}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Location:</span>
            <span className="font-medium">{bookingData.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Urgency:</span>
            <span className={`font-medium capitalize ${
              bookingData.urgency === 'emergency' ? 'text-red-600' :
              bookingData.urgency === 'high' ? 'text-orange-600' :
              bookingData.urgency === 'medium' ? 'text-blue-600' : 'text-green-600'
            }`}>
              {bookingData.urgency}
            </span>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2 text-[#00B9F7] mb-6">
        <MessageSquare className="w-5 h-5" />
        <span>We will connect you to the helper soon...</span>
      </div>

      <p className="text-sm text-gray-500">
        Redirecting you to dashboard in a few seconds...
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {['Service', 'Location', 'Details', 'Confirmation'].map((stepName, index) => {
              const stepIndex = ['service', 'location', 'details', 'confirmation'].indexOf(step);
              const isActive = index <= stepIndex;
              const isCurrent = index === stepIndex;
              
              return (
                <div key={stepName} className="flex items-center">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    isActive ? 'bg-[#00B9F7] text-white' : 'bg-gray-200 text-gray-600'
                  } ${isCurrent ? 'ring-4 ring-blue-100' : ''}`}>
                    {index + 1}
                  </div>
                  <span className={`ml-2 text-sm ${isActive ? 'text-[#00B9F7] font-medium' : 'text-gray-500'}`}>
                    {stepName}
                  </span>
                  {index < 3 && (
                    <div className={`w-12 h-0.5 mx-4 ${isActive ? 'bg-[#00B9F7]' : 'bg-gray-200'}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Step Content */}
        {step === 'service' && renderServiceSelection()}
        {step === 'location' && renderLocationForm()}
        {step === 'details' && renderDetailsForm()}
        {step === 'confirmation' && renderConfirmation()}
      </div>

      <Footer />
    </div>
  );
};

export default ServiceBooking;