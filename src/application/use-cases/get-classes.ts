import type { Locale, YogaClass } from "@/domain/entities";
import type { ClassRepository } from "@/domain/repositories";
import { PayloadClassRepository } from "@/infrastructure/repositories/PayloadClassRepository";

const defaultRepository: ClassRepository = new PayloadClassRepository();

export function getClasses(
  locale: Locale,
  repository: ClassRepository = defaultRepository,
): Promise<YogaClass[]> {
  return repository.findAll(locale);
}
