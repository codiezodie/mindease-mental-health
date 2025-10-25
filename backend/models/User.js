// models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
    minlength: 6,
    select: false
  },
  age: {
    type: Number,
    min: 13
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other', 'prefer-not-to-say']
  },
  avatar: {
    type: String,
    default: 'default-avatar.png'
  },
  moodHistory: [{
    mood: {
      type: String,
      enum: ['happy', 'sad', 'anxious', 'stressed', 'calm', 'angry', 'tired', 'energetic']
    },
    intensity: {
      type: Number,
      min: 1,
      max: 10
    },
    note: String,
    timestamp: {
      type: Date,
      default: Date.now
    }
  }],
  preferences: {
    favoriteActivities: [String],
    notificationEnabled: {
      type: Boolean,
      default: true
    },
    theme: {
      type: String,
      enum: ['light', 'dark'],
      default: 'light'
    }
  },
  savedArticles: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Article'
  }],
  chatHistory: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ChatSession'
  }],
  wellnessPlans: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'WellnessPlan'
  }]
}, {
  timestamps: true
});

// Hash password before saving
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Compare password method
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);