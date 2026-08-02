import type { Payload } from "payload";

import classesData from "../data/classes.json";
import teachersData from "../data/teachers.json";
import scheduleData from "../data/schedule-slots.json";
import pricingData from "../data/pricing-plans.json";
import reviewsData from "../data/reviews.json";
import postsData from "../data/posts.json";

function lexicalFromParagraphs(paragraphs: string[]) {
  return {
    root: {
      type: "root",
      format: "" as const,
      indent: 0,
      version: 1,
      direction: "ltr" as const,
      children: paragraphs.map((text) => ({
        type: "paragraph",
        format: "" as const,
        indent: 0,
        version: 1,
        direction: "ltr" as const,
        children: [
          {
            type: "text",
            detail: 0,
            format: 0,
            mode: "normal" as const,
            style: "",
            text,
            version: 1,
          },
        ],
      })),
    },
  };
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

/**
 * Seeds the CMS from the JSON files in `src/infrastructure/data/`.
 * Runs on init and is a no-op if content already exists.
 */
export async function seed(payload: Payload): Promise<void> {
  await seedPosts(payload);

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
