// src/pages/Home.js
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { activityAPI } from '../services/api';

function Home() {
  const [dailyTip, setDailyTip] = useState('');

  useEffect(() => {
    fetchDailyTip();
  }, []);

  const fetchDailyTip = async () => {
    try {
      const { data } = await activityAPI.getDailyTip();
      setDailyTip(data.tip);
    } catch (error) {
      console.error('Error fetching tip:', error);
      setDailyTip('Take 5 deep breaths when you feel overwhelmed.');
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero" style={{
        backgroundImage: 'url(/assets/roadnew.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}>
        <div className="overlay">
          <div className="hero-content-wrapper">
            <div className="hero-text">
              <h1>Welcome to Mindease</h1>
              <p>Your Mind, Your Space</p>
              <Link to="/register">
                <button className="join-btn">Join Now</button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="quote-section">
        <div className="quote-container">
          <div className="quote-box">
            <div className="quote-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#8f89d6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <blockquote className="quote-text">
              "Mental health is not a destination, but a process. It's about how you drive, not where you're going."
            </blockquote>
            <p className="quote-author">— Noam Shpancer, PhD</p>
          </div>

          <div className="quote-box">
            <div className="quote-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#8f89d6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <blockquote className="quote-text">
              "You don't have to control your thoughts. You just have to stop letting them control you."
            </blockquote>
            <p className="quote-author">— Dan Millman</p>
          </div>

          <div className="quote-box">
            <div className="quote-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="#8f89d6">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
              </svg>
            </div>
            <blockquote className="quote-text">
              "Healing takes time, and asking for help is a courageous step."
            </blockquote>
            <p className="quote-author">— Mariska Hargitay</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about">
        <div className="about-text">
          <p className="section-tag">WHY MINDEASE EXISTS</p>
          <h2>Building a Space for <span>Healing & Growth</span></h2>
          <p>
            Mindease is more than a platform — it's a sanctuary for mental wellness.
            We connect individuals with empathetic, certified therapists and cultivate
            a judgment-free space to help you navigate anxiety, burnout, trauma, and more.
          </p>
          <p>
            We believe mental health care should be accessible, personalized, and empowering — and that's exactly what we offer.
          </p>
          <Link to="/therapists">
            <button style={{ 
              padding: '12px 24px', 
              backgroundColor: '#8f89d6', 
              color: '#fff', 
              border: 'none', 
              borderRadius: '8px', 
              fontWeight: 'bold',
              cursor: 'pointer',
              marginTop: '20px'
            }}>
              Find A Therapist
            </button>
          </Link>
        </div>
        <div className="about-img">
          <img 
            src="/assets/Animated.gif" 
            alt="About illustration"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = 'https://via.placeholder.com/500x300/8f89d6/ffffff?text=Mental+Wellness';
            }}
          />
        </div>
      </section>

      {/* Services Section */}
      <section className="service-section">
        <div className="service-container">
          <div className="service-image">
            <img 
              src="/assets/Aichatbot.gif" 
              alt="AI Companion"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400/4CAF50/ffffff?text=AI+Chatbot';
              }}
            />
          </div>
          <div className="service-text">
            <h2>Your AI Companion: <span>A Heartfelt Connection</span></h2>
            <p>A gentle companion in your moments of need, ready to listen and support you through life's ups and downs.</p>
            <ul>
              <li>Always Here for You</li>
              <li>Empathetic Conversations</li>
              <li>Confidence in Privacy</li>
            </ul>
            <Link to="/chatbot">
              <button className="join-btn">Let's Chat</button>
            </Link>
          </div>
        </div>
      </section>

      <section className="service-section alt">
        <div className="service-container">
          <div className="service-text">
            <h2>Personalised Planner</h2>
            <p>Your daily dose of calm—tailored to your mood with mindful routines like journaling and meditation to help you feel seen and supported.</p>
            <ul>
              <li>Thoughtful activities designed just for you</li>
              <li>Adjusts with your emotional patterns, like a friend who truly understands</li>
              <li>Fully customizable preferences</li>
            </ul>
            <Link to="/wellness">
              <button className="join-btn">Make a Planner</button>
            </Link>
          </div>
          <div className="service-image">
            <img 
              src="/assets/Mental Well-being Tips.png" 
              alt="Wellness Generator"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/400x400/7a5af8/ffffff?text=Wellness+Planner';
              }}
            />
          </div>
        </div>
      </section>

      {/* Tip of the Day */}
      <section id="tip-of-the-day">
        <p>
          <strong>💡 Tip of the Day:</strong>
          <em> {dailyTip || 'Loading...'}</em>
        </p>
      </section>

      {/* Testimonials */}
      <section className="testimonial-section">
        <div className="testimonial-header">
          <p className="section-tag">TESTIMONIALS</p>
          <h2>What Our Clients Are Saying</h2>
          <p className="testimonial-subtext">
            Positive experiences from users who have benefited from therapy or wellness programs.
          </p>
        </div>

        <div className="testimonial-container">
          <div className="testimonial-card purple-card">
            <p>"Mindease made it so easy to find the right therapist for me. The sessions have truly transformed my mindset, and I feel more in control of my emotions than ever before!"</p>
            <p className="client-info">— Anna R., 32</p>
          </div>
          <div className="testimonial-card gray-card">
            <p>"I was struggling with stress and anxiety, but the mindfulness program has helped me regain balance. I finally feel like I'm prioritizing my well-being."</p>
            <p className="client-info">— Mark S., 41</p>
          </div>
        </div>

        <div className="testimonial-navigation">
          <button className="nav-circle">&#8592;</button>
          <button className="nav-circle">&#8594;</button>
        </div>
      </section>

      {/* Resources */}
      <section className="resources-section">
        <div className="resources-header">
          <p className="resources-tag">Explore & Learn</p>
          <h2>Resources for<br/>Your Well-being</h2>
          <p className="resources-subtext">
            Explore expert insights, self-care guides, and tools to support your mental health.
          </p>
        </div>

        <div className="resources-cards">
          <div className="resource-card">
            <img 
              src="/assets/Article.webp" 
              alt="Articles & Guides"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/350x200/a29bfe/ffffff?text=Articles';
              }}
            />
            <h3>Articles & Guides</h3>
            <p>Practical tips on stress management, mindfulness, and emotional resilience.</p>
            <Link to="/articles">
              <button className="explore-btn">Explore</button>
            </Link>
          </div>
          <div className="resource-card">
            <img 
              src="/assets/meditation.png" 
              alt="Meditation & Relaxation"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/350x200/74b9ff/ffffff?text=Meditation';
              }}
            />
            <h3>Meditation & Relaxation</h3>
            <p>Audio sessions for guided meditation and deep breathing exercises.</p>
            <button className="explore-btn">Explore</button>
          </div>
          <div className="resource-card">
            <img 
              src="/assets/webinar.jpg" 
              alt="Webinars & Workshops"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/350x200/fd79a8/ffffff?text=Webinars';
              }}
            />
            <h3>Webinars & Workshops</h3>
            <p>Live and recorded sessions with mental health professionals.</p>
            <button className="explore-btn">Explore</button>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="faq-section">
        <div className="faq-container">
          <div className="faq-left">
            <img 
              src="/assets/faq.jpeg" 
              alt="FAQ Illustration"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/500x400/6c5ce7/ffffff?text=FAQ';
              }}
            />
          </div>

          <div className="faq-right">
            <p className="faq-label">NEED HELP?</p>
            <h2>Frequently Asked Questions</h2>
            <p className="faq-subtext">
              Find answers to common questions about our services, therapy, and mental well-being.
            </p>

            <div className="accordion">
              <div className="accordion-item">
                <div className="accordion-title">How do I book a therapy session? <span>+</span></div>
              </div>
              <div className="accordion-item">
                <div className="accordion-title">Are online sessions available? <span>+</span></div>
              </div>
              <div className="accordion-item">
                <div className="accordion-title">What's the difference between therapy and coaching? <span>+</span></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="help-contact-section">
        <div className="container">
          <div className="contact-details">
            <h2>Contact Details:</h2>
            <p><strong>Email:</strong> <a href="mailto:support@mindease.com">support@mindease.com</a></p>
            <p><strong>Phone:</strong> +1 (555) 123-4567</p>
            <p><strong>Address:</strong> 123 Wellness Street, CA</p>
            <div className="contact-icons">
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin"></i></a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-facebook"></i></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
              <a href="https://wa.me/15551234567" target="_blank" rel="noopener noreferrer"><i className="fab fa-whatsapp"></i></a>
            </div>
            <p className="response-time">We typically respond within 12 hours.</p>
          </div>

          <div className="contact-form">
            <h2>Talk to Our Experts</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              alert('Message sent! We will get back to you soon.');
            }}>
              <input type="email" placeholder="Email" required />
              <textarea rows="5" placeholder="Message" required></textarea>
              <button type="submit">Send Message</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;