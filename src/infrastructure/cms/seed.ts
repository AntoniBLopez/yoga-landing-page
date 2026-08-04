import type { Payload } from "payload";

import classesData from "../data/classes.json";
import faqsData from "../data/faqs.json";
import { lexicalFromParagraphs } from "../data/lexical";
import postsData from "../data/posts.json";
import pricingData from "../data/pricing-plans.json";
import reviewsData from "../data/reviews.json";
import scheduleData from "../data/schedule-slots.json";
import siteContentData from "../data/site-content.json";
import siteSettingsData from "../data/site-settings.json";
import teachersData from "../data/teachers.json";

/** JSON uses `{ id, visible }`; Payload array field is named `section` (not `id`). */
function toCmsSections(
  items: Array<{ id: string; visible?: boolean }> | undefined,
): Array<{ section: string; visible: boolean }> | undefined {
  if (!items) return undefined;
  return items.map((item) => ({
    section: item.id,
    visible: item.visible !== false,
  }));
}

async function seedPosts(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.count({ collection: "posts" });
  if (totalDocs > 0) return;

  payload.logger.info("Seeding blog posts ...");

  for (const item of postsData) {
    const doc = await payload.create({
      collection: "posts",
      locale: "es",
      data: {
        slug: item.slug,
        title: item.es.title,
        excerpt: item.es.excerpt,
        coverImageUrl: item.coverImageUrl,
        content: lexicalFromParagraphs(item.es.paragraphs),
        visible: item.visible,
        publishedAt: item.publishedAt,
      },
    });
    await payload.update({
      collection: "posts",
      id: doc.id,
      locale: "en",
      data: {
        title: item.en.title,
        excerpt: item.en.excerpt,
        content: lexicalFromParagraphs(item.en.paragraphs),
      },
    });
  }
}

async function seedFaqs(payload: Payload): Promise<void> {
  const { totalDocs } = await payload.count({ collection: "faqs" });
  if (totalDocs > 0) return;

  payload.logger.info("Seeding FAQs ...");

  for (const item of faqsData) {
    const doc = await payload.create({
      collection: "faqs",
      locale: "es",
      data: {
        question: item.es.question,
        answer: item.es.answer,
        visible: item.visible,
        order: item.order,
      },
    });
    await payload.update({
      collection: "faqs",
      id: doc.id,
      locale: "en",
      data: {
        question: item.en.question,
        answer: item.en.answer,
      },
    });
  }
}

async function seedGlobals(payload: Payload): Promise<void> {
  const existing = await payload.findGlobal({ slug: "site-content", locale: "es" });

  // Existing installs: backfill studio page copy + gallery if missing
  if (existing.hero?.title) {
    if (!existing.studio?.rental?.title) {
      payload.logger.info("Backfilling studio page content ...");
      await payload.updateGlobal({
        slug: "site-content",
        locale: "es",
        data: { studio: siteContentData.es.studio },
      });
      await payload.updateGlobal({
        slug: "site-content",
        locale: "en",
        data: { studio: siteContentData.en.studio },
      });
    }

    // Migrate aboutPage from legacy JSON blob → structured groups
    const aboutPage = existing.aboutPage as
      | { story?: { title?: string | null } }
      | null
      | undefined;
    if (!aboutPage?.story?.title) {
      payload.logger.info("Backfilling structured about page content ...");
      await payload.updateGlobal({
        slug: "site-content",
        locale: "es",
        data: { aboutPage: siteContentData.es.aboutPage } as never,
      });
      await payload.updateGlobal({
        slug: "site-content",
        locale: "en",
        data: { aboutPage: siteContentData.en.aboutPage } as never,
      });
    }

    const settings = await payload.findGlobal({ slug: "site-settings", locale: "es" });
    const patch: Record<string, unknown> = {};
    let refreshSiteContent = false;

    if (!settings.teacherName?.trim()) {
      patch.teacherName = siteSettingsData.teacherName;
      refreshSiteContent = true;
    }

    if (!settings.studioGallery?.length) {
      patch.studioGallery = siteSettingsData.images.studioGallery.map((item) => ({
        imageUrl: item.url,
        alt: item.alt,
        featured: item.featured,
      }));
    }

    // Migrate legacy boolean section maps → ordered arrays
    if (!Array.isArray(settings.landingSections)) {
      patch.landingSections = toCmsSections(siteSettingsData.landingSections);
    }
    if (!Array.isArray(settings.landingStudioCtas)) {
      patch.landingStudioCtas = toCmsSections(siteSettingsData.landingStudioCtas);
    }
    if (!settings.headerNav || typeof settings.headerNav !== "object") {
      patch.headerNav = siteSettingsData.headerNav;
      // Page available; header link off by default (from JSON)
      patch.pages = { ...(settings.pages ?? {}), studio: true };
    }
    if (!settings.footerNav || typeof settings.footerNav !== "object") {
      patch.footerNav = siteSettingsData.footerNav;
    }
    if (!settings.footerSocial || typeof settings.footerSocial !== "object") {
      patch.footerSocial = siteSettingsData.footerSocial;
    }
    if (!Array.isArray(settings.aboutSections)) {
      patch.aboutSections = toCmsSections(siteSettingsData.aboutSections);
    }
    if (!Array.isArray(settings.studioSections)) {
      patch.studioSections = toCmsSections(siteSettingsData.studioSections);
    }
    if (!Array.isArray(settings.pricingSections)) {
      patch.pricingSections = toCmsSections(siteSettingsData.pricingSections);
    }

    // Prefer placeholder taglines so teacherName can drive copy from admin
    if (
      typeof settings.tagline === "string" &&
      settings.tagline.includes("Cyane") &&
      !settings.tagline.includes("{teacherName}")
    ) {
      patch.tagline = siteSettingsData.tagline.es;
    }

    if (Object.keys(patch).length > 0) {
      payload.logger.info("Backfilling site settings (teacherName / sections / gallery) ...");
      await payload.updateGlobal({
        slug: "site-settings",
        locale: "es",
        // JSON seed shape is compatible at runtime; cast for Payload generated types
        data: patch as never,
      });
      if (patch.studioGallery || patch.tagline) {
        await payload.updateGlobal({
          slug: "site-settings",
          locale: "en",
          data: {
            ...(patch.studioGallery ? { studioGallery: patch.studioGallery } : {}),
            ...(patch.tagline ? { tagline: siteSettingsData.tagline.en } : {}),
          } as never,
        });
      }
    }

    if (refreshSiteContent) {
      payload.logger.info(
        "Refreshing site content with {teacherName} placeholders ...",
      );
      await payload.updateGlobal({
        slug: "site-content",
        locale: "es",
        data: siteContentData.es,
      });
      await payload.updateGlobal({
        slug: "site-content",
        locale: "en",
        data: siteContentData.en,
      });
    }
    return;
  }

  payload.logger.info("Seeding site settings & content globals ...");

  const {
    tagline,
    contact: { address, ...contactRest },
    images,
    landingSections,
    landingStudioCtas,
    aboutSections,
    studioSections,
    pricingSections,
    ...settingsRest
  } = siteSettingsData;

  await payload.updateGlobal({
    slug: "site-settings",
    locale: "es",
    data: {
      ...settingsRest,
      landingSections: toCmsSections(landingSections),
      landingStudioCtas: toCmsSections(landingStudioCtas),
      aboutSections: toCmsSections(aboutSections),
      studioSections: toCmsSections(studioSections),
      pricingSections: toCmsSections(pricingSections),
      tagline: tagline.es,
      contact: { ...contactRest, address: address.es },
      images: {
        heroUrl: images.heroUrl,
        studioUrl: images.studioUrl,
        contactUrl: images.contactUrl,
      },
      studioGallery: images.studioGallery.map((item) => ({
        imageUrl: item.url,
        alt: item.alt,
        featured: item.featured,
      })),
    } as never,
  });
  await payload.updateGlobal({
    slug: "site-settings",
    locale: "en",
    data: {
      tagline: tagline.en,
      contact: { address: address.en },
      studioGallery: images.studioGallery.map((item) => ({
        imageUrl: item.url,
        alt: item.alt,
        featured: item.featured,
      })),
    } as never,
  });

  await payload.updateGlobal({
    slug: "site-content",
    locale: "es",
    data: siteContentData.es,
  });
  await payload.updateGlobal({
    slug: "site-content",
    locale: "en",
    data: siteContentData.en,
  });
}

/**
 * Seeds the CMS from the JSON files in `src/infrastructure/data/`.
 * Runs on init and is a no-op if content already exists.
 */
export async function seed(payload: Payload): Promise<void> {
  await seedPosts(payload);
  await seedFaqs(payload);
  await seedGlobals(payload);

  const { totalDocs } = await payload.count({ collection: "classes" });
  if (totalDocs > 0) return;

  payload.logger.info("Seeding initial content from src/infrastructure/data ...");

  const classIds: Record<string, number> = {};
  for (const item of classesData) {
    const doc = await payload.create({
      collection: "classes",
      locale: "es",
      data: {
        slug: item.slug,
        title: item.es.title,
        description: item.es.description,
        durationMin: item.durationMin,
        level: item.level as "all" | "beginner" | "intermediate",
        imageUrl: item.imageUrl,
        visible: item.visible !== false,
        order: item.order,
      },
    });
    await payload.update({
      collection: "classes",
      id: doc.id,
      locale: "en",
      data: {
        title: item.en.title,
        description: item.en.description,
      },
    });
    classIds[item.slug] = doc.id;
  }

  const teacherIds: Record<string, number> = {};
  for (const item of teachersData) {
    const doc = await payload.create({
      collection: "teachers",
      locale: "es",
      data: {
        slug: item.slug,
        name: item.name,
        role: item.es.role,
        bio: item.es.bio,
        imageUrl: item.imageUrl,
      },
    });
    await payload.update({
      collection: "teachers",
      id: doc.id,
      locale: "en",
      data: {
        role: item.en.role,
        bio: item.en.bio,
      },
    });
    teacherIds[item.slug] = doc.id;
  }

  for (const item of scheduleData) {
    await payload.create({
      collection: "schedule-slots",
      data: {
        day: item.day as
          | "monday"
          | "tuesday"
          | "wednesday"
          | "thursday"
          | "friday"
          | "saturday"
          | "sunday",
        time: item.time,
        class: classIds[item.classSlug],
        teacher: teacherIds[item.teacherSlug],
        visible: item.visible !== false,
      },
    });
  }

  for (const item of pricingData) {
    const doc = await payload.create({
      collection: "pricing-plans",
      locale: "es",
      data: {
        slug: item.slug,
        name: item.es.name,
        price: item.price,
        currency: item.currency,
        period: item.period as "single" | "monthly",
        features: item.es.features.map((text) => ({ text })),
        featured: item.featured,
        visible: item.visible !== false,
        order: item.order,
      },
    });
    await payload.update({
      collection: "pricing-plans",
      id: doc.id,
      locale: "en",
      data: {
        name: item.en.name,
        features: item.en.features.map((text) => ({ text })),
      },
    });
  }

  for (const item of reviewsData) {
    const doc = await payload.create({
      collection: "reviews",
      locale: "es",
      data: {
        author: item.author,
        rating: item.rating,
        context: item.es.context,
        text: item.es.text,
      },
    });
    await payload.update({
      collection: "reviews",
      id: doc.id,
      locale: "en",
      data: {
        context: item.en.context,
        text: item.en.text,
      },
    });
  }

  payload.logger.info("Seed completed.");
}
