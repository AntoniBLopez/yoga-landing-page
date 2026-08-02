"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import * as Label from "@radix-ui/react-label";
import { Send } from "lucide-react";
import { useTranslations } from "next-intl";
import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { cn } from "@/presentation/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-linen bg-white px-4 py-3 text-sm text-deep placeholder:text-ink/40 transition-colors focus:border-teal focus:outline-none focus:ring-2 focus:ring-aqua/50";

export function ContactForm() {
  const t = useTranslations("contact.form");

  const schema = useMemo(
    () =>
      z.object({
        name: z.string().min(1, t("errors.nameRequired")),
        email: z.email(t("errors.emailInvalid")),
        message: z.string().min(10, t("errors.messageRequired")),
      }),
    [t],
  );

  type FormValues = z.infer<typeof schema>;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { name: "", email: "", message: "" },
  });

  async function onSubmit(values: FormValues) {
    try {
      // TODO: wire to Payload / email endpoint. Mocked for now.
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.info("Contact form submitted:", values);
      toast.success(t("success"));
      reset();
    } catch {
      toast.error(t("error"));
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <div>
        <Label.Root
          htmlFor="contact-name"
          className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-deep"
        >
          {t("name")}
        </Label.Root>
        <input
          id="contact-name"
          type="text"
          autoComplete="name"
          placeholder={t("namePlaceholder")}
          className={cn(inputClasses, errors.name && "border-red-400")}
          aria-invalid={Boolean(errors.name)}
          {...register("name")}
        />
        {errors.name ? <p className="mt-1.5 text-xs text-red-500">{errors.name.message}</p> : null}
      </div>

      <div>
        <Label.Root
          htmlFor="contact-email"
          className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-deep"
        >
          {t("email")}
        </Label.Root>
        <input
          id="contact-email"
          type="email"
          autoComplete="email"
          placeholder={t("emailPlaceholder")}
          className={cn(inputClasses, errors.email && "border-red-400")}
          aria-invalid={Boolean(errors.email)}
          {...register("email")}
        />
        {errors.email ? (
          <p className="mt-1.5 text-xs text-red-500">{errors.email.message}</p>
        ) : null}
      </div>

      <div>
        <Label.Root
          htmlFor="contact-message"
          className="mb-1.5 block text-xs font-medium uppercase tracking-[0.15em] text-deep"
        >
          {t("message")}
        </Label.Root>
        <textarea
          id="contact-message"
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={cn(inputClasses, "resize-none", errors.message && "border-red-400")}
          aria-invalid={Boolean(errors.message)}
          {...register("message")}
        />
        {errors.message ? (
          <p className="mt-1.5 text-xs text-red-500">{errors.message.message}</p>
        ) : null}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-deep px-6 py-3.5 text-xs font-semibold uppercase tracking-[0.18em] text-sand transition-colors hover:bg-deep-dark disabled:pointer-events-none disabled:opacity-60"
      >
        <Send className="h-4 w-4" />
        {isSubmitting ? t("sending") : t("submit")}
      </button>
    </form>
  );
}
