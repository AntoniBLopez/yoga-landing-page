import type { Metadata } from "next";
import { getLocale, getTranslations } from "next-intl/server";

import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { ContactSection } from "@/presentation/components/sections/ContactSection";
import { assertPageVisible } from "@/presentation/lib/page-visibility";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.contact");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const locale = (await getLocale()) as Locale;
  const [t, settings] = await Promise.all([
    getTranslations("contact"),
    getSiteSettings(locale),
  ]);
  assertPageVisible(settings.pages, "contact");

  return (
    <PageShell>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
        image={settings.images.contactUrl}
        imageAlt={t("imageAlt")}
      />
      <ContactSection pageMode />
    </PageShell>
  );
}
