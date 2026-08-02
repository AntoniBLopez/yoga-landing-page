"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

export function Quote() {
  const t = useTranslations("quote");

  return (
    <section className="bg-deep">
      <FadeIn className="mx-auto max-w-4xl px-5 py-16 text-center md:px-8 lg:py-20">
        <blockquote className="font-display text-2xl leading-snug font-medium text-sand italic md:text-3xl">
          «{t("text")}»
        </blockquote>
        <p className="mt-5 text-xs font-medium uppercase tracking-[0.3em] text-aqua">
          — {t("author")}
        </p>
      </FadeIn>
    </section>
  );
}
