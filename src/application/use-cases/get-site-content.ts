import type { Locale } from "@/domain/entities";
import type { SiteContentMessages } from "@/domain/site";
import { getSiteRepository } from "@/infrastructure/repositories/createRepositories";

export async function getSiteContentMessages(
  locale: Locale,
): Promise<SiteContentMessages> {
  const repo = await getSiteRepository();
  return repo.getContentMessages(locale);
}
