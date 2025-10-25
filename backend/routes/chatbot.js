// routes/chatbot.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const ChatSession = require('../models/ChatSession');
const { authenticateUser } = require('../middleware/auth');

// Free AI API - using Hugging Face Inference API
// You'll need to sign up at https://huggingface.co/ for a free API key

const AI_API_URL = 'https://api-inference.huggingface.co/models/microsoft/DialoGPT-medium';
const AI_API_KEY = process.env.HUGGINGFACE_API_KEY;

// Fallback responses for emotional support
const fallbackResponses = {
  sad: [
    "I hear you, and it's okay to feel sad. Remember, these feelings are temporary. What's one small thing that usually makes you feel a bit better?",
    "I'm here for you. It's brave of you to share how you're feeling. Would you like to talk about what's making you feel this way?"
  ],
  anxious: [
    "Anxiety can feel overwhelming. Let's try a quick breathing exercise: breathe in for 4 counts, hold for 4, exhale for 4. Would you like to talk about what's worrying you?",
    "I understand anxiety can be difficult. Remember, you've gotten through tough moments before. What helps you feel grounded?"
  ],
  stressed: [
    "Stress can be exhausting. It might help to break things down into smaller steps. What's the most pressing thing on your mind right now?",
    "I hear that you're stressed. Remember to be kind to yourself. Have you taken a moment to pause and breathe today?"
  ],
  default: [
    "Thank you for sharing. I'm here to listen and support you. How are you feeling right now?",
    "I appreciate you opening up. Your mental health matters. What would be most helpful for you in this moment?"
  ]
};

// Create or get chat session
router.post('/session', authenticateUser, async (req, res) => {
  try {
    const { mood } = req.body;
    
    const session = await ChatSession.create({
      user: req.user.id,
      mood: mood || 'neutral',
      messages: [{
        role: 'assistant',
        content: "Hi! I'm your mental wellness companion. I'm here to listen and support you. How are you feeling today?",
        timestamp: new Date()
      }]
    });

    res.json({
      success: true,
      session: {
        id: session._id,
        messages: session.messages
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to create session', 
      error: error.message 
    });
  }
});

// Send message
router.post('/chat', authenticateUser, async (req, res) => {
  try {
    const { sessionId, message, mood } = req.body;

    if (!sessionId || !message) {
      return res.status(400).json({ 
        success: false, 
        message: 'Session ID and message are required' 
      });
    }

    // Find session
    const session = await ChatSession.findById(sessionId);
    
    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: 'Session not found' 
      });
    }

    // Add user message
    session.messages.push({
      role: 'user',
      content: message,
      timestamp: new Date()
    });

    let aiResponse;

    try {
      // Try to use Hugging Face API
      if (AI_API_KEY) {
        const response = await axios.post(
          AI_API_URL,
          {
            inputs: message,
            parameters: {
              max_length: 150,
              temperature: 0.7,
              top_p: 0.9
            }
          },
          {
            headers: {
              'Authorization': `Bearer ${AI_API_KEY}`,
              'Content-Type': 'application/json'
            },
            timeout: 10000
          }
        );

        aiResponse = response.data[0]?.generated_text || getFallbackResponse(mood);
      } else {
        aiResponse = getFallbackResponse(mood);
      }
    } catch (apiError) {
      console.log('AI API error, using fallback:', apiError.message);
      aiResponse = getFallbackResponse(mood);
    }

    // Add AI response
    session.messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date(),
      emotion: detectEmotion(message)
    });

    session.lastMessageAt = new Date();
    if (mood) session.mood = mood;
    
    await session.save();

    res.json({
      success: true,
      message: aiResponse,
      session: {
        id: session._id,
        mood: session.mood
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to send message', 
      error: error.message 
    });
  }
});

// Get chat history
router.get('/history', authenticateUser, async (req, res) => {
  try {
    const sessions = await ChatSession.find({ user: req.user.id })
      .sort({ lastMessageAt: -1 })
      .limit(10);

    res.json({
      success: true,
      sessions: sessions.map(s => ({
        id: s._id,
        title: s.title,
        mood: s.mood,
        lastMessageAt: s.lastMessageAt,
        messageCount: s.messages.length
      }))
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch history', 
      error: error.message 
    });
  }
});

// Get specific session
router.get('/session/:id', authenticateUser, async (req, res) => {
  try {
    const session = await ChatSession.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!session) {
      return res.status(404).json({ 
        success: false, 
        message: 'Session not found' 
      });
    }

    res.json({
      success: true,
      session
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch session', 
      error: error.message 
    });
  }
});

// Helper function to get fallback response
function getFallbackResponse(mood) {
  const responses = fallbackResponses[mood] || fallbackResponses.default;
  return responses[Math.floor(Math.random() * responses.length)];
}

// Helper function to detect emotion in text
function detectEmotion(text) {
  const lowercaseText = text.toLowerCase();
  
  const negativeWords = ['sad', 'depressed', 'anxious', 'worried', 'scared', 'angry', 'upset', 'hurt', 'pain'];
  const positiveWords = ['happy', 'great', 'good', 'better', 'excited', 'joy', 'love', 'grateful'];
  const concernedWords = ['help', 'struggle', 'difficult', 'hard', 'problem', 'issue'];
  
  if (negativeWords.some(word => lowercaseText.includes(word))) return 'negative';
  if (concernedWords.some(word => lowercaseText.includes(word))) return 'concerned';
  if (positiveWords.some(word => lowercaseText.includes(word))) return 'positive';
  
  return 'neutral';
}

module.exports = router;