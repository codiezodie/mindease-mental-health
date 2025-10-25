// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
console.log('%c🧠 Mindease - Mental Wellness Platform', 'color: #667eea; font-size: 20px; font-weight: bold;');
console.log('%cBuilt with ❤️ by Zainab Ahmad', 'color: #764ba2; font-size: 14px;');
console.log('%cMERN Stack | React | Node.js | MongoDB | AI Integration', 'color: #6b7280; font-size: 12px;');

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);