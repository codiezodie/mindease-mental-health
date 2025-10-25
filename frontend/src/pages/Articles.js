// src/pages/Articles.js - PREMIUM VERSION
import React, { useState, useEffect, useContext } from 'react';
import { articleAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../ArticlesStyles.css';

function Articles() {
  const { user } = useContext(AuthContext);
  const [articles, setArticles] = useState([]);
  const [filteredArticles, setFilteredArticles] = useState([]);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  const categories = [
    'All',
    'Stress Management',
    'Mindfulness',
    'Anxiety',
    'Depression',
    'Sleep',
    'Self-Care',
    'Relationships',
    'Emotional Resilience'
  ];

  // Beautiful professional images from Unsplash
  const categoryImages = {
    'Stress Management': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop',
    'Mindfulness': 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=800&h=500&fit=crop',
    'Anxiety': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop',
    'Depression': 'https://images.unsplash.com/photo-1494253109108-2e30c049369b?w=800&h=500&fit=crop',
    'Sleep': 'https://images.unsplash.com/photo-1541781774459-bb2af2f05b55?w=800&h=500&fit=crop',
    'Self-Care': 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=500&fit=crop',
    'Relationships': 'https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=500&fit=crop',
    'Emotional Resilience': 'https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=800&h=500&fit=crop',
    'General Wellness': 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop'
  };

  useEffect(() => {
    fetchArticles();
  }, []);

  useEffect(() => {
    filterArticles();
  }, [selectedCategory, articles]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data } = await articleAPI.getAll();
      // Add beautiful images to articles
      const articlesWithImages = (data.articles || []).map(article => ({
        ...article,
        coverImage: categoryImages[article.category] || categoryImages['General Wellness']
      }));
      setArticles(articlesWithImages);
      setFilteredArticles(articlesWithImages);
      toast.success('✨ Articles loaded successfully!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } catch (error) {
      console.error('Error fetching articles:', error);
      toast.error('Failed to load articles. Please try again.', {
        position: "top-right",
        autoClose: 3000,
      });
    } finally {
      setLoading(false);
    }
  };

  const filterArticles = () => {
    if (selectedCategory === 'All') {
      setFilteredArticles(articles);
    } else {
      setFilteredArticles(
        articles.filter(article => article.category === selectedCategory)
      );
    }
  };

  const handleLike = async (articleId) => {
    if (!user) {
      toast.warning('Please login to like articles 💙', {
        position: "top-center",
        autoClose: 3000,
      });
      return;
    }

    try {
      const { data } = await articleAPI.like(articleId);
      
      setArticles(articles.map(article => 
        article._id === articleId 
          ? { ...article, likes: data.article.likes, likedBy: data.article.likedBy }
          : article
      ));

      if (selectedArticle && selectedArticle._id === articleId) {
        setSelectedArticle(data.article);
      }

      const isNowLiked = data.article.likedBy.includes(user.id);
      toast.success(isNowLiked ? '❤️ Article liked!' : '💔 Article unliked', {
        position: "bottom-right",
        autoClose: 2000,
      });
    } catch (error) {
      console.error('Error liking article:', error);
      toast.error('Failed to like article', {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  const isLiked = (article) => {
    return user && article.likedBy && article.likedBy.includes(user.id);
  };

  if (selectedArticle) {
    return (
      <div className="article-detail-page fade-in">
        <ToastContainer />
        <div className="article-detail-container">
          <button 
            onClick={() => setSelectedArticle(null)} 
            className="back-btn-article hover-lift"
          >
            ← Back to Articles
          </button>

          <div className="article-detail-content">
            <div className="article-header">
              <span className="category-badge shine">{selectedArticle.category}</span>
              <h1 className="fade-in-up">{selectedArticle.title}</h1>
              
              <div className="article-meta fade-in-up">
                <div className="author-info">
                  <div className="author-avatar pulse">
                    {selectedArticle.author.name.charAt(0)}
                  </div>
                  <div>
                    <p className="author-name">{selectedArticle.author.name}</p>
                    <p className="author-credentials">{selectedArticle.author.credentials}</p>
                  </div>
                </div>
                <div className="article-stats">
                  <span>⏱️ {selectedArticle.readTime} min read</span>
                  <span>👁️ {selectedArticle.views} views</span>
                  <button 
                    onClick={() => handleLike(selectedArticle._id)}
                    className={`like-btn hover-lift ${isLiked(selectedArticle) ? 'liked' : ''}`}
                  >
                    ❤️ {selectedArticle.likes}
                  </button>
                </div>
              </div>
            </div>

            <div className="article-cover zoom-in">
              <img 
                src={selectedArticle.coverImage} 
                alt={selectedArticle.title}
                onError={(e) => {
                  e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop';
                }}
              />
            </div>

            <div className="article-body fade-in-up">
              {selectedArticle.content.split('\n\n').map((paragraph, index) => (
                <p key={index} className="slide-in" style={{ animationDelay: `${index * 0.1}s` }}>
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="article-tags fade-in">
              <strong>Tags:</strong>
              {selectedArticle.tags.map((tag, index) => (
                <span 
                  key={index} 
                  className="tag hover-lift"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="articles-page">
      <ToastContainer />
      
      {/* Header */}
      <div className="articles-header fade-in">
        <h1 className="scale-in">📚 Mental Health Articles & Guides</h1>
        <p className="fade-in-up">Expert insights and practical tips for your mental wellness journey</p>
      </div>

      {/* Category Filter */}
      <div className="categories-container slide-in">
        <div className="categories-scroll">
          {categories.map((category, index) => (
            <button
              key={category}
              className={`category-btn hover-lift ${selectedCategory === category ? 'active' : ''}`}
              onClick={() => {
                setSelectedCategory(category);
                toast.info(`Filtering: ${category}`, {
                  position: "bottom-center",
                  autoClose: 1500,
                });
              }}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Articles Count */}
      <div className="articles-count fade-in">
        <p>✨ {filteredArticles.length} articles found</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="loading-state">
          <div className="spinner-large"></div>
          <p className="pulse">Loading articles...</p>
        </div>
      ) : filteredArticles.length === 0 ? (
        <div className="empty-state fade-in">
          <p>😔 No articles found in this category</p>
          <button 
            onClick={() => setSelectedCategory('All')} 
            className="reset-btn hover-lift"
          >
            View All Articles
          </button>
        </div>
      ) : (
        <div className="articles-grid">
          {filteredArticles.map((article, index) => (
            <div 
              key={article._id} 
              className="article-card fade-in-up hover-lift"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="article-image">
                <img 
                  src={article.coverImage} 
                  alt={article.title}
                  onError={(e) => {
                    e.target.src = 'https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=800&h=500&fit=crop';
                  }}
                />
                <span className="category-tag">{article.category}</span>
              </div>

              <div className="article-content">
                <h3>{article.title}</h3>
                <p className="article-excerpt">{article.excerpt}</p>

                <div className="article-footer">
                  <div className="article-info">
                    <span className="read-time">⏱️ {article.readTime} min</span>
                    <span className="views">👁️ {article.views}</span>
                    <button 
                      onClick={() => handleLike(article._id)}
                      className={`like-btn-small ${isLiked(article) ? 'liked' : ''}`}
                    >
                      ❤️ {article.likes}
                    </button>
                  </div>
                  <button 
                    onClick={() => setSelectedArticle(article)}
                    className="read-btn hover-lift"
                  >
                    Read More →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Featured Section */}
      {selectedCategory === 'All' && !loading && (
        <div className="featured-section fade-in">
          <h2 className="scale-in">🌟 Featured Articles</h2>
          <div className="featured-grid">
            {articles.filter(a => a.featured).slice(0, 3).map((article, index) => (
              <div 
                key={article._id} 
                className="featured-card hover-lift fade-in-up"
                onClick={() => setSelectedArticle(article)}
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="featured-icon pulse">⭐</div>
                <h4>{article.title}</h4>
                <p>{article.excerpt.substring(0, 100)}...</p>
                <span className="read-time">⏱️ {article.readTime} min read</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Articles;