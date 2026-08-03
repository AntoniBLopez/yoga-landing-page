"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { SOCIAL_LINKS } from "@/config/contact";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { buildWhatsAppUrl } from "@/presentation/lib/whatsapp";

export function AboutCta() {
  const t = useTranslations("about.page.cta");

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 lg:py-28">
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-linen/80 bg-white px-6 py-10 text-center shadow-sm shadow-deep/5 md:px-12 md:py-12">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-teal">
              {t("label")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-deep md:text-4xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
              {t("subtitle")}
            </p>

            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
              <Button asChild variant="primary" size="lg">
                <a href="/horarios">{t("primary")}</a>
              </Button>
              <a
                href={buildWhatsAppUrl(t("whatsappMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-deep transition-colors hover:text-teal"
              >
                {t("whatsapp")}
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
            </div>

            <a
              href={SOCIAL_LINKS.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-xs tracking-wide text-ink/55 transition-colors hover:text-teal"
            >
              {t("instagram")}
            </a>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
