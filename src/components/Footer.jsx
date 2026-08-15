import React from "react";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="section-container footer-container">
        <div className="footer-brand">
          <div className="footer-logo">
            <span className="logo-icon">🎂</span>
            <h3>SS CAKE FACTORY</h3>
          </div>
          <p className="footer-tagline">
            Fresh Cakes Crafted With Love • Wholesale & Retail Bakery Studio in Hyderabad.
          </p>
          <div className="footer-contacts">
            <p>📞 <strong>Phone:</strong> <a href="tel:9666725858">+91 96667 25858</a></p>
            <p>💬 <strong>WhatsApp:</strong> <a href="https://wa.me/919666725858" target="_blank" rel="noreferrer">+91 96667 25858</a></p>
            <p>📍 <strong>Location:</strong> Hyderabad, Telangana</p>
          </div>
        </div>

        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#trending">Trending Cakes</a></li>
            <li><a href="#menu">Price Menu</a></li>
            <li><a href="#gallery">All 200+ Cakes</a></li>
            <li><a href="#location">Store Location</a></li>
            <li><a href="#contact">Contact Us</a></li>
          </ul>
        </div>

        <div className="footer-categories">
          <h4>Popular Categories</h4>
          <ul>
            <li><a href="#gallery">Photo Cakes (5 Mins)</a></li>
            <li><a href="#gallery">1 Kg Cool Cakes @ ₹249</a></li>
            <li><a href="#gallery">Barbie Doll & Kids Theme</a></li>
            <li><a href="#gallery">Multi-Step Wedding Cakes</a></li>
            <li><a href="#gallery">100% Eggless Pure Veg</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="section-container footer-bottom-content">
          <p>© {new Date().getFullYear()} SS Cake Factory. All Rights Reserved.</p>
          <p>Crafted for Hyderabad Cake Lovers 🍰</p>
        </div>
      </div>
    </footer>
  );
}
