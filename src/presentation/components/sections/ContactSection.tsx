"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { CONTACT_EMAIL, SOCIAL_LINKS, WHATSAPP_PHONE_DISPLAY } from "@/config/contact";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { getWhatsAppChatUrl } from "@/presentation/lib/whatsapp";

import { ContactForm } from "./ContactForm";

const CONTACT_IMAGE = "/images/contacto-orilla-3.png";

export function ContactSection({ pageMode = false }: { pageMode?: boolean }) {
  const t = useTranslations("contact");

  const items = [
    { Icon: MapPin, text: t("address") },
    { Icon: Mail, text: CONTACT_EMAIL, href: SOCIAL_LINKS.email },
    {
      Icon: Phone,
      text: WHATSAPP_PHONE_DISPLAY,
      href: getWhatsAppChatUrl(),
    },
  ];

  return (
    <section id="contacto" className="bg-white">
      {/* Landing only: shoreline behind the section heading on mobile */}
      {!pageMode ? (
        <div className="relative overflow-hidden lg:hidden">
          <Image
            src={CONTACT_IMAGE}
            alt=""
            fill
            sizes="100vw"
            aria-hidden
            className="object-cover object-center"
          />
          <div
            aria-hidden
            className="absolute inset-0 bg-white/55 backdrop-blur-[2px]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent"
          />
          <div className="relative z-10 px-5 pt-16 pb-10">
            <SectionHeading
              label={t("label")}
              title={t("title")}
              subtitle={t("subtitle")}
              className="mb-0"
            />
          </div>
        </div>
      ) : null}

      <div
        className={
          pageMode
            ? "mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16 lg:py-20"
            : "mx-auto max-w-6xl px-5 py-12 md:px-8 lg:py-28"
        }
      >
        {!pageMode ? (
          <div className="hidden lg:block">
            <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />
          </div>
        ) : null}

        <div
          className={
            pageMode
              ? "grid items-center gap-12 lg:grid-cols-5"
              : "grid gap-12 lg:grid-cols-5"
          }
        >
          <FadeIn className="lg:col-span-2">
            <ul className="space-y-6">
              {items.map(({ Icon, text, href }) => (
                <li key={text} className="flex items-center gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sky text-deep">
                    <Icon className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  {href ? (
                    <a href={href} className="text-sm text-ink transition-colors hover:text-teal">
                      {text}
                    </a>
                  ) : (
                    <span className="text-sm text-ink">{text}</span>
                  )}
                </li>
              ))}
            </ul>

            {!pageMode ? (
              <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
                <Image
                  src={CONTACT_IMAGE}
                  alt={t("imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 0vw, 33vw"
                  className="object-cover"
                />
              </div>
            ) : null}
          </FadeIn>

          <FadeIn delay={0.15} className="lg:col-span-3">
            <div className="rounded-3xl bg-sand p-6 md:p-10">
              <ContactForm />
            </div>
          </FadeIn>
        </div>
      </div>

      {/* Soft shoreline into the sand body / footer */}
      <div className="pointer-events-none relative leading-none" aria-hidden>
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="block h-16 w-full md:h-24"
        >
          {/* Foam / water line */}
          <path
            className="fill-aqua/45"
            d="M0 42c110 26 210-18 330-8 120 10 170 38 290 30 120-8 170-46 290-36 120 10 170 42 290 34 120-8 160-30 240-22v18c-80-10-130 8-240 16-120 10-170-20-290-12-120 8-170 40-290 32-120-8-170-34-290-26-120 8-200 28-330 6V42Z"
          />
          {/* Sand dunes */}
          <path
            className="fill-sand"
            d="M0 58c120 30 220-14 340-4 120 10 180 42 300 32 120-10 180-50 300-38 120 12 180 46 300 36 120-10 160-32 200-24V120H0V58Z"
          />
        </svg>
      </div>
    </section>
  );
}
