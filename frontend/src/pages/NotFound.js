// src/pages/NotFound.js
import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      textAlign: 'center'
    }}>
      <div style={{
        background: 'white',
        borderRadius: '32px',
        padding: '60px 40px',
        maxWidth: '600px',
        boxShadow: '0 30px 90px rgba(0, 0, 0, 0.3)'
      }}>
        <div style={{ fontSize: '100px', marginBottom: '20px' }}>🧭</div>
        <h1 style={{ 
          fontSize: '3rem', 
          color: '#1a1a1a', 
          marginBottom: '16px',
          fontWeight: '800'
        }}>
          404 - Page Not Found
        </h1>
        <p style={{ 
          fontSize: '1.2rem', 
          color: '#6b7280', 
          marginBottom: '32px',
          lineHeight: '1.6'
        }}>
          Oops! The page you're looking for doesn't exist. Let's get you back on track.
        </p>
        <Link to="/">
          <button style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            border: 'none',
            padding: '16px 40px',
            borderRadius: '50px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(102, 126, 234, 0.4)',
            transition: 'all 0.3s'
          }}>
            🏠 Go Home
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;