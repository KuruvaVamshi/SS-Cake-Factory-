import React, { useState } from "react";
import { orderOnWhatsApp } from "../utils/whatsapp";

export default function CakeCard({ cake, onQuickView }) {
  const [isSharing, setIsSharing] = useState(false);

  const handleWhatsAppClick = async (e) => {
    e.stopPropagation();
    setIsSharing(true);
    try {
      await orderOnWhatsApp(cake);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSharing(false);
    }
  };

  const handleCardClick = () => {
    if (onQuickView) {
      onQuickView(cake);
    }
  };

  return (
    <div className="cake-card" onClick={handleCardClick}>
      <div className="cake-card-img-wrapper">
        <span className="cake-code-badge">{cake.code || `SS-${cake.id}`}</span>
        {cake.weight && <span className="cake-weight-badge">{cake.weight}</span>}
        <img
          src={cake.image || "/thumbnail.jpg"}
          alt={cake.name}
          loading="lazy"
          className="cake-image"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "/thumbnail.jpg";
          }}
        />
        <div className="cake-img-overlay">
          <button className="quick-view-btn" onClick={handleCardClick}>
            🔍 Customize & View
          </button>
        </div>
      </div>

      <div className="cake-card-content">
        <h3 className="cake-name" title={cake.name}>{cake.name}</h3>
        
        <div className="cake-details">
          <div className="cake-detail-row">
            <span className="detail-label">🍓 Flavor:</span>
            <span className="detail-value">{cake.flavor}</span>
          </div>
          <div className="cake-detail-row">
            <span className="detail-label">⚖️ Weight:</span>
            <span className="detail-value">{cake.weight}</span>
          </div>
        </div>

        <div className="cake-card-footer">
          <div className="cake-price-box">
            <span className="price-label">Price</span>
            <span className="price-val">{cake.price}</span>
          </div>

          <div className="cake-action-btns">
            <button
              className="btn-card-wa"
              onClick={handleWhatsAppClick}
              disabled={isSharing}
              title="Order on WhatsApp with Photo"
            >
              {isSharing ? (
                <span>⏳ Sending...</span>
              ) : (
                <>
                  <span className="wa-icon">💬</span> WhatsApp
                </>
              )}
            </button>

            <a
              href="https://maps.google.com/?q=17.3205,78.563306"
              target="_blank"
              rel="noreferrer"
              className="btn-card-map"
              onClick={(e) => e.stopPropagation()}
              title="View Store on Google Maps"
            >
              📍
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
