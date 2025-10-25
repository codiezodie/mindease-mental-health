// routes/wellness.js
const express = require('express');
const router = express.Router();
const WellnessPlan = require('../models/WellnessPlan');
const { authenticateUser } = require('../middleware/auth');

// Activity database based on mood
const activityDatabase = {
  sad: [
    { type: 'music', title: 'Listen to Uplifting Music', description: 'Play your favorite upbeat songs to boost your mood', duration: 15, time: 'flexible' },
    { type: 'journaling', title: 'Gratitude Journaling', description: 'Write down 3 things you\'re grateful for today', duration: 10, time: 'evening' },
    { type: 'exercise', title: 'Gentle Walk', description: 'Take a short walk outside to get fresh air and sunlight', duration: 20, time: 'morning' },
    { type: 'social', title: 'Connect with a Friend', description: 'Call or message someone you care about', duration: 15, time: 'flexible' },
    { type: 'art', title: 'Creative Expression', description: 'Draw, paint, or do any creative activity', duration: 30, time: 'afternoon' }
  ],
  anxious: [
    { type: 'breathing', title: '4-7-8 Breathing', description: 'Breathe in for 4, hold for 7, exhale for 8 counts', duration: 5, time: 'flexible' },
    { type: 'meditation', title: 'Guided Meditation', description: 'Follow a calming guided meditation session', duration: 15, time: 'morning' },
    { type: 'journaling', title: 'Worry Journal', description: 'Write down your worries and challenge negative thoughts', duration: 15, time: 'evening' },
    { type: 'exercise', title: 'Yoga Flow', description: 'Practice gentle yoga poses to release tension', duration: 20, time: 'morning' },
    { type: 'nature', title: 'Nature Connection', description: 'Spend time in nature or watch nature videos', duration: 20, time: 'afternoon' }
  ],
  stressed: [
    { type: 'breathing', title: 'Box Breathing', description: 'Breathe in a 4-4-4-4 pattern to calm your nervous system', duration: 5, time: 'flexible' },
    { type: 'exercise', title: 'Quick Workout', description: 'Do 15 minutes of cardio to release stress hormones', duration: 15, time: 'morning' },
    { type: 'meditation', title: 'Body Scan Meditation', description: 'Progressively relax each part of your body', duration: 20, time: 'evening' },
    { type: 'journaling', title: 'Priority Planning', description: 'List tasks and prioritize what really matters', duration: 10, time: 'morning' },
    { type: 'music', title: 'Calming Sounds', description: 'Listen to nature sounds or instrumental music', duration: 15, time: 'flexible' }
  ],
  tired: [
    { type: 'exercise', title: 'Energizing Stretches', description: 'Do light stretches to wake up your body', duration: 10, time: 'morning' },
    { type: 'meditation', title: 'Power Nap', description: 'Take a 20-minute power nap if needed', duration: 20, time: 'afternoon' },
    { type: 'nature', title: 'Sunlight Exposure', description: 'Get 10 minutes of natural sunlight', duration: 10, time: 'morning' },
    { type: 'reading', title: 'Light Reading', description: 'Read something uplifting for a few minutes', duration: 15, time: 'flexible' },
    { type: 'social', title: 'Social Energy', description: 'Have a brief, positive interaction with someone', duration: 10, time: 'flexible' }
  ],
  happy: [
    { type: 'exercise', title: 'Fun Movement', description: 'Dance, play sports, or do any joyful movement', duration: 30, time: 'morning' },
    { type: 'social', title: 'Share the Joy', description: 'Share your happiness with friends or family', duration: 20, time: 'flexible' },
    { type: 'journaling', title: 'Capture the Moment', description: 'Journal about what\'s making you happy today', duration: 10, time: 'evening' },
    { type: 'art', title: 'Creative Project', description: 'Start or continue a creative project you enjoy', duration: 30, time: 'afternoon' },
    { type: 'nature', title: 'Outdoor Adventure', description: 'Explore a new outdoor location', duration: 45, time: 'afternoon' }
  ],
  calm: [
    { type: 'meditation', title: 'Mindfulness Practice', description: 'Practice present-moment awareness', duration: 15, time: 'morning' },
    { type: 'reading', title: 'Peaceful Reading', description: 'Read something inspiring or educational', duration: 30, time: 'evening' },
    { type: 'journaling', title: 'Reflective Writing', description: 'Reflect on your day and your feelings', duration: 15, time: 'evening' },
    { type: 'nature', title: 'Mindful Walk', description: 'Take a slow, mindful walk in nature', duration: 25, time: 'afternoon' },
    { type: 'art', title: 'Meditative Art', description: 'Try coloring, drawing, or other calming art', duration: 30, time: 'flexible' }
  ]
};

// Generate personalized wellness plan
router.post('/generate', authenticateUser, async (req, res) => {
  try {
    const { currentMood, moodIntensity, goals, scheduleTime, duration } = req.body;

    if (!currentMood || !moodIntensity) {
      return res.status(400).json({ 
        success: false, 
        message: 'Current mood and intensity are required' 
      });
    }

    // Get activities based on mood
    let selectedActivities = activityDatabase[currentMood] || activityDatabase.calm;
    
    // Select 3-5 activities
    const numActivities = Math.min(5, selectedActivities.length);
    selectedActivities = selectedActivities.slice(0, numActivities);

    // Generate recommendations
    const recommendations = generateRecommendations(currentMood, moodIntensity, goals);

    // Create wellness plan
    const plan = await WellnessPlan.create({
      user: req.user.id,
      currentMood,
      moodIntensity,
      goals: goals || [],
      activities: selectedActivities,
      recommendations,
      scheduleTime: scheduleTime || 'flexible',
      duration: duration || 1
    });

    res.json({
      success: true,
      message: 'Wellness plan generated successfully',
      plan
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to generate plan', 
      error: error.message 
    });
  }
});

// Get user's wellness plans
router.get('/plans', authenticateUser, async (req, res) => {
  try {
    const plans = await WellnessPlan.find({ user: req.user.id })
      .sort({ createdAt: -1 })
      .limit(10);

    res.json({
      success: true,
      plans
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch plans', 
      error: error.message 
    });
  }
});

// Get specific plan
router.get('/plans/:id', authenticateUser, async (req, res) => {
  try {
    const plan = await WellnessPlan.findOne({
      _id: req.params.id,
      user: req.user.id
    });

    if (!plan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plan not found' 
      });
    }

    res.json({
      success: true,
      plan
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch plan', 
      error: error.message 
    });
  }
});

// Mark activity as completed
router.patch('/plans/:planId/activities/:activityIndex', authenticateUser, async (req, res) => {
  try {
    const { planId, activityIndex } = req.params;
    const { completed } = req.body;

    const plan = await WellnessPlan.findOne({
      _id: planId,
      user: req.user.id
    });

    if (!plan) {
      return res.status(404).json({ 
        success: false, 
        message: 'Plan not found' 
      });
    }

    if (activityIndex >= plan.activities.length) {
      return res.status(400).json({ 
        success: false, 
        message: 'Invalid activity index' 
      });
    }

    plan.activities[activityIndex].completed = completed;
    if (completed) {
      plan.activities[activityIndex].completedAt = new Date();
    } else {
      plan.activities[activityIndex].completedAt = undefined;
    }

    await plan.save();

    res.json({
      success: true,
      message: 'Activity updated',
      plan
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to update activity', 
      error: error.message 
    });
  }
});

// Helper function to generate recommendations
function generateRecommendations(mood, intensity, goals) {
  const recommendations = [];

  // Based on mood
  if (mood === 'anxious') {
    recommendations.push({
      category: 'Breathing',
      suggestion: 'Practice deep breathing exercises 3 times today',
      reason: 'Controlled breathing activates your parasympathetic nervous system, reducing anxiety'
    });
  } else if (mood === 'sad') {
    recommendations.push({
      category: 'Social Connection',
      suggestion: 'Reach out to at least one supportive person',
      reason: 'Social connection is crucial for lifting mood and combating isolation'
    });
  } else if (mood === 'stressed') {
    recommendations.push({
      category: 'Organization',
      suggestion: 'Break tasks into smaller, manageable steps',
      reason: 'Overwhelming tasks contribute to stress; small wins build momentum'
    });
  }

  // Based on intensity
  if (intensity >= 7) {
    recommendations.push({
      category: 'Self-Care',
      suggestion: 'Consider speaking with a mental health professional',
      reason: 'High intensity emotions may benefit from professional support'
    });
  }

  // Based on goals
  if (goals && goals.includes('Improve sleep')) {
    recommendations.push({
      category: 'Sleep Hygiene',
      suggestion: 'Establish a consistent bedtime routine',
      reason: 'Regular sleep patterns improve sleep quality and mental health'
    });
  }

  if (goals && goals.includes('Reduce stress')) {
    recommendations.push({
      category: 'Mindfulness',
      suggestion: 'Practice 10 minutes of mindfulness meditation daily',
      reason: 'Regular mindfulness reduces stress and improves emotional regulation'
    });
  }

  return recommendations;
}

module.exports = router;