import type { Locale } from "@/domain/entities";
import type { SiteContentMessages, SiteSettings } from "@/domain/site";

import {
  DEFAULT_ABOUT_SECTIONS,
  DEFAULT_BLOG_SECTIONS,
  DEFAULT_CLASSES_SECTIONS,
  DEFAULT_CONTACT_SECTIONS,
  DEFAULT_FOOTER_NAV,
  DEFAULT_FOOTER_SOCIAL,
  DEFAULT_LANDING_SECTIONS,
  DEFAULT_LANDING_STUDIO_CTAS,
  DEFAULT_PRICING_SECTIONS,
  DEFAULT_SCHEDULE_SECTIONS,
  DEFAULT_STUDIO_SECTIONS,
} from "../data/section-order-defaults";
import { injectSitePlaceholders } from "@/presentation/lib/inject-placeholders";

import siteContentData from "../data/site-content.json";
import siteSettingsData from "../data/site-settings.json";
import { mapSectionOrder } from "./mapSectionOrder";
import { mapSiteContentToMessages } from "./mapSiteContent";

export class JsonSiteRepository {
  async getSettings(locale: Locale): Promise<SiteSettings> {
    const teacherName = siteSettingsData.teacherName;
    const brandName = siteSettingsData.brandName;
    const taglineRaw =
      siteSettingsData.tagline[locale] ?? siteSettingsData.tagline.es;

    return {
      brandName,
      teacherName,
      logoText: siteSettingsData.logoText,
      tagline: injectSitePlaceholders(taglineRaw, { teacherName, brandName }),
      logoUrl: siteSettingsData.logoUrl,
      showLogoMark: siteSettingsData.showLogoMark,
      showLogoText: siteSettingsData.showLogoText,
      showTagline: siteSettingsData.showTagline,
      colors: siteSettingsData.colors,
      contact: {
        whatsappPhone: siteSettingsData.contact.whatsappPhone,
        whatsappDisplay: siteSettingsData.contact.whatsappDisplay,
        email: siteSettingsData.contact.email,
        address:
          siteSettingsData.contact.address[locale] ?? siteSettingsData.contact.address.es,
        instagram: siteSettingsData.contact.instagram,
        facebook: siteSettingsData.contact.facebook,
        spotify: siteSettingsData.contact.spotify,
      },
      images: {
        ...siteSettingsData.images,
        studioGallery: (siteSettingsData.images.studioGallery ?? []).map((item) => ({
          url: item.url,
          alt: item.alt ?? "",
          featured: Boolean(item.featured),
        })),
      },
      pages: siteSettingsData.pages,
      headerNav: siteSettingsData.headerNav,
      footerNav: mapSectionOrder(siteSettingsData.footerNav, DEFAULT_FOOTER_NAV),
      footerSocial: mapSectionOrder(siteSettingsData.footerSocial, DEFAULT_FOOTER_SOCIAL),
      landingSections: mapSectionOrder(
        siteSettingsData.landingSections,
        DEFAULT_LANDING_SECTIONS,
      ),
      landingStudioCtas: mapSectionOrder(
        siteSettingsData.landingStudioCtas,
        DEFAULT_LANDING_STUDIO_CTAS,
      ),
      aboutSections: mapSectionOrder(siteSettingsData.aboutSections, DEFAULT_ABOUT_SECTIONS),
      studioSections: mapSectionOrder(
        siteSettingsData.studioSections,
        DEFAULT_STUDIO_SECTIONS,
      ),
      pricingSections: mapSectionOrder(
        siteSettingsData.pricingSections,
        DEFAULT_PRICING_SECTIONS,
      ),
      classesSections: mapSectionOrder(
        siteSettingsData.classesSections,
        DEFAULT_CLASSES_SECTIONS,
      ),
      scheduleSections: mapSectionOrder(
        siteSettingsData.scheduleSections,
        DEFAULT_SCHEDULE_SECTIONS,
      ),
      contactSections: mapSectionOrder(
        siteSettingsData.contactSections,
        DEFAULT_CONTACT_SECTIONS,
      ),
      blogSections: mapSectionOrder(siteSettingsData.blogSections, DEFAULT_BLOG_SECTIONS),
    };
  }

  async getContentMessages(locale: Locale): Promise<SiteContentMessages> {
    const doc = siteContentData[locale] ?? siteContentData.es;
    return mapSiteContentToMessages(doc as Parameters<typeof mapSiteContentToMessages>[0]);
  }
}
