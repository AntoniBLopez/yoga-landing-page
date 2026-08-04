"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { useSite } from "@/presentation/components/providers/SiteProvider";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { useContactLinks } from "@/presentation/hooks/useContactLinks";

import { ContactForm } from "./ContactForm";

export function ContactSection({ pageMode = false }: { pageMode?: boolean }) {
  const t = useTranslations("contact");
  const site = useSite();
  const contact = useContactLinks();
  const contactImage = site.images.contactUrl;

  const items = [
    { Icon: MapPin, text: contact.address || t("address") },
    {
      Icon: Mail,
      text: contact.email,
      href: contact.emailHref,
    },
    {
      Icon: Phone,
      text: contact.whatsappDisplay,
      href: contact.whatsappChatUrl,
    },
  ];

  return (
    <section id="contacto" className="bg-white">
      {!pageMode ? (
        <div className="relative overflow-hidden lg:hidden">
          <Image
            src={contactImage}
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
                  src={contactImage}
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
    </section>
  );
}
