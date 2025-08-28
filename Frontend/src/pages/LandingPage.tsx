// LandingPage is the main homepage for the application.
// It introduces the platform, registration options, services, and features.

import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="landingpage-root">
      {/* Header with branding and navigation */}
      <header className="landingpage-header">
        <div className="landingpage-header-container">
          <div className="landingpage-brand">
            <div className="landingpage-logo">
              <span className="landingpage-logo-text">H</span>
            </div>
            <span className="landingpage-title">HELPER</span>
          </div>
          {/* Navigation links for main sections */}
          <nav className="landingpage-nav">
            <a href="#services" className="nav-link">Services</a>
            <a href="#how-it-works" className="nav-link">How it Works</a>
            <a href="#about" className="nav-link">About</a>
            <a href="#contact" className="nav-link">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero section with call to action and registration options */}
      <section className="landingpage-hero">
        <div className="landingpage-hero-container">
          <h1 className="landingpage-hero-title">
            Book your service at your <span className="landingpage-hero-highlight">doorstep</span>
          </h1>
          <p className="landingpage-hero-desc">
            Connect with professional service providers in your area. From cleaning to repairs, we've got you covered.
          </p>
          
          {/* Registration options for users and helpers */}
          <div className="landingpage-register-box">
            <h2 className="landingpage-register-title">How do you want to register?</h2>
            <div className="landingpage-register-options">
              <Link
                to="/register/user"
                className="register-option register-user"
              >
                <Users className="register-icon" />
                <h3 className="register-heading">Register as User</h3>
                <p className="register-desc">Book services and find reliable helpers</p>
                <ArrowRight className="register-arrow" />
              </Link>
              
              <Link
                to="/register/helper"
                className="register-option register-helper"
              >
                <UserCheck className="register-icon" />
                <h3 className="register-heading">Register as Service Provider</h3>
                <p className="register-desc">Offer your services and earn money</p>
                <ArrowRight className="register-arrow" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works section with step-by-step guide */}
      <section id="how-it-works" className="landingpage-howitworks">
        <div className="howitworks-container">
          <h2 className="howitworks-title">How Helper Works</h2>
          <p className="howitworks-desc">Simple steps to get your work done</p>
          
          <div className="howitworks-steps">
            {[
              { step: 1, title: "Book your service", desc: "Choose from our wide range of services" },
              { step: 2, title: "Request sent to Helper", desc: "Available helpers in your area get notified" },
              { step: 3, title: "Helper connects via chat", desc: "Direct communication through our platform" },
              { step: 4, title: "Discuss requirements", desc: "Clarify all details before starting" },
              { step: 5, title: "Negotiate pricing", desc: "Agree on fair pricing for the work" },
              { step: 6, title: "Payment process", desc: "Secure payment before or after service" },
              { step: 7, title: "Helper arrives", desc: "Professional help within 2 working days" }
            ].map((item, index) => (
              <div key={index} className="howitworks-step">
                <div className="howitworks-step-number">
                  {item.step}
                </div>
                <h3 className="howitworks-step-title">{item.title}</h3>
                <p className="howitworks-step-desc">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services section listing available services */}
      <section id="services" className="landingpage-services">
        <div className="services-container">
          <h2 className="services-title">Our Services</h2>
          <div className="services-list">
            {[
              "House Cleaning", "Plumbing", "Electrical Work", "Gardening",
              "Painting", "Carpentry", "AC Repair", "Appliance Repair",
              "Moving & Packing", "Pest Control", "Home Security", "Tutoring"
            ].map((service, index) => (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <CheckCircle className="service-icon-svg" />
                </div>
                <h3 className="service-title">{service}</h3>
                <p className="service-desc">Professional and reliable service</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats section showing platform statistics */}
      <section className="landingpage-stats">
        <div className="stats-container">
          <div className="stats-list">
            <div className="stats-item">
              <div className="stats-value">10,000+</div>
              <div className="stats-label">Happy Customers</div>
            </div>
            <div className="stats-item">
              <div className="stats-value">5,000+</div>
              <div className="stats-label">Service Providers</div>
            </div>
            <div className="stats-item">
              <div className="stats-value">50,000+</div>
              <div className="stats-label">Services Completed</div>
            </div>
            <div className="stats-item">
              <div className="stats-value">4.8</div>
              <div className="stats-rating">
                <Star className="stats-star" />
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer with links and contact info */}
      <Footer />
    </div>
  );
};

export default LandingPage;