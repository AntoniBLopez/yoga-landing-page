import type { ReactNode } from "react";

import type { OrderedSection } from "@/domain/site";

export { resolveSectionOrder } from "@/domain/section-order";

export function renderOrderedSections(
  order: OrderedSection[],
  renderers: Record<string, () => ReactNode>,
): ReactNode[] {
  return order
    .filter((section) => section.visible)
    .map((section) => {
      const render = renderers[section.id];
      if (!render) return null;
      return <div key={section.id}>{render()}</div>;
    });
}
