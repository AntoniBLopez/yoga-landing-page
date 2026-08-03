"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { Teacher } from "@/domain/entities";
import { AboutStatsBanner } from "@/presentation/components/sections/about/AboutStatsBanner";
import { FadeIn } from "@/presentation/components/ui/FadeIn";

export function AboutSection({
  teacher,
  pageMode = false,
  showStats = true,
}: {
  teacher: Teacher;
  pageMode?: boolean;
  /** Stats banner under the intro (landing). On the about page we place it later. */
  showStats?: boolean;
}) {
  const t = useTranslations("about");

  return (
    <section id="sobre-mi" className={pageMode ? "bg-sand pt-20 md:pt-24" : "bg-sand"}>
      <div className="grid lg:grid-cols-2 lg:items-stretch">
        <FadeIn className="order-2 flex flex-col justify-center px-8 py-14 md:px-14 md:py-20 lg:order-1 lg:px-16 xl:px-24">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-ink/50">
            {t("label")}
          </p>
          <h2 className="font-display text-4xl leading-tight font-medium text-deep md:text-5xl">
            {t("title", { name: teacher.name })}
          </h2>
          <p className="mt-6 max-w-lg text-base leading-relaxed whitespace-pre-line text-ink/80">
            {teacher.bio}
          </p>
          {!pageMode ? (
            <a
              href="/sobre-mi"
              className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition-colors hover:text-teal"
            >
              {t("cta")}
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          ) : null}
        </FadeIn>

        <FadeIn
          delay={0.15}
          className="relative order-1 min-h-80 w-full bg-sky/35 lg:order-2 lg:min-h-[36rem] lg:bg-transparent"
        >
          <div className="absolute inset-0 overflow-hidden rounded-tl-[6rem] sm:rounded-tl-[8rem] lg:rounded-tl-[10rem]">
            <Image
              src={teacher.imageUrl}
              alt={t("imageAlt")}
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
          </div>
        </FadeIn>
      </div>

      {showStats ? <AboutStatsBanner /> : null}
    </section>
  );
}
