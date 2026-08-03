"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const ITEMS = ["barcelona", "rituals", "inspire"] as const;

export function AboutOffMat() {
  const t = useTranslations("about.page.offMat");

  return (
    <section className="bg-sky/30">
      <div className="mx-auto max-w-5xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-8 md:grid-cols-3">
          {ITEMS.map((key, index) => (
            <FadeIn key={key} delay={index * 0.07}>
              <article>
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal">
                  {t(`items.${key}.label`)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-deep">
                  {t(`items.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85">{t(`items.${key}.text`)}</p>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
