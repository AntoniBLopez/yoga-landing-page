"use client";

import { useTranslations } from "next-intl";

import type { ScheduleDay } from "@/application/use-cases/get-schedule";
import type { ScheduleSlot, Weekday } from "@/domain/entities";
import { Button } from "@/presentation/components/ui/Button";
import { FadeIn } from "@/presentation/components/ui/FadeIn";
import { SectionHeading } from "@/presentation/components/ui/SectionHeading";
import { useContactLinks } from "@/presentation/hooks/useContactLinks";

function SlotRow({
  slot,
  bookLabel,
  whatsappHref,
}: {
  slot: ScheduleSlot;
  bookLabel: string;
  whatsappHref: string;
}) {
  return (
    <li className="flex flex-col gap-3 border-b border-linen/80 py-4 last:border-b-0 last:pb-0 first:pt-0 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
      <div className="flex min-w-0 items-baseline gap-4 sm:gap-5">
        <time className="font-display w-[4.5rem] shrink-0 text-[1.75rem] leading-none font-medium text-deep tabular-nums md:text-3xl">
          {slot.time}
        </time>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink md:text-base">{slot.className}</p>
          <p className="mt-0.5 text-xs text-ink/50">{slot.durationMin} min</p>
        </div>
      </div>

      <Button asChild variant="primary" size="sm" className="self-start sm:self-auto">
        <a href={whatsappHref} target="_blank" rel="noopener noreferrer">
          {bookLabel}
        </a>
      </Button>
    </li>
  );
}

export function ScheduleSection({
  schedule,
  showHeading = true,
}: {
  schedule: ScheduleDay[];
  showHeading?: boolean;
}) {
  const t = useTranslations("schedule");
  const contact = useContactLinks();

  if (schedule.length === 0) return null;

  const messageFor = (slot: ScheduleSlot, day: Weekday) =>
    t("whatsappMessage", {
      className: slot.className,
      day: t(`days.${day}`).toLowerCase(),
      time: slot.time,
    });

  return (
    <section id="horarios" className="bg-sky/35">
      <div
        className={
          showHeading
            ? "mx-auto max-w-5xl px-5 py-20 md:px-8 lg:py-28"
            : "mx-auto max-w-5xl px-5 pb-20 pt-10 md:px-8 md:pb-28 md:pt-12"
        }
      >
        {showHeading ? (
          <SectionHeading label={t("label")} title={t("title")} subtitle={t("subtitle")} />
        ) : null}

        <div className="grid gap-8 md:gap-10 lg:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
          {schedule.map((day, index) => (
            <FadeIn key={day.day} delay={index * 0.05}>
              <article className="rounded-2xl bg-white/70 px-5 py-6 shadow-sm shadow-deep/5 md:px-6 md:py-7">
                <div className="flex items-center gap-3">
                  <span className="h-px w-5 shrink-0 bg-teal" aria-hidden />
                  <h3 className="font-display text-2xl font-medium tracking-wide text-deep">
                    {t(`days.${day.day}`)}
                  </h3>
                  <span className="h-px flex-1 bg-linen" aria-hidden />
                </div>

                <ul className="mt-5">
                  {day.slots.map((slot) => (
                    <SlotRow
                      key={slot.id}
                      slot={slot}
                      bookLabel={t("book")}
                      whatsappHref={contact.whatsappUrl(messageFor(slot, day.day))}
                    />
                  ))}
                </ul>
              </article>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
