import React, { useState, useEffect } from 'react';
import { useUser } from '../context/UserContext';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import NotificationPopup from '../components/NotificationPopup';
import { 
  Wallet, 
  Star, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  MessageCircle,
  Users,
  Award,
  Calendar,
  Target
} from 'lucide-react';

const HelperDashboard: React.FC = () => {
  const { user } = useUser();
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  const stats = {
    totalEarnings: 15420,
    completedJobs: 127,
    rating: 4.8,
    responseTime: '5 min'
  };

  const recentJobs = [
    { id: 1, service: 'Plumbing Repair', client: 'Priya Singh', amount: 800, status: 'Completed', date: '2 hours ago' },
    { id: 2, service: 'House Cleaning', client: 'Rajesh Kumar', amount: 600, status: 'In Progress', date: '1 hour ago' },
    { id: 3, service: 'Electrical Fix', client: 'Anita Sharma', amount: 1200, status: 'Pending', date: '30 min ago' },
  ];

  // Simulate notifications
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
        type: user?.type === 'professional_helper' ? 'professional' : 'casual',
        service: user?.type === 'professional_helper' ? 'Plumbing Repair' : 'House Cleaning',
        client: 'Sarah Johnson',
        location: 'Sector 14, Gurgaon',
        urgency: 'Medium',
        estimatedPay: user?.type === 'professional_helper' ? '₹800-1200' : '₹300-500'
      };
      
      setNotifications(prev => [...prev, newNotification]);
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [user?.type]);

  const handleAcceptRequest = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setShowNotification(false);
    // Simulate opening chat
    window.open('/chat/new-client', '_blank');
  };

  const handleDeclineRequest = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setShowNotification(false);
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
              <p className="text-blue-100 text-lg">
                {user?.type === 'professional_helper' ? `Professional ${user?.profession}` : 'Casual Helper'}
              </p>
              <div className="flex items-center space-x-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-300 fill-current" />
                  <span className="font-semibold">{stats.rating}</span>
                </div>
                <div className="text-blue-100">•</div>
                <div>{stats.completedJobs} jobs completed</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold">₹{user?.wallet || stats.totalEarnings}</div>
              <div className="text-blue-100">Total Earnings</div>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Wallet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Monthly Earnings</p>
                <p className="text-2xl font-bold text-gray-900">₹{(user?.wallet || stats.totalEarnings) * 0.6}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Jobs Completed</p>
                <p className="text-2xl font-bold text-gray-900">{stats.completedJobs}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="w-6 h-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Average Rating</p>
                <p className="text-2xl font-bold text-gray-900">{stats.rating}</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <p className="text-gray-600 text-sm">Response Time</p>
                <p className="text-2xl font-bold text-gray-900">{stats.responseTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Recent Jobs */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Jobs</h2>
              <div className="space-y-4">
                {recentJobs.map((job) => (
                  <div key={job.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-lg text-gray-900">{job.service}</h3>
                        <p className="text-gray-600">Client: {job.client}</p>
                        <p className="text-[#00B9F7] font-semibold">₹{job.amount}</p>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.status === 'Completed' 
                            ? 'bg-green-100 text-green-800' 
                            : job.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {job.status}
                        </span>
                        <p className="text-gray-500 text-sm mt-2">{job.date}</p>
                      </div>
                    </div>
                    {job.status === 'In Progress' && (
                      <div className="flex space-x-3">
                        <button className="flex-1 bg-[#00B9F7] text-white py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2">
                          <MessageCircle className="w-4 h-4" />
                          <span>Chat with Client</span>
                        </button>
                        <button className="flex-1 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-colors">
                          Mark Complete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Helper Type Info */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                {user?.type === 'professional_helper' ? 'Professional Helper' : 'Casual Helper'} Benefits
              </h2>
              {user?.type === 'professional_helper' ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Award className="w-6 h-6 text-[#00B9F7]" />
                    <div>
                      <h4 className="font-semibold">Verified Professional</h4>
                      <p className="text-gray-600 text-sm">Higher earning potential with specialized skills</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Target className="w-6 h-6 text-[#00B9F7]" />
                    <div>
                      <h4 className="font-semibold">Premium Requests</h4>
                      <p className="text-gray-600 text-sm">Get priority for high-value service requests</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <Users className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Flexible Schedule</h4>
                      <p className="text-gray-600 text-sm">Work when you want, choose your jobs</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-6 h-6 text-green-500" />
                    <div>
                      <h4 className="font-semibold">Easy Tasks</h4>
                      <p className="text-gray-600 text-sm">General help tasks that don't require special skills</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Performance */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Performance</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Customer Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-green-500 h-2 rounded-full" style={{width: '96%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>On-time Completion</span>
                    <span>92%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-blue-500 h-2 rounded-full" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="flex justify-between text-sm mb-1">
                    <span>Response Rate</span>
                    <span>98%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div className="bg-[#00B9F7] h-2 rounded-full" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-3">
                <button className="w-full bg-[#00B9F7] text-white py-3 rounded-lg hover:bg-blue-600 transition-colors">
                  Update Availability
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  View Earnings Report
                </button>
                <button className="w-full bg-gray-100 text-gray-800 py-3 rounded-lg hover:bg-gray-200 transition-colors">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Tips */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border border-yellow-200">
              <h3 className="text-lg font-bold text-gray-900 mb-3">💡 Pro Tips</h3>
              <ul className="text-sm text-gray-700 space-y-2">
                <li>• Respond to requests within 5 minutes for better ratings</li>
                <li>• Upload before/after photos to build trust</li>
                <li>• Keep your availability status updated</li>
                <li>• Communicate clearly with clients via chat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Popup */}
      {showNotification && notifications.length > 0 && (
        <NotificationPopup
          notification={notifications[0]}
          onAccept={handleAcceptRequest}
          onDecline={handleDeclineRequest}
          onClose={() => setShowNotification(false)}
        />
      )}

      <Footer />
    </div>
  );
};

export default HelperDashboard;