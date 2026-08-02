"use client";

import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

import type { ScheduleDay } from "@/application/use-cases/get-schedule";
import type { ScheduleSlot, Weekday } from "@/domain/entities";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { cn } from "@/presentation/lib/utils";
import { buildWhatsAppUrl } from "@/presentation/lib/whatsapp";

function SlotRow({
  slot,
  bookLabel,
  whatsappMessage,
  compact = false,
}: {
  slot: ScheduleSlot;
  bookLabel: string;
  whatsappMessage: string;
  compact?: boolean;
}) {
  return (
    <li className={cn("relative pl-8 last:pb-0 md:pl-10", compact ? "pb-7" : "pb-10")}>
      <span
        className="absolute top-1.5 -left-[5px] h-2.5 w-2.5 rounded-full border-2 border-teal bg-sky"
        aria-hidden
      />

      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <time
            className={cn(
              "font-display block leading-none font-medium text-deep tabular-nums",
              compact ? "text-3xl" : "text-4xl md:text-5xl",
            )}
          >
            {slot.time}
          </time>
          <p className={cn("font-medium text-ink", compact ? "mt-2 text-sm" : "mt-3 text-base md:text-lg")}>
            {slot.className}
          </p>
          <p className="mt-1 text-sm text-ink/55">{slot.durationMin} min</p>
        </div>

        <Button asChild variant="primary" size="sm">
          <a href={buildWhatsAppUrl(whatsappMessage)} target="_blank" rel="noopener noreferrer">
            {bookLabel}
          </a>
        </Button>
      </div>
    </li>
  );
}

export function ScheduleSection({ schedule }: { schedule: ScheduleDay[] }) {
  const t = useTranslations("schedule");
  const [activeDay, setActiveDay] = useState<Weekday>(() => {
    const sunday = schedule.find((day) => day.day === "sunday");
    return sunday?.day ?? schedule[0]?.day ?? "sunday";
  });
  const scrollerRef = useRef<HTMLDivElement>(null);

  const activeIndex = Math.max(
    0,
    schedule.findIndex((day) => day.day === activeDay),
  );
  const current = schedule[activeIndex];

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;
    const active = scroller.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!active) return;
    const left = active.offsetLeft - (scroller.clientWidth - active.offsetWidth) / 2;
    scroller.scrollTo({ left: Math.max(0, left), behavior: "smooth" });
  }, [activeDay]);

  if (!current) return null;

  const messageFor = (slot: ScheduleSlot, day: Weekday) =>
    t("whatsappMessage", {
      className: slot.className,
      day: t(`days.${day}`).toLowerCase(),
      time: slot.time,
    });

  return (
    <section id="horarios" className="bg-sky/35">
      <div className="mx-auto max-w-3xl px-5 py-20 md:px-8 lg:py-28">
        <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />

        {/* Mobile: all days stacked */}
        <div className="space-y-10 md:hidden">
          {schedule.map((day, index) => (
            <FadeIn key={day.day} delay={index * 0.04}>
              <div className="flex items-center gap-3">
                <span className="h-px w-5 bg-teal" aria-hidden />
                <h3 className="font-display text-xl font-medium tracking-wide text-deep">
                  {t(`days.${day.day}`)}
                </h3>
                <span className="h-px flex-1 bg-linen" aria-hidden />
              </div>

              <ol className="relative mt-5 ml-3 border-l border-aqua/80">
                {day.slots.map((slot) => (
                  <SlotRow
                    key={slot.id}
                    slot={slot}
                    bookLabel={t("book")}
                    whatsappMessage={messageFor(slot, day.day)}
                    compact
                  />
                ))}
              </ol>
            </FadeIn>
          ))}
        </div>

        {/* Desktop: day tabs + timeline */}
        <div className="hidden md:block">
          <FadeIn>
            <div
              ref={scrollerRef}
              role="tablist"
              aria-label={t("title")}
              className="flex gap-1 overflow-x-auto border-b border-linen pb-px [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {schedule.map((day) => {
                const selected = day.day === current.day;
                return (
                  <button
                    key={day.day}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActiveDay(day.day)}
                    className={cn(
                      "relative shrink-0 cursor-pointer px-4 py-3 text-xs font-medium uppercase tracking-[0.18em] transition-colors",
                      selected ? "text-deep" : "text-ink/45 hover:text-deep",
                    )}
                  >
                    {t(`days.${day.day}`)}
                    {selected ? (
                      <span className="absolute inset-x-3 -bottom-px h-0.5 bg-teal" aria-hidden />
                    ) : null}
                  </button>
                );
              })}
            </div>
          </FadeIn>

          <FadeIn key={current.day} className="mt-10" y={16}>
            <ol className="relative ml-4 border-l border-aqua/80">
              {current.slots.map((slot) => (
                <SlotRow
                  key={slot.id}
                  slot={slot}
                  bookLabel={t("book")}
                  whatsappMessage={messageFor(slot, current.day)}
                />
              ))}
            </ol>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
