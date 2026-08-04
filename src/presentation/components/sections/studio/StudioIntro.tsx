"use client";

import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

export function StudioIntro() {
  const t = useTranslations("studio");

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-3xl px-5 py-16 md:px-8 md:py-20">
        <FadeIn>
          <p className="text-center text-base leading-relaxed text-ink/80 md:text-lg">
            {t("text")}
          </p>
        </FadeIn>
      </div>
    </section>
  );
}
