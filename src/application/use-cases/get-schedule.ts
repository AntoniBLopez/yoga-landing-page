import type { Locale, ScheduleSlot, Weekday } from "@/domain/entities";
import type { ScheduleSlotRepository } from "@/domain/repositories";
import { getScheduleSlotRepository } from "@/infrastructure/repositories/createRepositories";

const WEEKDAY_ORDER: Weekday[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
];

export interface ScheduleDay {
  day: Weekday;
  slots: ScheduleSlot[];
}

/**
 * Returns the weekly schedule grouped by day, in week order,
 * with each day's slots sorted by time.
 */
export async function getWeeklySchedule(
  locale: Locale,
  repository?: ScheduleSlotRepository,
): Promise<ScheduleDay[]> {
  const repo = repository ?? (await getScheduleSlotRepository());
  const slots = await repo.findAll(locale);

  return WEEKDAY_ORDER.flatMap((day) => {
    const daySlots = slots
      .filter((slot) => slot.day === day)
      .sort((a, b) => a.time.localeCompare(b.time));
    return daySlots.length > 0 ? [{ day, slots: daySlots }] : [];
  });
}
