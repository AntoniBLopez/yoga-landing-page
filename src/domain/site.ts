/**
 * Site-wide settings & marketing copy (CMS globals).
 */

export interface SiteColors {
  deep: string;
  deepDark: string;
  teal: string;
  tealDark: string;
  aqua: string;
  sky: string;
  sand: string;
  linen: string;
  wood: string;
  ink: string;
}

export interface SiteContact {
  whatsappPhone: string;
  whatsappDisplay: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  spotify: string;
}

export interface SiteGalleryImage {
  url: string;
  alt: string;
  featured: boolean;
}

export interface SiteImages {
  heroUrl: string;
  studioUrl: string;
  contactUrl: string;
  studioGallery: SiteGalleryImage[];
}

export interface SitePageVisibility {
  classes: boolean;
  schedule: boolean;
  studio: boolean;
  about: boolean;
  blog: boolean;
  pricing: boolean;
  contact: boolean;
}

/** Per-link visibility in the header (also gated by `pages` when linked to a route) */
export interface SiteHeaderNavVisibility {
  home: boolean;
  classes: boolean;
  schedule: boolean;
  studio: boolean;
  about: boolean;
  blog: boolean;
  pricing: boolean;
  contact: boolean;
  /** “Reservar clase” button */
  cta: boolean;
}

/** Per-link visibility in the footer explore column */
export interface SiteFooterNavVisibility {
  classes: boolean;
  schedule: boolean;
  studio: boolean;
  about: boolean;
  blog: boolean;
  pricing: boolean;
  contact: boolean;
}

/** Per-network visibility in the footer social column */
export interface SiteFooterSocialVisibility {
  facebook: boolean;
  instagram: boolean;
  email: boolean;
  whatsapp: boolean;
  spotify: boolean;
}

/** Section entry for ordered/visibility-controlled page layouts */
export interface OrderedSection {
  id: string;
  visible: boolean;
}

export interface SiteSettings {
  brandName: string;
  /** Display name of the teacher used across marketing copy & WhatsApp templates */
  teacherName: string;
  logoText: string;
  tagline: string;
  logoUrl: string;
  showLogoMark: boolean;
  showLogoText: boolean;
  showTagline: boolean;
  colors: SiteColors;
  contact: SiteContact;
  images: SiteImages;
  pages: SitePageVisibility;
  headerNav: SiteHeaderNavVisibility;
  footerNav: SiteFooterNavVisibility;
  footerSocial: SiteFooterSocialVisibility;
  landingSections: OrderedSection[];
  /** CTAs inside the landing Studio block (explore / rental) */
  landingStudioCtas: OrderedSection[];
  aboutSections: OrderedSection[];
  studioSections: OrderedSection[];
  pricingSections: OrderedSection[];
}

/** Partial message tree merged over next-intl JSON defaults */
export type SiteContentMessages = Record<string, unknown>;
