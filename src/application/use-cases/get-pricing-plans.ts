import type { Locale, PricingPlan } from "@/domain/entities";
import type { PricingPlanRepository } from "@/domain/repositories";
import { getPricingPlanRepository } from "@/infrastructure/repositories/createRepositories";

export async function getPricingPlans(
  locale: Locale,
  repository?: PricingPlanRepository,
): Promise<PricingPlan[]> {
  const repo = repository ?? (await getPricingPlanRepository());
  return repo.findAll(locale);
}
