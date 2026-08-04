import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getClasses } from "@/application/use-cases/get-classes";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { ClassesSection } from "@/presentation/components/sections/ClassesSection";
import { assertPageVisible } from "@/presentation/lib/page-visibility";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.classes");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ClassesPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("classes");
  const [classes, settings] = await Promise.all([
    getClasses(locale),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "classes");

  return (
    <PageShell>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} tone="sand" />
      <ClassesSection classes={classes} showHeading={false} />
    </PageShell>
  );
}
