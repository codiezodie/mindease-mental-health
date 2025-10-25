// src/pages/TherapistFinder.js
import React, { useState, useEffect } from 'react';
import { therapistAPI } from '../services/api';
import '../TherapistStyles.css';

function TherapistFinder() {
  const [therapists, setTherapists] = useState([]);
  const [filteredTherapists, setFilteredTherapists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTherapist, setSelectedTherapist] = useState(null);
  
  // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState('');
  const [selectedSpecialization, setSelectedSpecialization] = useState('');
  const [selectedMode, setSelectedMode] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 3500 });
  const [sortBy, setSortBy] = useState('rating');

  useEffect(() => {
    fetchTherapists();
  }, []);

  useEffect(() => {
    filterAndSortTherapists();
  }, [therapists, searchTerm, selectedType, selectedSpecialization, selectedMode, priceRange, sortBy]);

  const fetchTherapists = async () => {
    setLoading(true);
    try {
      const { data } = await therapistAPI.getAll();
      setTherapists(data.therapists || []);
      setFilteredTherapists(data.therapists || []);
    } catch (error) {
      console.error('Error fetching therapists:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterAndSortTherapists = () => {
    let filtered = [...therapists];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(t => 
        t.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.location.city.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Type filter
    if (selectedType) {
      filtered = filtered.filter(t => t.type === selectedType);
    }

    // Specialization filter
    if (selectedSpecialization) {
      filtered = filtered.filter(t => 
        t.specializations.includes(selectedSpecialization)
      );
    }

    // Session mode filter
    if (selectedMode) {
      filtered = filtered.filter(t => 
        t.sessionMode.includes(selectedMode)
      );
    }

    // Price range filter
    filtered = filtered.filter(t => 
      t.pricing.min <= priceRange.max && t.pricing.max >= priceRange.min
    );

    // Sort
    filtered.sort((a, b) => {
      switch(sortBy) {
        case 'rating':
          return (b.rating.average || 0) - (a.rating.average || 0);
        case 'price-low':
          return a.pricing.min - b.pricing.min;
        case 'price-high':
          return b.pricing.max - a.pricing.max;
        case 'experience':
          return b.experience - a.experience;
        default:
          return 0;
      }
    });

    setFilteredTherapists(filtered);
  };

  const resetFilters = () => {
    setSearchTerm('');
    setSelectedType('');
    setSelectedSpecialization('');
    setSelectedMode('');
    setPriceRange({ min: 0, max: 3500 });
    setSortBy('rating');
  };

  const types = [
    'Psychologist',
    'Psychiatrist',
    'Psychotherapist',
    'Counselor',
    'Clinical Psychologist'
  ];

  const specializations = [
    'Anxiety',
    'Depression',
    'Stress Management',
    'Relationship Issues',
    'Trauma & PTSD',
    'Addiction',
    'OCD',
    'Self-Esteem'
  ];

  const sessionModes = ['In-Person', 'Online', 'Both'];

  if (selectedTherapist) {
    return (
      <div className="therapist-detail-page">
        <div className="detail-container">
          <button onClick={() => setSelectedTherapist(null)} className="back-button">
            ← Back to Search
          </button>

          <div className="detail-content">
            <div className="detail-header">
              <div className="detail-avatar">
                {selectedTherapist.name.charAt(0)}
              </div>
              <div className="detail-info">
                <h1>{selectedTherapist.name}</h1>
                <p className="detail-type">{selectedTherapist.type}</p>
                <div className="detail-rating">
                  {'⭐'.repeat(Math.round(selectedTherapist.rating.average))}
                  <span className="rating-text">
                    {selectedTherapist.rating.average.toFixed(1)} ({selectedTherapist.rating.count} reviews)
                  </span>
                </div>
                <p className="detail-location">
                  📍 {selectedTherapist.location.city}, {selectedTherapist.location.state}
                </p>
              </div>
            </div>

            <div className="detail-section">
              <h3>About</h3>
              <p>{selectedTherapist.bio}</p>
            </div>

            <div className="detail-section">
              <h3>Experience</h3>
              <p>{selectedTherapist.experience} years of practice</p>
            </div>

            <div className="detail-section">
              <h3>Specializations</h3>
              <div className="specialization-tags">
                {selectedTherapist.specializations.map((spec, idx) => (
                  <span key={idx} className="spec-tag">{spec}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Session Options</h3>
              <div className="session-modes">
                {selectedTherapist.sessionMode.map((mode, idx) => (
                  <span key={idx} className="mode-tag">{mode}</span>
                ))}
              </div>
            </div>

            <div className="detail-section">
              <h3>Languages</h3>
              <p>{selectedTherapist.languages.join(', ')}</p>
            </div>

            <div className="detail-section">
              <h3>Pricing</h3>
              <p className="pricing-detail">
                ₹{selectedTherapist.pricing.min} - ₹{selectedTherapist.pricing.max} per session
              </p>
            </div>

            <div className="detail-section">
              <h3>Qualifications</h3>
              {selectedTherapist.qualifications.map((qual, idx) => (
                <div key={idx} className="qualification-item">
                  <strong>{qual.degree}</strong>
                  <p>{qual.institution} • {qual.year}</p>
                </div>
              ))}
            </div>

            <button className="book-button">
              📅 Book a Session
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="therapist-finder-page">
      {/* Header */}
      <div className="finder-header">
        <h1>🔍 Find Your Perfect Therapist</h1>
        <p>Connect with certified mental health professionals</p>
      </div>

      {/* Filters */}
      <div className="filters-container">
        <div className="filters-row">
          {/* Search */}
          <div className="filter-group">
            <input
              type="text"
              placeholder="🔍 Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Type */}
          <div className="filter-group">
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="filter-select"
            >
              <option value="">All Types</option>
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Specialization */}
          <div className="filter-group">
            <select
              value={selectedSpecialization}
              onChange={(e) => setSelectedSpecialization(e.target.value)}
              className="filter-select"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          {/* Session Mode */}
          <div className="filter-group">
            <select
              value={selectedMode}
              onChange={(e) => setSelectedMode(e.target.value)}
              className="filter-select"
            >
              <option value="">All Session Modes</option>
              {sessionModes.map(mode => (
                <option key={mode} value={mode}>{mode}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price Range */}
        <div className="filters-row">
          <div className="filter-group price-filter">
            <label>Price Range: ₹{priceRange.min} - ₹{priceRange.max}</label>
            <div className="price-sliders">
              <input
                type="range"
                min="0"
                max="3500"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: Number(e.target.value) })}
                className="price-slider"
              />
              <input
                type="range"
                min="0"
                max="3500"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: Number(e.target.value) })}
                className="price-slider"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="filter-group">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="filter-select"
            >
              <option value="rating">Sort by Rating</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="experience">Most Experienced</option>
            </select>
          </div>

          <button onClick={resetFilters} className="reset-button">
            🔄 Reset Filters
          </button>
        </div>
      </div>

      {/* Results Count */}
      <div className="results-info">
        <p>{filteredTherapists.length} therapists found</p>
      </div>

      {/* Therapist Grid */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p>Loading therapists...</p>
        </div>
      ) : filteredTherapists.length === 0 ? (
        <div className="empty-state">
          <p>😔 No therapists found matching your criteria</p>
          <button onClick={resetFilters} className="reset-btn-large">
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="therapists-grid">
          {filteredTherapists.map((therapist) => (
            <div key={therapist._id} className="therapist-card">
              <div className="card-avatar">
                {therapist.name.charAt(0)}
              </div>
              
              <div className="card-content">
                <h3>{therapist.name}</h3>
                <p className="card-type">{therapist.type}</p>
                
                <div className="card-rating">
                  {'⭐'.repeat(Math.round(therapist.rating.average))}
                  <span className="rating-number">
                    {therapist.rating.average.toFixed(1)}
                  </span>
                </div>

                <p className="card-experience">
                  📚 {therapist.experience} years experience
                </p>

                <p className="card-location">
                  📍 {therapist.location.city}, {therapist.location.state}
                </p>

                <div className="card-specializations">
                  {therapist.specializations.slice(0, 2).map((spec, idx) => (
                    <span key={idx} className="spec-badge">{spec}</span>
                  ))}
                  {therapist.specializations.length > 2 && (
                    <span className="spec-badge">+{therapist.specializations.length - 2} more</span>
                  )}
                </div>

                <div className="card-footer">
                  <div className="card-price">
                    ₹{therapist.pricing.min} - ₹{therapist.pricing.max}
                  </div>
                  <button 
                    onClick={() => setSelectedTherapist(therapist)}
                    className="view-button"
                  >
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default TherapistFinder;