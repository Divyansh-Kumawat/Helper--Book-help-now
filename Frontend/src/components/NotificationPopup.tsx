// NotificationPopup displays a modal with service request details and accept/decline actions.

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
    // Overlay for modal popup
    <div className="notifpopup-overlay">
      <div className="notifpopup-card">
        <div className="notifpopup-inner">
          {/* Header with title and close button */}
          <div className="notifpopup-header">
            <div className="notifpopup-header-flex">
              <div className="notifpopup-header-dot"></div>
              <h3 className="notifpopup-header-title">New Service Request!</h3>
            </div>
            <button
              onClick={onClose}
              className="notifpopup-close-btn"
            >
              <X className="notifpopup-close-icon" />
            </button>
          </div>

          {/* Service type badge */}
          <div className="notifpopup-type-badge">
            <span className={`notifpopup-type-badge-inner ${notification.type}`}>
              {notification.type === 'professional' ? '🔧 Professional' : '🤝 General Help'}
            </span>
          </div>

          {/* Service details section */}
          <div className="notifpopup-details-card">
            <h4 className="notifpopup-details-title">{notification.service}</h4>
            <div className="notifpopup-details-list">
              {/* Client name */}
              <div className="notifpopup-details-row">
                <User className="notifpopup-details-icon" />
                <span className="notifpopup-details-label">Client: {notification.client}</span>
              </div>
              {/* Location */}
              <div className="notifpopup-details-row">
                <MapPin className="notifpopup-details-icon" />
                <span className="notifpopup-details-label">Location: {notification.location}</span>
              </div>
              {/* Urgency level */}
              <div className="notifpopup-details-row">
                <Clock className="notifpopup-details-icon" />
                <span className={`notifpopup-details-urgency notifpopup-details-urgency-${notification.urgency.toLowerCase()}`}>
                  {notification.urgency} Priority
                </span>
              </div>
              {/* Estimated pay */}
              <div className="notifpopup-details-row">
                <Star className="notifpopup-details-icon yellow" />
                <span className="notifpopup-details-pay">
                  Estimated Pay: {notification.estimatedPay}
                </span>
              </div>
            </div>
          </div>

          {/* Accept and Decline buttons */}
          <div className="notifpopup-actions">
            <button
              onClick={() => onDecline(notification.id)}
              className="notifpopup-decline-btn"
            >
              Decline
            </button>
            <button
              onClick={() => onAccept(notification.id)}
              className="notifpopup-accept-btn"
            >
              Accept Request
            </button>
          </div>

          {/* Footer note */}
          <p className="notifpopup-footer-note">
            Respond quickly to improve your rating!
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationPopup;