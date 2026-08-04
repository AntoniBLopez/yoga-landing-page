import type { OrderedSection } from "@/domain/site";

/**
 * Merges CMS section order with defaults: keeps admin order, drops unknowns/dupes,
 * appends any missing default sections at the end.
 */
export function resolveSectionOrder(
  configured: OrderedSection[] | null | undefined,
  defaults: OrderedSection[],
): OrderedSection[] {
  const allowed = new Set(defaults.map((item) => item.id));
  const seen = new Set<string>();
  const result: OrderedSection[] = [];

  for (const item of configured ?? []) {
    if (!item?.id || !allowed.has(item.id) || seen.has(item.id)) continue;
    seen.add(item.id);
    result.push({
      id: item.id,
      visible: item.visible !== false,
    });
  }

  for (const item of defaults) {
    if (seen.has(item.id)) continue;
    result.push(item);
  }

  return result;
}
