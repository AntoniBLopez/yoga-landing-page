"use client";

import { ArrowUpRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { useSite } from "@/presentation/components/providers/SiteProvider";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { useContactLinks } from "@/presentation/hooks/useContactLinks";

export function BlogPostCta() {
  const t = useTranslations("blog.cta");
  const site = useSite();
  const contact = useContactLinks();
  const primaryHref = site.pages.schedule ? "/horarios" : "/contacto";

  return (
    <FadeIn className="mt-14 border-t border-linen pt-12 md:mt-16 md:pt-14">
      <div className="relative overflow-hidden rounded-3xl border border-linen/80 bg-white px-6 py-10 text-center shadow-sm shadow-deep/5 md:px-12 md:py-12">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-20 left-1/2 h-44 w-80 -translate-x-1/2 rounded-full bg-aqua/35 blur-3xl"
        />

        <p className="relative text-[11px] font-medium uppercase tracking-[0.28em] text-teal">
          {t("label")}
        </p>
        <h2 className="relative mt-3 font-display text-3xl font-medium leading-tight text-deep md:text-4xl">
          {t("title")}
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink/80 md:text-base">
          {t("subtitle")}
        </p>

        <div className="relative mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Button asChild variant="primary" size="lg">
            <a href={primaryHref}>{t("primary")}</a>
          </Button>
          <a
            href={contact.whatsappUrl(t("whatsappMessage"))}
            target="_blank"
            rel="noopener noreferrer"
            className="group inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-deep transition-colors hover:text-teal"
          >
            {t("secondary")}
            <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </a>
        </div>
      </div>
    </FadeIn>
  );
}
