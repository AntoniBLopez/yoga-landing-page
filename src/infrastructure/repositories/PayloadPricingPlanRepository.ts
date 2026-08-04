import type { Locale, PricingPlan } from "@/domain/entities";
import type { PricingPlanRepository } from "@/domain/repositories";

import { getPayloadClient } from "../payload/client";

const MAX_VISIBLE_PLANS = 4;

export class PayloadPricingPlanRepository implements PricingPlanRepository {
  async findAll(locale: Locale): Promise<PricingPlan[]> {
    const payload = await getPayloadClient();
    const { docs } = await payload.find({
      collection: "pricing-plans",
      locale,
      sort: "order",
      limit: MAX_VISIBLE_PLANS,
      where: {
        or: [{ visible: { equals: true } }, { visible: { exists: false } }],
      },
    });

    return docs
      .filter((doc) => doc.visible !== false)
      .slice(0, MAX_VISIBLE_PLANS)
      .map((doc) => ({
        id: String(doc.id),
        slug: doc.slug,
        name: doc.name,
        price: doc.price,
        currency: doc.currency,
        period: doc.period,
        features: (doc.features ?? []).map((f) => f.text),
        featured: doc.featured ?? false,
        visible: doc.visible !== false,
        order: doc.order ?? 0,
      }));
  }
}
