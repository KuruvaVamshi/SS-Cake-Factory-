import React, { useState } from "react";
import { orderOnWhatsApp } from "../utils/whatsapp";

const FLAVORS = [
  "Butterscotch (Special)",
  "Black Forest",
  "Chocolate Truffle",
  "Red Velvet",
  "Pineapple",
  "Strawberry",
  "Mango Delight",
  "Blueberry",
  "Vanilla Classic",
  "Rasmalai Fusion"
];

const WEIGHTS = ["0.5 KG", "1 KG", "1.5 KG", "2 KG", "3 KG", "4 KG", "5 KG+"];

export default function CakeModal({ cake, onClose }) {
  if (!cake) return null;

  const [selectedWeight, setSelectedWeight] = useState(cake.weight || "1 KG");
  const [selectedFlavor, setSelectedFlavor] = useState(FLAVORS[0]);
  const [isEggless, setIsEggless] = useState(false);
  const [customText, setCustomText] = useState("");
  const [isSending, setIsSending] = useState(false);

  const handleOrder = async () => {
    setIsSending(true);
    try {
      await orderOnWhatsApp(cake, {
        weight: selectedWeight,
        flavor: selectedFlavor,
        eggless: isEggless,
        customText: customText.trim()
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div className="modal-grid">
          {/* Cake Image Box */}
          <div className="modal-image-col">
            <div className="modal-image-wrapper">
              <span className="modal-code-badge">{cake.code || `SS-${cake.id}`}</span>
              <img
                src={cake.image || "/thumbnail.jpg"}
                alt={cake.name}
                className="modal-image"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "/thumbnail.jpg";
                }}
              />
            </div>
            <p className="modal-image-note">
              📸 <em>Exact cake photo will be sent to WhatsApp with your order.</em>
            </p>
          </div>

          {/* Cake Customization Details */}
          <div className="modal-details-col">
            <div className="modal-header-info">
              <span className="modal-sub-tag">Item #{cake.code || cake.id}</span>
              <h2 className="modal-title">{cake.name}</h2>
              <div className="modal-price-tag">
                <span className="modal-price-label">Price:</span>
                <span className="modal-price-val">{cake.price}</span>
              </div>
            </div>

            <div className="modal-form">
              {/* Weight Selector */}
              <div className="form-group">
                <label className="form-label">⚖️ Select Weight:</label>
                <div className="options-pill-grid">
                  {WEIGHTS.map((w) => (
                    <button
                      key={w}
                      type="button"
                      className={`pill-btn ${selectedWeight === w ? "active" : ""}`}
                      onClick={() => setSelectedWeight(w)}
                    >
                      {w}
                    </button>
                  ))}
                </div>
              </div>

              {/* Flavor Selector */}
              <div className="form-group">
                <label className="form-label">🍓 Select Flavor:</label>
                <select
                  className="form-select"
                  value={selectedFlavor}
                  onChange={(e) => setSelectedFlavor(e.target.value)}
                >
                  {FLAVORS.map((f) => (
                    <option key={f} value={f}>
                      {f}
                    </option>
                  ))}
                </select>
              </div>

              {/* 100% Eggless Toggle */}
              <div className="form-group-checkbox">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={isEggless}
                    onChange={(e) => setIsEggless(e.target.checked)}
                  />
                  <span className="checkbox-custom"></span>
                  <span className="checkbox-text">🌱 Make this cake <strong>100% Eggless (Pure Veg)</strong></span>
                </label>
              </div>

              {/* Message on Cake */}
              <div className="form-group">
                <label className="form-label">✍️ Name / Message to write on cake (Optional):</label>
                <input
                  type="text"
                  placeholder="e.g. Happy 1st Birthday Aarav!"
                  className="form-input"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  maxLength={60}
                />
              </div>

              {/* Action Buttons */}
              <div className="modal-actions">
                <button
                  className="btn-modal-wa"
                  onClick={handleOrder}
                  disabled={isSending}
                >
                  <span className="wa-icon">💬</span>
                  {isSending ? "Preparing WhatsApp..." : "Order on WhatsApp (With Photo)"}
                </button>

                <a href="tel:9666725858" className="btn-modal-call">
                  <span>📞</span> Call Bakery (96667 25858)
                </a>
              </div>

              <div className="modal-guarantee">
                <span>⚡ <strong>Quick Delivery & Store Pickup Available</strong></span>
                <span>🎂 100% Fresh Daily Baked in Hyderabad</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
