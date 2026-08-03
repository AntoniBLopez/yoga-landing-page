"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

const FAQ_KEYS = ["beginner", "pack", "cancel"] as const;

export function PricingFaq() {
  const t = useTranslations("pricing.faq");

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 lg:py-24">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <FadeIn>
          <Accordion.Root type="single" collapsible className="space-y-3">
            {FAQ_KEYS.map((key) => (
              <Accordion.Item
                key={key}
                value={key}
                className="overflow-hidden rounded-2xl border border-linen bg-white"
              >
                <Accordion.Header>
                  <Accordion.Trigger className="group flex w-full cursor-pointer items-center justify-between gap-4 px-5 py-4 text-left md:px-6 md:py-5">
                    <span className="font-display text-lg font-medium text-deep md:text-xl">
                      {t(`items.${key}.question`)}
                    </span>
                    <ChevronDown
                      className="h-5 w-5 shrink-0 text-teal transition-transform duration-300 group-data-[state=open]:rotate-180"
                      strokeWidth={1.6}
                      aria-hidden
                    />
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden">
                  <p className="px-5 pb-5 text-sm leading-relaxed text-ink/85 md:px-6 md:pb-6 md:text-base">
                    {t(`items.${key}.answer`)}
                  </p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </FadeIn>
      </div>
    </section>
  );
}
