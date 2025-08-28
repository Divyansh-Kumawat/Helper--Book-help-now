import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { 
  Search, 
  Home as HomeIcon, 
  Wrench, 
  Zap, 
  Scissors, 
  Car, 
  Users,
  Clock,
  Star,
  MapPin,
  Phone,
  MessageCircle
} from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useUser();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const services = [
    { name: 'Home Cleaning', icon: HomeIcon, category: 'professional', price: '₹300-800' },
    { name: 'Plumbing', icon: Wrench, category: 'professional', price: '₹500-1500' },
    { name: 'Electrical Work', icon: Zap, category: 'professional', price: '₹400-1200' },
    { name: 'Hair Cutting', icon: Scissors, category: 'professional', price: '₹200-600' },
    { name: 'Car Washing', icon: Car, category: 'casual', price: '₹200-500' },
    { name: 'Gardening', icon: HomeIcon, category: 'casual', price: '₹300-800' },
  ];

  const recentRequests = [
    { id: 1, service: 'Home Cleaning', status: 'In Progress', helper: 'Priya Sharma', time: '2 hours ago' },
    { id: 2, service: 'Plumbing', status: 'Completed', helper: 'Raj Kumar', time: '1 day ago' },
    { id: 3, service: 'Electrical Work', status: 'Pending', helper: 'Waiting...', time: '30 minutes ago' },
  ];

  const handleServiceBooking = (serviceName: string, category: string) => {
    navigate('/book-service', { state: { service: serviceName, category } });
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('/book-service', { state: { searchQuery } });
    }
  };

  return (
    <div className="userdashboard-root">
  <Navbar />
      
      <div className="userdashboard-main">
        {/* Welcome Section */}
        <div className="userdashboard-welcome">
          <div className="userdashboard-welcome-flex">
            <div>
              <h1 className="userdashboard-welcome-title">Welcome back, {user?.name}!</h1>
              <p className="userdashboard-welcome-desc">What service do you need today?</p>
            </div>
            <div className="userdashboard-wallet">
              <div className="userdashboard-wallet-value">₹{user?.wallet || 500}</div>
              <div className="userdashboard-wallet-label">Wallet Balance</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="userdashboard-search">
          <form onSubmit={handleSearch} className="userdashboard-search-form">
            <div className="userdashboard-search-input-wrap">
              <Search className="userdashboard-search-icon" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="userdashboard-search-input"
                placeholder="Search for services like 'plumbing', 'cleaning', 'electrical'..."
              />
            </div>
            <button
              type="submit"
              className="userdashboard-search-btn"
            >
              Search Services
            </button>
          </form>
        </div>

        <div className="userdashboard-content">
          {/* Services Section */}
          <div className="userdashboard-services">
            <div className="userdashboard-services-popular">
              <h2 className="userdashboard-section-title">Popular Services</h2>
              <div className="userdashboard-services-list">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceBooking(service.name, service.category)}
                    className="userdashboard-service-card"
                  >
                    <div className="userdashboard-service-flex">
                      <div className="userdashboard-service-icon-wrap">
                        <service.icon className="userdashboard-service-icon" />
                      </div>
                      <div>
                        <h3 className="userdashboard-service-title">{service.name}</h3>
                        <p className="userdashboard-service-price">{service.price}</p>
                        <p className="userdashboard-service-category">{service.category} service</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unprofessional Services */}
            <div className="userdashboard-services-casual">
              <h2 className="userdashboard-section-title">Need General Help?</h2>
              <p className="userdashboard-casual-desc">
                For tasks that don't require specialized skills, book our casual helpers for everyday assistance.
              </p>
              <button
                onClick={() => navigate('/book-service', { state: { category: 'casual' } })}
                className="userdashboard-casual-btn"
              >
                <Users className="userdashboard-casual-btn-icon" />
                <span>Book Casual Helper</span>
              </button>
            </div>

            {/* How It Works */}
            <div className="userdashboard-howitworks">
              <h2 className="userdashboard-section-title">How Helper Works</h2>
              <div className="userdashboard-howitworks-list">
                {[
                  { step: 1, title: "Book your service", desc: "Choose the service you need" },
                  { step: 2, title: "Request sent to Helper", desc: "Available helpers get notified" },
                  { step: 3, title: "Helper connects via chat", desc: "Direct communication starts" },
                  { step: 4, title: "Discuss requirements", desc: "Share details and requirements" },
                  { step: 5, title: "Negotiate pricing", desc: "Agree on fair pricing" },
                  { step: 6, title: "Payment process", desc: "Secure payment handling" },
                  { step: 7, title: "Helper arrives", desc: "Service within 2 working days" }
                ].map((item, index) => (
                  <div key={index} className="userdashboard-howitworks-step">
                    <div className="userdashboard-howitworks-stepnum">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="userdashboard-howitworks-title">{item.title}</h4>
                      <p className="userdashboard-howitworks-desc">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="userdashboard-sidebar">
            {/* Recent Requests */}
            <div className="userdashboard-sidebar-section">
              <h3 className="userdashboard-sidebar-title">Recent Requests</h3>
              <div className="userdashboard-sidebar-list">
                {recentRequests.map((request) => (
                  <div key={request.id} className="userdashboard-request-card">
                    <div className="userdashboard-request-header">
                      <h4 className="userdashboard-request-service">{request.service}</h4>
                      <span className={`userdashboard-request-status ${
                        request.status === 'Completed' 
                          ? 'userdashboard-request-status-completed' 
                          : request.status === 'In Progress'
                          ? 'userdashboard-request-status-progress'
                          : 'userdashboard-request-status-pending'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="userdashboard-request-helper">{request.helper}</p>
                    <div className="userdashboard-request-time">
                      <Clock className="userdashboard-request-time-icon" />
                      <span>{request.time}</span>
                    </div>
                    {request.status === 'In Progress' && (
                      <button className="userdashboard-request-chat-btn">
                        <MessageCircle className="userdashboard-request-chat-icon" />
                        <span>Chat with Helper</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="userdashboard-sidebar-section">
              <h3 className="userdashboard-sidebar-title">Quick Actions</h3>
              <div className="userdashboard-quickactions-list">
                <button className="userdashboard-quickaction-btn">
                  <MapPin className="userdashboard-quickaction-icon" />
                  <span>Emergency Service</span>
                </button>
                <button className="userdashboard-quickaction-btn">
                  <Star className="userdashboard-quickaction-icon" />
                  <span>Rate Recent Service</span>
                </button>
                <button className="userdashboard-quickaction-btn">
                  <Phone className="userdashboard-quickaction-icon" />
                  <span>Contact Support</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDashboard;