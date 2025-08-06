import React from 'react';
import { Link } from 'react-router-dom';
import { Users, UserCheck, ArrowRight, CheckCircle, Star } from 'lucide-react';
import Footer from '../components/Footer';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-[#00B9F7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">H</span>
            </div>
            <span className="text-3xl font-bold text-[#00B9F7]">HELPER</span>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#services" className="text-gray-700 hover:text-[#00B9F7] transition-colors">Services</a>
            <a href="#how-it-works" className="text-gray-700 hover:text-[#00B9F7] transition-colors">How it Works</a>
            <a href="#about" className="text-gray-700 hover:text-[#00B9F7] transition-colors">About</a>
            <a href="#contact" className="text-gray-700 hover:text-[#00B9F7] transition-colors">Contact</a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#00B9F7] via-[#0EA5E9] to-[#0284C7] text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Book your service at your <span className="text-yellow-300">doorstep</span>
          </h1>
          <p className="text-xl md:text-2xl mb-10 text-blue-100 max-w-3xl mx-auto">
            Connect with professional service providers in your area. From cleaning to repairs, we've got you covered.
          </p>
          
          {/* Registration Options */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl font-semibold mb-6">How do you want to register?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Link
                to="/register/user"
                className="bg-white text-[#00B9F7] p-6 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg group"
              >
                <Users className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Register as User</h3>
                <p className="text-gray-600 text-sm">Book services and find reliable helpers</p>
                <ArrowRight className="w-5 h-5 mt-4 mx-auto group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <Link
                to="/register/helper"
                className="bg-white text-[#00B9F7] p-6 rounded-xl hover:bg-blue-50 transition-all transform hover:scale-105 shadow-lg group"
              >
                <UserCheck className="w-12 h-12 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold mb-2">Register as Service Provider</h3>
                <p className="text-gray-600 text-sm">Offer your services and earn money</p>
                <ArrowRight className="w-5 h-5 mt-4 mx-auto group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">How Helper Works</h2>
          <p className="text-xl text-center text-gray-600 mb-16">Simple steps to get your work done</p>
          
          <div className="grid grid-cols-1 md:grid-cols-7 gap-8 items-center">
            {[
              { step: 1, title: "Book your service", desc: "Choose from our wide range of services" },
              { step: 2, title: "Request sent to Helper", desc: "Available helpers in your area get notified" },
              { step: 3, title: "Helper connects via chat", desc: "Direct communication through our platform" },
              { step: 4, title: "Discuss requirements", desc: "Clarify all details before starting" },
              { step: 5, title: "Negotiate pricing", desc: "Agree on fair pricing for the work" },
              { step: 6, title: "Payment process", desc: "Secure payment before or after service" },
              { step: 7, title: "Helper arrives", desc: "Professional help within 2 working days" }
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-[#00B9F7] rounded-full flex items-center justify-center mx-auto mb-4 text-white font-bold text-xl">
                  {item.step}
                </div>
                <h3 className="font-semibold text-lg mb-2 text-gray-900">{item.title}</h3>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">Our Services</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              "House Cleaning", "Plumbing", "Electrical Work", "Gardening",
              "Painting", "Carpentry", "AC Repair", "Appliance Repair",
              "Moving & Packing", "Pest Control", "Home Security", "Tutoring"
            ].map((service, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100">
                <div className="w-12 h-12 bg-[#00B9F7] rounded-lg flex items-center justify-center mb-4">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-semibold text-lg text-gray-900">{service}</h3>
                <p className="text-gray-600 text-sm mt-2">Professional and reliable service</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-[#00B9F7] text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold mb-2">10,000+</div>
              <div className="text-blue-100">Happy Customers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">5,000+</div>
              <div className="text-blue-100">Service Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">50,000+</div>
              <div className="text-blue-100">Services Completed</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">4.8</div>
              <div className="text-blue-100 flex items-center justify-center space-x-1">
                <Star className="w-5 h-5 fill-current" />
                <span>Average Rating</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default LandingPage;