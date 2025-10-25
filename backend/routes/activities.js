// routes/activities.js
const express = require('express');
const router = express.Router();

// Get daily tip
router.get('/daily-tip', (req, res) => {
  const tips = [
    "Take 5 deep breaths when you feel overwhelmed. It helps reset your nervous system.",
    "Practice gratitude by writing down 3 things you're thankful for each morning.",
    "A 10-minute walk can significantly boost your mood and energy levels.",
    "Stay hydrated! Even mild dehydration can affect your mood and cognitive function.",
    "Connect with someone today - a simple text or call can make a big difference.",
    "Set boundaries. It's okay to say no to protect your mental health.",
    "Try the 5-4-3-2-1 grounding technique: name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste.",
    "Move your body. Even gentle stretching can release tension and improve mood.",
    "Limit social media if it's affecting your mental health. Take regular breaks.",
    "Be kind to yourself. Talk to yourself like you would to a good friend.",
    "Create a bedtime routine to improve sleep quality and mental clarity.",
    "Spend time in nature. Even 20 minutes outdoors can reduce stress hormones.",
    "Practice mindful eating. Pay attention to your food and eat without distractions.",
    "Challenge negative thoughts. Ask yourself: Is this thought helpful or true?",
    "Celebrate small wins. Progress is progress, no matter how small.",
    "Try journaling for 10 minutes before bed to process your day.",
    "Listen to music that makes you feel good. Music has powerful mood-boosting effects.",
    "Reach out for help when you need it. Asking for support is a sign of strength.",
    "Create a self-care toolkit with activities that help you feel better.",
    "Remember: Mental health is just as important as physical health.",
    "Take breaks throughout your day. Rest is productive.",
    "Practice self-compassion. You're doing better than you think.",
    "Focus on what you can control and let go of what you can't.",
    "Make time for hobbies and activities you enjoy.",
    "Stay connected with your support system, even when it's hard.",
    "Set realistic expectations for yourself. Perfection isn't the goal.",
    "Notice and challenge your inner critic. You deserve kindness from yourself.",
    "Create a morning routine that sets a positive tone for your day.",
    "Take screen breaks to reduce eye strain and mental fatigue.",
    "Practice saying affirmations. 'I am enough' is a good place to start."
  ];

  const todayIndex = new Date().getDate() % tips.length;
  
  res.json({
    success: true,
    tip: tips[todayIndex],
    date: new Date().toDateString()
  });
});

// Get activity recommendations by mood
router.get('/recommendations', (req, res) => {
  const { mood } = req.query;
  
  const recommendations = {
    sad: [
      { title: 'Listen to Uplifting Music', icon: 'music', duration: '15 min' },
      { title: 'Call a Friend', icon: 'phone', duration: '20 min' },
      { title: 'Watch Funny Videos', icon: 'laugh', duration: '10 min' },
      { title: 'Take a Warm Bath', icon: 'spa', duration: '30 min' },
      { title: 'Write in Your Journal', icon: 'book', duration: '15 min' }
    ],
    anxious: [
      { title: 'Deep Breathing Exercise', icon: 'wind', duration: '5 min' },
      { title: 'Progressive Muscle Relaxation', icon: 'meditation', duration: '15 min' },
      { title: 'Gentle Yoga', icon: 'yoga', duration: '20 min' },
      { title: 'Guided Meditation', icon: 'om', duration: '10 min' },
      { title: 'Go for a Walk', icon: 'walking', duration: '20 min' }
    ],
    stressed: [
      { title: 'Quick Workout', icon: 'dumbbell', duration: '15 min' },
      { title: 'Organize Your Space', icon: 'organize', duration: '20 min' },
      { title: 'Priority Planning', icon: 'list', duration: '10 min' },
      { title: 'Listen to Calm Music', icon: 'headphones', duration: '15 min' },
      { title: 'Practice Mindfulness', icon: 'brain', duration: '10 min' }
    ],
    tired: [
      { title: 'Power Nap', icon: 'sleep', duration: '20 min' },
      { title: 'Energizing Stretches', icon: 'stretch', duration: '10 min' },
      { title: 'Cold Water Splash', icon: 'water', duration: '2 min' },
      { title: 'Healthy Snack', icon: 'apple', duration: '5 min' },
      { title: 'Step Outside', icon: 'sun', duration: '10 min' }
    ],
    happy: [
      { title: 'Share Your Joy', icon: 'heart', duration: '15 min' },
      { title: 'Try Something New', icon: 'star', duration: '30 min' },
      { title: 'Dance to Your Favorite Song', icon: 'music', duration: '10 min' },
      { title: 'Help Someone', icon: 'hands', duration: '20 min' },
      { title: 'Capture the Moment', icon: 'camera', duration: '5 min' }
    ],
    calm: [
      { title: 'Meditation', icon: 'meditation', duration: '15 min' },
      { title: 'Read a Book', icon: 'book', duration: '30 min' },
      { title: 'Creative Activity', icon: 'palette', duration: '30 min' },
      { title: 'Nature Walk', icon: 'tree', duration: '25 min' },
      { title: 'Reflective Journaling', icon: 'pen', duration: '15 min' }
    ]
  };

  const activities = recommendations[mood] || recommendations.calm;

  res.json({
    success: true,
    mood,
    activities
  });
});

// Get meditation resources
router.get('/meditation', (req, res) => {
  const meditations = [
    {
      id: 1,
      title: 'Body Scan Meditation',
      duration: 15,
      difficulty: 'Beginner',
      description: 'Systematically focus on different parts of your body to release tension.',
      benefits: ['Reduces stress', 'Improves body awareness', 'Promotes relaxation']
    },
    {
      id: 2,
      title: 'Breathing Awareness',
      duration: 10,
      difficulty: 'Beginner',
      description: 'Focus solely on your breath to calm the mind.',
      benefits: ['Reduces anxiety', 'Improves focus', 'Calms nervous system']
    },
    {
      id: 3,
      title: 'Loving-Kindness Meditation',
      duration: 20,
      difficulty: 'Intermediate',
      description: 'Cultivate compassion for yourself and others.',
      benefits: ['Increases self-compassion', 'Reduces negative emotions', 'Improves relationships']
    },
    {
      id: 4,
      title: 'Mindful Walking',
      duration: 15,
      difficulty: 'Beginner',
      description: 'Bring full attention to the experience of walking.',
      benefits: ['Grounds you in present', 'Combines movement with mindfulness', 'Reduces rumination']
    },
    {
      id: 5,
      title: 'Visualization Meditation',
      duration: 20,
      difficulty: 'Intermediate',
      description: 'Create peaceful mental imagery to promote calm.',
      benefits: ['Reduces stress', 'Enhances creativity', 'Promotes positive emotions']
    }
  ];

  res.json({
    success: true,
    meditations
  });
});

// Get breathing exercises
router.get('/breathing', (req, res) => {
  const exercises = [
    {
      id: 1,
      name: '4-7-8 Breathing',
      duration: 5,
      steps: [
        'Exhale completely through your mouth',
        'Inhale through your nose for 4 counts',
        'Hold your breath for 7 counts',
        'Exhale through your mouth for 8 counts',
        'Repeat 3-4 times'
      ],
      benefits: ['Reduces anxiety', 'Helps with sleep', 'Calms nervous system'],
      bestFor: 'Anxiety and sleep issues'
    },
    {
      id: 2,
      name: 'Box Breathing',
      duration: 5,
      steps: [
        'Breathe in for 4 counts',
        'Hold for 4 counts',
        'Breathe out for 4 counts',
        'Hold for 4 counts',
        'Repeat for 5 minutes'
      ],
      benefits: ['Reduces stress', 'Improves focus', 'Regulates emotions'],
      bestFor: 'Stress management and focus'
    },
    {
      id: 3,
      name: 'Alternate Nostril Breathing',
      duration: 10,
      steps: [
        'Close right nostril, inhale through left',
        'Close left nostril, exhale through right',
        'Inhale through right',
        'Close right, exhale through left',
        'Continue alternating'
      ],
      benefits: ['Balances energy', 'Calms mind', 'Reduces anxiety'],
      bestFor: 'Balance and mental clarity'
    }
  ];

  res.json({
    success: true,
    exercises
  });
});

module.exports = router;