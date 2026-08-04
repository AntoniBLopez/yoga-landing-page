import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { StudioGallery } from "@/presentation/components/sections/studio/StudioGallery";
import { StudioIntro } from "@/presentation/components/sections/studio/StudioIntro";
import { StudioRental } from "@/presentation/components/sections/studio/StudioRental";
import { assertPageVisible } from "@/presentation/lib/page-visibility";
import { renderOrderedSections } from "@/presentation/lib/section-order";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.studio");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function StudioPage() {
  const locale = (await getLocale()) as Locale;
  const [t, settings] = await Promise.all([
    getTranslations("studio"),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "studio");

  const sections = renderOrderedSections(settings.studioSections, {
    hero: () => (
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("gallerySubtitle")}
        image={settings.images.studioUrl}
        imageAlt={t("imageAlt")}
      />
    ),
    intro: () => <StudioIntro />,
    gallery: () => <StudioGallery />,
    rental: () => <StudioRental />,
  });

  return <PageShell>{sections}</PageShell>;
}
