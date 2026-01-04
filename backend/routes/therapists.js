// routes/therapists.js
const express = require('express');
const router = express.Router();
const Therapist = require('../models/Therapist');

// Search therapists with filters
//According to the requirements of the user
router.get('/search', async (req, res) => {
  try {
    const { 
      type, 
      location, 
      zipCode, 
      distance, 
      minPrice, 
      maxPrice,
      specialization,
      sessionMode,
      page = 1,
      limit = 10
    } = req.query;

    const query = { isActive: true };

    // Filter by type
    if (type) {
      query.type = type;
    }

    // Filter by specialization
    if (specialization) {
      query.specializations = { $in: [specialization] };
    }

    // Filter by session mode
    if (sessionMode) {
      query.sessionMode = { $in: [sessionMode] };
    }

    // Filter by price range
    if (minPrice || maxPrice) {
      query['pricing.min'] = {};
      if (minPrice) query['pricing.min'].$gte = Number(minPrice);
      if (maxPrice) query['pricing.max'].$lte = Number(maxPrice);
    }

    // Filter by location
    if (zipCode) {
      query['location.zipCode'] = zipCode;
    } else if (location) {
      query.$or = [
        { 'location.city': new RegExp(location, 'i') },
        { 'location.state': new RegExp(location, 'i') }
      ];
    }

    const skip = (page - 1) * limit;
    
    const therapists = await Therapist.find(query)
      .select('-reviews')
      .sort({ 'rating.average': -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Therapist.countDocuments(query);

    res.json({
      success: true,
      therapists,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to search therapists', 
      error: error.message 
    });
  }
});

// Get all therapists
router.get('/', async (req, res) => {
  try {
    const therapists = await Therapist.find({ isActive: true })
      .select('-reviews')
      .sort({ 'rating.average': -1 });

    res.json({
      success: true,
      count: therapists.length,
      therapists
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch therapists', 
      error: error.message 
    });
  }
});

// Get single therapist
router.get('/:id', async (req, res) => {
  try {
    const therapist = await Therapist.findById(req.params.id)
      .populate('reviews.user', 'name avatar');

    if (!therapist) {
      return res.status(404).json({ 
        success: false, 
        message: 'Therapist not found' 
      });
    }

    res.json({
      success: true,
      therapist
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch therapist', 
      error: error.message 
    });
  }
});

// Get therapist types
router.get('/meta/types', async (req, res) => {
  try {
    const types = await Therapist.distinct('type');
    
    res.json({
      success: true,
      types
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch types', 
      error: error.message 
    });
  }
});

// Get specializations
router.get('/meta/specializations', async (req, res) => {
  try {
    const specializations = await Therapist.distinct('specializations');
    
    res.json({
      success: true,
      specializations
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch specializations', 
      error: error.message 
    });
  }
});

module.exports = router;
