// Chat.tsx - Real-time chat component for user-helper communication.
// Analysis:
// - Uses React hooks for state and effects.
// - Simulates a chat experience with initial messages and auto-responses.
// - Adapts UI based on user type (user/helper).
// - Scrolls to latest message automatically.
// - UI includes header, message list, and input box.

import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Send, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';

// Message interface defines the structure of each chat message
interface Message {
  id: number;
  sender: 'user' | 'helper';
  message: string;
  timestamp: Date;
  type: 'text' | 'system';
}

const Chat: React.FC = () => {
  // Get chatId from route params (for dynamic chat sessions)
  const { chatId } = useParams();
  // Get current user from context
  const { user } = useUser();
  // State for chat messages
  const [messages, setMessages] = useState<Message[]>([]);
  // State for new message input
  const [newMessage, setNewMessage] = useState('');
  // State to indicate connection status (simulated)
  const [isConnected, setIsConnected] = useState(false);
  // Ref for scrolling to the bottom of messages
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Simulate the other user in the chat based on current user type
  const otherUser = {
    name: user?.type === 'user' ? 'Rajesh Kumar' : 'Sarah Johnson',
    type: user?.type === 'user' ? 'Professional Plumber' : 'Client',
    status: 'Online',
    avatar: `https://images.unsplash.com/photo-${user?.type === 'user' ? '1472099645785' : '1494790108755'}-5ba87ac005-c9cc949eb9da?w=150&h=150&fit=crop&crop=face`
  };

  // useEffect to initialize chat with welcome and system messages
  useEffect(() => {
    const initialMessages: Message[] = [
      {
        id: 1,
        sender: user?.type === 'user' ? 'helper' : 'user',
        message: user?.type === 'user' 
          ? "Hi! I'm Rajesh, your plumber. I've accepted your request for plumbing repair. Could you please describe the issue in more detail?"
          : "Hello! I saw your plumbing service request. I need help with a leaking pipe in my kitchen. When would be a good time for you to come over?",
        timestamp: new Date(Date.now() - 300000), // 5 minutes ago
        type: 'text'
      },
      {
        id: 2,
        sender: 'system',
        message: 'This is a real-time chat powered by WebSocket. Messages are delivered instantly.',
        timestamp: new Date(Date.now() - 240000), // 4 minutes ago
        type: 'system'
      }
    ];

    setMessages(initialMessages);
    setIsConnected(true);

    // Simulate incoming message after a delay (auto-response)
    const timer = setTimeout(() => {
      const autoMessage: Message = {
        id: 3,
        sender: user?.type === 'user' ? 'helper' : 'user',
        message: user?.type === 'user' 
          ? "I can come over today between 2-4 PM. My service charge is ₹800 for pipe repair including materials. Is that okay?"
          : "That sounds good. I'm available anytime after 1 PM today. The kitchen sink has been dripping for 2 days now.",
        timestamp: new Date(),
        type: 'text'
      };
      setMessages(prev => [...prev, autoMessage]);
    }, 3000);

    // Cleanup timer on unmount
    return () => clearTimeout(timer);
  }, [user?.type]);

  // useEffect to scroll to the bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Handler for sending a new message
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Create new message object
    const message: Message = {
      id: Date.now(),
      sender: user?.type === 'user' ? 'user' : 'helper',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    // Add new message to messages state
    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate auto-response from other user after a short delay
    setTimeout(() => {
      const responses = [
        "Got it! I'll be there shortly.",
        "Perfect, see you then!",
        "That works for me. Payment can be done after completion.",
        "Thank you for choosing Helper!",
        "I'll bring all necessary tools."
      ];
      
      const autoResponse: Message = {
        id: Date.now() + 1,
        sender: user?.type === 'user' ? 'helper' : 'user',
        message: responses[Math.floor(Math.random() * responses.length)],
        timestamp: new Date(),
        type: 'text'
      };
      
      setMessages(prev => [...prev, autoResponse]);
    }, 1000 + Math.random() * 2000);
  };

  return (
    <div className="chat-root">
      {/* Header section with back button, avatar, and contact options */}
      <div className="chat-header">
        <div className="chat-header-container">
          <div className="chat-header-left">
            <Link
              to={user?.type === 'user' ? '/dashboard/user' : '/dashboard/helper'}
              className="chat-header-back"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="chat-header-avatar">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="chat-header-info">
                <h3 className="chat-header-name">{otherUser.name}</h3>
                <div className="chat-header-status">
                  <div className="chat-header-status-dot"></div>
                  <span className="chat-header-status-text">{otherUser.status}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="chat-header-actions">
            <button className="chat-header-action-btn">
              <Phone className="w-5 h-5" />
            </button>
            <button className="chat-header-action-btn">
              <Video className="w-5 h-5" />
            </button>
            <button className="chat-header-action-btn">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      {/* Connection status bar */}
      {isConnected && (
        <div className="chat-connection-bar">
          <div className="chat-connection-bar-container">
            <div className="chat-connection-dot"></div>
            <span className="chat-connection-text">Connected via WebSocket - Real-time messaging active</span>
          </div>
        </div>
      )}
      {/* Messages area */}
      <div className="chat-messages-area">
        <div className="chat-messages-list">
          {messages.map((message) => {
            if (message.type === 'system') {
              return (
                <div key={message.id} className="chat-message-system">
                  <div className="chat-message-system-bubble">
                    {message.message}
                  </div>
                </div>
              );
            }
            const isCurrentUser = (user?.type === 'user' && message.sender === 'user') || 
                                  (user?.type !== 'user' && message.sender === 'helper');
            return (
              <div
                key={message.id}
                className={`chat-message-row ${isCurrentUser ? 'user' : 'helper'}`}
              >
                <div className={`chat-message-bubble ${isCurrentUser ? 'user' : 'helper'}`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`chat-message-time ${isCurrentUser ? 'user' : 'helper'}`}>
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </p>
                </div>
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      {/* Message input box */}
      <div className="chat-input-bar">
        <div className="chat-input-bar-container">
          <form onSubmit={handleSendMessage} className="chat-input-form">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="chat-input-box"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="chat-input-send-btn"
            >
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;