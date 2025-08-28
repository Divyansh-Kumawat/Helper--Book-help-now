// Main entry point for the React application.
// Sets up routing and provides global user context.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { UserProvider } from './context/UserContext';
import { HelperProvider } from './context/HelperContext';
import LandingPage from './pages/LandingPage';
import UserRegistration from './pages/UserRegistration';
import HelperRegistration from './pages/HelperRegistration';
import UserDashboard from './pages/UserDashboard';
import HelperDashboard from './pages/HelperDashboard';
import ServiceBooking from './pages/ServiceBooking';
import Chat from './components/Chat';
import UserLoginPage from './pages/UserLoginPage';
import HelperLoginPage from './pages/HelperLoginPage';
import './index.css';
import { GoogleOAuthProvider } from '@react-oauth/google';
const GOOGLE_CLIENT_ID = '684121166556-pgcr3qeunechhhh9uvh5shfq96t53ftu.apps.googleusercontent.com';
function App() {
  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      {/* UserProvider supplies authentication and user data to all components */}
      <UserProvider>
        <HelperProvider>
          <Router>
            {/* Main app container with background styling */}
            <div className="min-h-screen bg-gray-50">
              {/* Define all application routes */}
            <Routes>
              {/* Landing page route */}
              <Route path="/" element={<LandingPage />} />
              {/* Registration routes for user and helper */}
              <Route path="/register/user" element={<UserRegistration />} />
              <Route path="/register/helper" element={<HelperRegistration />} />
              {/* Login routes for user and helper */}
              <Route path="/user-login" element={<UserLoginPage />} />
              <Route path="/helper-login" element={<HelperLoginPage />} />
              {/* Dashboard routes for user and helper */}
              <Route path="/dashboard/user" element={<UserDashboard />} />
              <Route path="/dashboard/helper" element={<HelperDashboard />} />
              {/* Service booking route */}
              <Route path="/book-service" element={<ServiceBooking />} />
              {/* Chat route with dynamic chatId */}
              <Route path="/chat/:chatId" element={<Chat />} />
            </Routes>
          </div>
        </Router>
      </HelperProvider>
    </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;