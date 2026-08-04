import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getWeeklySchedule } from "@/application/use-cases/get-schedule";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { ScheduleSection } from "@/presentation/components/sections/ScheduleSection";
import { assertPageVisible } from "@/presentation/lib/page-visibility";
import { renderOrderedSections } from "@/presentation/lib/section-order";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.schedule");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function SchedulePage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("schedule");
  const [schedule, settings] = await Promise.all([
    getWeeklySchedule(locale),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "schedule");

  const sections = renderOrderedSections(settings.scheduleSections, {
    hero: () => (
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} tone="sky" />
    ),
    list: () => <ScheduleSection schedule={schedule} showHeading={false} />,
  });

  return <PageShell>{sections}</PageShell>;
}
