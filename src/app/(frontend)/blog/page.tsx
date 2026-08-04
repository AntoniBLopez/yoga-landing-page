import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getPosts } from "@/application/use-cases/get-posts";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { BlogPostCard } from "@/presentation/components/blog/BlogPostCard";
import { Footer } from "@/presentation/components/sections/Footer";
import { Navbar } from "@/presentation/components/sections/Navbar";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { assertPageVisible } from "@/presentation/lib/page-visibility";
import { renderOrderedSections } from "@/presentation/lib/section-order";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("blog");
  return {
    title: t("metaTitle"),
    description: t("metaDescription"),
  };
}

export default async function BlogPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("blog");
  const [posts, settings] = await Promise.all([
    getPosts(locale),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "blog");

  const sections = renderOrderedSections(settings.blogSections, {
    hero: () => (
      <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />
    ),
    list: () =>
      posts.length === 0 ? (
        <FadeIn>
          <p className="mx-auto max-w-lg text-center text-ink/80">{t("empty")}</p>
        </FadeIn>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, index) => (
            <BlogPostCard
              key={post.id}
              post={post}
              locale={locale}
              readLabel={t("readMore")}
              index={index}
            />
          ))}
        </div>
      ),
  });

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-sand pt-28 pb-20 md:pt-32 md:pb-28">
        <div className="mx-auto max-w-7xl px-5 md:px-8">{sections}</div>
      </main>
      <Footer />
    </>
  );
}
