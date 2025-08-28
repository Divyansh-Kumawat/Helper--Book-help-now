import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { MapPin, Clock, MessageSquare, CheckCircle } from 'lucide-react';

// ServiceBooking handles the multi-step service booking flow for users
const ServiceBooking: React.FC = () => {
  // Get navigation and location hooks
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useUser();

  // Step state: controls which booking step is shown
  const [step, setStep] = useState<'service' | 'location' | 'details' | 'confirmation'>('service');

  // Booking data state: stores all form data for the booking process
  const [bookingData, setBookingData] = useState({
    service: location.state?.service || '',
    category: location.state?.category || 'professional',
    location: '',
    address: '',
    description: '',
    urgency: 'medium',
    preferredTime: ''
  });

  // List of available services by category
  const services = {
    professional: [
      'Plumbing', 'Electrical Work', 'AC Repair', 'Appliance Repair',
      'Home Cleaning', 'Painting', 'Carpentry', 'Pest Control', 'Others'
    ],
    casual: [
      'House Cleaning', 'Gardening', 'Car Washing', 'Package Delivery',
      'Grocery Shopping', 'Pet Walking', 'Moving Help', 'General Labor'
    ]
  };

  // Handles selection of a service and moves to location step
  const handleServiceSelection = (service: string) => {
    setBookingData({ ...bookingData, service });
    setStep('location');
  };

  // Handles submission of location form and moves to details step
  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('details');
  };

  // Handles submission of details form and moves to confirmation step
  const handleDetailsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('confirmation');
    // Simulate booking submission and redirect after 3 seconds
    setTimeout(() => {
      navigate('/dashboard/user');
    }, 3000);
  };

  // Renders the service selection step
  const renderServiceSelection = () => (
    <div className="servicebooking-card">
      <h2 className="servicebooking-title">Select a Service</h2>
      {/* Category selection buttons */}
      <div className="servicebooking-category-btns">
        <button
          onClick={() => setBookingData({ ...bookingData, category: 'professional' })}
          className={`servicebooking-category-btn ${bookingData.category === 'professional' ? 'active' : ''}`}
        >
          Professional Services
        </button>
        <button
          onClick={() => setBookingData({ ...bookingData, category: 'casual' })}
          className={`servicebooking-category-btn casual ${bookingData.category === 'casual' ? 'active' : ''}`}
        >
          General Help
        </button>
      </div>
      {/* List of services for selected category */}
      <div className="servicebooking-services-list">
        {services[bookingData.category as keyof typeof services].map((service) => (
          <button
            key={service}
            onClick={() => handleServiceSelection(service)}
            className="servicebooking-service-btn"
          >
            <div className={`servicebooking-service-icon ${bookingData.category}`}>
              <span className={`servicebooking-service-icon-text ${bookingData.category}`}>
                ⚡
              </span>
            </div>
            <h3 className="servicebooking-service-title">{service}</h3>
            <p className="servicebooking-service-desc">Casual service</p>
          </button>
        ))}
      </div>
    </div>
  );

  // Renders the location form step
  const renderLocationForm = () => (
    <div className="servicebooking-card">
      <h2 className="servicebooking-title">Service Location</h2>
      <p className="servicebooking-desc">Where do you need the service?</p>
      <form onSubmit={handleLocationSubmit} className="servicebooking-form">
        {/* Location input */}
        <div>
          <label className="servicebooking-label">Enter Your City and State*</label>
          <div className="servicebooking-input-icon-wrap">
            <MapPin className="servicebooking-input-icon" />
            <input
              type="text"
              value={bookingData.location}
              onChange={(e) => setBookingData({ ...bookingData, location: e.target.value })}
              className="servicebooking-input servicebooking-input-padding"
              placeholder="Vellore, Tamil Nadu"
              required
            />
          </div>
        </div>
        {/* Address input */}
        <div>
          <label className="servicebooking-label">Complete Address *</label>
          <textarea
            value={bookingData.address}
            onChange={(e) => setBookingData({ ...bookingData, address: e.target.value })}
            rows={4}
            className="servicebooking-input"
            placeholder="Enter your complete address with landmarks..."
            required
          />
        </div>
        {/* Navigation buttons */}
        <div className="servicebooking-form-btns">
          <button
            type="button"
            onClick={() => setStep('service')}
            className="servicebooking-btn"
          >
            Back
          </button>
          <button
            type="submit"
            className="servicebooking-btn primary"
          >
            Next Step
          </button>
        </div>
      </form>
    </div>
  );

  // Renders the details form step
  const renderDetailsForm = () => (
    <div className="servicebooking-card">
      <h2 className="servicebooking-title">Service Details</h2>
      <form onSubmit={handleDetailsSubmit} className="servicebooking-form">
        {/* Description input */}
        <div>
          <label className="servicebooking-label">Describe what you need *</label>
          <textarea
            value={bookingData.description}
            onChange={(e) => setBookingData({ ...bookingData, description: e.target.value })}
            rows={4}
            className="servicebooking-input"
            placeholder="Please describe the work you need done in detail..."
            required
          />
        </div>
        {/* Urgency select */}
        <div>
          <label className="servicebooking-label">Urgency Level</label>
          <select
            value={bookingData.urgency}
            onChange={(e) => setBookingData({ ...bookingData, urgency: e.target.value })}
            className="servicebooking-input"
          >
            <option value="low">Low - Within a week</option>
            <option value="medium">Medium - Within 2-3 days</option>
            <option value="high">High - Within 24 hours</option>
            <option value="emergency">Emergency - ASAP</option>
          </select>
        </div>
        {/* Preferred date input */}
        <div>
          <label className="servicebooking-label">Preferred Date</label>
          <div className="servicebooking-input-icon-wrap">
            <Clock className="servicebooking-input-icon" />
            <input
              type="date"
              value={bookingData.preferredTime}
              onChange={(e) => setBookingData({ ...bookingData, preferredTime: e.target.value })}
              className="servicebooking-input servicebooking-input-padding"
            />
          </div>
        </div>
        {/* Info card about next steps */}
        <div className="servicebooking-info-card">
          <h4 className="servicebooking-info-title">What happens next?</h4>
          <ul className="servicebooking-info-list">
            <li>• Your request will be sent to available helpers in your area</li>
            <li>• Helpers will contact you via our chat system</li>
            <li>• You can discuss requirements and negotiate pricing</li>
            <li>• Service will be completed within 2 working days</li>
          </ul>
        </div>
        {/* Navigation buttons */}
        <div className="servicebooking-form-btns">
          <button
            type="button"
            onClick={() => setStep('location')}
            className="servicebooking-btn"
          >
            Back
          </button>
          <button
            type="submit"
            className="servicebooking-btn primary"
          >
            Submit Request
          </button>
        </div>
      </form>
    </div>
  );

  // Renders the confirmation step after booking submission
  const renderConfirmation = () => (
    <div className="servicebooking-card servicebooking-confirmation">
      <div className="servicebooking-confirmation-icon">
        <CheckCircle className="servicebooking-confirmation-icon-svg" />
      </div>
      <h2 className="servicebooking-title">Request Submitted Successfully!</h2>
      <p className="servicebooking-desc">
        We're connecting you with the best helpers in your area. You'll receive notifications once a helper accepts your request.
      </p>
      {/* Summary of the booking */}
      <div className="servicebooking-summary-card">
        <h3 className="servicebooking-summary-title">Request Summary</h3>
        <div className="servicebooking-summary-list">
          <div className="servicebooking-summary-row">
            <span className="servicebooking-summary-label">Service:</span>
            <span className="servicebooking-summary-value">{bookingData.service}</span>
          </div>
          <div className="servicebooking-summary-row">
            <span className="servicebooking-summary-label">Location:</span>
            <span className="servicebooking-summary-value">{bookingData.location}</span>
          </div>
          <div className="servicebooking-summary-row">
            <span className="servicebooking-summary-label">Urgency:</span>
            <span className={`servicebooking-summary-value urgency-${bookingData.urgency}`}>
              {bookingData.urgency}
            </span>
          </div>
        </div>
      </div>
      {/* Info message */}
      <div className="servicebooking-confirmation-msg">
        <MessageSquare className="servicebooking-confirmation-msg-icon" />
        <span>We will connect you to the helper soon...</span>
      </div>
      <p className="servicebooking-confirmation-redirect">
        Redirecting you to dashboard in a few seconds...
      </p>
    </div>
  );

  // Main render: shows progress bar and current step
  return (
    <div className="servicebooking-root">
      <Navbar />
      <div className="servicebooking-main">
        {/* Progress Bar */}
        <div className="servicebooking-progressbar">
          <div className="servicebooking-progressbar-flex">
            {['Service', 'Location', 'Details', 'Confirmation'].map((stepName, index) => {
              const stepIndex = ['service', 'location', 'details', 'confirmation'].indexOf(step);
              const isActive = index <= stepIndex;
              const isCurrent = index === stepIndex;
              return (
                <div key={stepName} className="servicebooking-progressbar-step">
                  <div className={`servicebooking-progressbar-stepnum ${isActive ? 'active' : ''} ${isCurrent ? 'current' : ''}`}>
                    {index + 1}
                  </div>
                  <span className={`servicebooking-progressbar-label ${isActive ? 'active' : ''}`}>
                    {stepName}
                  </span>
                  {index < 3 && (
                    <div className={`servicebooking-progressbar-bar ${isActive ? 'active' : ''}`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>
        {/* Step Content */}
        <div className="servicebooking-step">
          {step === 'service' && renderServiceSelection()}
          {step === 'location' && renderLocationForm()}
          {step === 'details' && renderDetailsForm()}
          {step === 'confirmation' && renderConfirmation()}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ServiceBooking;