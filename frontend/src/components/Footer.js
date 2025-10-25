// src/components/Footer.js
import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-top">
        <div className="footer-container">
          <div className="footer-brand">
            <h2>Mindease</h2>
          </div>
          <div className="footer-links">
            <div className="footer-column">
              <Link to="/">Home</Link>
              <Link to="/therapists">Therapists</Link>
              <Link to="/articles">Articles</Link>
              <Link to="/wellness">Wellness</Link>
            </div>
            <div className="footer-column">
              <a href="https://www.instagram.com/kognosinfosystem8/" target="_blank" rel="noopener noreferrer">Instagram</a>
              <a href="https://www.facebook.com/people/Kognos-Infosystem/61553191480105/" target="_blank" rel="noopener noreferrer">Facebook</a>
              <a href="https://www.youtube.com/channel/UC1oiZgY7s7EsZlg9eCLw8uw" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a href="https://www.linkedin.com/company/kognos-infosystem/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            </div>
            <div className="footer-column">
              <Link to="/terms">Terms Of Use</Link>
              <Link to="/privacy">Privacy Policy</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-container">
          <p>© 2025 Mindease. All Rights Reserved.</p>
          <div className="social-icons">
            <a href="https://www.instagram.com/kognosinfosystem8/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://x.com/kognosinfo2024" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com/people/Kognos-Infosystem/61553191480105/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-facebook-f"></i>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;