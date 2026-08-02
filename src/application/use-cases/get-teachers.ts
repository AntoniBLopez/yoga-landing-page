import type { Locale, Teacher } from "@/domain/entities";
import type { TeacherRepository } from "@/domain/repositories";
import { getTeacherRepository } from "@/infrastructure/repositories/createRepositories";

export async function getTeachers(
  locale: Locale,
  repository?: TeacherRepository,
): Promise<Teacher[]> {
  const repo = repository ?? (await getTeacherRepository());
  return repo.findAll(locale);
}
