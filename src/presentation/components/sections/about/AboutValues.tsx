"use client";

import { Ear, HeartHandshake, Sparkles, Users, Accessibility } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const VALUES = [
  { key: "authenticity", Icon: Sparkles },
  { key: "listening", Icon: Ear },
  { key: "community", Icon: Users },
  { key: "awareness", Icon: HeartHandshake },
  { key: "accessibility", Icon: Accessibility },
] as const;

export function AboutValues() {
  const t = useTranslations("about.page.values");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {VALUES.map(({ key, Icon }, index) => (
            <FadeIn
              key={key}
              delay={index * 0.06}
              className="flex flex-col items-center text-center lg:items-start lg:text-left"
            >
              <Icon className="mb-4 h-7 w-7 text-deep" strokeWidth={1.4} />
              <h3 className="text-xs font-semibold uppercase tracking-[0.18em] text-deep">
                {t(`items.${key}.title`)}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink/80">{t(`items.${key}.text`)}</p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
