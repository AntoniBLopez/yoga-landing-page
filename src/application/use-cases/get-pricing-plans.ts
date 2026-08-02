import type { Locale, PricingPlan } from "@/domain/entities";
import type { PricingPlanRepository } from "@/domain/repositories";
import { PayloadPricingPlanRepository } from "@/infrastructure/repositories/PayloadPricingPlanRepository";

const defaultRepository: PricingPlanRepository = new PayloadPricingPlanRepository();

export function getPricingPlans(
  locale: Locale,
  repository: PricingPlanRepository = defaultRepository,
): Promise<PricingPlan[]> {
  return repository.findAll(locale);
}
