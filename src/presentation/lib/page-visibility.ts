import { notFound } from "next/navigation";

import type { SitePageVisibility } from "@/domain/site";

export type ManagedPage = keyof SitePageVisibility;

export function assertPageVisible(
  pages: SitePageVisibility,
  page: ManagedPage,
): void {
  if (!pages[page]) notFound();
}
