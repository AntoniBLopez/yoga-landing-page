"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const STEPS = ["discover", "train", "change", "teach"] as const;

export function AboutStory() {
  const t = useTranslations("about.page.story");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <ol className="relative ml-3 space-y-0 border-l border-aqua/80 md:ml-4">
          {STEPS.map((key, index) => (
            <FadeIn key={key} delay={index * 0.06}>
              <li className="relative pb-10 pl-8 last:pb-0 md:pl-10">
                <span
                  className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-teal bg-white"
                  aria-hidden
                />
                <p className="text-[11px] font-medium uppercase tracking-[0.22em] text-teal">
                  {t(`steps.${key}.label`)}
                </p>
                <h3 className="mt-2 font-display text-2xl font-medium text-deep">
                  {t(`steps.${key}.title`)}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink/85 md:text-base">
                  {t(`steps.${key}.text`)}
                </p>
              </li>
            </FadeIn>
          ))}
        </ol>
      </div>
    </section>
  );
}
