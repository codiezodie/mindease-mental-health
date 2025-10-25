// src/pages/WellnessPlanner.js
import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { wellnessAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import '../WellnessStyles.css';

function WellnessPlanner() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const [step, setStep] = useState('input'); // 'input', 'plan', 'history'
  const [currentMood, setCurrentMood] = useState('');
  const [moodIntensity, setMoodIntensity] = useState(5);
  const [selectedGoals, setSelectedGoals] = useState([]);
  const [scheduleTime, setScheduleTime] = useState('flexible');
  const [generatedPlan, setGeneratedPlan] = useState(null);
  const [userPlans, setUserPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  // Check if user is logged in
  useEffect(() => {
    if (!user) {
      alert('Please login to use the Wellness Planner');
      navigate('/login');
    } else {
      fetchUserPlans();
    }
  }, [user, navigate]);

  const fetchUserPlans = async () => {
    try {
      const { data } = await wellnessAPI.getPlans();
      setUserPlans(data.plans || []);
    } catch (error) {
      console.error('Error fetching plans:', error);
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

  const goals = [
    'Reduce stress',
    'Improve sleep',
    'Boost energy',
    'Manage anxiety',
    'Enhance focus',
    'Build confidence',
    'Improve relationships',
    'Practice mindfulness',
    'Develop healthy habits'
  ];

  const activityIcons = {
    meditation: '🧘',
    journaling: '📝',
    breathing: '💨',
    exercise: '🏃',
    music: '🎵',
    reading: '📚',
    art: '🎨',
    nature: '🌳',
    social: '👥'
  };

  const handleGoalToggle = (goal) => {
    if (selectedGoals.includes(goal)) {
      setSelectedGoals(selectedGoals.filter(g => g !== goal));
    } else {
      setSelectedGoals([...selectedGoals, goal]);
    }
  };

  const handleGeneratePlan = async () => {
    if (!currentMood) {
      alert('Please select your current mood');
      return;
    }

    setLoading(true);

    try {
      const { data } = await wellnessAPI.generatePlan({
        currentMood,
        moodIntensity,
        goals: selectedGoals,
        scheduleTime
      });

      setGeneratedPlan(data.plan);
      setStep('plan');
      await fetchUserPlans();
    } catch (error) {
      console.error('Error generating plan:', error);
      alert('Failed to generate wellness plan. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleActivityComplete = async (activityIndex, completed) => {
    if (!generatedPlan) return;

    try {
      const { data } = await wellnessAPI.updateActivity(
        generatedPlan._id,
        activityIndex,
        completed
      );

      setGeneratedPlan(data.plan);
      await fetchUserPlans();
    } catch (error) {
      console.error('Error updating activity:', error);
      alert('Failed to update activity');
    }
  };

  const loadPlan = async (planId) => {
    try {
      const { data } = await wellnessAPI.getPlan(planId);
      setGeneratedPlan(data.plan);
      setStep('plan');
    } catch (error) {
      console.error('Error loading plan:', error);
      alert('Failed to load plan');
    }
  };

  const startNewPlan = () => {
    setStep('input');
    setCurrentMood('');
    setMoodIntensity(5);
    setSelectedGoals([]);
    setScheduleTime('flexible');
    setGeneratedPlan(null);
  };

  const selectedMoodData = moods.find(m => m.value === currentMood);

  if (!user) {
    return null;
  }

  return (
    <div className="wellness-page">
      <div className="wellness-container">
        
        {/* INPUT SCREEN */}
        {step === 'input' && (
          <div className="wellness-input">
            <div className="wellness-header">
              <h1>🧘‍♀️ Create Your Wellness Plan</h1>
              <p>Personalized activities tailored to your mood</p>
              {userPlans.length > 0 && (
                <button onClick={() => setStep('history')} className="view-plans-btn">
                  📋 View My Plans ({userPlans.length})
                </button>
              )}
            </div>

            {/* Mood Selection */}
            <div className="input-section">
              <h3>How are you feeling right now?</h3>
              <div className="mood-grid">
                {moods.map((mood) => (
                  <button
                    key={mood.value}
                    className={`mood-btn ${currentMood === mood.value ? 'selected' : ''}`}
                    style={{ 
                      borderColor: currentMood === mood.value ? mood.color : '#e0e0e0'
                    }}
                    onClick={() => setCurrentMood(mood.value)}
                  >
                    <span className="mood-emoji">{mood.emoji}</span>
                    <span className="mood-label">{mood.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Mood Intensity */}
            {currentMood && (
              <div className="input-section">
                <h3>
                  How intense is this feeling? 
                  <span className="intensity-value">{moodIntensity}/10</span>
                </h3>
                <input
                  type="range"
                  min="1"
                  max="10"
                  value={moodIntensity}
                  onChange={(e) => setMoodIntensity(Number(e.target.value))}
                  className="intensity-slider"
                  style={{
                    background: `linear-gradient(to right, ${selectedMoodData?.color} 0%, ${selectedMoodData?.color} ${moodIntensity * 10}%, #e0e0e0 ${moodIntensity * 10}%, #e0e0e0 100%)`
                  }}
                />
                <div className="intensity-labels">
                  <span>Low</span>
                  <span>Medium</span>
                  <span>High</span>
                </div>
              </div>
            )}

            {/* Goals Selection */}
            <div className="input-section">
              <h3>What are your wellness goals? (Optional)</h3>
              <div className="goals-grid">
                {goals.map((goal) => (
                  <button
                    key={goal}
                    className={`goal-btn ${selectedGoals.includes(goal) ? 'selected' : ''}`}
                    onClick={() => handleGoalToggle(goal)}
                  >
                    <span className="goal-check">{selectedGoals.includes(goal) ? '✓' : '+'}</span>
                    {goal}
                  </button>
                ))}
              </div>
            </div>

            {/* Schedule Time */}
            <div className="input-section">
              <h3>When would you like to do these activities?</h3>
              <div className="schedule-options">
                {['morning', 'afternoon', 'evening', 'flexible'].map((time) => (
                  <button
                    key={time}
                    className={`schedule-btn ${scheduleTime === time ? 'selected' : ''}`}
                    onClick={() => setScheduleTime(time)}
                  >
                    {time.charAt(0).toUpperCase() + time.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGeneratePlan}
              disabled={!currentMood || loading}
              className="generate-btn"
            >
              {loading ? (
                <>
                  <span className="spinner"></span>
                  Generating...
                </>
              ) : (
                <>
                  ✨ Generate My Wellness Plan
                </>
              )}
            </button>
          </div>
        )}

        {/* PLAN SCREEN */}
        {step === 'plan' && generatedPlan && (
          <div className="wellness-plan">
            {/* Plan Header */}
            <div className="plan-header">
              <button onClick={startNewPlan} className="back-btn">
                ← New Plan
              </button>
              <div className="plan-info">
                <h2>Your Wellness Plan</h2>
                <p>
                  {moods.find(m => m.value === generatedPlan.currentMood)?.emoji} 
                  {' '}{generatedPlan.currentMood} • Intensity: {generatedPlan.moodIntensity}/10
                </p>
              </div>
              <button onClick={() => setStep('history')} className="history-btn">
                📋
              </button>
            </div>

            {/* Progress */}
            <div className="progress-section">
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{ width: `${generatedPlan.progress?.completionRate || 0}%` }}
                ></div>
              </div>
              <p className="progress-text">
                {generatedPlan.progress?.completedActivities || 0} of {generatedPlan.progress?.totalActivities || 0} activities completed
                ({generatedPlan.progress?.completionRate || 0}%)
              </p>
            </div>

            {/* Recommendations */}
            {generatedPlan.recommendations && generatedPlan.recommendations.length > 0 && (
              <div className="recommendations-section">
                <h3>💡 Personalized Recommendations</h3>
                {generatedPlan.recommendations.map((rec, index) => (
                  <div key={index} className="recommendation-card">
                    <h4>{rec.category}</h4>
                    <p><strong>{rec.suggestion}</strong></p>
                    <p className="rec-reason">{rec.reason}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Activities */}
            <div className="activities-section">
              <h3>🎯 Your Activities</h3>
              <div className="activities-list">
                {generatedPlan.activities.map((activity, index) => (
                  <div key={index} className={`activity-card ${activity.completed ? 'completed' : ''}`}>
                    <div className="activity-header">
                      <span className="activity-icon">
                        {activityIcons[activity.type] || '✨'}
                      </span>
                      <div className="activity-info">
                        <h4>{activity.title}</h4>
                        <p className="activity-meta">
                          ⏱️ {activity.duration} min • {activity.time}
                        </p>
                      </div>
                      <label className="checkbox-container">
                        <input
                          type="checkbox"
                          checked={activity.completed}
                          onChange={(e) => handleActivityComplete(index, e.target.checked)}
                        />
                        <span className="checkmark"></span>
                      </label>
                    </div>
                    <p className="activity-description">{activity.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* HISTORY SCREEN */}
        {step === 'history' && (
          <div className="history-screen">
            <div className="history-header">
              <button onClick={startNewPlan} className="back-btn">
                ← Back
              </button>
              <h2>My Wellness Plans</h2>
              <button onClick={startNewPlan} className="new-plan-btn">
                + New
              </button>
            </div>

            <div className="plans-list">
              {userPlans.length === 0 ? (
                <div className="empty-plans">
                  <p>📝 No wellness plans yet</p>
                  <button onClick={startNewPlan} className="start-btn">
                    Create Your First Plan
                  </button>
                </div>
              ) : (
                userPlans.map((plan) => (
                  <div
                    key={plan._id}
                    className="plan-item"
                    onClick={() => loadPlan(plan._id)}
                  >
                    <div className="plan-icon">
                      {moods.find(m => m.value === plan.currentMood)?.emoji || '🧘'}
                    </div>
                    <div className="plan-details">
                      <h4>{plan.currentMood} - Intensity {plan.moodIntensity}/10</h4>
                      <p className="plan-date">
                        {new Date(plan.createdAt).toLocaleDateString('en-US', { 
                          month: 'short', 
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </p>
                      <div className="plan-progress-mini">
                        <div 
                          className="progress-mini-fill"
                          style={{ width: `${plan.progress?.completionRate || 0}%` }}
                        ></div>
                      </div>
                      <p className="plan-stats">
                        {plan.progress?.completedActivities || 0}/{plan.progress?.totalActivities || 0} completed
                      </p>
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

export default WellnessPlanner;