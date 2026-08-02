import type { BlogPostSummary, Locale } from "@/domain/entities";
import type { PostRepository } from "@/domain/repositories";
import { PayloadPostRepository } from "@/infrastructure/repositories/PayloadPostRepository";

const defaultRepository: PostRepository = new PayloadPostRepository();

export function getPosts(
  locale: Locale,
  repository: PostRepository = defaultRepository,
): Promise<BlogPostSummary[]> {
  return repository.findVisible(locale);
}
