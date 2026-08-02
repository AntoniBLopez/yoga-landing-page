import type { Locale, Review } from "@/domain/entities";
import type { ReviewRepository } from "@/domain/repositories";
import { PayloadReviewRepository } from "@/infrastructure/repositories/PayloadReviewRepository";

const defaultRepository: ReviewRepository = new PayloadReviewRepository();

export function getReviews(
  locale: Locale,
  repository: ReviewRepository = defaultRepository,
): Promise<Review[]> {
  return repository.findAll(locale);
}
