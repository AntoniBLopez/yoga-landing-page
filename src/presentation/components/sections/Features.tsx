"use client";

import { Heart, Leaf, MapPin, Sun } from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

const FALLBACK_KEYS = ["wellbeing", "levels", "community", "location"] as const;
const ICONS = [Leaf, Sun, Heart, MapPin] as const;

export function Features() {
  const t = useTranslations("features");
  const messages = useMessages() as {
    featuresList?: Array<{ title: string; text: string }>;
  };

  const items =
    messages.featuresList?.length
      ? messages.featuresList
      : FALLBACK_KEYS.map((key) => ({
          title: t(`${key}.title`),
          text: t(`${key}.text`),
        }));

  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:px-8 lg:grid-cols-4 lg:py-20">
        {items.map((item, index) => {
          const Icon = ICONS[index % ICONS.length];
          return (
            <FadeIn
              key={`${item.title}-${index}`}
              delay={index * 0.1}
              className="flex flex-col items-center text-center"
            >
              <Icon className="mb-4 h-8 w-8 text-deep" strokeWidth={1.35} />
              <h3 className="text-xs font-semibold uppercase tracking-[0.22em] text-deep">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-ink/70">{item.text}</p>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}
