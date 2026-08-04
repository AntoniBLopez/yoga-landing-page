"use client";

import { Check } from "lucide-react";
import { useTranslations } from "next-intl";

import type { PricingPlan } from "@/domain/entities";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { cn } from "@/presentation/lib/utils";
import { useContactLinks } from "@/presentation/hooks/useContactLinks";

export function PricingSection({
  plans,
  showHeading = true,
}: {
  plans: PricingPlan[];
  showHeading?: boolean;
}) {
  const t = useTranslations("pricing");
  const contact = useContactLinks();

  return (
    <section id="precios" className="bg-sky/50">
      <div
        className={
          showHeading
            ? "mx-auto max-w-6xl px-5 py-20 md:px-8 lg:py-28"
            : "mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-20"
        }
      >
        {showHeading ? (
          <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />
        ) : null}

        <div
          className={cn(
            "grid items-stretch gap-6",
            plans.length >= 4 && "sm:grid-cols-2 xl:grid-cols-4",
            plans.length === 3 && "md:grid-cols-3",
            plans.length === 2 && "mx-auto max-w-4xl md:grid-cols-2",
            plans.length === 1 && "mx-auto max-w-md",
          )}
        >
          {plans.map((plan, index) => (
            <FadeIn key={plan.id} delay={index * 0.1} className="h-full">
              <article
                className={cn(
                  "relative flex h-full flex-col rounded-2xl p-8",
                  plan.featured
                    ? "bg-deep text-sand shadow-xl shadow-deep/25"
                    : "border border-linen bg-white text-ink shadow-sm shadow-deep/5",
                )}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-teal px-4 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-white">
                    {t("popular")}
                  </span>
                ) : null}

                <h3
                  className={cn(
                    "font-display text-2xl font-medium",
                    plan.featured ? "text-sand" : "text-deep",
                  )}
                >
                  {plan.name}
                </h3>

                <p className="mt-4 flex items-baseline gap-1">
                  <span
                    className={cn(
                      "font-display text-5xl font-semibold",
                      plan.featured ? "text-sand" : "text-deep",
                    )}
                  >
                    {plan.price}
                    {plan.currency}
                  </span>
                  <span className={cn("text-sm", plan.featured ? "text-aqua" : "text-ink/60")}>
                    {plan.period === "monthly" ? t("perMonth") : t("single")}
                  </span>
                </p>

                <ul className="mt-6 flex-1 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2.5 text-sm">
                      <Check
                        className={cn(
                          "mt-0.5 h-4 w-4 shrink-0",
                          plan.featured ? "text-aqua" : "text-teal",
                        )}
                      />
                      <span className={plan.featured ? "text-sky" : undefined}>{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  asChild
                  variant={plan.featured ? "light" : "outline"}
                  className="mt-8 w-full"
                >
                  <a
                    href={contact.whatsappUrl(
                      t("whatsappMessage", {
                        planName: plan.name,
                        priceLabel:
                          plan.period === "monthly"
                            ? `${plan.price}${plan.currency}${t("perMonth")}`
                            : `${plan.price}${plan.currency} (${t("single")})`,
                      }),
                    )}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("cta")}
                  </a>
                </Button>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
