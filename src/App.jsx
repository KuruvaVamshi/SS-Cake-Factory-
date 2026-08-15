import React, { useState } from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import TrendingSwiper from "./components/TrendingSwiper";
import PriceMenu from "./components/PriceMenu";
import CakeCatalog from "./components/CakeCatalog";
import LocationContact from "./components/LocationContact";
import Footer from "./components/Footer";
import CakeModal from "./components/CakeModal";
import cakesData from "./data/cakes.json";

export default function App() {
  const [selectedCake, setSelectedCake] = useState(null);

  return (
    <div className="app-container">
      <Header />
      <main>
        <Hero />
        <TrendingSwiper cakes={cakesData} onQuickView={setSelectedCake} />
        <PriceMenu />
        <CakeCatalog cakes={cakesData} onQuickView={setSelectedCake} />
        <LocationContact />
      </main>
      <Footer />

      {/* Interactive Quick View / Customizer Modal */}
      {selectedCake && (
        <CakeModal
          cake={selectedCake}
          onClose={() => setSelectedCake(null)}
        />
      )}

      {/* Floating 1-Click WhatsApp Button */}
      <a
        href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20I%20want%20to%20order%20a%20fresh%20cake."
        target="_blank"
        rel="noreferrer"
        className="floating-whatsapp"
        title="Direct WhatsApp Chat"
      >
        <span className="wa-icon">💬</span>
        <span className="wa-text">Chat with Baker</span>
      </a>
    </div>
  );
}
