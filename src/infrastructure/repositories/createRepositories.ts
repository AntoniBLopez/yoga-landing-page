import { useStaticContent } from "@/config/content";
import type {
  ClassRepository,
  FaqRepository,
  PostRepository,
  PricingPlanRepository,
  ReviewRepository,
  ScheduleSlotRepository,
  TeacherRepository,
} from "@/domain/repositories";
import type { Locale } from "@/domain/entities";
import type { SiteContentMessages, SiteSettings } from "@/domain/site";

import {
  JsonClassRepository,
  JsonFaqRepository,
  JsonPostRepository,
  JsonPricingPlanRepository,
  JsonReviewRepository,
  JsonScheduleSlotRepository,
  JsonTeacherRepository,
} from "./JsonContentRepositories";
import { JsonSiteRepository } from "./JsonSiteRepository";

export interface SiteRepository {
  getSettings(locale: Locale): Promise<SiteSettings>;
  getContentMessages(locale: Locale): Promise<SiteContentMessages>;
}

let classRepo: ClassRepository | undefined;
let teacherRepo: TeacherRepository | undefined;
let scheduleRepo: ScheduleSlotRepository | undefined;
let pricingRepo: PricingPlanRepository | undefined;
let reviewRepo: ReviewRepository | undefined;
let faqRepo: FaqRepository | undefined;
let postRepo: PostRepository | undefined;
let siteRepo: SiteRepository | undefined;

export async function getClassRepository(): Promise<ClassRepository> {
  if (!classRepo) {
    if (useStaticContent()) {
      classRepo = new JsonClassRepository();
    } else {
      const { PayloadClassRepository } = await import("./PayloadClassRepository");
      classRepo = new PayloadClassRepository();
    }
  }
  return classRepo;
}

export async function getTeacherRepository(): Promise<TeacherRepository> {
  if (!teacherRepo) {
    if (useStaticContent()) {
      teacherRepo = new JsonTeacherRepository();
    } else {
      const { PayloadTeacherRepository } = await import("./PayloadTeacherRepository");
      teacherRepo = new PayloadTeacherRepository();
    }
  }
  return teacherRepo;
}

export async function getScheduleSlotRepository(): Promise<ScheduleSlotRepository> {
  if (!scheduleRepo) {
    if (useStaticContent()) {
      scheduleRepo = new JsonScheduleSlotRepository();
    } else {
      const { PayloadScheduleSlotRepository } = await import("./PayloadScheduleSlotRepository");
      scheduleRepo = new PayloadScheduleSlotRepository();
    }
  }
  return scheduleRepo;
}

export async function getPricingPlanRepository(): Promise<PricingPlanRepository> {
  if (!pricingRepo) {
    if (useStaticContent()) {
      pricingRepo = new JsonPricingPlanRepository();
    } else {
      const { PayloadPricingPlanRepository } = await import("./PayloadPricingPlanRepository");
      pricingRepo = new PayloadPricingPlanRepository();
    }
  }
  return pricingRepo;
}

export async function getReviewRepository(): Promise<ReviewRepository> {
  if (!reviewRepo) {
    if (useStaticContent()) {
      reviewRepo = new JsonReviewRepository();
    } else {
      const { PayloadReviewRepository } = await import("./PayloadReviewRepository");
      reviewRepo = new PayloadReviewRepository();
    }
  }
  return reviewRepo;
}

export async function getFaqRepository(): Promise<FaqRepository> {
  if (!faqRepo) {
    if (useStaticContent()) {
      faqRepo = new JsonFaqRepository();
    } else {
      const { PayloadFaqRepository } = await import("./PayloadFaqRepository");
      faqRepo = new PayloadFaqRepository();
    }
  }
  return faqRepo;
}

export async function getPostRepository(): Promise<PostRepository> {
  if (!postRepo) {
    if (useStaticContent()) {
      postRepo = new JsonPostRepository();
    } else {
      const { PayloadPostRepository } = await import("./PayloadPostRepository");
      postRepo = new PayloadPostRepository();
    }
  }
  return postRepo;
}

export async function getSiteRepository(): Promise<SiteRepository> {
  if (!siteRepo) {
    if (useStaticContent()) {
      siteRepo = new JsonSiteRepository();
    } else {
      const { PayloadSiteRepository } = await import("./PayloadSiteRepository");
      siteRepo = new PayloadSiteRepository();
    }
  }
  return siteRepo;
}
