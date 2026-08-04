import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getFaqs } from "@/application/use-cases/get-faqs";
import { getPricingPlans } from "@/application/use-cases/get-pricing-plans";
import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { PricingFaq } from "@/presentation/components/sections/PricingFaq";
import { PricingSection } from "@/presentation/components/sections/PricingSection";
import { assertPageVisible } from "@/presentation/lib/page-visibility";
import { renderOrderedSections } from "@/presentation/lib/section-order";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.pricing");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function PricingPage() {
  const locale = (await getLocale()) as Locale;
  const t = await getTranslations("pricing");
  const [plans, faqs, settings] = await Promise.all([
    getPricingPlans(locale),
    getFaqs(locale),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "pricing");

  const sections = renderOrderedSections(settings.pricingSections, {
    hero: () => (
      <PageHero label={t("label")} title={t("title")} subtitle={t("subtitle")} tone="sky" />
    ),
    plans: () => <PricingSection plans={plans} showHeading={false} />,
    faq: () => <PricingFaq items={faqs} />,
  });

  return <PageShell>{sections}</PageShell>;
}
