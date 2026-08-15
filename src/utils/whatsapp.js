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
 * Sends order with native cake image file attachment on mobile devices
 * (via Web Share API), or opens WhatsApp directly with prefilled text on desktop/fallback.
 */
export async function orderOnWhatsApp(cake, options = {}) {
  const { message, whatsappUrl } = buildOrderMessage(cake, options);

  // Try Native Web Share API with actual cake photo file (Mobile devices)
  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
    try {
      const imgSrc = cake.image || "/thumbnail.jpg";
      const response = await fetch(imgSrc);
      if (response.ok) {
        const blob = await response.blob();
        const mimeType = blob.type || "image/jpeg";
        const ext = mimeType.includes("png") ? "png" : "jpg";
        const fileName = `${cake.code || "cake"}.${ext}`;
        const file = new File([blob], fileName, { type: mimeType });

        if (navigator.canShare({ files: [file] })) {
          await navigator.share({
            title: `SS Cake Factory - ${cake.name}`,
            text: message,
            files: [file]
          });
          return { success: true, method: "native_share" };
        }
      }
    } catch (err) {
      if (err.name === "AbortError") {
        // User closed the share sheet
        return { success: false, method: "cancelled" };
      }
      console.log("Native share fallback to WhatsApp link:", err);
    }
  }

  // Fallback / Desktop: Open WhatsApp directly
  if (typeof window !== "undefined") {
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  }
  return { success: true, method: "whatsapp_url" };
}

