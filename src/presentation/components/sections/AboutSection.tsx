"use client";

import { ArrowRight, Award, Flower2, Waves, Users } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { Teacher } from "@/domain/entities";
import { FadeIn } from "@/presentation/components/ui/FadeIn";

const STATS = [
  { key: "cert", Icon: Award },
  { key: "styles", Icon: Flower2 },
  { key: "beach", Icon: Waves },
  { key: "formats", Icon: Users },
] as const;

export function AboutSection({ teacher }: { teacher: Teacher }) {
  const t = useTranslations("about");

  return (
    <section id="sobre-mi" className="bg-sand">
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
          <a
            href="#contacto"
            className="group mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-deep transition-colors hover:text-teal"
          >
            {t("cta")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </a>
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

      <div className="bg-deep">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-y-10 px-5 py-12 md:px-8 lg:grid-cols-4 lg:py-14">
          {STATS.map(({ key, Icon }, index) => (
            <FadeIn key={key} delay={index * 0.08} className="flex flex-col items-center text-center">
              <Icon className="mb-3 h-6 w-6 text-aqua" strokeWidth={1.6} />
              <p className="font-display text-2xl font-semibold text-sand">
                {t(`stats.${key}.value`)}
              </p>
              <p className="mt-1 text-xs uppercase tracking-[0.2em] text-sky">
                {t(`stats.${key}.label`)}
              </p>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
