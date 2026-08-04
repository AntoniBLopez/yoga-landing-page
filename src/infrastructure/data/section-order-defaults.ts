import type { OrderedSection } from "@/domain/site";

export const DEFAULT_LANDING_SECTIONS: OrderedSection[] = [
  { id: "hero", visible: true },
  { id: "features", visible: true },
  { id: "studio", visible: true },
  { id: "quote", visible: true },
  { id: "classes", visible: true },
  { id: "schedule", visible: true },
  { id: "about", visible: true },
  { id: "pricing", visible: true },
  { id: "reviews", visible: true },
  { id: "contact", visible: true },
];

export const DEFAULT_LANDING_STUDIO_CTAS: OrderedSection[] = [
  { id: "explore", visible: true },
  { id: "rental", visible: true },
];

export const DEFAULT_ABOUT_SECTIONS: OrderedSection[] = [
  { id: "intro", visible: true },
  { id: "story", visible: true },
  { id: "philosophy", visible: true },
  { id: "training", visible: true },
  { id: "stats", visible: true },
  { id: "reviews", visible: true },
  { id: "values", visible: true },
  { id: "offMat", visible: true },
  { id: "cta", visible: true },
];

export const DEFAULT_STUDIO_SECTIONS: OrderedSection[] = [
  { id: "hero", visible: true },
  { id: "intro", visible: true },
  { id: "gallery", visible: true },
  { id: "rental", visible: true },
];

export const DEFAULT_PRICING_SECTIONS: OrderedSection[] = [
  { id: "hero", visible: true },
  { id: "plans", visible: true },
  { id: "faq", visible: true },
];
