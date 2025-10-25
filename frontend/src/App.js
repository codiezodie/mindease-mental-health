// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles.css';
import Chatbot from './pages/Chatbot';
import WellnessPlanner from './pages/WellnessPlanner';
import TherapistFinder from './pages/TherapistFinder';
import Articles from './pages/Articles';
import NotFound from './pages/NotFound';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Navbar />
          <Routes>
  <Route path="/" element={<Home />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/chatbot" element={<Chatbot />} />
  <Route path="/wellness" element={<WellnessPlanner />} />
  <Route path="/therapists" element={<TherapistFinder />} />
  <Route path="/articles" element={<Articles />} />
  <Route path="*" element={<NotFound />} />  {/* 👈 ADD THIS */}
</Routes>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;