import type { SiteSettings } from "@/domain/site";
import { injectSitePlaceholders } from "@/presentation/lib/inject-placeholders";

import {
  DEFAULT_ABOUT_SECTIONS,
  DEFAULT_LANDING_SECTIONS,
  DEFAULT_LANDING_STUDIO_CTAS,
  DEFAULT_PRICING_SECTIONS,
  DEFAULT_STUDIO_SECTIONS,
} from "../data/section-order-defaults";
import siteSettingsData from "../data/site-settings.json";

const teacherName = siteSettingsData.teacherName;
const brandName = siteSettingsData.brandName;

export const DEFAULT_SITE_SETTINGS: SiteSettings = {
  brandName,
  teacherName,
  logoText: siteSettingsData.logoText,
  tagline: injectSitePlaceholders(siteSettingsData.tagline.es, {
    teacherName,
    brandName,
  }),
  logoUrl: siteSettingsData.logoUrl,
  showLogoMark: siteSettingsData.showLogoMark,
  showLogoText: siteSettingsData.showLogoText,
  showTagline: siteSettingsData.showTagline,
  colors: siteSettingsData.colors,
  contact: {
    whatsappPhone: siteSettingsData.contact.whatsappPhone,
    whatsappDisplay: siteSettingsData.contact.whatsappDisplay,
    email: siteSettingsData.contact.email,
    address: siteSettingsData.contact.address.es,
    instagram: siteSettingsData.contact.instagram,
    facebook: siteSettingsData.contact.facebook,
    spotify: siteSettingsData.contact.spotify,
  },
  images: siteSettingsData.images,
  pages: siteSettingsData.pages,
  headerNav: siteSettingsData.headerNav,
  footerNav: siteSettingsData.footerNav,
  footerSocial: siteSettingsData.footerSocial,
  landingSections: siteSettingsData.landingSections ?? DEFAULT_LANDING_SECTIONS,
  landingStudioCtas: siteSettingsData.landingStudioCtas ?? DEFAULT_LANDING_STUDIO_CTAS,
  aboutSections: siteSettingsData.aboutSections ?? DEFAULT_ABOUT_SECTIONS,
  studioSections: siteSettingsData.studioSections ?? DEFAULT_STUDIO_SECTIONS,
  pricingSections: siteSettingsData.pricingSections ?? DEFAULT_PRICING_SECTIONS,
};
