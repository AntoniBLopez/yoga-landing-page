/**
 * Domain entities of the yoga studio.
 * Pure types with no dependency on Payload, Next.js or any infrastructure.
 */

export type Locale = "es" | "en";

export type ClassLevel = "all" | "beginner" | "intermediate";

export interface YogaClass {
  id: string;
  slug: string;
  title: string;
  description: string;
  durationMin: number;
  level: ClassLevel;
  imageUrl: string;
  order: number;
}

export interface Teacher {
  id: string;
  slug: string;
  name: string;
  role: string;
  bio: string;
  imageUrl: string;
}

export type Weekday =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export interface ScheduleSlot {
  id: string;
  day: Weekday;
  /** 24h format, e.g. "09:30" */
  time: string;
  className: string;
  classSlug: string;
  durationMin: number;
}

export type PlanPeriod = "single" | "monthly";

export interface PricingPlan {
  id: string;
  slug: string;
  name: string;
  price: number;
  currency: string;
  period: PlanPeriod;
  features: string[];
  featured: boolean;
  order: number;
}

export interface Review {
  id: string;
  author: string;
  context: string;
  text: string;
  rating: number;
}

/** Lexical editor state from Payload rich text */
export type RichTextContent = Record<string, unknown>;

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImageUrl: string;
  publishedAt: string;
  visible: boolean;
}

export interface BlogPost extends BlogPostSummary {
  content: RichTextContent;
}
