import type { Locale, Teacher } from "@/domain/entities";
import type { TeacherRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";
import { resolveImageUrl } from "./media";

export class PayloadTeacherRepository implements TeacherRepository {
  async findAll(locale: Locale): Promise<Teacher[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "teachers",
      locale,
      limit: 100,
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      slug: doc.slug,
      name: doc.name,
      role: doc.role,
      bio: doc.bio,
      imageUrl: resolveImageUrl(doc.photo, doc.imageUrl),
    }));
  }
}
