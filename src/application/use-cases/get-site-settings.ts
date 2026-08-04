import type { Locale } from "@/domain/entities";
import type { SiteSettings } from "@/domain/site";
import { getSiteRepository } from "@/infrastructure/repositories/createRepositories";

export async function getSiteSettings(locale: Locale): Promise<SiteSettings> {
  const repo = await getSiteRepository();
  return repo.getSettings(locale);
}
