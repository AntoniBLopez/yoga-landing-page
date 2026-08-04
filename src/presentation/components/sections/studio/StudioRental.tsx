"use client";

import { ArrowUpRight, Sun, Users, Waves } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { useContactLinks } from "@/presentation/hooks/useContactLinks";

const HIGHLIGHTS = [
  { key: "light", Icon: Sun },
  { key: "equip", Icon: Waves },
  { key: "groups", Icon: Users },
] as const;

export function StudioRental() {
  const t = useTranslations("studio.rental");
  const contact = useContactLinks();

  return (
    <section id="alquiler" className="bg-sky/40 scroll-mt-28">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 lg:py-28">
        <FadeIn>
          <div className="text-center">
            <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-teal">
              {t("label")}
            </p>
            <h2 className="mt-3 font-display text-3xl font-medium leading-tight text-deep md:text-5xl">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-ink/80 md:text-base">
              {t("text")}
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <ul className="mx-auto mt-10 grid max-w-2xl gap-4 sm:grid-cols-3">
            {HIGHLIGHTS.map(({ key, Icon }) => (
              <li key={key} className="flex flex-col items-center gap-3 text-center">
                <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-deep">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <p className="text-sm text-ink/80">{t(`highlights.${key}`)}</p>
              </li>
            ))}
          </ul>
        </FadeIn>

        <FadeIn delay={0.18} className="mt-10 flex justify-center">
          <Button asChild variant="primary" size="lg">
            <a
              href={contact.whatsappUrl(t("whatsappMessage"))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              {t("cta")}
              <ArrowUpRight className="h-4 w-4" />
            </a>
          </Button>
        </FadeIn>
      </div>
    </section>
  );
}
