import type { BlogPost, Locale } from "@/domain/entities";
import type { PostRepository } from "@/domain/repositories";
import { PayloadPostRepository } from "@/infrastructure/repositories/PayloadPostRepository";

const defaultRepository: PostRepository = new PayloadPostRepository();

export function getPostBySlug(
  slug: string,
  locale: Locale,
  repository: PostRepository = defaultRepository,
): Promise<BlogPost | null> {
  return repository.findBySlug(slug, locale);
}
