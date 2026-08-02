import type {
  BlogPost,
  BlogPostSummary,
  Locale,
  PricingPlan,
  Review,
  ScheduleSlot,
  Teacher,
  Weekday,
  YogaClass,
} from "@/domain/entities";
import type {
  ClassRepository,
  PostRepository,
  PricingPlanRepository,
  ReviewRepository,
  ScheduleSlotRepository,
  TeacherRepository,
} from "@/domain/repositories";

import classesData from "../data/classes.json";
import { lexicalFromParagraphs } from "../data/lexical";
import postsData from "../data/posts.json";
import pricingData from "../data/pricing-plans.json";
import reviewsData from "../data/reviews.json";
import scheduleData from "../data/schedule-slots.json";
import teachersData from "../data/teachers.json";

type Localized<T> = { es: T; en: T };

function pickLocale<T>(localized: Localized<T>, locale: Locale): T {
  return localized[locale] ?? localized.es;
}

export class JsonClassRepository implements ClassRepository {
  async findAll(locale: Locale): Promise<YogaClass[]> {
    return [...classesData]
      .sort((a, b) => a.order - b.order)
      .map((item, index) => {
        const copy = pickLocale(item, locale);
        return {
          id: String(index + 1),
          slug: item.slug,
          title: copy.title,
          description: copy.description,
          durationMin: item.durationMin,
          level: item.level as YogaClass["level"],
          imageUrl: item.imageUrl,
          order: item.order,
        };
      });
  }
}

export class JsonTeacherRepository implements TeacherRepository {
  async findAll(locale: Locale): Promise<Teacher[]> {
    return teachersData.map((item, index) => {
      const copy = pickLocale(item, locale);
      return {
        id: String(index + 1),
        slug: item.slug,
        name: item.name,
        role: copy.role,
        bio: copy.bio,
        imageUrl: item.imageUrl,
      };
    });
  }
}

export class JsonScheduleSlotRepository implements ScheduleSlotRepository {
  async findAll(locale: Locale): Promise<ScheduleSlot[]> {
    const classes = await new JsonClassRepository().findAll(locale);
    const bySlug = new Map(classes.map((c) => [c.slug, c]));

    return scheduleData.flatMap((item, index) => {
      const yogaClass = bySlug.get(item.classSlug);
      if (!yogaClass) return [];
      return [
        {
          id: String(index + 1),
          day: item.day as Weekday,
          time: item.time,
          className: yogaClass.title,
          classSlug: yogaClass.slug,
          durationMin: yogaClass.durationMin,
        },
      ];
    });
  }
}

export class JsonPricingPlanRepository implements PricingPlanRepository {
  async findAll(locale: Locale): Promise<PricingPlan[]> {
    return [...pricingData]
      .sort((a, b) => a.order - b.order)
      .map((item, index) => {
        const copy = pickLocale(item, locale);
        return {
          id: String(index + 1),
          slug: item.slug,
          name: copy.name,
          price: item.price,
          currency: item.currency,
          period: item.period as PricingPlan["period"],
          features: copy.features,
          featured: item.featured,
          order: item.order,
        };
      });
  }
}

export class JsonReviewRepository implements ReviewRepository {
  async findAll(locale: Locale): Promise<Review[]> {
    return reviewsData.map((item, index) => {
      const copy = pickLocale(item, locale);
      return {
        id: String(index + 1),
        author: item.author,
        context: copy.context,
        text: copy.text,
        rating: item.rating,
      };
    });
  }
}

export class JsonPostRepository implements PostRepository {
  async findVisible(locale: Locale): Promise<BlogPostSummary[]> {
    return postsData
      .filter((item) => item.visible)
      .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      .map((item, index) => {
        const copy = pickLocale(item, locale);
        return {
          id: String(index + 1),
          slug: item.slug,
          title: copy.title,
          excerpt: copy.excerpt,
          coverImageUrl: item.coverImageUrl,
          publishedAt: item.publishedAt,
          visible: item.visible,
        };
      });
  }

  async findBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
    const item = postsData.find((post) => post.slug === slug && post.visible);
    if (!item) return null;
    const copy = pickLocale(item, locale);
    return {
      id: item.slug,
      slug: item.slug,
      title: copy.title,
      excerpt: copy.excerpt,
      coverImageUrl: item.coverImageUrl,
      publishedAt: item.publishedAt,
      visible: item.visible,
      content: lexicalFromParagraphs(copy.paragraphs),
    };
  }
}
