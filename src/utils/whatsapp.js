// WhatsApp Order Utility - Direct 1-Click WhatsApp Chat with Rich Cake Details & Photo URL

const WHATSAPP_NUMBER = "919666725858";
const DEFAULT_DOMAIN = "https://www.sscakefactory.com";

function getBaseUrl() {
  if (typeof window !== "undefined" && window.location && window.location.origin) {
    // If running on localhost or raw IP during local dev, use live domain or current origin
    if (window.location.hostname === "localhost" || /^\d+\.\d+\.\d+\.\d+$/.test(window.location.hostname)) {
      return DEFAULT_DOMAIN;
    }
    return window.location.origin;
  }
  return DEFAULT_DOMAIN;
}

/**
 * Builds a formatted WhatsApp order message
 */
export function buildOrderMessage(cake, options = {}) {
  const code = cake.code || `SS-${String(cake.id).padStart(3, "0")}`;
  const weight = options.weight || cake.weight || "1 KG";
  const flavor = options.flavor || cake.flavor || "All Flavors Available";
  const price = options.price || cake.price || "Contact for Price";
  const customText = options.customText ? `\n✍️ *Message on Cake:* "${options.customText}"` : "";
  const eggless = options.eggless ? "\n🌱 *Preference:* 100% Eggless" : "";
  
  const baseDomain = getBaseUrl();
  const imgPath = cake.image ? cake.image.replace(/^\./, "") : "/thumbnail.jpg";
  const fullImageUrl = imgPath.startsWith("http") ? imgPath : `${baseDomain}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;

  const message = 
`🎂 *SS CAKE FACTORY - ORDER INQUIRY* 🎂
━━━━━━━━━━━━━━━━━━━━
🍰 *Cake:* ${cake.name}
🆔 *Item Code:* ${code}
⚖️ *Weight:* ${weight}
🍓 *Flavor:* ${flavor}
💰 *Price:* ${price}${eggless}${customText}
━━━━━━━━━━━━━━━━━━━━
📸 *Cake Photo:* ${fullImageUrl}

📍 *Store Location (Hyderabad):*
https://maps.google.com/?q=17.3205,78.563306

_Please confirm availability and order details._`;

  return {
    message,
    fullImageUrl,
    whatsappUrl: `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`
  };
}

/**
 * Directly opens WhatsApp chat with SS Cake Factory (+91 96667 25858)
 * prefilling all order specifications and direct cake photo link.
 */
export function orderOnWhatsApp(cake, options = {}) {
  const { whatsappUrl } = buildOrderMessage(cake, options);
  
  // Directly open WhatsApp chat
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }
  return { success: true, method: "whatsapp_direct" };
}

