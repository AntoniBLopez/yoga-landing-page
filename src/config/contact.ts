/**
 * Site contact & social constants — single source of truth.
 * Use these everywhere instead of hardcoding URLs or addresses.
 */

/** International digits only (no "+"), for wa.me / API links */
export const WHATSAPP_PHONE = "34610429326";

/** Human-readable display */
export const WHATSAPP_PHONE_DISPLAY = "+34 610 42 93 26";

export const CONTACT_EMAIL = "cyaneyoga@gmail.com";

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/cyaneyoga/",
  facebook: "https://www.facebook.com/profile.php?id=100056892065471",
  email: `mailto:${CONTACT_EMAIL}`,
  spotify: "https://open.spotify.com/playlist/6Fp8AowBrbG9r7M02z19JN",
} as const;
