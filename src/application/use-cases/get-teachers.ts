import type { Locale, Teacher } from "@/domain/entities";
import type { TeacherRepository } from "@/domain/repositories";
import { PayloadTeacherRepository } from "@/infrastructure/repositories/PayloadTeacherRepository";

const defaultRepository: TeacherRepository = new PayloadTeacherRepository();

export function getTeachers(
  locale: Locale,
  repository: TeacherRepository = defaultRepository,
): Promise<Teacher[]> {
  return repository.findAll(locale);
}
