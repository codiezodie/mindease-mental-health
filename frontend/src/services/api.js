// src/services/api.js
import axios from 'axios';

// Dynamic API URL - uses environment variable in production, localhost in development
const API_URL = process.env.REACT_APP_API_URL 
  ? `${process.env.REACT_APP_API_URL}/api`
  : 'http://localhost:5000/api';

console.log('API URL:', API_URL); // For debugging

const api = axios.create({
  baseURL: API_URL,
});

// Add token to requests automatically
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auth APIs
export const authAPI = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
  getMe: () => api.get('/auth/me'),
};

// Chatbot APIs
export const chatbotAPI = {
  createSession: (mood) => api.post('/chatbot/session', { mood }),
  sendMessage: (sessionId, message, mood) => 
    api.post('/chatbot/chat', { sessionId, message, mood }),
  getHistory: () => api.get('/chatbot/history'),
  getSession: (id) => api.get(`/chatbot/session/${id}`),
};

// Wellness APIs
export const wellnessAPI = {
  generatePlan: (data) => api.post('/wellness/generate', data),
  getPlans: () => api.get('/wellness/plans'),
  getPlan: (id) => api.get(`/wellness/plans/${id}`),
  updateActivity: (planId, activityIndex, completed) => 
    api.patch(`/wellness/plans/${planId}/activities/${activityIndex}`, { completed }),
};

// Therapist APIs
export const therapistAPI = {
  getAll: () => api.get('/therapists'),
  search: (params) => api.get('/therapists/search', { params }),
  getOne: (id) => api.get(`/therapists/${id}`),
  getTypes: () => api.get('/therapists/meta/types'),
  getSpecializations: () => api.get('/therapists/meta/specializations'),
};

// Article APIs
export const articleAPI = {
  getAll: (params) => api.get('/articles', { params }),
  getFeatured: () => api.get('/articles/featured'),
  getOne: (slug) => api.get(`/articles/${slug}`),
  like: (id) => api.post(`/articles/${id}/like`),
  getCategories: () => api.get('/articles/meta/categories'),
  getTags: () => api.get('/articles/meta/tags'),
};

// Activity APIs
export const activityAPI = {
  getDailyTip: () => api.get('/activities/daily-tip'),
  getRecommendations: (mood) => api.get('/activities/recommendations', { params: { mood } }),
  getMeditation: () => api.get('/activities/meditation'),
  getBreathing: () => api.get('/activities/breathing'),
};

export default api;