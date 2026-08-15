// WhatsApp Order Utility with Web Share API and Rich Image Preview Link

const WHATSAPP_NUMBER = "919666725858";
const PUBLIC_DOMAIN = "https://www.sscakefactory.com";

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
  
  // Construct absolute URL for the image so WhatsApp can fetch rich preview
  const imgPath = cake.image ? cake.image.replace(/^\./, "") : "/thumbnail.jpg";
  const fullImageUrl = imgPath.startsWith("http") ? imgPath : `${PUBLIC_DOMAIN}${imgPath.startsWith("/") ? "" : "/"}${imgPath}`;
  const fullCakePageUrl = `${PUBLIC_DOMAIN}/cake/${cake.id}`;

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
🔗 *Details Link:* ${fullCakePageUrl}

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
 * Sends order to WhatsApp with native image file attachment if supported,
 * otherwise opens WhatsApp web/app with pre-filled text and direct image link.
 */
export async function orderOnWhatsApp(cake, options = {}) {
  const { message, fullImageUrl, whatsappUrl } = buildOrderMessage(cake, options);

  // Try Native Web Share API with actual image file if supported (Mobile phones)
  if (typeof navigator !== "undefined" && navigator.share && navigator.canShare) {
    try {
      // Fetch local/remote image blob
      const imgSrc = cake.image || "/thumbnail.jpg";
      const response = await fetch(imgSrc);
      if (response.ok) {
        const blob = await response.blob();
        const ext = blob.type.includes("png") ? "png" : "jpg";
        const file = new File([blob], `${cake.code || "cake"}.${ext}`, { type: blob.type || "image/jpeg" });

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
      console.log("Native share fallback to direct WhatsApp URL:", err);
      // User cancelled or share failed -> fallback to URL
    }
  }

  // Fallback / Desktop: Open WhatsApp directly
  window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  return { success: true, method: "whatsapp_url" };
}
