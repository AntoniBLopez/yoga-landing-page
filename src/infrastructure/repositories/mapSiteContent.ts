import type { SiteContentMessages } from "@/domain/site";

type StringRecord = Record<string, string | null | undefined>;

type StudioRentalDoc = {
  label?: string | null;
  title?: string | null;
  text?: string | null;
  cta?: string | null;
  whatsappMessage?: string | null;
  highlights?: {
    light?: string | null;
    equip?: string | null;
    groups?: string | null;
  } | null;
};

type StudioDoc = {
  label?: string | null;
  title?: string | null;
  text?: string | null;
  cta?: string | null;
  imageAlt?: string | null;
  galleryLabel?: string | null;
  galleryTitle?: string | null;
  gallerySubtitle?: string | null;
  rental?: StudioRentalDoc | null;
};

type ContentDoc = {
  meta?: StringRecord | null;
  nav?: StringRecord | null;
  hero?: StringRecord | null;
  features?: Array<{
    icon?: string | null;
    title?: string | null;
    text?: string | null;
  }> | null;
  studio?: StudioDoc | null;
  quote?: StringRecord | null;
  classes?: StringRecord | null;
  schedule?: StringRecord | null;
  pricing?: {
    label?: string | null;
    title?: string | null;
    subtitle?: string | null;
    cta?: string | null;
    popular?: string | null;
    faq?: StringRecord | null;
  } | null;
  reviews?: StringRecord | null;
  contact?: StringRecord | null;
  about?: StringRecord | null;
  footer?: StringRecord | null;
  blog?: StringRecord | null;
  aboutPage?: Record<string, unknown> | null;
  pageMeta?: Record<string, unknown> | null;
};

function compact(record: StringRecord | null | undefined) {
  if (!record) return undefined;
  const out: Record<string, string> = {};
  for (const [key, value] of Object.entries(record)) {
    if (typeof value === "string" && value.trim()) out[key] = value;
  }
  return Object.keys(out).length ? out : undefined;
}

/** Drops null/empty leaves from nested CMS group trees before merging into messages. */
function pruneEmpty(value: unknown): Record<string, unknown> | undefined {
  if (!value || typeof value !== "object" || Array.isArray(value)) return undefined;

  const out: Record<string, unknown> = {};
  for (const [key, nested] of Object.entries(value)) {
    if (typeof nested === "string") {
      if (nested.trim()) out[key] = nested;
      continue;
    }
    const child = pruneEmpty(nested);
    if (child) out[key] = child;
  }
  return Object.keys(out).length ? out : undefined;
}

/**
 * Maps Payload SiteContent global → partial next-intl messages tree.
 */
export function mapSiteContentToMessages(doc: ContentDoc | null | undefined): SiteContentMessages {
  if (!doc) return {};

  const messages: SiteContentMessages = {};

  const meta = compact(doc.meta ?? undefined);
  if (meta) messages.meta = meta;

  const nav = compact(doc.nav ?? undefined);
  if (nav) messages.nav = nav;

  const hero = compact(doc.hero ?? undefined);
  if (hero) messages.hero = hero;

  if (doc.features?.length) {
    const list = doc.features
      .filter((item) => item?.title?.trim() && item?.text?.trim())
      .map((item) => ({
        icon: item.icon?.trim() || "leaf",
        title: item.title as string,
        text: item.text as string,
      }));
    if (list.length) {
      const keyed: Record<string, { title: string; text: string }> = {};
      list.forEach((item, index) => {
        keyed[`item${index}`] = { title: item.title, text: item.text };
      });
      messages.features = keyed;
      messages.featuresList = list;
    }
  }

  if (doc.studio) {
    const { rental, ...studioRest } = doc.studio;
    const studio = compact(studioRest as StringRecord);
    let rentalMessages: Record<string, unknown> | undefined;
    if (rental) {
      const { highlights, ...rentalRest } = rental;
      const rentalFlat = compact(rentalRest as StringRecord);
      const highlightsFlat = compact(highlights as StringRecord | null | undefined);
      if (rentalFlat || highlightsFlat) {
        rentalMessages = {
          ...(rentalFlat ?? {}),
          ...(highlightsFlat ? { highlights: highlightsFlat } : {}),
        };
      }
    }
    if (studio || rentalMessages) {
      messages.studio = {
        ...(studio ?? {}),
        ...(rentalMessages ? { rental: rentalMessages } : {}),
      };
    }
  }

  const quote = compact(doc.quote ?? undefined);
  if (quote) messages.quote = quote;

  const classes = compact(doc.classes ?? undefined);
  if (classes) messages.classes = classes;

  const schedule = compact(doc.schedule ?? undefined);
  if (schedule) messages.schedule = schedule;

  if (doc.pricing) {
    const { faq, ...rest } = doc.pricing;
    const pricing = compact(rest);
    const faqCompact = compact(faq ?? undefined);
    if (pricing || faqCompact) {
      messages.pricing = {
        ...(pricing ?? {}),
        ...(faqCompact ? { faq: faqCompact } : {}),
      };
    }
  }

  const reviews = compact(doc.reviews ?? undefined);
  if (reviews) messages.reviews = reviews;

  const contact = compact(doc.contact ?? undefined);
  if (contact) messages.contact = contact;

  const about = compact(doc.about ?? undefined);
  const aboutPage = pruneEmpty(doc.aboutPage);
  if (about || aboutPage) {
    messages.about = {
      ...(about ?? {}),
      ...(aboutPage ? { page: aboutPage } : {}),
    };
  }

  const footer = compact(doc.footer ?? undefined);
  if (footer) messages.footer = footer;

  const blog = compact(doc.blog ?? undefined);
  if (blog) messages.blog = blog;

  if (doc.pageMeta && typeof doc.pageMeta === "object") {
    messages.pages = doc.pageMeta;
  }

  return messages;
}
