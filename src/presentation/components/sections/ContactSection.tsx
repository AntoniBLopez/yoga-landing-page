"use client";

import { Mail, MapPin, Phone } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";

import { CONTACT_EMAIL, SOCIAL_LINKS, WHATSAPP_PHONE_DISPLAY } from "@/config/contact";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { getWhatsAppChatUrl } from "@/presentation/lib/whatsapp";

import { ContactForm } from "./ContactForm";

const CONTACT_IMAGE = "/images/contacto-orilla.jpg";

export function ContactSection() {
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
      <div className="mx-auto max-w-6xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        <div className="grid gap-12 lg:grid-cols-5">
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

            <div className="relative mt-10 hidden aspect-[4/3] overflow-hidden rounded-2xl lg:block">
              <Image
                src={CONTACT_IMAGE}
                alt={t("imageAlt")}
                fill
                sizes="(max-width: 1024px) 0vw, 33vw"
                className="object-cover"
              />
            </div>
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
