"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const ITEMS = ["main", "extra", "retreats"] as const;

export function AboutTraining() {
  const t = useTranslations("about.page.training");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="space-y-8">
          {ITEMS.map((key, index) => (
            <FadeIn key={key} delay={index * 0.06}>
              <div className="grid gap-3 border-b border-linen pb-8 last:border-b-0 last:pb-0 md:grid-cols-[12rem_1fr] md:gap-10">
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal">
                  {t(`items.${key}.label`)}
                </p>
                <div>
                  <h3 className="font-display text-2xl font-medium text-deep">
                    {t(`items.${key}.title`)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/85 md:text-base">
                    {t(`items.${key}.text`)}
                  </p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
