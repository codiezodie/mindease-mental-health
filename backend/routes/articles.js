// routes/articles.js
const express = require('express');
const router = express.Router();
const Article = require('../models/Article');
const { authenticateUser } = require('../middleware/auth');

// Get all articles
router.get('/', async (req, res) => {
  try {
    const { category, tag, search, page = 1, limit = 12 } = req.query;
    
    const query = { published: true };
    
    // Filter by category
    if (category) {
      query.category = category;
    }
    
    // Filter by tag
    if (tag) {
      query.tags = tag;
    }
    
    // Search in title and excerpt
    if (search) {
      query.$or = [
        { title: new RegExp(search, 'i') },
        { excerpt: new RegExp(search, 'i') }
      ];
    }
    
    const skip = (page - 1) * limit;
    
    const articles = await Article.find(query)
      .select('-content')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));
    
    const total = await Article.countDocuments(query);
    
    res.json({
      success: true,
      articles,
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
      message: 'Failed to fetch articles', 
      error: error.message 
    });
  }
});

// Get featured articles
router.get('/featured', async (req, res) => {
  try {
    const articles = await Article.find({ published: true, featured: true })
      .select('-content')
      .sort({ createdAt: -1 })
      .limit(6);
    
    res.json({
      success: true,
      articles
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch featured articles', 
      error: error.message 
    });
  }
});

// Get single article
router.get('/:slug', async (req, res) => {
  try {
    const article = await Article.findOne({ slug: req.params.slug, published: true });
    
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        message: 'Article not found' 
      });
    }
    
    // Increment views
    article.views += 1;
    await article.save();
    
    res.json({
      success: true,
      article
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch article', 
      error: error.message 
    });
  }
});

// Like article
router.post('/:id/like', authenticateUser, async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);
    
    if (!article) {
      return res.status(404).json({ 
        success: false, 
        message: 'Article not found' 
      });
    }
    
    const userId = req.user.id;
    const alreadyLiked = article.likedBy.includes(userId);
    
    if (alreadyLiked) {
      article.likedBy = article.likedBy.filter(id => id.toString() !== userId);
      article.likes -= 1;
    } else {
      article.likedBy.push(userId);
      article.likes += 1;
    }
    
    await article.save();
    
    res.json({
      success: true,
      message: alreadyLiked ? 'Article unliked' : 'Article liked',
      likes: article.likes,
      liked: !alreadyLiked
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to like article', 
      error: error.message 
    });
  }
});

// Get categories
router.get('/meta/categories', async (req, res) => {
  try {
    const categories = await Article.distinct('category');
    
    res.json({
      success: true,
      categories
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch categories', 
      error: error.message 
    });
  }
});

// Get popular tags
router.get('/meta/tags', async (req, res) => {
  try {
    const articles = await Article.find({ published: true }).select('tags');
    const allTags = articles.flatMap(a => a.tags);
    
    // Count tag frequency
    const tagCount = {};
    allTags.forEach(tag => {
      tagCount[tag] = (tagCount[tag] || 0) + 1;
    });
    
    // Sort by frequency
    const popularTags = Object.entries(tagCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 20)
      .map(([tag, count]) => ({ tag, count }));
    
    res.json({
      success: true,
      tags: popularTags
    });
  } catch (error) {
    res.status(500).json({ 
      success: false, 
      message: 'Failed to fetch tags', 
      error: error.message 
    });
  }
});

module.exports = router;