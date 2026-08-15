import React, { useState, useMemo } from "react";
import CakeCard from "./CakeCard";

const CATEGORIES = [
  "All Cakes",
  "Step & Tier Cakes",
  "Kids & Theme Cakes",
  "Photo Cakes",
  "Anniversary Cakes",
  "Flavored Cool Cakes"
];

export default function CakeCatalog({ cakes, onQuickView }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Cakes");
  const [selectedWeight, setSelectedWeight] = useState("All");
  const [sortBy, setSortBy] = useState("default");
  const [visibleCount, setVisibleCount] = useState(24);

  // Filter & Search Logic
  const filteredCakes = useMemo(() => {
    return cakes.filter((cake) => {
      // Search query
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        cake.name.toLowerCase().includes(q) ||
        (cake.code && cake.code.toLowerCase().includes(q)) ||
        cake.flavor.toLowerCase().includes(q) ||
        cake.weight.toLowerCase().includes(q) ||
        cake.price.toLowerCase().includes(q);

      if (!matchesSearch) return false;

      // Category Filter
      if (selectedCategory !== "All Cakes") {
        if (!cake.categories || !cake.categories.includes(selectedCategory)) {
          return false;
        }
      }

      // Weight Filter
      if (selectedWeight !== "All") {
        if (selectedWeight === "1kg" && !cake.weight.toLowerCase().includes("1")) return false;
        if (selectedWeight === "2kg" && !cake.weight.toLowerCase().includes("2")) return false;
        if (selectedWeight === "3kg+" && !cake.weight.toLowerCase().includes("3") && !cake.weight.toLowerCase().includes("4") && !cake.weight.toLowerCase().includes("5") && !cake.weight.toLowerCase().includes("6")) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === "price-low") {
        const pA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
        return pA - pB;
      }
      if (sortBy === "price-high") {
        const pA = parseInt(a.price.replace(/[^\d]/g, "")) || 0;
        const pB = parseInt(b.price.replace(/[^\d]/g, "")) || 0;
        return pB - pA;
      }
      return a.id - b.id;
    });
  }, [cakes, searchQuery, selectedCategory, selectedWeight, sortBy]);

  const displayedCakes = filteredCakes.slice(0, visibleCount);

  return (
    <section className="catalog-section" id="gallery">
      <div className="section-container">
        <div className="section-header">
          <div className="section-badge">🖼️ Complete Catalog</div>
          <h2 className="section-title">Explore Our Cake Gallery</h2>
          <p className="section-subtitle">
            Browse through over 200+ unique cake designs. Click on any cake to customize and order directly via WhatsApp with the exact photo!
          </p>
        </div>

        {/* Search & Filter Bar */}
        <div className="catalog-toolbar">
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by cake name, flavor, or code (e.g. SS-045, Spiderman)..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setVisibleCount(24);
              }}
              className="search-input"
            />
            {searchQuery && (
              <button className="clear-search-btn" onClick={() => setSearchQuery("")}>
                ✕
              </button>
            )}
          </div>

          <div className="filter-dropdowns">
            <select
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
              className="toolbar-select"
            >
              <option value="All">⚖️ All Weights</option>
              <option value="1kg">1 KG Cakes</option>
              <option value="2kg">2 KG Cakes</option>
              <option value="3kg+">3 KG+ Step Cakes</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="toolbar-select"
            >
              <option value="default">✨ Default Sorting</option>
              <option value="price-low">💰 Price: Low to High</option>
              <option value="price-high">💎 Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Category Pills */}
        <div className="category-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`cat-pill ${selectedCategory === cat ? "active" : ""}`}
              onClick={() => {
                setSelectedCategory(cat);
                setVisibleCount(24);
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Counter */}
        <div className="catalog-meta">
          <span>Showing <strong>{displayedCakes.length}</strong> of <strong>{filteredCakes.length}</strong> cakes</span>
          {searchQuery && <span className="meta-search-term">Matching &ldquo;{searchQuery}&rdquo;</span>}
        </div>

        {/* Cards Grid */}
        {displayedCakes.length > 0 ? (
          <div className="cake-grid">
            {displayedCakes.map((cake) => (
              <CakeCard key={cake.id} cake={cake} onQuickView={onQuickView} />
            ))}
          </div>
        ) : (
          <div className="no-results">
            <div className="no-results-icon">🎂</div>
            <h3>No cakes found</h3>
            <p>Try searching for a different name, flavor, or clear the category filters.</p>
            <button
              className="btn btn-primary"
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("All Cakes");
                setSelectedWeight("All");
              }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Load More Button */}
        {visibleCount < filteredCakes.length && (
          <div className="load-more-container">
            <button
              className="btn btn-load-more"
              onClick={() => setVisibleCount((prev) => prev + 24)}
            >
              Load More Cakes ({filteredCakes.length - visibleCount} remaining) ↓
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
