// src/pages/Chatbot.js
import React, { useState, useEffect, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { chatbotAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../ChatbotStyles.css';

function Chatbot() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  
  const [step, setStep] = useState('mood'); // 'mood', 'chat', 'history'
  const [selectedMood, setSelectedMood] = useState('');
  const [sessionId, setSessionId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatHistory, setChatHistory] = useState([]);
  
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      alert('Please login to use the AI Chatbot');
      navigate('/login');
    }
  }, [user, navigate]);

  // Fetch chat history
  useEffect(() => {
    if (user) {
      fetchChatHistory();
    }
  }, [user]);

  // Auto-scroll to bottom
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchChatHistory = async () => {
    try {
      const { data } = await chatbotAPI.getHistory();
      setChatHistory(data.sessions || []);
    } catch (error) {
      console.error('Error fetching history:', error);
    }
  };

  const moods = [
    { value: 'happy', emoji: '😊', label: 'Happy', color: '#4CAF50' },
    { value: 'sad', emoji: '😢', label: 'Sad', color: '#2196F3' },
    { value: 'anxious', emoji: '😰', label: 'Anxious', color: '#FF9800' },
    { value: 'stressed', emoji: '😫', label: 'Stressed', color: '#F44336' },
    { value: 'calm', emoji: '😌', label: 'Calm', color: '#9C27B0' },
    { value: 'angry', emoji: '😠', label: 'Angry', color: '#E91E63' },
    { value: 'tired', emoji: '😴', label: 'Tired', color: '#607D8B' },
    { value: 'energetic', emoji: '⚡', label: 'Energetic', color: '#FFEB3B' }
  ];

  const handleMoodSelect = async (mood) => {
    setSelectedMood(mood);
    setIsTyping(true);
    
    try {
      const { data } = await chatbotAPI.createSession(mood);
      setSessionId(data.session.id);
      setMessages(data.session.messages);
      setStep('chat');
      setTimeout(() => {
        inputRef.current?.focus();
      }, 500);
    } catch (error) {
      console.error('Error creating session:', error);
      alert('Failed to start chat. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !sessionId) return;

    const userMessage = {
      role: 'user',
      content: inputMessage,
      timestamp: new Date().toISOString()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    try {
      const { data } = await chatbotAPI.sendMessage(
        sessionId,
        inputMessage,
        selectedMood
      );

      const aiMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again.',
        timestamp: new Date().toISOString()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const loadPreviousChat = async (session) => {
    try {
      const { data } = await chatbotAPI.getSession(session.id);
      setSessionId(data.session._id);
      setMessages(data.session.messages);
      setSelectedMood(data.session.mood);
      setStep('chat');
    } catch (error) {
      console.error('Error loading chat:', error);
      alert('Failed to load chat history.');
    }
  };

  const startNewChat = () => {
    setStep('mood');
    setMessages([]);
    setSessionId(null);
    setSelectedMood('');
    setInputMessage('');
  };

  const viewHistory = () => {
    setStep('history');
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === yesterday.toDateString()) {
      return 'Yesterday';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  if (!user) {
    return null;
  }

  return (
    <div className="chatbot-page">
      <div className="chatbot-container">
        
        {/* MOOD SELECTION SCREEN */}
        {step === 'mood' && (
          <div className="mood-selection">
            <div className="mood-header">
              <div className="bot-avatar">🤖</div>
              <h1>Hi, {user.name}! 👋</h1>
              <p>How are you feeling today?</p>
              {chatHistory.length > 0 && (
                <button onClick={viewHistory} className="history-link">
                  📜 View Chat History
                </button>
              )}
            </div>
            
            <div className="mood-grid">
              {moods.map((mood) => (
                <button
                  key={mood.value}
                  className="mood-button"
                  style={{ borderColor: mood.color }}
                  onClick={() => handleMoodSelect(mood.value)}
                >
                  <span className="mood-emoji">{mood.emoji}</span>
                  <span className="mood-label">{mood.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* CHAT SCREEN */}
        {step === 'chat' && (
          <div className="chat-screen">
            {/* Chat Header */}
            <div className="chat-header">
              <button onClick={startNewChat} className="back-btn">
                ← Back
              </button>
              <div className="chat-header-info">
                <div className="bot-avatar-small">🤖</div>
                <div>
                  <h3>AI Wellness Companion</h3>
                  <p className="chat-status">
                    {isTyping ? 'Typing...' : 'Online'}
                  </p>
                </div>
              </div>
              <button onClick={viewHistory} className="history-btn">
                📜
              </button>
            </div>

            {/* Messages */}
            <div className="messages-container">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.role === 'user' ? 'user-message' : 'ai-message'}`}
                >
                  {msg.role === 'assistant' && (
                    <div className="message-avatar">🤖</div>
                  )}
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                    <span className="message-time">
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                  {msg.role === 'user' && (
                    <div className="message-avatar user-avatar">
                      {user.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                </div>
              ))}
              
              {isTyping && (
                <div className="message ai-message">
                  <div className="message-avatar">🤖</div>
                  <div className="message-bubble typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form onSubmit={handleSendMessage} className="chat-input-form">
              <input
                ref={inputRef}
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your message..."
                className="chat-input"
                disabled={isTyping}
              />
              <button
                type="submit"
                className="send-btn"
                disabled={!inputMessage.trim() || isTyping}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22 2L11 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M22 2L15 22L11 13L2 9L22 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>
          </div>
        )}

        {/* HISTORY SCREEN */}
        {step === 'history' && (
          <div className="history-screen">
            <div className="history-header">
              <button onClick={() => setStep('mood')} className="back-btn">
                ← Back
              </button>
              <h2>Chat History</h2>
              <button onClick={startNewChat} className="new-chat-btn">
                + New Chat
              </button>
            </div>

            <div className="history-list">
              {chatHistory.length === 0 ? (
                <div className="empty-history">
                  <p>📝 No chat history yet</p>
                  <button onClick={startNewChat} className="start-btn">
                    Start Your First Chat
                  </button>
                </div>
              ) : (
                chatHistory.map((session) => (
                  <div
                    key={session.id}
                    className="history-item"
                    onClick={() => loadPreviousChat(session)}
                  >
                    <div className="history-icon">💬</div>
                    <div className="history-info">
                      <h4>{session.title}</h4>
                      <p className="history-date">
                        {formatDate(session.lastMessageAt)} • {session.messageCount} messages
                      </p>
                      {session.mood && (
                        <span className="history-mood">
                          {moods.find(m => m.value === session.mood)?.emoji} {session.mood}
                        </span>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Chatbot;