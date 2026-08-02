import Image from "next/image";
import Link from "next/link";

import type { BlogPostSummary } from "@/domain/entities";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { formatPostDate } from "@/presentation/lib/format-date";

export function BlogPostCard({
  post,
  locale,
  readLabel,
  index = 0,
}: {
  post: BlogPostSummary;
  locale: string;
  readLabel: string;
  index?: number;
}) {
  return (
    <FadeIn delay={index * 0.08}>
      <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-deep/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-deep/10">
        <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
          <div className="relative aspect-[16/10] overflow-hidden bg-linen">
            {post.coverImageUrl ? (
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : null}
          </div>
          <div className="flex flex-1 flex-col p-6">
            <time
              dateTime={post.publishedAt}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-teal"
            >
              {formatPostDate(post.publishedAt, locale)}
            </time>
            <h2 className="mt-2 font-display text-2xl font-medium text-deep transition-colors group-hover:text-teal">
              {post.title}
            </h2>
            <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/90">{post.excerpt}</p>
            <span className="mt-5 text-xs font-medium uppercase tracking-[0.15em] text-deep">
              {readLabel}
            </span>
          </div>
        </Link>
      </article>
    </FadeIn>
  );
}
