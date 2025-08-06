import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { Send, ArrowLeft, Phone, Video, MoreVertical } from 'lucide-react';

interface Message {
  id: number;
  sender: 'user' | 'helper';
  message: string;
  timestamp: Date;
  type: 'text' | 'system';
}

const Chat: React.FC = () => {
  const { chatId } = useParams();
  const { user } = useUser();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const otherUser = {
    name: user?.type === 'user' ? 'Rajesh Kumar' : 'Sarah Johnson',
    type: user?.type === 'user' ? 'Professional Plumber' : 'Client',
    status: 'Online',
    avatar: `https://images.unsplash.com/photo-${user?.type === 'user' ? '1472099645785' : '1494790108755'}-5ba87ac005-c9cc949eb9da?w=150&h=150&fit=crop&crop=face`
  };

  // Initialize chat with welcome message
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

    // Simulate incoming message after delay
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

    return () => clearTimeout(timer);
  }, [user?.type]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now(),
      sender: user?.type === 'user' ? 'user' : 'helper',
      message: newMessage,
      timestamp: new Date(),
      type: 'text'
    };

    setMessages(prev => [...prev, message]);
    setNewMessage('');

    // Simulate real-time response
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Link
              to={user?.type === 'user' ? '/dashboard/user' : '/dashboard/helper'}
              className="text-[#00B9F7] hover:text-blue-600 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </Link>
            
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full overflow-hidden">
                <img
                  src={otherUser.avatar}
                  alt={otherUser.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">{otherUser.name}</h3>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">{otherUser.status}</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-600 hover:text-[#00B9F7] transition-colors">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#00B9F7] transition-colors">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-[#00B9F7] transition-colors">
              <MoreVertical className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Connection Status */}
      {isConnected && (
        <div className="bg-green-50 border-b border-green-200 px-4 py-2">
          <div className="max-w-4xl mx-auto flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-green-700">Connected via WebSocket - Real-time messaging active</span>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="max-w-4xl mx-auto px-4 py-6 h-[calc(100vh-200px)] overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => {
            if (message.type === 'system') {
              return (
                <div key={message.id} className="flex justify-center">
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm">
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
                className={`flex ${isCurrentUser ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  isCurrentUser
                    ? 'bg-[#00B9F7] text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}>
                  <p className="text-sm">{message.message}</p>
                  <p className={`text-xs mt-1 ${
                    isCurrentUser ? 'text-blue-100' : 'text-gray-500'
                  }`}>
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

      {/* Message Input */}
      <div className="bg-white border-t border-gray-200 px-4 py-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSendMessage} className="flex space-x-4">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#00B9F7] focus:border-transparent"
              placeholder="Type your message..."
            />
            <button
              type="submit"
              className="bg-[#00B9F7] text-white p-3 rounded-xl hover:bg-blue-600 transition-colors"
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