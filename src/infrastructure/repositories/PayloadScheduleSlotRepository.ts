import type { Locale, ScheduleSlot } from "@/domain/entities";
import type { ScheduleSlotRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";

export class PayloadScheduleSlotRepository implements ScheduleSlotRepository {
  async findAll(locale: Locale): Promise<ScheduleSlot[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "schedule-slots",
      locale,
      depth: 1,
      sort: "time",
      limit: 200,
    });

    return docs.flatMap((doc) => {
      if (typeof doc.class !== "object" || doc.class === null) return [];
      return [
        {
          id: String(doc.id),
          day: doc.day,
          time: doc.time,
          className: doc.class.title,
          classSlug: doc.class.slug,
          durationMin: doc.class.durationMin,
        },
      ];
    });
  }
}
