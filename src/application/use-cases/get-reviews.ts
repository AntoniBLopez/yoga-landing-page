import type { Locale, Review } from "@/domain/entities";
import type { ReviewRepository } from "@/domain/repositories";
import { getReviewRepository } from "@/infrastructure/repositories/createRepositories";

export async function getReviews(
  locale: Locale,
  repository?: ReviewRepository,
): Promise<Review[]> {
  const repo = repository ?? (await getReviewRepository());
  return repo.findAll(locale);
}
