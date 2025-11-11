import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import './theme.css';

// PUBLIC_INTERFACE
export default function AppRouter() {
  /** Router entry for the LMS frontend. Renders a header and route to /login. */
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        {/* Placeholder for future routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

function Header() {
  // Minimal header aligned with Ocean Professional theme
  return (
    <header className="ec-header" role="banner">
      <div className="ec-header__inner">
        <div className="ec-brand">
          <div className="ec-logo" aria-hidden="true" />
          <span className="ec-brand__name" aria-label="EduConnect">EduConnect</span>
        </div>
        <nav className="ec-nav" aria-label="Primary">
          <ul className="ec-nav__list">
            <li><button className="pill" type="button">Features</button></li>
            <li><button className="pill" type="button">Pricing</button></li>
            <li><button className="pill" type="button">Docs</button></li>
            <li><button className="pill" type="button">Blog</button></li>
          </ul>
        </nav>
        <div className="ec-actions">
          <Link className="ec-link" to="/login">Log in</Link>
          <a className="cta cta--nav" href="#get-started">Get Started</a>
        </div>
      </div>
    </header>
  );
}
