import { resolveSectionOrder } from "@/domain/section-order";
import type { OrderedSection } from "@/domain/site";

/**
 * Accepts new array shape or legacy boolean-map shape from older Site Settings.
 */
export function mapSectionOrder(
  value: unknown,
  defaults: OrderedSection[],
): OrderedSection[] {
  if (Array.isArray(value)) {
    const configured = value
      .map((item) => {
        if (!item || typeof item !== "object") return null;
        const row = item as {
          section?: string | null;
          id?: string | null;
          visible?: boolean | null;
        };
        // CMS field is `section`; JSON defaults / domain use `id`
        const key = row.section || row.id;
        if (!key) return null;
        return {
          id: String(key),
          visible: row.visible !== false,
        };
      })
      .filter((item): item is OrderedSection => Boolean(item));
    return resolveSectionOrder(configured, defaults);
  }

  if (value && typeof value === "object") {
    const legacy = value as Record<string, boolean | null | undefined>;
    const configured = defaults.map((item) => ({
      id: item.id,
      visible:
        typeof legacy[item.id] === "boolean" ? Boolean(legacy[item.id]) : item.visible,
    }));
    return resolveSectionOrder(configured, defaults);
  }

  return defaults;
}
