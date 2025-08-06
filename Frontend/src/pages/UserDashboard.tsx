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
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="bg-gradient-to-r from-[#00B9F7] to-blue-600 rounded-2xl text-white p-8 mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">Welcome back, {user?.name}!</h1>
              <p className="text-blue-100 text-lg">What service do you need today?</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold">₹{user?.wallet || 500}</div>
              <div className="text-blue-100">Wallet Balance</div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <form onSubmit={handleSearch} className="flex space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent text-lg"
                placeholder="Search for services like 'plumbing', 'cleaning', 'electrical'..."
              />
            </div>
            <button
              type="submit"
              className="bg-[#00B9F7] text-white px-8 py-4 rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              Search Services
            </button>
          </form>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Services Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Popular Services</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {services.map((service, index) => (
                  <div
                    key={index}
                    onClick={() => handleServiceBooking(service.name, service.category)}
                    className="border border-gray-200 rounded-xl p-6 hover:border-[#00B9F7] hover:shadow-lg transition-all cursor-pointer group"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center group-hover:bg-[#00B9F7] group-hover:text-white transition-colors">
                        <service.icon className="w-6 h-6 text-[#00B9F7] group-hover:text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{service.name}</h3>
                        <p className="text-[#00B9F7] font-medium">{service.price}</p>
                        <p className="text-sm text-gray-500 capitalize">{service.category} service</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Unprofessional Services */}
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Need General Help?</h2>
              <p className="text-gray-600 mb-6">
                For tasks that don't require specialized skills, book our casual helpers for everyday assistance.
              </p>
              <button
                onClick={() => navigate('/book-service', { state: { category: 'casual' } })}
                className="bg-green-500 text-white px-8 py-4 rounded-xl hover:bg-green-600 transition-colors font-medium flex items-center space-x-2"
              >
                <Users className="w-5 h-5" />
                <span>Book Casual Helper</span>
              </button>
            </div>

            {/* How It Works */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">How Helper Works</h2>
              <div className="space-y-4">
                {[
                  { step: 1, title: "Book your service", desc: "Choose the service you need" },
                  { step: 2, title: "Request sent to Helper", desc: "Available helpers get notified" },
                  { step: 3, title: "Helper connects via chat", desc: "Direct communication starts" },
                  { step: 4, title: "Discuss requirements", desc: "Share details and requirements" },
                  { step: 5, title: "Negotiate pricing", desc: "Agree on fair pricing" },
                  { step: 6, title: "Payment process", desc: "Secure payment handling" },
                  { step: 7, title: "Helper arrives", desc: "Service within 2 working days" }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-8 h-8 bg-[#00B9F7] rounded-full flex items-center justify-center text-white font-semibold text-sm">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">{item.title}</h4>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Recent Requests */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Requests</h3>
              <div className="space-y-4">
                {recentRequests.map((request) => (
                  <div key={request.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-900">{request.service}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        request.status === 'Completed' 
                          ? 'bg-green-100 text-green-800' 
                          : request.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {request.status}
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm mb-2">{request.helper}</p>
                    <div className="flex items-center space-x-2 text-gray-500 text-xs">
                      <Clock className="w-4 h-4" />
                      <span>{request.time}</span>
                    </div>
                    {request.status === 'In Progress' && (
                      <button className="w-full mt-3 bg-[#00B9F7] text-white py-2 rounded-lg text-sm hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat with Helper</span>
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#00B9F7] hover:bg-blue-50 transition-all flex items-center space-x-3">
                  <MapPin className="w-5 h-5 text-[#00B9F7]" />
                  <span>Emergency Service</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#00B9F7] hover:bg-blue-50 transition-all flex items-center space-x-3">
                  <Star className="w-5 h-5 text-[#00B9F7]" />
                  <span>Rate Recent Service</span>
                </button>
                <button className="w-full text-left p-3 rounded-lg border border-gray-200 hover:border-[#00B9F7] hover:bg-blue-50 transition-all flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-[#00B9F7]" />
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