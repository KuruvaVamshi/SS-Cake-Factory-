import React from "react";

export default function LocationContact() {
  return (
    <>
      {/* Store Location Section */}
      <section className="location-section" id="location">
        <div className="section-container">
          <div className="section-header">
            <div className="section-badge">📍 Store Location</div>
            <h2 className="section-title">Visit Our Bakery in Hyderabad</h2>
            <p className="section-subtitle">
              Come visit our cake studio to taste fresh bakes or collect your custom orders!
            </p>
          </div>

          <div className="location-card-wrapper">
            <div className="location-info-box">
              <h3>SS Cake Factory</h3>
              <p className="location-address">
                📍 <strong>Location:</strong> Hyderabad, Telangana, India<br />
                Near Karmanghat / Saroornagar, Hyderabad
              </p>

              <div className="store-hours">
                <div className="hour-row">
                  <span>🕒 <strong>Store Timings:</strong></span>
                  <span>8:00 AM - 11:00 PM (All 7 Days)</span>
                </div>
                <div className="hour-row">
                  <span>⚡ <strong>Express Delivery:</strong></span>
                  <span>Photo cakes ready in 5 minutes!</span>
                </div>
              </div>

              <div className="location-actions">
                <a
                  href="https://www.google.com/maps/place/17%C2%B019'13.8%22N+78%C2%B033'47.9%22E/@17.3204968,78.5625525,18.4z/data=!4m4!3m3!8m2!3d17.3205!4d78.563306"
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-primary"
                >
                  📍 Open in Google Maps
                </a>
                <a
                  href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20Please%20share%20your%20exact%20live%20location."
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-whatsapp"
                >
                  💬 Get Location on WhatsApp
                </a>
              </div>
            </div>

            <div className="map-iframe-container">
              <iframe
                title="SS Cake Factory Location Map"
                src="https://maps.google.com/maps?q=17.3205,78.563306&hl=en&z=16&output=embed"
                width="100%"
                height="320"
                style={{ border: 0, borderRadius: "16px" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-container">
          <div className="contact-box">
            <div className="contact-header">
              <h2>Need a Custom or Urgent Cake?</h2>
              <p>Send your reference photo or talk directly to our head baker on WhatsApp!</p>
            </div>

            <div className="contact-buttons-row">
              <a href="tel:9666725858" className="btn btn-call-large">
                <span className="btn-icon">📞</span>
                <div className="btn-text-block">
                  <span className="btn-sub">Call Us Directly</span>
                  <span className="btn-main">96667 25858</span>
                </div>
              </a>

              <a
                href="https://wa.me/919666725858?text=Hello%20SS%20Cake%20Factory!%20I%20want%20to%20order%20a%20cake."
                target="_blank"
                rel="noreferrer"
                className="btn btn-wa-large"
              >
                <span className="btn-icon">💬</span>
                <div className="btn-text-block">
                  <span className="btn-sub">Instant WhatsApp Chat</span>
                  <span className="btn-main">+91 96667 25858</span>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
