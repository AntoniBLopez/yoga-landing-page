import type { Faq, Locale } from "@/domain/entities";
import type { FaqRepository } from "@/domain/repositories";
import { getFaqRepository } from "@/infrastructure/repositories/createRepositories";

export async function getFaqs(
  locale: Locale,
  repository?: FaqRepository,
): Promise<Faq[]> {
  const repo = repository ?? (await getFaqRepository());
  return repo.findVisible(locale);
}
