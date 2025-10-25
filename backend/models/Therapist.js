// models/Therapist.js
const mongoose = require('mongoose');

const therapistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  phone: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true,
    enum: [
      'Psychologist',
      'Psychiatrist',
      'Psychotherapist',
      'Counselor',
      'Clinical Psychologist',
      'Licensed Clinical Social Worker (LCSW)',
      'Marriage & Family Therapist',
      'Substance Abuse Counselor',
      'Cognitive Behavioral Therapist',
      'Trauma Therapist',
      'Child & Adolescent Therapist',
      'Couples Therapist'
    ]
  },
  specializations: [{
    type: String,
    enum: [
      'Anxiety',
      'Depression',
      'Stress Management',
      'Relationship Issues',
      'Trauma & PTSD',
      'Addiction',
      'Eating Disorders',
      'OCD',
      'Bipolar Disorder',
      'Grief & Loss',
      'Self-Esteem',
      'Career Counseling',
      'Family Issues',
      'Anger Management'
    ]
  }],
  bio: {
    type: String,
    maxlength: 1000
  },
  experience: {
    type: Number,
    required: true,
    min: 0
  },
  qualifications: [{
    degree: String,
    institution: String,
    year: Number
  }],
  licenseNumber: {
    type: String,
    required: true
  },
  location: {
    address: String,
    city: String,
    state: String,
    zipCode: String,
    country: {
      type: String,
      default: 'India'
    },
    coordinates: {
      lat: Number,
      lng: Number
    }
  },
  pricing: {
    min: {
      type: Number,
      required: true
    },
    max: {
      type: Number,
      required: true
    },
    currency: {
      type: String,
      default: 'USD'
    }
  },
  availability: [{
    day: {
      type: String,
      enum: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    },
    slots: [{
      startTime: String,
      endTime: String
    }]
  }],
  sessionMode: [{
    type: String,
    enum: ['In-Person', 'Online', 'Both']
  }],
  languages: [{
    type: String,
    default: ['English']
  }],
  rating: {
    average: {
      type: Number,
      default: 0,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      default: 0
    }
  },
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    rating: {
      type: Number,
      min: 1,
      max: 5
    },
    comment: String,
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  profileImage: {
    type: String,
    default: 'default-therapist.png'
  },
  verified: {
    type: Boolean,
    default: false
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for location-based search
therapistSchema.index({ 'location.coordinates': '2dsphere' });

module.exports = mongoose.model('Therapist', therapistSchema);