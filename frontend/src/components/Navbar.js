// src/components/Navbar.js
import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <nav className="nav-container">
        <div className="logo-section">
          <Link to="/" className="logo">Mindease</Link>
          <ul className="nav-links">
            <li><Link to="/">home</Link></li>
            <li><Link to="/therapists">therapists</Link></li>
            <li><Link to="/chatbot">ai chat</Link></li>
            <li><Link to="/wellness">wellness</Link></li>
            <li><Link to="/articles">articles</Link></li>
          </ul>
        </div>
        <div className="nav-actions">
          {user ? (
            <>
              <span style={{ marginRight: '10px', fontWeight: '600' }}>
                Hi, {user.name}!
              </span>
              <button className="nav-btn primary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">
                <button className="nav-btn">Login</button>
              </Link>
              <Link to="/register">
                <button className="nav-btn primary">Sign Up</button>
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

export default Navbar;