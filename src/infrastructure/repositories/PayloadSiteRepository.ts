import type { Locale } from "@/domain/entities";
import type { SiteContentMessages, SiteSettings } from "@/domain/site";
import { injectSitePlaceholders } from "@/presentation/lib/inject-placeholders";
import { resolveImageUrl } from "@/infrastructure/repositories/media";

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
import { getPayloadClient } from "../payload/client";

import { mapSectionOrder } from "./mapSectionOrder";
import { mapSiteContentToMessages } from "./mapSiteContent";
import { DEFAULT_SITE_SETTINGS } from "./siteDefaults";

function asBool(value: boolean | null | undefined, fallback: boolean): boolean {
  return typeof value === "boolean" ? value : fallback;
}

const ABOUT_PAGE_KEYS = [
  "story",
  "philosophy",
  "training",
  "values",
  "offMat",
  "cta",
] as const;

export class PayloadSiteRepository {
  async getSettings(locale: Locale): Promise<SiteSettings> {
    const payload = await getPayloadClient();
    const [
      doc,
      home,
      about,
      studio,
      pricing,
      classes,
      schedule,
      contact,
      blog,
    ] = await Promise.all([
      payload.findGlobal({ slug: "site-settings", locale, depth: 1 }),
      payload.findGlobal({ slug: "home-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "about-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "studio-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "pricing-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "classes-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "schedule-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "contact-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "blog-page-content", locale, depth: 0 }),
    ]);

    const defaults = DEFAULT_SITE_SETTINGS;
    const images = doc.images;
    const teacherName = doc.teacherName?.trim() || defaults.teacherName;
    const brandName = doc.brandName?.trim() || defaults.brandName;
    const nameVars = { teacherName, brandName };

    const legacy = doc as {
      landingSections?: unknown;
      landingStudioCtas?: unknown;
      aboutSections?: unknown;
      studioSections?: unknown;
      pricingSections?: unknown;
      showPricingFaq?: boolean;
    };

    const pricingSections = mapSectionOrder(
      pricing.sections ?? legacy.pricingSections,
      DEFAULT_PRICING_SECTIONS,
    );
    if (
      !Array.isArray(pricing.sections) &&
      !Array.isArray(legacy.pricingSections) &&
      typeof legacy.showPricingFaq === "boolean"
    ) {
      const faqVisible = legacy.showPricingFaq !== false;
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
      footerNav: mapSectionOrder(doc.footerNav, DEFAULT_FOOTER_NAV),
      footerSocial: mapSectionOrder(doc.footerSocial, DEFAULT_FOOTER_SOCIAL),
      landingSections: mapSectionOrder(
        home.sections ?? legacy.landingSections,
        DEFAULT_LANDING_SECTIONS,
      ),
      landingStudioCtas: mapSectionOrder(
        home.studioCtas ?? legacy.landingStudioCtas,
        DEFAULT_LANDING_STUDIO_CTAS,
      ),
      aboutSections: mapSectionOrder(
        about.sections ?? legacy.aboutSections,
        DEFAULT_ABOUT_SECTIONS,
      ),
      studioSections: mapSectionOrder(
        studio.sections ?? legacy.studioSections,
        DEFAULT_STUDIO_SECTIONS,
      ),
      pricingSections,
      classesSections: mapSectionOrder(classes.sections, DEFAULT_CLASSES_SECTIONS),
      scheduleSections: mapSectionOrder(schedule.sections, DEFAULT_SCHEDULE_SECTIONS),
      contactSections: mapSectionOrder(contact.sections, DEFAULT_CONTACT_SECTIONS),
      blogSections: mapSectionOrder(blog.sections, DEFAULT_BLOG_SECTIONS),
    };
  }

  async getContentMessages(locale: Locale): Promise<SiteContentMessages> {
    const payload = await getPayloadClient();
    const [
      shared,
      home,
      about,
      studio,
      pricing,
      classes,
      schedule,
      contact,
      blog,
    ] = await Promise.all([
      payload.findGlobal({ slug: "site-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "home-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "about-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "studio-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "pricing-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "classes-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "schedule-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "contact-page-content", locale, depth: 0 }),
      payload.findGlobal({ slug: "blog-page-content", locale, depth: 0 }),
    ]);

    const aboutPage: Record<string, unknown> = {};
    for (const key of ABOUT_PAGE_KEYS) {
      const value = about[key];
      if (value) aboutPage[key] = value;
    }

    return mapSiteContentToMessages({
      meta: shared.meta,
      nav: shared.nav,
      reviews: shared.reviews,
      footer: shared.footer,
      pageMeta:
        shared.pageMeta && typeof shared.pageMeta === "object" && !Array.isArray(shared.pageMeta)
          ? (shared.pageMeta as Record<string, unknown>)
          : null,
      hero: home.hero,
      features: home.features,
      quote: home.quote,
      studio: studio.studio,
      pricing: pricing.pricing,
      classes: classes.classes,
      schedule: schedule.schedule,
      contact: contact.contact,
      blog: blog.blog,
      about: about.about,
      aboutPage: Object.keys(aboutPage).length ? aboutPage : null,
    });
  }
}
