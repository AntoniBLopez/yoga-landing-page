import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";

import { PageHero } from "@/presentation/components/layout/PageHero";
import { PageShell } from "@/presentation/components/layout/PageShell";
import { ContactSection } from "@/presentation/components/sections/ContactSection";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("pages.contact");
  return { title: t("metaTitle"), description: t("metaDescription") };
}

export default async function ContactPage() {
  const t = await getTranslations("contact");

  return (
    <PageShell>
      <PageHero
        label={t("label")}
        title={t("title")}
        subtitle={t("subtitle")}
        image="/images/contacto-orilla-3.png"
        imageAlt={t("imageAlt")}
      />
      <ContactSection pageMode />
    </PageShell>
  );
}
