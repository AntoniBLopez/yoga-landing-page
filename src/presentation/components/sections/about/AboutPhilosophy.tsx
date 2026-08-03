"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const POINTS = ["accessible", "breath", "levels", "safe"] as const;

export function AboutPhilosophy() {
  const t = useTranslations("about.page.philosophy");

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 sm:grid-cols-2">
          {POINTS.map((key, index) => (
            <FadeIn key={key} delay={index * 0.07}>
              <article className="h-full border-t border-teal/40 pt-6">
                <h3 className="font-display text-2xl font-medium text-deep">
                  {t(`points.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85 md:text-base">
                  {t(`points.${key}.text`)}
                </p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
