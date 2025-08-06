import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import LandingPage from './pages/LandingPage';
import UserRegistration from './pages/UserRegistration';
import HelperRegistration from './pages/HelperRegistration';
import UserDashboard from './pages/UserDashboard';
import HelperDashboard from './pages/HelperDashboard';
import ServiceBooking from './pages/ServiceBooking';
import Chat from './components/Chat';
import './index.css';

function App() {
  return (
    <UserProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/register/user" element={<UserRegistration />} />
            <Route path="/register/helper" element={<HelperRegistration />} />
            <Route path="/dashboard/user" element={<UserDashboard />} />
            <Route path="/dashboard/helper" element={<HelperDashboard />} />
            <Route path="/book-service" element={<ServiceBooking />} />
            <Route path="/chat/:chatId" element={<Chat />} />
          </Routes>
        </div>
      </Router>
    </UserProvider>
  );
}

export default App;