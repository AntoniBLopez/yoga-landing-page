import type { Locale } from "@/domain/entities";
import type { SiteContentMessages, SiteSettings } from "@/domain/site";
import { resolveImageUrl } from "@/infrastructure/repositories/media";

import {
  DEFAULT_ABOUT_SECTIONS,
  DEFAULT_LANDING_SECTIONS,
  DEFAULT_LANDING_STUDIO_CTAS,
  DEFAULT_PRICING_SECTIONS,
  DEFAULT_STUDIO_SECTIONS,
} from "../data/section-order-defaults";
import { getPayloadClient } from "../payload/client";
import { injectSitePlaceholders } from "@/presentation/lib/inject-placeholders";

import { mapSectionOrder } from "./mapSectionOrder";
import { mapSiteContentToMessages } from "./mapSiteContent";
import { DEFAULT_SITE_SETTINGS } from "./siteDefaults";

function asBool(value: boolean | null | undefined, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

export class PayloadSiteRepository {
  async getSettings(locale: Locale): Promise<SiteSettings> {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "site-settings",
      locale,
      depth: 1,
    });

    const defaults = DEFAULT_SITE_SETTINGS;
    const images = doc.images;
    const teacherName = doc.teacherName?.trim() || defaults.teacherName;
    const brandName = doc.brandName?.trim() || defaults.brandName;
    const nameVars = { teacherName, brandName };

    // Legacy FAQ toggle → pricingSections.faq visibility when array is empty/missing
    const pricingSections = mapSectionOrder(doc.pricingSections, DEFAULT_PRICING_SECTIONS);
    if (
      !Array.isArray(doc.pricingSections) &&
      typeof (doc as { showPricingFaq?: boolean }).showPricingFaq === "boolean"
    ) {
      const faqVisible = (doc as { showPricingFaq?: boolean }).showPricingFaq !== false;
      for (const section of pricingSections) {
        if (section.id === "faq") section.visible = faqVisible;
      }
    }

    return {
      brandName,
      teacherName,
      logoText: doc.logoText?.trim() || defaults.logoText,
      tagline: injectSitePlaceholders(
        doc.tagline?.trim() || defaults.tagline,
        nameVars,
      ),
      logoUrl: resolveImageUrl(doc.logo, doc.logoUrl) || defaults.logoUrl,
      showLogoMark: asBool(doc.showLogoMark, defaults.showLogoMark),
      showLogoText: asBool(doc.showLogoText, defaults.showLogoText),
      showTagline: asBool(doc.showTagline, defaults.showTagline),
      colors: {
        deep: doc.colors?.deep || defaults.colors.deep,
        deepDark: doc.colors?.deepDark || defaults.colors.deepDark,
        teal: doc.colors?.teal || defaults.colors.teal,
        tealDark: doc.colors?.tealDark || defaults.colors.tealDark,
        aqua: doc.colors?.aqua || defaults.colors.aqua,
        sky: doc.colors?.sky || defaults.colors.sky,
        sand: doc.colors?.sand || defaults.colors.sand,
        linen: doc.colors?.linen || defaults.colors.linen,
        wood: doc.colors?.wood || defaults.colors.wood,
        ink: doc.colors?.ink || defaults.colors.ink,
      },
      contact: {
        whatsappPhone: doc.contact?.whatsappPhone || defaults.contact.whatsappPhone,
        whatsappDisplay: doc.contact?.whatsappDisplay || defaults.contact.whatsappDisplay,
        email: doc.contact?.email || defaults.contact.email,
        address: doc.contact?.address?.trim() || defaults.contact.address,
        instagram: doc.contact?.instagram || defaults.contact.instagram,
        facebook: doc.contact?.facebook || defaults.contact.facebook,
        spotify: doc.contact?.spotify || defaults.contact.spotify,
      },
      images: {
        heroUrl:
          resolveImageUrl(images?.hero, images?.heroUrl) || defaults.images.heroUrl,
        studioUrl:
          resolveImageUrl(images?.studio, images?.studioUrl) || defaults.images.studioUrl,
        contactUrl:
          resolveImageUrl(images?.contact, images?.contactUrl) || defaults.images.contactUrl,
        studioGallery: (() => {
          const fromCms = (doc.studioGallery ?? [])
            .map((item) => {
              const url = resolveImageUrl(item?.image, item?.imageUrl);
              if (!url) return null;
              return {
                url,
                alt: item?.alt?.trim() || "",
                featured: Boolean(item?.featured),
              };
            })
            .filter((item): item is { url: string; alt: string; featured: boolean } =>
              Boolean(item),
            );
          return fromCms.length > 0 ? fromCms : defaults.images.studioGallery;
        })(),
      },
      pages: {
        classes: asBool(doc.pages?.classes, defaults.pages.classes),
        schedule: asBool(doc.pages?.schedule, defaults.pages.schedule),
        studio: asBool(doc.pages?.studio, defaults.pages.studio),
        about: asBool(doc.pages?.about, defaults.pages.about),
        blog: asBool(doc.pages?.blog, defaults.pages.blog),
        pricing: asBool(doc.pages?.pricing, defaults.pages.pricing),
        contact: asBool(doc.pages?.contact, defaults.pages.contact),
      },
      headerNav: {
        home: asBool(doc.headerNav?.home, defaults.headerNav.home),
        classes: asBool(doc.headerNav?.classes, defaults.headerNav.classes),
        schedule: asBool(doc.headerNav?.schedule, defaults.headerNav.schedule),
        studio: asBool(doc.headerNav?.studio, defaults.headerNav.studio),
        about: asBool(doc.headerNav?.about, defaults.headerNav.about),
        blog: asBool(doc.headerNav?.blog, defaults.headerNav.blog),
        pricing: asBool(doc.headerNav?.pricing, defaults.headerNav.pricing),
        contact: asBool(doc.headerNav?.contact, defaults.headerNav.contact),
        cta: asBool(doc.headerNav?.cta, defaults.headerNav.cta),
      },
      footerNav: {
        classes: asBool(doc.footerNav?.classes, defaults.footerNav.classes),
        schedule: asBool(doc.footerNav?.schedule, defaults.footerNav.schedule),
        studio: asBool(doc.footerNav?.studio, defaults.footerNav.studio),
        about: asBool(doc.footerNav?.about, defaults.footerNav.about),
        blog: asBool(doc.footerNav?.blog, defaults.footerNav.blog),
        pricing: asBool(doc.footerNav?.pricing, defaults.footerNav.pricing),
        contact: asBool(doc.footerNav?.contact, defaults.footerNav.contact),
      },
      footerSocial: {
        facebook: asBool(doc.footerSocial?.facebook, defaults.footerSocial.facebook),
        instagram: asBool(doc.footerSocial?.instagram, defaults.footerSocial.instagram),
        email: asBool(doc.footerSocial?.email, defaults.footerSocial.email),
        whatsapp: asBool(doc.footerSocial?.whatsapp, defaults.footerSocial.whatsapp),
        spotify: asBool(doc.footerSocial?.spotify, defaults.footerSocial.spotify),
      },
      landingSections: mapSectionOrder(doc.landingSections, DEFAULT_LANDING_SECTIONS),
      landingStudioCtas: mapSectionOrder(doc.landingStudioCtas, DEFAULT_LANDING_STUDIO_CTAS),
      aboutSections: mapSectionOrder(doc.aboutSections, DEFAULT_ABOUT_SECTIONS),
      studioSections: mapSectionOrder(doc.studioSections, DEFAULT_STUDIO_SECTIONS),
      pricingSections,
    };
  }

  async getContentMessages(locale: Locale): Promise<SiteContentMessages> {
    const payload = await getPayloadClient();
    const doc = await payload.findGlobal({
      slug: "site-content",
      locale,
      depth: 0,
    });
    return mapSiteContentToMessages({
      ...doc,
      aboutPage:
        doc.aboutPage && typeof doc.aboutPage === "object" && !Array.isArray(doc.aboutPage)
          ? (doc.aboutPage as Record<string, unknown>)
          : null,
      pageMeta:
        doc.pageMeta && typeof doc.pageMeta === "object" && !Array.isArray(doc.pageMeta)
          ? (doc.pageMeta as Record<string, unknown>)
          : null,
    });
  }
}
