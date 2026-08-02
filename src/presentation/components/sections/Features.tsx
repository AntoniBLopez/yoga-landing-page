"use client";

import { Heart, Leaf, MapPin, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

const FEATURES = [
  { key: "wellbeing", Icon: Leaf },
  { key: "levels", Icon: Sun },
  { key: "community", Icon: Heart },
  { key: "location", Icon: MapPin },
] as const;

export function Features() {
  const t = useTranslations("features");

  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:px-8 lg:grid-cols-4 lg:py-20">
        {FEATURES.map(({ key, Icon }, index) => (
          <FadeIn key={key} delay={index * 0.1} className="flex flex-col items-center text-center">
            <Icon className="mb-4 h-8 w-8 text-deep" strokeWidth={1.35} />
            <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-deep">
              {t(`${key}.title`)}
            </h3>
            <p className="mt-2 text-sm text-ink/70">{t(`${key}.text`)}</p>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
