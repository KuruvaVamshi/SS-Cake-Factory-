import React, { useRef } from "react";
import CakeCard from "./CakeCard";

export default function TrendingSwiper({ cakes, onQuickView }) {
  const scrollRef = useRef(null);

  // Pick top 12 trending / showcase cakes
  const trendingCakes = cakes.slice(0, 14);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <section className="trending-section" id="trending">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">🔥 Most Popular</div>
          <h2 className="section-title">Trending Designer Cakes</h2>
          <p className="section-subtitle">
            Our most loved theme, multi-tier, and photo cakes ordered by customers this week!
          </p>
        </div>

        <div className="carousel-controls">
          <button
            className="carousel-arrow left"
            onClick={() => handleScroll("left")}
            aria-label="Previous cakes"
          >
            ‹
          </button>
          <button
            className="carousel-arrow right"
            onClick={() => handleScroll("right")}
            aria-label="Next cakes"
          >
            ›
          </button>
        </div>

        <div className="trending-scroll-container" ref={scrollRef}>
          {trendingCakes.map((cake) => (
            <div key={cake.id} className="trending-card-wrapper">
              <CakeCard cake={cake} onQuickView={onQuickView} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
