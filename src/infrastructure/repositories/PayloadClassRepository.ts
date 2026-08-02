import type { Locale, YogaClass } from "@/domain/entities";
import type { ClassRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";
import { resolveImageUrl } from "./media";

export class PayloadClassRepository implements ClassRepository {
  async findAll(locale: Locale): Promise<YogaClass[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "classes",
      locale,
      sort: "order",
      limit: 100,
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      slug: doc.slug,
      title: doc.title,
      description: doc.description,
      durationMin: doc.durationMin,
      level: doc.level,
      imageUrl: resolveImageUrl(doc.image, doc.imageUrl),
      order: doc.order ?? 0,
    }));
  }
}
