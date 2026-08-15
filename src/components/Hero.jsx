import React from "react";

export default function Hero() {
  return (
    <section className="hero-section" id="home">
      <div className="hero-background-glow"></div>
      <div className="hero-container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="sparkle">✨</span> Hyderabad's Premium Cake Studio & Wholesale Bakery
          </div>

          <h1 className="hero-title">
            Fresh Cakes Crafted With <span className="highlight-text">Love & Passion</span>
          </h1>

          <p className="hero-description">
            From delicious daily cool cakes starting at <strong>₹249/kg</strong> to stunning multi-tier wedding cakes, custom 3D themes, and <strong>Photo Cakes ready in just 5 minutes!</strong>
          </p>

          <div className="hero-telugu-banner">
            <span className="telugu-tag">ప్రత్యేక ఆఫర్</span>
            <span>ఫోటో కేక్ కేవలం <strong>5 నిమిషాల్లో</strong> తయారు చేయబడును • 1 Kg కూల్ కేక్ <strong>₹249/-</strong> నుండే!</span>
          </div>

          <div className="hero-cta-group">
            <a href="#gallery" className="btn btn-primary">
              <span>🎂</span> Explore 200+ Cakes
            </a>
            <a
              href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20I%20would%20like%20to%20order%20a%20custom%20cake."
              target="_blank"
              rel="noreferrer"
              className="btn btn-whatsapp"
            >
              <span>💬</span> WhatsApp Order
            </a>
            <a href="tel:9666725858" className="btn btn-secondary">
              <span>📞</span> Call: 96667 25858
            </a>
          </div>

          {/* Key Selling Badges */}
          <div className="hero-features-grid">
            <div className="feature-item">
              <div className="feature-icon">⚡</div>
              <div className="feature-info">
                <h4>5-Min Photo Cake</h4>
                <p>Instant edible printing</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🏷️</div>
              <div className="feature-info">
                <h4>Starting @ ₹249/-</h4>
                <p>Wholesale & Retail rates</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">🌱</div>
              <div className="feature-info">
                <h4>100% Eggless</h4>
                <p>Pure veg options available</p>
              </div>
            </div>

            <div className="feature-item">
              <div className="feature-icon">📍</div>
              <div className="feature-info">
                <h4>Hyderabad Store</h4>
                <p>Fresh daily in Karmanghat</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
