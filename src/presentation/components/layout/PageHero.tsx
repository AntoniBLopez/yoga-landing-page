import Image from "next/image";

import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { cn } from "@/presentation/lib/utils";

export function PageHero({
  label,
  title,
  subtitle,
  tone = "sky",
  image,
  imageAlt = "",
}: {
  label: string;
  title: string;
  subtitle?: string;
  tone?: "sky" | "sand" | "white";
  image?: string;
  imageAlt?: string;
}) {
  return (
    <header
      className={cn(
        "relative overflow-hidden pt-28 pb-12 md:pt-32 md:pb-16",
        !image && tone === "sky" && "bg-gradient-to-b from-sky/45 to-sand",
        !image && tone === "sand" && "bg-sand",
        !image && tone === "white" && "bg-white",
        image && "bg-deep",
      )}
    >
      {image ? (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
          <div aria-hidden className="absolute inset-0 bg-white/55 backdrop-blur-[2px]" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent"
          />
        </>
      ) : (
        <div
          aria-hidden
          className="pointer-events-none absolute -top-24 left-1/2 h-56 w-[28rem] -translate-x-1/2 rounded-full bg-aqua/25 blur-3xl"
        />
      )}
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <SectionHeading
          label={label}
          title={title}
          subtitle={subtitle}
          className="mb-0"
        />
      </div>
    </header>
  );
}
