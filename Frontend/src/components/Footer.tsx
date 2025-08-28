// Footer component displays branding, quick links, services, and contact info.

import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="footer-root">
      <div className="footer-container">
        <div className="footer-grid">
          {/* Branding and description */}
          <div className="footer-brand">
            <div className="footer-brand-flex">
              <div className="footer-logo">
                <span className="footer-logo-text">H</span>
              </div>
              <span className="footer-title">HELPER</span>
            </div>
            <p className="footer-desc">
              Book your service at your doorstep. Professional and reliable service providers ready to help you with all your needs.
            </p>
          </div>

          {/* Quick navigation links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00B9F7]">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-300 hover:text-[#00B9F7] transition-colors">About Us</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Terms & Conditions</Link></li>
              <li><Link to="/contact" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* List of available services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00B9F7]">Services</h3>
            <ul className="space-y-2">
              <li><Link to="/services/cleaning" className="text-gray-300 hover:text-[#00B9F7] transition-colors">House Cleaning</Link></li>
              <li><Link to="/services/plumbing" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Plumbing</Link></li>
              <li><Link to="/services/electrical" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Electrical</Link></li>
              <li><Link to="/services/gardening" className="text-gray-300 hover:text-[#00B9F7] transition-colors">Gardening</Link></li>
            </ul>
          </div>

          {/* Contact information and social media icons */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-[#00B9F7]">Contact Info</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-[#00B9F7]" />
                <span className="text-gray-300">support@helper.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-[#00B9F7]" />
                <span className="text-gray-300">+91-9876543210</span>
              </div>
            </div>
            <div className="flex space-x-4 mt-6">
              {/* Social media icons */}
              <Facebook className="w-6 h-6 text-gray-300 hover:text-[#00B9F7] cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-gray-300 hover:text-[#00B9F7] cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-gray-300 hover:text-[#00B9F7] cursor-pointer transition-colors" />
              <Linkedin className="w-6 h-6 text-gray-300 hover:text-[#00B9F7] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        {/* Copyright and tagline */}
        <div className="footer-copyright">
          <p>
            © 2025 Helper. All rights reserved. | Book your service at your doorstep
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;