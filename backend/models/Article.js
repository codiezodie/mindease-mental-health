// models/Article.js
const mongoose = require('mongoose');

const articleSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
slug: {
  type: String,
  unique: true,
  lowercase: true,
  sparse: true  // This allows multiple null values
},
  author: {
    name: String,
    credentials: String,
    avatar: String
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Stress Management',
      'Mindfulness',
      'Emotional Resilience',
      'Self-Care',
      'Anxiety',
      'Depression',
      'Relationships',
      'Sleep',
      'Nutrition & Mental Health',
      'Exercise & Wellness',
      'Meditation',
      'Therapy Tips',
      'General Wellness'
    ]
  },
  tags: [String],
  coverImage: {
    type: String,
    default: 'default-article.jpg'
  },
  excerpt: {
    type: String,
    required: true,
    maxlength: 200
  },
  content: {
    type: String,
    required: true
  },
  readTime: {
    type: Number,
    default: 5
  },
  views: {
    type: Number,
    default: 0
  },
  likes: {
    type: Number,
    default: 0
  },
  likedBy: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  published: {
    type: Boolean,
    default: true
  },
  featured: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

// Generate slug before saving
articleSchema.pre('save', function(next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

module.exports = mongoose.model('Article', articleSchema);