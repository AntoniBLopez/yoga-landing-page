import type { Locale, PricingPlan } from "@/domain/entities";
import type { PricingPlanRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";

export class PayloadPricingPlanRepository implements PricingPlanRepository {
  async findAll(locale: Locale): Promise<PricingPlan[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pricing-plans",
      locale,
      sort: "order",
      limit: 100,
    });

    return docs.map((doc) => ({
      id: String(doc.id),
      slug: doc.slug,
      name: doc.name,
      price: doc.price,
      currency: doc.currency,
      period: doc.period,
      features: (doc.features ?? []).map((f) => f.text),
      featured: doc.featured ?? false,
      order: doc.order ?? 0,
    }));
  }
}
