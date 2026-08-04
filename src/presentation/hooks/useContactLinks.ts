"use client";

import { useSite } from "@/presentation/components/providers/SiteProvider";
import { buildWhatsAppUrl, getWhatsAppChatUrl } from "@/presentation/lib/whatsapp";

/**
 * Centralized contact / social links from Site Settings (admin).
 */
export function useContactLinks() {
  const { contact } = useSite();

  return {
    address: contact.address,
    email: contact.email,
    emailHref: `mailto:${contact.email}`,
    whatsappPhone: contact.whatsappPhone,
    whatsappDisplay: contact.whatsappDisplay,
    whatsappChatUrl: getWhatsAppChatUrl(contact.whatsappPhone),
    whatsappUrl: (message: string) => buildWhatsAppUrl(message, contact.whatsappPhone),
    instagram: contact.instagram,
    facebook: contact.facebook,
    spotify: contact.spotify,
  };
}
