"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";

import { useSite } from "@/presentation/components/providers/SiteProvider";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";

/** Visual variety when reusing the same studio photo (or as fallback). */
const CROP_CLASSES = [
  "object-[center_45%]",
  "object-[30%_70%]",
  "object-[75%_25%]",
  "object-[50%_20%]",
  "object-[20%_50%]",
  "object-[80%_60%]",
] as const;

export function StudioGallery() {
  const t = useTranslations("studio");
  const site = useSite();

  const fromCms = site.images.studioGallery;
  const items =
    fromCms.length > 0
      ? fromCms
      : [
          {
            url: site.images.studioUrl,
            alt: t("imageAlt"),
            featured: true,
          },
          {
            url: site.images.studioUrl,
            alt: t("imageAlt"),
            featured: false,
          },
          {
            url: site.images.studioUrl,
            alt: t("imageAlt"),
            featured: false,
          },
        ];

  const hasFeatured = items.some((item) => item.featured);
  const tiles = hasFeatured
    ? items
    : items.map((item, index) => ({ ...item, featured: index === 0 }));

  return (
    <section className="bg-sand">
      <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
        <SectionHeading
          label={t("galleryLabel")}
          title={t("galleryTitle")}
          subtitle={t("gallerySubtitle")}
        />

        <div className="grid auto-rows-[14rem] gap-3 sm:auto-rows-[16rem] md:grid-cols-3 md:auto-rows-[12rem] md:gap-4 lg:auto-rows-[14rem]">
          {tiles.map((item, index) => (
            <FadeIn
              key={`${item.url}-${index}`}
              delay={index * 0.08}
              className={`relative overflow-hidden rounded-2xl ${
                item.featured ? "md:col-span-2 md:row-span-2" : ""
              }`}
            >
              <Image
                src={item.url}
                alt={item.alt || t("imageAlt")}
                fill
                sizes={
                  item.featured
                    ? "(max-width: 768px) 100vw, 66vw"
                    : "(max-width: 768px) 100vw, 33vw"
                }
                className={`object-cover ${CROP_CLASSES[index % CROP_CLASSES.length]}`}
                priority={index === 0}
              />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
