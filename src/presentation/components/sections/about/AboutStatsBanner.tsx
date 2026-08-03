"use client";

import { Flower2, Heart, MapPin, Sun } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

const STATS = [
  { key: "years", Icon: Flower2 },
  { key: "students", Icon: Heart },
  { key: "city", Icon: MapPin },
  { key: "passion", Icon: Sun },
] as const;

export function AboutStatsBanner() {
  const t = useTranslations("about");

  return (
    <div className="bg-deep">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-12 md:px-8 lg:grid-cols-4 lg:py-14">
        {STATS.map(({ key, Icon }, index) => (
          <FadeIn key={key} delay={index * 0.08} className="flex flex-col items-center text-center">
            <Icon className="mb-3 h-6 w-6 text-sand" strokeWidth={1.5} />
            <p className="text-sm font-semibold tracking-[0.14em] text-sand uppercase">
              {t(`stats.${key}.value`)}
            </p>
            <p className="mt-1 text-sm text-sand/80">{t(`stats.${key}.label`)}</p>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}
