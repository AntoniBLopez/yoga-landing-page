import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Cormorant_Garamond, Jost } from "next/font/google";
import { Toaster } from "sonner";

import { getSiteSettings } from "@/application/use-cases/get-site-settings";
import type { Locale } from "@/domain/entities";
import { SiteProvider } from "@/presentation/components/providers/SiteProvider";
import { SmoothScroll } from "@/presentation/components/providers/SmoothScroll";
import { siteColorStyle } from "@/presentation/lib/site-theme";

import "../globals.css";

const displayFont = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const sansFont = Jost({
  subsets: ["latin"],
  variable: "--font-jost",
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("meta");
  return {
    title: t("title"),
    description: t("description"),
  };
}

export default async function FrontendLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const locale = (await getLocale()) as Locale;
  const messages = await getMessages();
  const settings = await getSiteSettings(locale);

  return (
    <html
      lang={locale}
      className={`${displayFont.variable} ${sansFont.variable} antialiased`}
      style={siteColorStyle(settings.colors)}
    >
      <body className="bg-sand font-sans text-ink">
        <NextIntlClientProvider locale={locale} messages={messages}>
          <SiteProvider settings={settings}>
            <SmoothScroll>{children}</SmoothScroll>
            <Toaster position="bottom-right" richColors />
          </SiteProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
