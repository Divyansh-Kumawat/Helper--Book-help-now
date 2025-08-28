import React, { useState, useEffect } from 'react';
import { useHelper } from '../context/HelperContext';
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

// HelperDashboard displays the dashboard for service providers/helpers
const HelperDashboard: React.FC = () => {
  // Get current helper from context
  const { helper } = useHelper();

  // State for notifications and popup visibility
  const [notifications, setNotifications] = useState<any[]>([]);
  const [showNotification, setShowNotification] = useState(false);

  // Stats for the helper (can be fetched from backend)
  const stats = {
    totalEarnings: 15420,
    completedJobs: 127,
    rating: 4.8,
    responseTime: '5 min'
  };

  // Recent jobs for the helper
  const recentJobs = [
    { id: 1, service: 'Plumbing Repair', client: 'Priya Singh', amount: 800, status: 'Completed', date: '2 hours ago' },
    { id: 2, service: 'House Cleaning', client: 'Rajesh Kumar', amount: 600, status: 'In Progress', date: '1 hour ago' },
    { id: 3, service: 'Electrical Fix', client: 'Anita Sharma', amount: 1200, status: 'Pending', date: '30 min ago' },
  ];

  // Simulate notifications for new service requests
  useEffect(() => {
    const timer = setTimeout(() => {
      const newNotification = {
        id: Date.now(),
      type: helper?.type === 'professional_helper' ? 'professional' : 'casual',
      service: helper?.type === 'professional_helper' ? 'Plumbing Repair' : 'House Cleaning',
        client: 'Sarah Johnson',
        location: 'Sector 14, Gurgaon',
        urgency: 'Medium',
      estimatedPay: helper?.type === 'professional_helper' ? '₹800-1200' : '₹300-500'
      };
      setNotifications(prev => [...prev, newNotification]);
      setShowNotification(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, [helper?.type]);

  // Accept a service request (simulate opening chat)
  const handleAcceptRequest = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setShowNotification(false);
    window.open('/chat/new-client', '_blank');
  };

  // Decline a service request
  const handleDeclineRequest = (notificationId: number) => {
    setNotifications(prev => prev.filter(n => n.id !== notificationId));
    setShowNotification(false);
  };

  return (
    <div className="helperdashboard-root">
  <Navbar />
      <div className="helperdashboard-main">
        {/* Welcome Section with stats */}
        <div className="helperdashboard-welcome">
          <div className="helperdashboard-welcome-flex">
            <div>
              <h1 className="helperdashboard-welcome-title">Welcome back, {helper?.name}!</h1>
              <p className="helperdashboard-welcome-desc">
                {helper?.type === 'professional_helper' ? `Professional ${helper?.profession}` : 'Casual Helper'}
              </p>
              <div className="helperdashboard-welcome-stats">
                <div className="helperdashboard-welcome-rating">
                  <Star className="helperdashboard-welcome-rating-icon" />
                  <span className="helperdashboard-welcome-rating-value">{stats.rating}</span>
                </div>
                <div className="helperdashboard-welcome-dot">•</div>
                <div>{stats.completedJobs} jobs completed</div>
              </div>
            </div>
            <div className="helperdashboard-wallet">
              <div className="helperdashboard-wallet-value">₹{helper?.wallet || stats.totalEarnings}</div>
              <div className="helperdashboard-wallet-label">Total Earnings</div>
            </div>
          </div>
        </div>

        {/* Stats Cards for earnings, jobs, rating, response time */}
        <div className="helperdashboard-stats-cards">
          {/* Monthly Earnings */}
          <div className="helperdashboard-stats-card">
            <div className="helperdashboard-stats-card-flex">
              <div className="helperdashboard-stats-card-icon green">
                <Wallet className="helperdashboard-stats-card-svg green" />
              </div>
              <div>
                <p className="helperdashboard-stats-card-label">Monthly Earnings</p>
                <p className="helperdashboard-stats-card-value">₹{(helper?.wallet || stats.totalEarnings) * 0.6}</p>
              </div>
            </div>
          </div>
          {/* Jobs Completed */}
          <div className="helperdashboard-stats-card">
            <div className="helperdashboard-stats-card-flex">
              <div className="helperdashboard-stats-card-icon blue">
                <CheckCircle className="helperdashboard-stats-card-svg blue" />
              </div>
              <div>
                <p className="helperdashboard-stats-card-label">Jobs Completed</p>
                <p className="helperdashboard-stats-card-value">{stats.completedJobs}</p>
              </div>
            </div>
          </div>
          {/* Average Rating */}
          <div className="helperdashboard-stats-card">
            <div className="helperdashboard-stats-card-flex">
              <div className="helperdashboard-stats-card-icon yellow">
                <Star className="helperdashboard-stats-card-svg yellow" />
              </div>
              <div>
                <p className="helperdashboard-stats-card-label">Average Rating</p>
                <p className="helperdashboard-stats-card-value">{stats.rating}</p>
              </div>
            </div>
          </div>
          {/* Response Time */}
          <div className="helperdashboard-stats-card">
            <div className="helperdashboard-stats-card-flex">
              <div className="helperdashboard-stats-card-icon purple">
                <Clock className="helperdashboard-stats-card-svg purple" />
              </div>
              <div>
                <p className="helperdashboard-stats-card-label">Response Time</p>
                <p className="helperdashboard-stats-card-value">{stats.responseTime}</p>
              </div>
            </div>
          </div>
        </div>

        <div className="helperdashboard-content">
          {/* Recent Jobs Section */}
          <div className="helperdashboard-jobs">
            <div className="helperdashboard-jobs-card">
              <h2 className="helperdashboard-section-title">Recent Jobs</h2>
              <div className="helperdashboard-jobs-list">
                {recentJobs.map((job) => (
                  <div key={job.id} className="helperdashboard-job-card">
                    <div className="helperdashboard-job-header">
                      <div>
                        <h3 className="helperdashboard-job-title">{job.service}</h3>
                        <p className="helperdashboard-job-client">Client: {job.client}</p>
                        <p className="helperdashboard-job-amount">₹{job.amount}</p>
                      </div>
                      <div className="helperdashboard-job-status-wrap">
                        <span className={`helperdashboard-job-status ${
                          job.status === 'Completed' 
                            ? 'completed' 
                            : job.status === 'In Progress'
                            ? 'progress'
                            : 'pending'
                        }`}>
                          {job.status}
                        </span>
                        <p className="helperdashboard-job-date">{job.date}</p>
                      </div>
                    </div>
                    {/* Show chat and complete buttons if job is in progress */}
                    {job.status === 'In Progress' && (
                      <div className="helperdashboard-job-actions">
                        <button className="helperdashboard-job-chat-btn">
                          <MessageCircle className="helperdashboard-job-chat-icon" />
                          <span>Chat with Client</span>
                        </button>
                        <button className="helperdashboard-job-complete-btn">
                          Mark Complete
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Helper Type Info Section */}
            <div className="helperdashboard-type-card">
              <h2 className="helperdashboard-section-title">
                {helper?.type === 'professional_helper' ? 'Professional Helper' : 'Casual Helper'} Benefits
              </h2>
              {helper?.type === 'professional_helper' ? (
                <div className="helperdashboard-type-list">
                  <div className="helperdashboard-type-item">
                    <Award className="helperdashboard-type-icon blue" />
                    <div>
                      <h4 className="helperdashboard-type-title">Verified Professional</h4>
                      <p className="helperdashboard-type-desc">Higher earning potential with specialized skills</p>
                    </div>
                  </div>
                  <div className="helperdashboard-type-item">
                    <Target className="helperdashboard-type-icon blue" />
                    <div>
                      <h4 className="helperdashboard-type-title">Premium Requests</h4>
                      <p className="helperdashboard-type-desc">Get priority for high-value service requests</p>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="helperdashboard-type-list">
                  <div className="helperdashboard-type-item">
                    <Users className="helperdashboard-type-icon green" />
                    <div>
                      <h4 className="helperdashboard-type-title">Flexible Schedule</h4>
                      <p className="helperdashboard-type-desc">Work when you want, choose your jobs</p>
                    </div>
                  </div>
                  <div className="helperdashboard-type-item">
                    <Calendar className="helperdashboard-type-icon green" />
                    <div>
                      <h4 className="helperdashboard-type-title">Easy Tasks</h4>
                      <p className="helperdashboard-type-desc">General help tasks that don't require special skills</p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar with performance, quick actions, tips */}
          <div className="helperdashboard-sidebar">
            {/* Performance Section */}
            <div className="helperdashboard-sidebar-card">
              <h3 className="helperdashboard-sidebar-title">Performance</h3>
              <div className="helperdashboard-performance-list">
                <div>
                  <div className="helperdashboard-performance-row">
                    <span>Customer Satisfaction</span>
                    <span>96%</span>
                  </div>
                  <div className="helperdashboard-performance-bar">
                    <div className="helperdashboard-performance-bar-inner green" style={{width: '96%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="helperdashboard-performance-row">
                    <span>On-time Completion</span>
                    <span>92%</span>
                  </div>
                  <div className="helperdashboard-performance-bar">
                    <div className="helperdashboard-performance-bar-inner blue" style={{width: '92%'}}></div>
                  </div>
                </div>
                <div>
                  <div className="helperdashboard-performance-row">
                    <span>Response Rate</span>
                    <span>98%</span>
                  </div>
                  <div className="helperdashboard-performance-bar">
                    <div className="helperdashboard-performance-bar-inner cyan" style={{width: '98%'}}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions Section */}
            <div className="helperdashboard-sidebar-card">
              <h3 className="helperdashboard-sidebar-title">Quick Actions</h3>
              <div className="helperdashboard-quickactions-list">
                <button className="helperdashboard-quickaction-btn primary">
                  Update Availability
                </button>
                <button className="helperdashboard-quickaction-btn">
                  View Earnings Report
                </button>
                <button className="helperdashboard-quickaction-btn">
                  Update Profile
                </button>
              </div>
            </div>

            {/* Tips Section */}
            <div className="helperdashboard-tips-card">
              <h3 className="helperdashboard-tips-title">💡 Pro Tips</h3>
              <ul className="helperdashboard-tips-list">
                <li>• Respond to requests within 5 minutes for better ratings</li>
                <li>• Upload before/after photos to build trust</li>
                <li>• Keep your availability status updated</li>
                <li>• Communicate clearly with clients via chat</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Notification Popup for new service requests */}
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