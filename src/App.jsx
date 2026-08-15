import React, { useState, useEffect } from "react";
import cakesData from "./data/cakes.json";
import { orderOnWhatsApp } from "./utils/whatsapp";

const PHONE = "9666725858";
const MAPS_URL = "https://www.google.com/maps/place/17%C2%B019'13.8%22N+78%C2%B033'47.9%22E/@17.3204968,78.5625525,18.4z/data=!4m4!3m3!8m2!3d17.3205!4d78.563306";
const MAPS_SHORT_URL = "https://maps.google.com/?q=17.3205,78.563306";

const LOGO_SRC = "/assets/cake13-Ci7H7I4y.png";
const HERO_SRC = "/assets/cake43-CJaqw6nw.jpg";
const MENU_POSTER_SRC = "/assets/cake8-CFc84GHJ.png";

export default function App() {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== "undefined") {
      return window.location.pathname;
    }
    return "/";
  });

  // Listen to browser navigation (back/forward)
  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
    };
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, []);

  const navigate = (path) => {
    window.history.pushState({}, "", path);
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Check if we are on /cake/:id
  const cakeMatch = currentPath.match(/^\/cake\/(\d+)/);
  const selectedCakeId = cakeMatch ? parseInt(cakeMatch[1], 10) : null;
  const selectedCake = selectedCakeId ? cakesData.find((c) => c.id === selectedCakeId) : null;

  if (selectedCakeId) {
    return (
      <div className="cake-detail-view">
        <button className="back-btn" onClick={() => navigate("/")}>
          ← Back to Cake Collection
        </button>
        {selectedCake ? (
          <>
            <h1>{selectedCake.name}</h1>
            <img src={selectedCake.image || "/thumbnail.jpg"} alt={selectedCake.name} />
            <h2>{selectedCake.price}</h2>
            <p><strong>Flavor:</strong> {selectedCake.flavor}</p>
            <p><strong>Weight:</strong> {selectedCake.weight}</p>
            <div className="cake-detail-buttons">
              <a
                href={MAPS_SHORT_URL}
                target="_blank"
                rel="noreferrer"
                className="location-btn"
              >
                📍 View Location
              </a>
              <button
                className="wa-btn"
                onClick={() => orderOnWhatsApp(selectedCake)}
              >
                💬 WhatsApp Order
              </button>
            </div>
          </>
        ) : (
          <h1 style={{ color: "white", marginTop: "40px" }}>Cake Not Found</h1>
        )}
      </div>
    );
  }

  // Double list for smooth infinite CSS marquee trending carousel
  const trendingCakes = [...cakesData.slice(0, 16), ...cakesData.slice(0, 16)];

  return (
    <>
      {/* Navigation */}
      <nav className="navbar">
        <div className="logo-box" onClick={() => navigate("/")}>
          <img src={LOGO_SRC} alt="SS Cake Factory" className="logo" />
          <div>
            <h2>SS Cake Factory</h2>
            <p>WHOLESALE & RETAIL</p>
          </div>
        </div>

        <ul className="menu">
          <li><a href="#home">Home</a></li>
          <li><a href="#trending">Trending</a></li>
          <li><a href="#menu">Menu</a></li>
          <li><a href="#gallery">Gallery</a></li>
          <li><a href="#location">Location</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>

        <a
          href={`https://wa.me/91${PHONE}`}
          target="_blank"
          rel="noreferrer"
          className="whatsapp-btn"
        >
          WhatsApp
        </a>
      </nav>

      {/* Hero Section */}
      <section className="hero-section" id="home">
        <div className="hero-text">
          <span className="badge">Hyderabad's Premium Cake Studio</span>
          <h1>
            Fresh Cakes<br />Crafted With Love
          </h1>
          <p>Custom Cakes, Theme Cakes, Birthday Cakes & Cool Cakes</p>
          <div className="buttons">
            <a href={`tel:${PHONE}`} className="call-btn">
              📞 Call Now
            </a>
            <a
              href={`https://wa.me/91${PHONE}`}
              target="_blank"
              rel="noreferrer"
              className="wa-btn"
            >
              WhatsApp Order
            </a>
            <a
              href={MAPS_URL}
              target="_blank"
              rel="noreferrer"
              className="location-btn"
            >
              📍 Location
            </a>
          </div>
        </div>
        <div className="hero-image">
          <img src={HERO_SRC} alt="SS Cake Factory" />
        </div>
      </section>

      {/* Trending Cakes Slider */}
      <section className="slider-section" id="trending">
        <h2>Trending Cakes</h2>
        <div className="trending-container">
          <div className="trending-track">
            {trendingCakes.map((cake, idx) => (
              <div
                key={`${cake.id}-${idx}`}
                className="trending-slide"
                onClick={() => navigate(`/cake/${cake.id}`)}
              >
                <img src={cake.image || "/thumbnail.jpg"} alt={cake.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cake Price Menu Poster */}
      <section className="menu-section" id="menu">
        <h2>🎂 Cake Price Menu</h2>
        <div className="menu-poster">
          <img src={MENU_POSTER_SRC} alt="Cake Menu" />
        </div>
      </section>

      {/* Cake Gallery Collection Grid */}
      <section className="gallery-section" id="gallery">
        <h2>Our Cake Collection ({cakesData.length} Designs)</h2>
        <div className="gallery-grid">
          {cakesData.map((cake) => (
            <div
              key={cake.id}
              className="cake-card"
              onClick={() => navigate(`/cake/${cake.id}`)}
            >
              <img
                src={cake.image || "/thumbnail.jpg"}
                alt={cake.name}
                className="cake-image"
                loading="lazy"
              />
              <div className="cake-content">
                <h3>{cake.name}</h3>
                <p><strong>Flavor:</strong> {cake.flavor}</p>
                <p><strong>Weight:</strong> {cake.weight}</p>
                <span className="price">{cake.price}</span>
                <div className="cake-buttons">
                  <button
                    className="wa-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      orderOnWhatsApp(cake);
                    }}
                  >
                    WhatsApp
                  </button>
                  <a
                    href={MAPS_SHORT_URL}
                    target="_blank"
                    rel="noreferrer"
                    className="location-btn"
                    onClick={(e) => e.stopPropagation()}
                  >
                    Map
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Store Location Section */}
      <section className="location-section" id="location">
        <h2>📍 Visit Our Store</h2>
        <p>Open our store location in Google Maps.</p>
        <a
          href={MAPS_URL}
          target="_blank"
          rel="noreferrer"
          className="location-btn"
        >
          Open Google Maps
        </a>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <h2>Contact Us</h2>
        <p style={{ fontSize: "24px", fontWeight: "bold" }}>📞 {PHONE}</p>
        <div className="contact-buttons">
          <a href={`tel:${PHONE}`} className="call-btn">
            Call Now
          </a>
          <a
            href={`https://wa.me/91${PHONE}`}
            target="_blank"
            rel="noreferrer"
            className="wa-btn"
          >
            WhatsApp
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <h3>SS Cake Factory</h3>
        <p>Wholesale & Retail Cakes</p>
        <p>📞 {PHONE}</p>
        <p>© 2026 All Rights Reserved</p>
      </footer>
    </>
  );
}
