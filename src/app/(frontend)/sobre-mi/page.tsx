import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";

import { getReviews } from "@/application/use-cases/get-reviews";
import { getTeachers } from "@/application/use-cases/get-teachers";
import type { Locale } from "@/domain/entities";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { AboutCta } from "@/presentation/components/sections/about/AboutCta";
import { AboutOffMat } from "@/presentation/components/sections/about/AboutOffMat";
import { AboutPhilosophy } from "@/presentation/components/sections/about/AboutPhilosophy";
import { AboutStatsBanner } from "@/presentation/components/sections/about/AboutStatsBanner";
import { AboutStory } from "@/presentation/components/sections/about/AboutStory";
import { AboutTraining } from "@/presentation/components/sections/about/AboutTraining";
import { AboutValues } from "@/presentation/components/sections/about/AboutValues";
import { AboutSection } from "@/presentation/components/sections/AboutSection";
import { ReviewsSection } from "@/presentation/components/sections/ReviewsSection";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.about");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function AboutPage() {
  const locale = (await getLocale()) as Locale;
  const [teachers, reviews] = await Promise.all([getTeachers(locale), getReviews(locale)]);
  const founder = teachers[0];
  if (!founder) notFound();

  return (
    <PageShell>
      <AboutSection teacher={founder} pageMode showStats={false} />
      <AboutStory />
      <AboutPhilosophy />
      <AboutTraining />
      <AboutStatsBanner />
      <ReviewsSection reviews={reviews} />
      <AboutValues />
      <AboutOffMat />
      <AboutCta />
    </PageShell>
  );
}
