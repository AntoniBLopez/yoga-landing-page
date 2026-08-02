"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { Button } from "@/presentation/components/ui/Button";

const HERO_IMAGE = "/images/hero.png";

export function Hero() {
  const t = useTranslations("hero");

  return (
    <section id="inicio" className="relative bg-sand">
      <div className="relative min-h-[78dvh] w-full overflow-hidden md:min-h-[100dvh]">
        <Image
          src={HERO_IMAGE}
          alt={t("imageAlt")}
          fill
          priority
          sizes="100vw"
          className="object-cover object-[82%_42%] sm:object-[72%_40%] md:object-[center_40%]"
        />

        <div className="relative z-10 mx-auto flex min-h-[78dvh] max-w-7xl items-center px-5 pt-28 pb-24 md:min-h-[100dvh] md:px-8 md:pb-28">
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
            className="relative max-w-xl"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -inset-x-4 -inset-y-6 -z-10 rounded-[2rem] bg-white/55 blur-2xl md:hidden"
            />
            <p className="mb-5 text-xs font-medium uppercase tracking-[0.35em] text-deep">
              {t("eyebrow")}
            </p>
            <h1 className="font-display text-5xl leading-[1.08] font-medium text-deep md:text-6xl lg:text-7xl">
              {t("title")}
            </h1>
            <p className="mt-6 max-w-md text-lg text-ink">{t("subtitle")}</p>
            <Button asChild size="lg" variant="primary" className="mt-9">
              <a href="#horarios">{t("cta")}</a>
            </Button>
          </motion.div>
        </div>

        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 z-20 block h-14 w-full text-sand md:h-20"
          aria-hidden="true"
        >
          <path
            d="M0,72 C180,110 360,20 540,48 C720,76 900,16 1080,52 C1200,76 1320,96 1440,64 L1440,120 L0,120 Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </section>
  );
}
