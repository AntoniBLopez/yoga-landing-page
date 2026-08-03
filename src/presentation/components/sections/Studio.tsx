"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { FadeIn } from "@/presentation/components/ui/FadeIn";

const STUDIO_IMAGE = "/images/estudio.png";

export function Studio() {
  const t = useTranslations("studio");

  return (
    <section className="bg-white">
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <FadeIn className="relative min-h-72 w-full lg:min-h-[32rem]">
          <Image
            src={STUDIO_IMAGE}
            alt={t("imageAlt")}
            fill
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-cover"
          />
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="flex flex-col justify-center bg-white px-8 py-14 md:px-14 md:py-20 lg:px-16 xl:px-24"
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-teal">
            {t("label")}
          </p>
          <h2 className="font-display max-w-lg text-4xl leading-tight font-medium text-deep md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-ink/80">{t("text")}</p>
          <a
            href="/contacto"
            className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-teal transition-colors hover:text-teal-dark"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </FadeIn>
      </div>
    </section>
  );
}
