import type { BlogPostSummary, Locale } from "@/domain/entities";
import type { PostRepository } from "@/domain/repositories";
import { getPostRepository } from "@/infrastructure/repositories/createRepositories";

export async function getPosts(
  locale: Locale,
  repository?: PostRepository,
): Promise<BlogPostSummary[]> {
  const repo = repository ?? (await getPostRepository());
  return repo.findVisible(locale);
}
