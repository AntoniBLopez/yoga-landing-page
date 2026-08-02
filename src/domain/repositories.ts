import type {
  BlogPost,
  BlogPostSummary,
  Locale,
  PricingPlan,
  Review,
  ScheduleSlot,
  Teacher,
  YogaClass,
} from "./entities";

/**
 * Repository contracts (ports). Implemented in the infrastructure layer.
 */

export interface ClassRepository {
  findAll(locale: Locale): Promise<YogaClass[]>;
}

export interface TeacherRepository {
  findAll(locale: Locale): Promise<Teacher[]>;
}

export interface ScheduleSlotRepository {
  findAll(locale: Locale): Promise<ScheduleSlot[]>;
}

export interface PricingPlanRepository {
  findAll(locale: Locale): Promise<PricingPlan[]>;
}

export interface ReviewRepository {
  findAll(locale: Locale): Promise<Review[]>;
}

export interface PostRepository {
  findVisible(locale: Locale): Promise<BlogPostSummary[]>;
  findBySlug(slug: string, locale: Locale): Promise<BlogPost | null>;
}
