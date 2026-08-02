import type { BlogPost, BlogPostSummary, Locale, RichTextContent } from "@/domain/entities";
import type { PostRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";
import { resolveImageUrl } from "./media";

export class PayloadPostRepository implements PostRepository {
  async findVisible(locale: Locale): Promise<BlogPostSummary[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      locale,
      where: { visible: { equals: true } },
      sort: "-publishedAt",
      limit: 100,
      depth: 1,
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt,
      coverImageUrl: resolveImageUrl(doc.coverImage, doc.coverImageUrl),
      publishedAt: doc.publishedAt,
      visible: doc.visible ?? false,
    }));
  }

  async findBySlug(slug: string, locale: Locale): Promise<BlogPost | null> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "posts",
      locale,
      where: {
        and: [{ slug: { equals: slug } }, { visible: { equals: true } }],
      },
      limit: 1,
      depth: 1,
    });

    const doc = docs[0];
    if (!doc) return null;

    return {
      id: String(doc.id),
      slug: doc.slug,
      title: doc.title,
      excerpt: doc.excerpt,
      coverImageUrl: resolveImageUrl(doc.coverImage, doc.coverImageUrl),
      publishedAt: doc.publishedAt,
      visible: doc.visible ?? false,
      content: doc.content as unknown as RichTextContent,
    };
  }
}
