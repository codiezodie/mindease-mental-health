// models/WellnessPlan.js
const mongoose = require('mongoose');

const wellnessPlanSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  currentMood: {
    type: String,
    required: true,
    enum: ['happy', 'sad', 'anxious', 'stressed', 'calm', 'angry', 'tired', 'energetic']
  },
  moodIntensity: {
    type: Number,
    min: 1,
    max: 10,
    required: true
  },
  goals: [{
    type: String,
    enum: [
      'Reduce stress',
      'Improve sleep',
      'Boost energy',
      'Manage anxiety',
      'Enhance focus',
      'Build confidence',
      'Improve relationships',
      'Practice mindfulness',
      'Develop healthy habits'
    ]
  }],
  activities: [{
    type: {
      type: String,
      enum: ['meditation', 'journaling', 'breathing', 'exercise', 'music', 'reading', 'art', 'nature', 'social']
    },
    title: String,
    description: String,
    duration: Number, // in minutes
    time: String, // e.g., "Morning", "Afternoon", "Evening"
    completed: {
      type: Boolean,
      default: false
    },
    completedAt: Date
  }],
  recommendations: [{
    category: String,
    suggestion: String,
    reason: String
  }],
  scheduleTime: {
    type: String,
    enum: ['morning', 'afternoon', 'evening', 'flexible']
  },
  duration: {
    type: Number,
    default: 1 // days
  },
  isActive: {
    type: Boolean,
    default: true
  },
  progress: {
    totalActivities: Number,
    completedActivities: Number,
    completionRate: Number
  }
}, {
  timestamps: true
});

// Calculate progress before saving
wellnessPlanSchema.pre('save', function(next) {
  const total = this.activities.length;
  const completed = this.activities.filter(a => a.completed).length;
  
  this.progress = {
    totalActivities: total,
    completedActivities: completed,
    completionRate: total > 0 ? Math.round((completed / total) * 100) : 0
  };
  
  next();
});

module.exports = mongoose.model('WellnessPlan', wellnessPlanSchema);