import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getPricingPlans } from "@/application/use-cases/get-pricing-plans";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { PricingFaq } from "@/presentation/components/sections/PricingFaq";
import { PricingSection } from "@/presentation/components/sections/PricingSection";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.pricing");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PricingPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pricing");
  const plans = await getPricingPlans(locale);

  return (
    <PageShell>
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} tone="sky" />
      <PricingSection plans={plans} showHeading={false} />
      <PricingFaq />
    </PageShell>
  );
}
