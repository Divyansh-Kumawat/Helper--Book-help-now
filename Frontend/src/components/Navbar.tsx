// Navbar component displays navigation links based on user type and handles logout.

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { useHelper } from '../context/HelperContext';
import { 
  Home, 
  Search, 
  MessageCircle, 
  Wallet, 
  User, 
  Bell,
  Briefcase,
  History,
  TrendingUp,
  Menu,
  LogOut
} from 'lucide-react';

const Navbar: React.FC = () => {
  // Get current user and logout function from context
  const { user, logout: userLogout } = useUser();
  const { helper, logout: helperLogout } = useHelper();
  const navigate = useNavigate();

  // Handle user logout and redirect to home
  const handleLogout = () => {
    if (user) {
      userLogout();
    }
    if (helper) {
      helperLogout();
    }
    navigate('/');
  };

  // Hide navbar if neither user nor helper is logged in
  if (!user && !helper) return null;

  // Navigation items for regular users
  const userNavItems = [
    { name: 'Home', path: '/dashboard/user', icon: Home },
    { name: 'Book a Service', path: '/book-service', icon: Search },
    { name: 'Browse Services', path: '/browse', icon: Briefcase },
    { name: 'My Requests', path: '/requests', icon: History },
    { name: 'My Chats', path: '/chats', icon: MessageCircle },
    { name: 'Wallet', path: '/wallet', icon: Wallet }
  ];

  // Navigation items for helpers/service providers
  const helperNavItems = [
    { name: 'Home', path: '/dashboard/helper', icon: Home },
    { name: 'Service Requests', path: '/service-requests', icon: Briefcase },
    { name: 'My Jobs', path: '/my-jobs', icon: History },
    { name: 'My Chats', path: '/chats', icon: MessageCircle },
    { name: 'Earnings', path: '/earnings', icon: TrendingUp },
    { name: 'Notifications', path: '/notifications', icon: Bell }
  ];

  // Select navigation items based on context
  const navItems = user ? userNavItems : helperNavItems;

  return (
    <nav className="navbar-root">
      <div className="navbar-container">
        <div className="navbar-flex">
          {/* Branding */}
          <Link to="/" className="navbar-brand">
            <div className="navbar-logo">
              <span className="navbar-logo-text">H</span>
            </div>
            <span className="navbar-title">HELPER</span>
          </Link>

          {/* Main navigation links (visible on medium screens and up) */}
          <div className="navbar-links">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="navbar-link"
              >
                <item.icon className="navbar-link-icon" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            {/* Profile dropdown for user or helper */}
            <div className="navbar-profile group">
              <button className="navbar-profile-btn">
                <User className="navbar-profile-icon" />
                <span>{user ? user.name : helper?.name}</span>
              </button>
              {/* Dropdown menu for profile and logout */}
              <div className="navbar-profile-dropdown">
                <Link to="/profile" className="navbar-profile-dropdown-link">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="navbar-profile-dropdown-link navbar-profile-logout"
                >
                  <LogOut className="navbar-profile-logout-icon" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Hamburger menu for mobile screens */}
          <div className="navbar-hamburger">
            <Menu className="navbar-hamburger-icon" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar