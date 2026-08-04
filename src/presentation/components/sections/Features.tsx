"use client";

import {
  Flower2,
  Heart,
  Leaf,
  MapPin,
  Sparkles,
  Sun,
  Users,
  Waves,
  type LucideIcon,
} from "lucide-react";
import { useMessages, useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

const FALLBACK_KEYS = ["wellbeing", "levels", "community", "location"] as const;
const FALLBACK_ICONS = ["leaf", "sun", "heart", "mapPin"] as const;

const FEATURE_ICONS: Record<string, LucideIcon> = {
  leaf: Leaf,
  sun: Sun,
  heart: Heart,
  mapPin: MapPin,
  users: Users,
  waves: Waves,
  sparkles: Sparkles,
  flower: Flower2,
};

type FeatureItem = {
  icon?: string;
  title: string;
  text: string;
};

export function Features() {
  const t = useTranslations("features");
  const messages = useMessages() as {
    featuresList?: FeatureItem[];
  };

  const items: FeatureItem[] =
    messages.featuresList?.length
      ? messages.featuresList
      : FALLBACK_KEYS.map((key, index) => ({
          icon: FALLBACK_ICONS[index],
          title: t(`${key}.title`),
          text: t(`${key}.text`),
        }));

  return (
    <section className="bg-sand">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-x-6 gap-y-10 px-5 py-14 md:px-8 lg:grid-cols-4 lg:py-20">
        {items.map((item, index) => {
          const Icon = FEATURE_ICONS[item.icon ?? ""] ?? FEATURE_ICONS.leaf;
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
