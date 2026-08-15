import React, { useState } from "react";

const STANDARD_PRICES = [
  { flavor: "Vanilla / Pineapple Cool Cake", halfKg: "₹150", oneKg: "₹249", tag: "Best Offer" },
  { flavor: "Butterscotch Special Cake", halfKg: "₹180", oneKg: "₹300", tag: "Popular" },
  { flavor: "Black Forest Classic", halfKg: "₹200", oneKg: "₹350", tag: "Bestseller" },
  { flavor: "Rich Chocolate Truffle", halfKg: "₹220", oneKg: "₹400", tag: "Must Try" },
  { flavor: "Red Velvet Cream Cheese", halfKg: "₹250", oneKg: "₹450", tag: "Premium" },
  { flavor: "Fresh Strawberry Cake", halfKg: "₹180", oneKg: "₹300", tag: "" },
  { flavor: "Mango Fruit Delight", halfKg: "₹200", oneKg: "₹350", tag: "Seasonal" },
  { flavor: "Rasmalai Fusion Cake", halfKg: "₹280", oneKg: "₹500", tag: "Special" },
];

const SPECIALTY_PRICES = [
  { item: "📸 5-Minute Instant Photo Cake", starting: "₹450 / 1 Kg", desc: "High quality edible photo printing in just 5 minutes" },
  { item: "👑 Barbie Doll 3D Theme Cake", starting: "₹900 / 2 Kg", desc: "Custom colors, dresses, and flavors" },
  { item: "🦸 Kids Superhero / Cartoon Theme", starting: "₹800 / 1.5 Kg", desc: "Spider-Man, Mickey, Batman, Dora, Unicorn & more" },
  { item: "🎂 2-Step / 3-Step Wedding Cake", starting: "₹1800 / 3 Kg", desc: "Grand floral, metallic & luxury tiered designs" },
];

export default function PriceMenu() {
  const [activeTab, setActiveTab] = useState("flavors");

  return (
    <section className="menu-section" id="menu">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">💰 Wholesale & Retail Rates</div>
          <h2 className="section-title">Cake Price Menu</h2>
          <p className="section-subtitle">
            Transparent, factory-direct wholesale and retail pricing with unmatched freshness.
          </p>
        </div>

        <div className="menu-tabs">
          <button
            className={`menu-tab-btn ${activeTab === "flavors" ? "active" : ""}`}
            onClick={() => setActiveTab("flavors")}
          >
            🍰 Standard Cool Cakes (0.5 Kg & 1 Kg)
          </button>
          <button
            className={`menu-tab-btn ${activeTab === "specialty" ? "active" : ""}`}
            onClick={() => setActiveTab("specialty")}
          >
            📸 Photo & Designer Cakes
          </button>
        </div>

        {activeTab === "flavors" && (
          <div className="price-table-container">
            <table className="price-table">
              <thead>
                <tr>
                  <th>Flavor / Variety</th>
                  <th>0.5 Kg Price</th>
                  <th>1 Kg Price</th>
                  <th>Order</th>
                </tr>
              </thead>
              <tbody>
                {STANDARD_PRICES.map((row, idx) => (
                  <tr key={idx}>
                    <td>
                      <strong>{row.flavor}</strong>
                      {row.tag && <span className="table-tag">{row.tag}</span>}
                    </td>
                    <td className="price-col">{row.halfKg}</td>
                    <td className="price-col highlight-price">{row.oneKg}</td>
                    <td>
                      <a
                        href={`https://wa.me/919666725858?text=${encodeURIComponent(`Hi SS Cake Factory, I want to order ${row.flavor} (1 Kg / 0.5 Kg).`)}`}
                        target="_blank"
                        rel="noreferrer"
                        className="table-wa-btn"
                      >
                        Order
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {activeTab === "specialty" && (
          <div className="specialty-grid">
            {SPECIALTY_PRICES.map((item, idx) => (
              <div key={idx} className="specialty-card">
                <div className="specialty-info">
                  <h3>{item.item}</h3>
                  <p>{item.desc}</p>
                </div>
                <div className="specialty-price-box">
                  <span className="spec-starting">Starting from</span>
                  <span className="spec-price">{item.starting}</span>
                  <a
                    href={`https://wa.me/919666725858?text=${encodeURIComponent(`Hi SS Cake Factory, I want to inquire about ${item.item}.`)}`}
                    target="_blank"
                    rel="noreferrer"
                    className="spec-wa-btn"
                  >
                    💬 Inquire on WhatsApp
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="menu-wholesale-banner">
          <div className="banner-text">
            <h3>🏢 Wholesale & Bulk Event Orders?</h3>
            <p>We provide special discount rates for bakeries, party halls, catering, and event planners.</p>
          </div>
          <a
            href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20I%20want%20to%20inquire%20about%20Wholesale/Bulk%20Cake%20Orders."
            target="_blank"
            rel="noreferrer"
            className="btn btn-whatsapp"
          >
            💬 Contact for Wholesale
          </a>
        </div>
      </div>
    </section>
  );
}
