import type { BlogPost, Locale } from "@/domain/entities";
import type { PostRepository } from "@/domain/repositories";
import { getPostRepository } from "@/infrastructure/repositories/createRepositories";

export async function getPostBySlug(
  slug: string,
  locale: Locale,
  repository?: PostRepository,
): Promise<BlogPost | null> {
  const repo = repository ?? (await getPostRepository());
  return repo.findBySlug(slug, locale);
}
