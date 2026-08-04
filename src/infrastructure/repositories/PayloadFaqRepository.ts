import type { Faq, Locale } from "@/domain/entities";
import type { FaqRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";

export class PayloadFaqRepository implements FaqRepository {
  async findVisible(locale: Locale): Promise<Faq[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "faqs",
      locale,
      limit: 100,
      sort: "order",
      where: {
        visible: { equals: true },
      },
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      question: doc.question,
      answer: doc.answer,
      visible: Boolean(doc.visible),
      order: doc.order ?? 0,
    }));
  }
}
