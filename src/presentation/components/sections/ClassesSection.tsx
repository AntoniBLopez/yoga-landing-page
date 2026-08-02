"use client";

import { Clock } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import type { YogaClass } from "@/domain/entities";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

export function ClassesSection({ classes }: { classes: YogaClass[] }) {
  const t = useTranslations("classes");

  return (
    <section id="clases" className="bg-sand">
      <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {classes.map((yogaClass, index) => (
            <FadeIn key={yogaClass.id} delay={index * 0.1}>
              <article className="group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-sm shadow-deep/5 transition-shadow duration-300 hover:shadow-lg hover:shadow-deep/10">
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={yogaClass.imageUrl}
                    alt={yogaClass.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <h3 className="font-display text-2xl font-medium text-deep">
                    {yogaClass.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/90">
                    {yogaClass.description}
                  </p>
                  <div className="mt-5 flex items-center justify-between border-t border-linen pt-4 text-xs text-ink/70">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock className="h-3.5 w-3.5 text-teal" />
                      {t("minutes", { count: yogaClass.durationMin })}
                    </span>
                    <span className="rounded-full bg-deep px-3 py-1 font-medium text-sand">
                      {t(`level.${yogaClass.level}`)}
                    </span>
                  </div>
                </div>
              </article>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="mt-12 text-center">
          <Button asChild variant="outline" size="lg">
            <a href="#horarios">{t("cta")}</a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
