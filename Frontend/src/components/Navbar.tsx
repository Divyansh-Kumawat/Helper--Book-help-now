import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUser } from '../context/UserContext';
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
  const { user, logout } = useUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!user) return null;

  const userNavItems = [
    { name: 'Home', path: '/dashboard/user', icon: Home },
    { name: 'Book a Service', path: '/book-service', icon: Search },
    { name: 'Browse Services', path: '/browse', icon: Briefcase },
    { name: 'My Requests', path: '/requests', icon: History },
    { name: 'My Chats', path: '/chats', icon: MessageCircle },
    { name: 'Wallet', path: '/wallet', icon: Wallet }
  ];

  const helperNavItems = [
    { name: 'Home', path: '/dashboard/helper', icon: Home },
    { name: 'Service Requests', path: '/service-requests', icon: Briefcase },
    { name: 'My Jobs', path: '/my-jobs', icon: History },
    { name: 'My Chats', path: '/chats', icon: MessageCircle },
    { name: 'Earnings', path: '/earnings', icon: TrendingUp },
    { name: 'Notifications', path: '/notifications', icon: Bell }
  ];

  const navItems = user.type === 'user' ? userNavItems : helperNavItems;

  return (
    <nav className="bg-white shadow-lg border-b-2 border-[#00B9F7]">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-[#00B9F7] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">H</span>
            </div>
            <span className="text-2xl font-bold text-[#00B9F7]">HELPER</span>
          </Link>

          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className="flex items-center space-x-1 text-gray-700 hover:text-[#00B9F7] transition-colors"
              >
                <item.icon className="w-4 h-4" />
                <span>{item.name}</span>
              </Link>
            ))}
            
            <div className="relative group">
              <button className="flex items-center space-x-2 text-gray-700 hover:text-[#00B9F7] transition-colors">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </button>
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                <Link to="/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          <div className="md:hidden">
            <Menu className="w-6 h-6 text-gray-700" />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar