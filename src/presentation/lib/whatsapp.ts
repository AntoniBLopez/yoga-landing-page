import { WHATSAPP_PHONE } from "@/config/contact";

/**
 * Builds a wa.me deep link with a prefilled message.
 * Prefer passing the CMS phone (`site.contact.whatsappPhone`) so all links stay centralized.
 */
export function buildWhatsAppUrl(message: string, phone = WHATSAPP_PHONE): string {
  const digits = phone.replace(/\D/g, "") || WHATSAPP_PHONE;
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}

/** Plain WhatsApp chat link (no prefilled text). */
export function getWhatsAppChatUrl(phone = WHATSAPP_PHONE): string {
  const digits = phone.replace(/\D/g, "") || WHATSAPP_PHONE;
  return `https://wa.me/${digits}`;
}
