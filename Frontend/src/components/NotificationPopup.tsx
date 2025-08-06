import React from 'react';
import { X, MapPin, Clock, User, Star } from 'lucide-react';

interface NotificationProps {
  notification: {
    id: number;
    type: 'professional' | 'casual';
    service: string;
    client: string;
    location: string;
    urgency: string;
    estimatedPay: string;
  };
  onAccept: (id: number) => void;
  onDecline: (id: number) => void;
  onClose: () => void;
}

const NotificationPopup: React.FC<NotificationProps> = ({ 
  notification, 
  onAccept, 
  onDecline, 
  onClose 
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full animate-pulse border border-[#00B9F7]">
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <h3 className="text-lg font-bold text-gray-900">New Service Request!</h3>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Service Type Badge */}
          <div className="mb-4">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
              notification.type === 'professional'
                ? 'bg-blue-100 text-blue-800'
                : 'bg-green-100 text-green-800'
            }`}>
              {notification.type === 'professional' ? '🔧 Professional' : '🤝 General Help'}
            </span>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <h4 className="font-semibold text-xl text-gray-900 mb-3">{notification.service}</h4>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <User className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Client: {notification.client}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-gray-700">Location: {notification.location}</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className={`font-medium ${
                  notification.urgency === 'High' ? 'text-red-600' :
                  notification.urgency === 'Medium' ? 'text-orange-600' : 'text-green-600'
                }`}>
                  {notification.urgency} Priority
                </span>
              </div>
              
              <div className="flex items-center space-x-3">
                <Star className="w-4 h-4 text-yellow-500" />
                <span className="text-gray-700 font-semibold">
                  Estimated Pay: {notification.estimatedPay}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex space-x-3">
            <button
              onClick={() => onDecline(notification.id)}
              className="flex-1 px-4 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium"
            >
              Decline
            </button>
            <button
              onClick={() => onAccept(notification.id)}
              className="flex-1 px-4 py-3 bg-[#00B9F7] text-white rounded-xl hover:bg-blue-600 transition-colors font-medium"
            >
              Accept Request
            </button>
          </div>

          <p className="text-center text-xs text-gray-500 mt-4">
            Respond quickly to improve your rating!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;