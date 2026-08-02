"use client";

import { Quote as QuoteIcon, Star } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Review } from "@/domain/entities";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

export function ReviewsSection({ reviews }: { reviews: Review[] }) {
  const t = useTranslations("reviews");

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} />

        <div className="grid gap-6 md:grid-cols-3">
          {reviews.map((review, index) => (
            <FadeIn key={review.id} delay={index * 0.1} className="h-full">
              <figure className="flex h-full flex-col rounded-2xl bg-white p-8 shadow-sm shadow-deep/5">
                <QuoteIcon className="h-7 w-7 text-aqua" fill="currentColor" strokeWidth={0} />
                <div className="mt-4 flex gap-1" aria-label={`${review.rating}/5`}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-teal" fill="currentColor" strokeWidth={0} />
                  ))}
                </div>
                <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-ink/90">
                  {review.text}
                </blockquote>
                <figcaption className="mt-6 border-t border-linen pt-4">
                  <p className="font-display text-lg font-semibold text-deep">{review.author}</p>
                  <p className="text-xs uppercase tracking-[0.15em] text-ink/60">
                    {review.context}
                  </p>
                </figcaption>
              </figure>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
