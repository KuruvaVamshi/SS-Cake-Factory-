import React, { useState, useEffect } from "react";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="header-container">
        <a href="#home" className="logo">
          <span className="logo-icon">🎂</span>
          <div className="logo-text">
            <span className="logo-title">SS CAKE FACTORY</span>
            <span className="logo-subtitle">Wholesale & Retail Bakery</span>
          </div>
        </a>

        <button 
          className="mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Navigation Menu"
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>

        <nav className={`nav ${mobileMenuOpen ? "open" : ""}`}>
          <ul>
            <li><a href="#home" onClick={() => setMobileMenuOpen(false)}>Home</a></li>
            <li><a href="#trending" onClick={() => setMobileMenuOpen(false)}>Trending</a></li>
            <li><a href="#menu" onClick={() => setMobileMenuOpen(false)}>Price Menu</a></li>
            <li><a href="#gallery" onClick={() => setMobileMenuOpen(false)}>All Cakes (200+)</a></li>
            <li><a href="#location" onClick={() => setMobileMenuOpen(false)}>Location</a></li>
            <li><a href="#contact" onClick={() => setMobileMenuOpen(false)}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <a href="tel:9666725858" className="header-call-btn">
            <span>📞</span> 96667 25858
          </a>
          <a
            href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20I%20want%20to%20inquire%20about%20cakes."
            target="_blank"
            rel="noreferrer"
            className="header-wa-btn"
          >
            <span className="wa-icon">💬</span> WhatsApp
          </a>
        </div>
      </div>
    </header>
  );
}
