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

const needsSections = (value: unknown) =>
  !Array.isArray(value) || value.length === 0;

async function updatePageLocales(
  payload: Payload,
  slug: string,
  es: Record<string, unknown>,
  en: Record<string, unknown>,
): Promise<void> {
  await payload.updateGlobal({ slug: slug as never, locale: "es", data: es as never });
  await payload.updateGlobal({ slug: slug as never, locale: "en", data: en as never });
}

function sharedSiteContent(locale: "es" | "en") {
  const data = siteContentData[locale];
  return {
    meta: data.meta,
    nav: data.nav,
    reviews: data.reviews,
    footer: data.footer,
    pageMeta: data.pageMeta,
  };
}

function aboutPageSeed(locale: "es" | "en", sections?: Array<{ id: string; visible?: boolean }>) {
  const data = siteContentData[locale];
  return {
    sections: toCmsSections(sections ?? siteSettingsData.aboutSections),
    about: data.about,
    ...data.aboutPage,
  };
}

async function seedPageGlobals(payload: Payload): Promise<void> {
  const es = siteContentData.es;
  const en = siteContentData.en;

  await updatePageLocales(
    payload,
    "home-page-content",
    {
      sections: toCmsSections(siteSettingsData.landingSections),
      studioCtas: toCmsSections(siteSettingsData.landingStudioCtas),
      hero: es.hero,
      features: es.features,
      quote: es.quote,
    },
    {
      sections: toCmsSections(siteSettingsData.landingSections),
      studioCtas: toCmsSections(siteSettingsData.landingStudioCtas),
      hero: en.hero,
      features: en.features,
      quote: en.quote,
    },
  );

  await updatePageLocales(
    payload,
    "about-page-content",
    aboutPageSeed("es"),
    aboutPageSeed("en"),
  );

  await updatePageLocales(
    payload,
    "studio-page-content",
    {
      sections: toCmsSections(siteSettingsData.studioSections),
      studio: es.studio,
    },
    {
      sections: toCmsSections(siteSettingsData.studioSections),
      studio: en.studio,
    },
  );

  await updatePageLocales(
    payload,
    "pricing-page-content",
    {
      sections: toCmsSections(siteSettingsData.pricingSections),
      pricing: es.pricing,
    },
    {
      sections: toCmsSections(siteSettingsData.pricingSections),
      pricing: en.pricing,
    },
  );

  await updatePageLocales(
    payload,
    "classes-page-content",
    {
      sections: toCmsSections(siteSettingsData.classesSections),
      classes: es.classes,
    },
    {
      sections: toCmsSections(siteSettingsData.classesSections),
      classes: en.classes,
    },
  );

  await updatePageLocales(
    payload,
    "schedule-page-content",
    {
      sections: toCmsSections(siteSettingsData.scheduleSections),
      schedule: es.schedule,
    },
    {
      sections: toCmsSections(siteSettingsData.scheduleSections),
      schedule: en.schedule,
    },
  );

  await updatePageLocales(
    payload,
    "contact-page-content",
    {
      sections: toCmsSections(siteSettingsData.contactSections),
      contact: es.contact,
    },
    {
      sections: toCmsSections(siteSettingsData.contactSections),
      contact: en.contact,
    },
  );

  await updatePageLocales(
    payload,
    "blog-page-content",
    {
      sections: toCmsSections(siteSettingsData.blogSections),
      blog: es.blog,
    },
    {
      sections: toCmsSections(siteSettingsData.blogSections),
      blog: en.blog,
    },
  );
}

async function backfillPageGlobals(payload: Payload): Promise<void> {
  const settings = await payload.findGlobal({ slug: "site-settings", locale: "es" });
  const legacy = settings as {
    landingSections?: unknown;
    landingStudioCtas?: unknown;
    aboutSections?: unknown;
    studioSections?: unknown;
    pricingSections?: unknown;
  };

  const home = await payload.findGlobal({ slug: "home-page-content", locale: "es" });
  if (needsSections(home.sections) || !home.hero?.title) {
    payload.logger.info("Backfilling home-page-content ...");
    const featuresEs = siteContentData.es.features;
    await payload.updateGlobal({
      slug: "home-page-content",
      locale: "es",
      data: {
        sections: toCmsSections(
          (legacy.landingSections as typeof siteSettingsData.landingSections) ??
            siteSettingsData.landingSections,
        ),
        studioCtas: toCmsSections(
          (legacy.landingStudioCtas as typeof siteSettingsData.landingStudioCtas) ??
            siteSettingsData.landingStudioCtas,
        ),
        hero: siteContentData.es.hero,
        features: featuresEs,
        quote: siteContentData.es.quote,
      } as never,
    });
    const homeEs = await payload.findGlobal({ slug: "home-page-content", locale: "es" });
    const rows = homeEs.features ?? [];
    await payload.updateGlobal({
      slug: "home-page-content",
      locale: "en",
      data: {
        sections: toCmsSections(siteSettingsData.landingSections),
        studioCtas: toCmsSections(siteSettingsData.landingStudioCtas),
        hero: siteContentData.en.hero,
        features: siteContentData.en.features.map((item, index) => ({
          id: rows[index]?.id,
          icon: item.icon,
          title: item.title,
          text: item.text,
        })),
        quote: siteContentData.en.quote,
      } as never,
    });
  }

  const about = await payload.findGlobal({ slug: "about-page-content", locale: "es" });
  if (needsSections(about.sections) || !about.story?.title) {
    payload.logger.info("Backfilling about-page-content ...");
    await updatePageLocales(
      payload,
      "about-page-content",
      aboutPageSeed(
        "es",
        (legacy.aboutSections as typeof siteSettingsData.aboutSections) ??
          siteSettingsData.aboutSections,
      ),
      aboutPageSeed("en"),
    );
  }

  const studio = await payload.findGlobal({ slug: "studio-page-content", locale: "es" });
  if (needsSections(studio.sections) || !studio.studio?.title) {
    payload.logger.info("Backfilling studio-page-content ...");
    await updatePageLocales(
      payload,
      "studio-page-content",
      {
        sections: toCmsSections(
          (legacy.studioSections as typeof siteSettingsData.studioSections) ??
            siteSettingsData.studioSections,
        ),
        studio: siteContentData.es.studio,
      },
      {
        sections: toCmsSections(siteSettingsData.studioSections),
        studio: siteContentData.en.studio,
      },
    );
  }

  const pricing = await payload.findGlobal({ slug: "pricing-page-content", locale: "es" });
  if (needsSections(pricing.sections) || !pricing.pricing?.title) {
    payload.logger.info("Backfilling pricing-page-content ...");
    await updatePageLocales(
      payload,
      "pricing-page-content",
      {
        sections: toCmsSections(
          (legacy.pricingSections as typeof siteSettingsData.pricingSections) ??
            siteSettingsData.pricingSections,
        ),
        pricing: siteContentData.es.pricing,
      },
      {
        sections: toCmsSections(siteSettingsData.pricingSections),
        pricing: siteContentData.en.pricing,
      },
    );
  }

  const classes = await payload.findGlobal({ slug: "classes-page-content", locale: "es" });
  if (needsSections(classes.sections) || !classes.classes?.title) {
    await updatePageLocales(
      payload,
      "classes-page-content",
      {
        sections: toCmsSections(siteSettingsData.classesSections),
        classes: siteContentData.es.classes,
      },
      {
        sections: toCmsSections(siteSettingsData.classesSections),
        classes: siteContentData.en.classes,
      },
    );
  }

  const schedule = await payload.findGlobal({ slug: "schedule-page-content", locale: "es" });
  if (needsSections(schedule.sections) || !schedule.schedule?.title) {
    await updatePageLocales(
      payload,
      "schedule-page-content",
      {
        sections: toCmsSections(siteSettingsData.scheduleSections),
        schedule: siteContentData.es.schedule,
      },
      {
        sections: toCmsSections(siteSettingsData.scheduleSections),
        schedule: siteContentData.en.schedule,
      },
    );
  }

  const contact = await payload.findGlobal({ slug: "contact-page-content", locale: "es" });
  if (needsSections(contact.sections) || !contact.contact?.title) {
    await updatePageLocales(
      payload,
      "contact-page-content",
      {
        sections: toCmsSections(siteSettingsData.contactSections),
        contact: siteContentData.es.contact,
      },
      {
        sections: toCmsSections(siteSettingsData.contactSections),
        contact: siteContentData.en.contact,
      },
    );
  }

  const blog = await payload.findGlobal({ slug: "blog-page-content", locale: "es" });
  if (needsSections(blog.sections) || !blog.blog?.title) {
    await updatePageLocales(
      payload,
      "blog-page-content",
      {
        sections: toCmsSections(siteSettingsData.blogSections),
        blog: siteContentData.es.blog,
      },
      {
        sections: toCmsSections(siteSettingsData.blogSections),
        blog: siteContentData.en.blog,
      },
    );
  }
}

async function seedGlobals(payload: Payload): Promise<void> {
  const shared = await payload.findGlobal({ slug: "site-content", locale: "es" });
  const home = await payload.findGlobal({ slug: "home-page-content", locale: "es" });

  // Existing installs: migrate/backfill page globals + site chrome
  if (shared.meta?.title || home.hero?.title) {
    await backfillPageGlobals(payload);

    const settings = await payload.findGlobal({ slug: "site-settings", locale: "es" });
    const patch: Record<string, unknown> = {};

    if (!settings.teacherName?.trim()) {
      patch.teacherName = siteSettingsData.teacherName;
    }

    if (!settings.studioGallery?.length) {
      patch.studioGallery = siteSettingsData.images.studioGallery.map((item) => ({
        imageUrl: item.url,
        alt: item.alt,
        featured: item.featured,
      }));
    }

    if (!settings.headerNav || typeof settings.headerNav !== "object") {
      patch.headerNav = siteSettingsData.headerNav;
      patch.pages = { ...(settings.pages ?? {}), studio: true };
    }
    if (needsSections(settings.footerNav)) {
      patch.footerNav = toCmsSections(siteSettingsData.footerNav);
    }
    if (needsSections(settings.footerSocial)) {
      patch.footerSocial = toCmsSections(siteSettingsData.footerSocial);
    }

    if (
      typeof settings.tagline === "string" &&
      settings.tagline.includes("Cyane") &&
      !settings.tagline.includes("{teacherName}")
    ) {
      patch.tagline = siteSettingsData.tagline.es;
    }

    if (Object.keys(patch).length > 0) {
      payload.logger.info("Backfilling site settings ...");
      await payload.updateGlobal({
        slug: "site-settings",
        locale: "es",
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

    // Keep shared chrome populated even after page-field split
    if (!shared.meta?.title) {
      await updatePageLocales(
        payload,
        "site-content",
        sharedSiteContent("es"),
        sharedSiteContent("en"),
      );
    }

    return;
  }

  payload.logger.info("Seeding site settings & page content globals ...");

  const {
    tagline,
    contact: { address, ...contactRest },
    images,
    landingSections: _landingSections,
    landingStudioCtas: _landingStudioCtas,
    aboutSections: _aboutSections,
    studioSections: _studioSections,
    pricingSections: _pricingSections,
    classesSections: _classesSections,
    scheduleSections: _scheduleSections,
    contactSections: _contactSections,
    blogSections: _blogSections,
    footerNav,
    footerSocial,
    ...settingsRest
  } = siteSettingsData;

  await payload.updateGlobal({
    slug: "site-settings",
    locale: "es",
    data: {
      ...settingsRest,
      footerNav: toCmsSections(footerNav),
      footerSocial: toCmsSections(footerSocial),
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

  await updatePageLocales(
    payload,
    "site-content",
    sharedSiteContent("es"),
    sharedSiteContent("en"),
  );

  await seedPageGlobals(payload);
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
