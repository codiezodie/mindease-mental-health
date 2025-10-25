// backend/seeders/seed.js - FINAL INDIAN VERSION - NO ERRORS
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Therapist = require('../models/Therapist');
const Article = require('../models/Article');

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for seeding');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

const indianTherapists = [
  {
    name: 'Dr. Priya Sharma',
    email: 'priya.sharma@mindease.com',
    phone: '+91 98765 43210',
    type: 'Clinical Psychologist',
    specializations: ['Anxiety', 'Depression', 'Stress Management', 'Relationship Issues'],
    bio: 'Dr. Priya Sharma is a leading clinical psychologist with over 12 years of experience in mental health. She specializes in cognitive behavioral therapy and has helped hundreds of clients overcome anxiety and depression.',
    experience: 12,
    qualifications: [
      { degree: 'Ph.D. in Clinical Psychology', institution: 'NIMHANS, Bangalore', year: 2011 },
      { degree: 'M.Phil in Clinical Psychology', institution: 'All India Institute of Medical Sciences', year: 2008 }
    ],
    licenseNumber: 'RCI/PSY/12345',
    location: {
      address: '123 MG Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      zipCode: '400001',
      country: 'India',
      coordinates: { lat: 19.0760, lng: 72.8777 }
    },
    pricing: {
      min: 1500,
      max: 2500,
      currency: 'INR'
    },
    availability: [
      { day: 'Monday', slots: [{ startTime: '10:00 AM', endTime: '6:00 PM' }] },
      { day: 'Wednesday', slots: [{ startTime: '10:00 AM', endTime: '6:00 PM' }] },
      { day: 'Friday', slots: [{ startTime: '10:00 AM', endTime: '6:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Marathi'],
    rating: { average: 4.8, count: 127 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Rajesh Kumar',
    email: 'rajesh.kumar@mindease.com',
    phone: '+91 98765 43211',
    type: 'Psychiatrist',
    specializations: ['Depression', 'Bipolar Disorder', 'OCD', 'Anxiety'],
    bio: 'Dr. Rajesh Kumar is a renowned psychiatrist with expertise in mood disorders and anxiety management. He combines medication management with psychotherapy for holistic treatment.',
    experience: 15,
    qualifications: [
      { degree: 'MD Psychiatry', institution: 'PGI Chandigarh', year: 2008 },
      { degree: 'MBBS', institution: 'Lady Hardinge Medical College, Delhi', year: 2004 }
    ],
    licenseNumber: 'MCI/PSY/67890',
    location: {
      address: '456 Connaught Place',
      city: 'Delhi',
      state: 'Delhi',
      zipCode: '110001',
      country: 'India',
      coordinates: { lat: 28.6139, lng: 77.2090 }
    },
    pricing: {
      min: 2000,
      max: 3500,
      currency: 'INR'
    },
    availability: [
      { day: 'Tuesday', slots: [{ startTime: '9:00 AM', endTime: '5:00 PM' }] },
      { day: 'Thursday', slots: [{ startTime: '9:00 AM', endTime: '5:00 PM' }] },
      { day: 'Saturday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Punjabi'],
    rating: { average: 4.9, count: 203 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Ananya Reddy',
    email: 'ananya.reddy@mindease.com',
    phone: '+91 98765 43212',
    type: 'Marriage & Family Therapist',
    specializations: ['Relationship Issues', 'Family Issues', 'Self-Esteem', 'Anger Management'],
    bio: 'Dr. Ananya Reddy specializes in helping couples and families navigate complex relationships. With a warm and empathetic approach, she helps clients build stronger connections.',
    experience: 10,
    qualifications: [
      { degree: 'Ph.D. in Family Therapy', institution: 'Tata Institute of Social Sciences, Mumbai', year: 2013 },
      { degree: 'MSW (Master of Social Work)', institution: 'Delhi School of Social Work', year: 2009 }
    ],
    licenseNumber: 'RCI/MFT/54321',
    location: {
      address: '789 Jubilee Hills',
      city: 'Hyderabad',
      state: 'Telangana',
      zipCode: '500033',
      country: 'India',
      coordinates: { lat: 17.3850, lng: 78.4867 }
    },
    pricing: {
      min: 1800,
      max: 3000,
      currency: 'INR'
    },
    availability: [
      { day: 'Monday', slots: [{ startTime: '11:00 AM', endTime: '7:00 PM' }] },
      { day: 'Wednesday', slots: [{ startTime: '11:00 AM', endTime: '7:00 PM' }] },
      { day: 'Friday', slots: [{ startTime: '11:00 AM', endTime: '7:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Telugu'],
    rating: { average: 4.7, count: 156 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Arjun Mehta',
    email: 'arjun.mehta@mindease.com',
    phone: '+91 98765 43213',
    type: 'Cognitive Behavioral Therapist',
    specializations: ['Anxiety', 'Stress Management', 'OCD', 'Trauma & PTSD'],
    bio: 'Dr. Arjun Mehta is an expert in CBT with a focus on anxiety disorders. He uses evidence-based techniques to help clients overcome their fears and live fulfilling lives.',
    experience: 8,
    qualifications: [
      { degree: 'M.Phil in Clinical Psychology', institution: 'Christ University, Bangalore', year: 2015 },
      { degree: 'MA Psychology', institution: 'Fergusson College, Pune', year: 2013 }
    ],
    licenseNumber: 'RCI/CBT/98765',
    location: {
      address: '321 Koramangala',
      city: 'Bangalore',
      state: 'Karnataka',
      zipCode: '560034',
      country: 'India',
      coordinates: { lat: 12.9352, lng: 77.6245 }
    },
    pricing: {
      min: 1200,
      max: 2000,
      currency: 'INR'
    },
    availability: [
      { day: 'Tuesday', slots: [{ startTime: '10:00 AM', endTime: '6:00 PM' }] },
      { day: 'Thursday', slots: [{ startTime: '10:00 AM', endTime: '6:00 PM' }] },
      { day: 'Saturday', slots: [{ startTime: '9:00 AM', endTime: '1:00 PM' }] }
    ],
    sessionMode: ['Online'],
    languages: ['English', 'Hindi', 'Kannada'],
    rating: { average: 4.6, count: 98 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Meera Iyer',
    email: 'meera.iyer@mindease.com',
    phone: '+91 98765 43214',
    type: 'Child & Adolescent Therapist',
    specializations: ['Anxiety', 'Depression', 'Self-Esteem', 'Family Issues'],
    bio: 'Dr. Meera Iyer specializes in working with children and teenagers. She creates a safe, nurturing environment where young clients can express themselves and heal.',
    experience: 11,
    qualifications: [
      { degree: 'Ph.D. in Child Psychology', institution: 'University of Madras', year: 2012 },
      { degree: 'M.Phil in Clinical Psychology', institution: 'CMC Vellore', year: 2009 }
    ],
    licenseNumber: 'RCI/CHILD/24680',
    location: {
      address: '555 Anna Nagar',
      city: 'Chennai',
      state: 'Tamil Nadu',
      zipCode: '600040',
      country: 'India',
      coordinates: { lat: 13.0827, lng: 80.2707 }
    },
    pricing: {
      min: 1600,
      max: 2800,
      currency: 'INR'
    },
    availability: [
      { day: 'Monday', slots: [{ startTime: '3:00 PM', endTime: '8:00 PM' }] },
      { day: 'Wednesday', slots: [{ startTime: '3:00 PM', endTime: '8:00 PM' }] },
      { day: 'Friday', slots: [{ startTime: '3:00 PM', endTime: '8:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Tamil'],
    rating: { average: 4.9, count: 184 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Vikram Singh',
    email: 'vikram.singh@mindease.com',
    phone: '+91 98765 43215',
    type: 'Trauma Therapist',
    specializations: ['Trauma & PTSD', 'Grief & Loss', 'Anxiety', 'Depression'],
    bio: 'Dr. Vikram Singh is a compassionate trauma specialist who helps clients heal from difficult experiences. He uses EMDR and trauma-focused CBT in his practice.',
    experience: 14,
    qualifications: [
      { degree: 'Ph.D. in Clinical Psychology', institution: 'Aligarh Muslim University', year: 2009 },
      { degree: 'EMDR Certification', institution: 'EMDR International Association', year: 2011 }
    ],
    licenseNumber: 'RCI/TRAUMA/13579',
    location: {
      address: '888 Civil Lines',
      city: 'Jaipur',
      state: 'Rajasthan',
      zipCode: '302006',
      country: 'India',
      coordinates: { lat: 26.9124, lng: 75.7873 }
    },
    pricing: {
      min: 1800,
      max: 3200,
      currency: 'INR'
    },
    availability: [
      { day: 'Tuesday', slots: [{ startTime: '10:00 AM', endTime: '5:00 PM' }] },
      { day: 'Thursday', slots: [{ startTime: '10:00 AM', endTime: '5:00 PM' }] },
      { day: 'Saturday', slots: [{ startTime: '10:00 AM', endTime: '3:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Rajasthani'],
    rating: { average: 4.8, count: 142 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Kavita Desai',
    email: 'kavita.desai@mindease.com',
    phone: '+91 98765 43216',
    type: 'Counselor',
    specializations: ['Career Counseling', 'Stress Management', 'Self-Esteem', 'Anxiety'],
    bio: 'Dr. Kavita Desai helps young professionals navigate career challenges and life transitions. She provides practical strategies for managing stress and building confidence.',
    experience: 7,
    qualifications: [
      { degree: 'M.Phil in Counseling Psychology', institution: 'Jamia Millia Islamia, Delhi', year: 2016 },
      { degree: 'MA Psychology', institution: 'Gujarat University', year: 2014 }
    ],
    licenseNumber: 'RCI/COUNS/36925',
    location: {
      address: '999 CG Road',
      city: 'Ahmedabad',
      state: 'Gujarat',
      zipCode: '380009',
      country: 'India',
      coordinates: { lat: 23.0225, lng: 72.5714 }
    },
    pricing: {
      min: 1000,
      max: 1800,
      currency: 'INR'
    },
    availability: [
      { day: 'Monday', slots: [{ startTime: '9:00 AM', endTime: '5:00 PM' }] },
      { day: 'Wednesday', slots: [{ startTime: '9:00 AM', endTime: '5:00 PM' }] },
      { day: 'Friday', slots: [{ startTime: '9:00 AM', endTime: '5:00 PM' }] }
    ],
    sessionMode: ['Online', 'In-Person'],
    languages: ['English', 'Hindi', 'Gujarati'],
    rating: { average: 4.5, count: 76 },
    verified: true,
    isActive: true
  },
  {
    name: 'Dr. Sanjay Verma',
    email: 'sanjay.verma@mindease.com',
    phone: '+91 98765 43217',
    type: 'Substance Abuse Counselor',
    specializations: ['Addiction', 'Depression', 'Anxiety', 'Stress Management'],
    bio: 'Dr. Sanjay Verma specializes in addiction recovery and has helped numerous individuals overcome substance abuse. His holistic approach combines therapy with lifestyle changes.',
    experience: 13,
    qualifications: [
      { degree: 'Ph.D. in Clinical Psychology', institution: 'Banaras Hindu University', year: 2010 },
      { degree: 'Certification in Addiction Counseling', institution: 'AIIMS Delhi', year: 2012 }
    ],
    licenseNumber: 'RCI/ADD/74185',
    location: {
      address: '777 Hazratganj',
      city: 'Lucknow',
      state: 'Uttar Pradesh',
      zipCode: '226001',
      country: 'India',
      coordinates: { lat: 26.8467, lng: 80.9462 }
    },
    pricing: {
      min: 1500,
      max: 2800,
      currency: 'INR'
    },
    availability: [
      { day: 'Tuesday', slots: [{ startTime: '11:00 AM', endTime: '6:00 PM' }] },
      { day: 'Thursday', slots: [{ startTime: '11:00 AM', endTime: '6:00 PM' }] },
      { day: 'Saturday', slots: [{ startTime: '10:00 AM', endTime: '2:00 PM' }] }
    ],
    sessionMode: ['In-Person'],
    languages: ['English', 'Hindi', 'Urdu'],
    rating: { average: 4.7, count: 119 },
    verified: true,
    isActive: true
  }
];

const sampleArticles = [
  {
    title: '5 Effective Ways to Manage Stress in Daily Life',
    author: {
      name: 'Dr. Priya Sharma',
      credentials: 'Ph.D., Clinical Psychologist',
      avatar: 'default-avatar.png'
    },
    category: 'Stress Management',
    tags: ['stress', 'mental health', 'wellness', 'self-care'],
    excerpt: 'Learn practical strategies to reduce stress and improve your overall well-being through simple daily practices.',
    content: 'Stress is an inevitable part of modern life, but it doesn\'t have to control you. Here are five evidence-based strategies to help you manage stress effectively:\n\n1. Practice Mindfulness Meditation: Taking just 10 minutes daily to focus on your breath can significantly reduce stress levels.\n\n2. Regular Physical Exercise: Exercise releases endorphins, natural mood boosters that help combat stress.\n\n3. Maintain a Healthy Sleep Schedule: Quality sleep is crucial for stress management and overall mental health.\n\n4. Connect with Loved Ones: Social support is a powerful stress buffer. Make time for meaningful relationships.\n\n5. Set Boundaries: Learn to say no and prioritize your mental health over excessive commitments.',
    readTime: 5,
    views: 1247,
    likes: 342,
    published: true,
    featured: true
  },
  {
    title: 'Understanding Anxiety: Symptoms and Coping Strategies',
    author: {
      name: 'Dr. Rajesh Kumar',
      credentials: 'MD, Psychiatrist',
      avatar: 'default-avatar.png'
    },
    category: 'Anxiety',
    tags: ['anxiety', 'mental health', 'coping strategies', 'therapy'],
    excerpt: 'A comprehensive guide to recognizing anxiety symptoms and implementing effective coping mechanisms.',
    content: 'Anxiety affects millions of people worldwide, but understanding it is the first step toward managing it effectively.\n\nCommon symptoms include persistent worry, restlessness, difficulty concentrating, and physical symptoms like rapid heartbeat and sweating.\n\nEffective coping strategies include:\n- Deep breathing exercises\n- Progressive muscle relaxation\n- Cognitive restructuring\n- Gradual exposure to anxiety triggers\n- Regular exercise and healthy lifestyle habits\n\nRemember, seeking professional help is a sign of strength, not weakness. A qualified therapist can provide personalized strategies tailored to your specific needs.',
    readTime: 7,
    views: 2156,
    likes: 489,
    published: true,
    featured: true
  },
  {
    title: 'The Power of Gratitude: Transforming Your Mental Health',
    author: {
      name: 'Dr. Ananya Reddy',
      credentials: 'Ph.D., Family Therapist',
      avatar: 'default-avatar.png'
    },
    category: 'General Wellness',
    tags: ['gratitude', 'positive psychology', 'mental health', 'happiness'],
    excerpt: 'Discover how practicing gratitude can significantly improve your mental well-being and overall life satisfaction.',
    content: 'Research shows that gratitude is one of the most powerful tools for improving mental health and overall happiness.\n\nBenefits of practicing gratitude include:\n- Reduced symptoms of depression\n- Improved sleep quality\n- Enhanced relationships\n- Increased resilience\n- Greater life satisfaction\n\nSimple ways to practice gratitude:\n1. Keep a daily gratitude journal\n2. Express appreciation to others regularly\n3. Reflect on positive experiences before bed\n4. Practice mindful appreciation during daily activities\n5. Share your gratitude with loved ones\n\nStart small and be consistent. Even a few minutes of gratitude practice daily can make a significant difference.',
    readTime: 6,
    views: 1834,
    likes: 567,
    published: true,
    featured: true
  }
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await Therapist.deleteMany({});
    await Article.deleteMany({});
    console.log('Cleared existing data');

    // Insert therapists
    await Therapist.insertMany(indianTherapists);
    console.log(`Inserted ${indianTherapists.length} therapists`);

    // Insert articles
    await Article.insertMany(sampleArticles);
    console.log(`Inserted ${sampleArticles.length} articles`);

    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedDatabase();