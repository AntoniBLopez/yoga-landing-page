import { WHATSAPP_PHONE } from "@/config/contact";

/**
 * Builds a wa.me deep link with a prefilled message.
 */
export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Plain WhatsApp chat link (no prefilled text). */
export function getWhatsAppChatUrl(): string {
  return `https://wa.me/${WHATSAPP_PHONE}`;
}
