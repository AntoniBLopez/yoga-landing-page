import type { Metadata } from "next";
import { ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getLocale, getTranslations } from "next-intl/server";

import { getPostBySlug } from "@/application/use-cases/get-post-by-slug";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { BlogPostCta } from "@/presentation/components/blog/BlogPostCta";
import { BlogRichText } from "@/presentation/components/blog/BlogRichText";
import { Footer } from "@/presentation/components/sections/Footer";
import { Navbar } from "@/presentation/components/sections/Navbar";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { formatPostDate } from "@/presentation/lib/format-date";
import { assertPageVisible } from "@/presentation/lib/page-visibility";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const post = await getPostBySlug(slug, locale);
  if (!post) return {};
  return {
    title: `${post.title} · Blau Yoga`,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");
  const [post, settings] = await Promise.all([
    getPostBySlug(slug, locale),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "blog");

  if (!post) notFound();

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-sand pt-28 pb-20 md:pt-32 md:pb-28">
        <article className="mx-auto max-w-3xl px-5 md:px-8">
          <FadeIn>
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-deep transition-colors hover:text-teal"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              {t("back")}
            </Link>
          </FadeIn>

          <FadeIn delay={0.05} className="mt-8">
            <time
              dateTime={post.publishedAt}
              className="text-[11px] font-medium uppercase tracking-[0.2em] text-teal"
            >
              {formatPostDate(post.publishedAt, locale)}
            </time>
            <h1 className="mt-3 font-display text-4xl leading-tight font-medium text-deep md:text-5xl">
              {post.title}
            </h1>
            <p className="mt-4 text-lg text-ink/85">{post.excerpt}</p>
          </FadeIn>

          {post.coverImageUrl ? (
            <FadeIn delay={0.1} className="relative mt-10 aspect-[16/9] overflow-hidden rounded-2xl">
              <Image
                src={post.coverImageUrl}
                alt={post.title}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 768px"
                className="object-cover"
              />
            </FadeIn>
          ) : null}

          <FadeIn delay={0.15} className="mt-10 md:mt-12">
            <BlogRichText content={post.content} />
          </FadeIn>

          <BlogPostCta />
        </article>
      </main>
      <Footer />
    </>
  );
}
