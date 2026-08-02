import type { Locale, Review } from "@/domain/entities";
import type { ReviewRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";

export class PayloadReviewRepository implements ReviewRepository {
  async findAll(locale: Locale): Promise<Review[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "reviews",
      locale,
      limit: 100,
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      author: doc.author,
      context: doc.context ?? "",
      text: doc.text,
      rating: doc.rating,
    }));
  }
}
