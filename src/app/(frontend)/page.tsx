import { getLocale } from "next-intl/server";

import { getClasses } from "@/application/use-cases/get-classes";
import { getPricingPlans } from "@/application/use-cases/get-pricing-plans";
import { getReviews } from "@/application/use-cases/get-reviews";
import { getWeeklySchedule } from "@/application/use-cases/get-schedule";
import { getTeachers } from "@/application/use-cases/get-teachers";
import type { Locale } from "@/domain/entities";
import { AboutSection } from "@/presentation/components/sections/AboutSection";
import { ClassesSection } from "@/presentation/components/sections/ClassesSection";
import { ContactSection } from "@/presentation/components/sections/ContactSection";
import { Features } from "@/presentation/components/sections/Features";
import { Footer } from "@/presentation/components/sections/Footer";
import { Hero } from "@/presentation/components/sections/Hero";
import { Navbar } from "@/presentation/components/sections/Navbar";
import { PricingSection } from "@/presentation/components/sections/PricingSection";
import { Quote } from "@/presentation/components/sections/Quote";
import { ReviewsSection } from "@/presentation/components/sections/ReviewsSection";
import { ScheduleSection } from "@/presentation/components/sections/ScheduleSection";
import { Studio } from "@/presentation/components/sections/Studio";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const locale = (await getLocale()) as Locale;

  const [classes, teachers, schedule, plans, reviews] = await Promise.all([
    getClasses(locale),
    getTeachers(locale),
    getWeeklySchedule(locale),
    getPricingPlans(locale),
    getReviews(locale),
  ]);

  const founder = teachers[0];

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Studio />
        <Quote />
        <ClassesSection classes={classes} />
        <ScheduleSection schedule={schedule} />
        {founder ? <AboutSection teacher={founder} /> : null}
        <PricingSection plans={plans} />
        <ReviewsSection reviews={reviews} />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
