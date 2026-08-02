import type { Locale, YogaClass } from "@/domain/entities";
import type { ClassRepository } from "@/domain/repositories";
import { getClassRepository } from "@/infrastructure/repositories/createRepositories";

export async function getClasses(
  locale: Locale,
  repository?: ClassRepository,
): Promise<YogaClass[]> {
  const repo = repository ?? (await getClassRepository());
  return repo.findAll(locale);
}
