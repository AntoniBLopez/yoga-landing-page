"use client";

import { useTranslations } from "next-intl";
import type { SVGProps } from "react";

import { getWhatsAppChatUrl } from "@/presentation/lib/whatsapp";
import { Logo } from "@/presentation/components/ui/Logo";

const NAV_ITEMS = [
  { key: "classes", href: "/#clases" },
  { key: "schedule", href: "/#horarios" },
  { key: "about", href: "/#sobre-mi" },
  { key: "blog", href: "/blog" },
  { key: "pricing", href: "/#precios" },
  { key: "contact", href: "/#contacto" },
] as const;

function iconProps(props: SVGProps<SVGSVGElement>) {
  return {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-4 w-4 shrink-0",
    "aria-hidden": true as const,
    ...props,
  };
}

function FacebookIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function InstagramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
    </svg>
  );
}

function MailIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m3 7 9 6 9-6" />
    </svg>
  );
}

function WhatsAppIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps(props)}>
      <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.2-5.4A8.4 8.4 0 1 1 21 11.5Z" />
      <path d="M9.5 10.5c.4 1.6 2.1 3.3 3.7 3.7.3.1.7 0 .9-.2l.8-.9c.1-.2.1-.4 0-.6l-.5-.7c-.1-.2-.4-.3-.6-.2l-.7.3c-.2.1-.4 0-.5-.1-.4-.3-.9-.8-1.1-1.3-.1-.2 0-.4.1-.5l.3-.7c.1-.2 0-.5-.2-.6l-.7-.5c-.2-.1-.4-.1-.6 0l-.9.8c-.2.2-.3.6-.2.9Z" />
    </svg>
  );
}

function SpotifyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg {...iconProps({ ...props, fill: "currentColor", stroke: "none" })}>
      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm4.6 14.4a.7.7 0 0 1-1 .2c-2.6-1.6-5.9-2-9-1.1a.7.7 0 1 1-.4-1.4c3.4-1 7.1-.5 10 1.3a.7.7 0 0 1 .4 1Zm1.3-2.8a.9.9 0 0 1-1.2.3c-3-1.8-7.5-2.4-11-1.3a.9.9 0 1 1-.5-1.7c4-.1 8.9.6 12.4 2.7a.9.9 0 0 1 .3 1Zm.1-2.9C14.4 8.7 8.5 8.5 5.4 9.5a1 1 0 1 1-.6-2c3.6-1.1 10.1-.9 14.1 1.5a1 1 0 1 1-1 1.7Z" />
    </svg>
  );
}

const SOCIAL = [
  { key: "facebook", href: "https://www.facebook.com/", Icon: FacebookIcon },
  { key: "instagram", href: "https://www.instagram.com/cyaneyoga/", Icon: InstagramIcon },
  { key: "email", href: "mailto:hola@blauyoga.com", Icon: MailIcon },
  { key: "whatsapp", href: getWhatsAppChatUrl(), Icon: WhatsAppIcon },
  {
    key: "spotify",
    href: "https://open.spotify.com/playlist/37i9dQZF1DX9uKNf5jGX6m",
    Icon: SpotifyIcon,
  },
] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="bg-deep text-sky">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8 md:py-16">
        <div className="grid gap-12 md:grid-cols-3 md:gap-10">
          <div className="flex flex-col items-start gap-4 md:max-w-xs">
            <Logo tone="dark" tagline={t("tagline")} />
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-aqua">
              {t("explore")}
            </p>
            <nav className="flex flex-col gap-3">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className="w-fit text-sm text-sky/85 transition-colors hover:text-aqua"
                >
                  {tNav(item.key)}
                </a>
              ))}
            </nav>
          </div>

          <div>
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.28em] text-aqua">
              {t("follow")}
            </p>
            <ul className="flex flex-col gap-3">
              {SOCIAL.map(({ key, href, Icon }) => (
                <li key={key}>
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="inline-flex items-center gap-3 text-sm text-sky/85 transition-colors hover:text-aqua"
                  >
                    <Icon />
                    {t(`social.${key}`)}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-sky/15 pt-8">
          <p className="text-center text-[11px] uppercase tracking-[0.22em] text-aqua/70">
            {t("values")}
          </p>
          <p className="mt-4 text-center text-xs text-sky/50">
            {t("rights", { year: new Date().getFullYear() })}
          </p>
        </div>
      </div>
    </footer>
  );
}
