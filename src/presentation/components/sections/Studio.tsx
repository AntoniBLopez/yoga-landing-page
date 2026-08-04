"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useSite } from "@/presentation/components/providers/SiteProvider";
import { FadeIn } from "@/presentation/components/ui/FadeIn";

type StudioCtaId = "explore" | "rental";

const CTA_STYLES: Record<StudioCtaId, string> = {
  explore:
    "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal transition-colors hover:text-teal-dark",
  rental:
    "group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition-colors hover:text-teal",
};

function isStudioCtaId(id: string): id is StudioCtaId {
  return id === "explore" || id === "rental";
}

export function Studio() {
  const t = useTranslations("studio");
  const site = useSite();
  const studioVisible = site.pages.studio ?? true;
  const hrefs: Record<StudioCtaId, string> = {
    explore: studioVisible ? "/estudio" : "/",
    rental: studioVisible ? "/estudio#alquiler" : "/contacto",
  };
  const labels: Record<StudioCtaId, string> = {
    explore: t("cta"),
    rental: t("ctaRental"),
  };

  const ctas = (site.landingStudioCtas ?? [])
    .filter((item) => item.visible && isStudioCtaId(item.id))
    .map((item) => ({
      id: item.id as StudioCtaId,
      href: hrefs[item.id as StudioCtaId],
      label: labels[item.id as StudioCtaId],
    }));

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <FadeIn className="relative min-h-72 w-full lg:min-h-[32rem]">
          <Image
            src={site.images.studioUrl}
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="flex flex-col justify-center bg-white px-8 py-14 md:px-14 md:py-20 lg:px-16 xl:px-24"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-teal">
            {t("label")}
          </p>
          <h2 className="font-display max-w-lg text-4xl leading-tight font-medium text-deep md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80">{t("text")}</p>
          {ctas.length > 0 ? (
            <div className="mt-8 flex flex-col items-start gap-4">
              {ctas.map((cta) => (
                <a key={cta.id} href={cta.href} className={CTA_STYLES[cta.id]}>
                  {cta.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              ))}
            </div>
          ) : null}
        </FadeIn>
      </div>
    </section>
  );
}
