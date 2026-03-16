import { z } from "zod";

export const TenderSchema = z.object({
  id: z.string().uuid().optional(),

  name_en: z
    .string()
    .min(1, "Please enter the tender name in English.")
    .max(255, "English name must be less than 255 characters."),

  name_ar: z
    .string()
    .min(1, "Please enter the tender name in Arabic.")
    .max(255, "Arabic name must be less than 255 characters."),

  slug: z
    .string()
    .min(1, "Please provide a slug for the tender.")
    .max(255, "Slug must be less than 255 characters."),

  description_en: z
    .string()
    .min(1, "Please enter the tender description in English."),

  description_ar: z
    .string()
    .min(1, "Please enter the tender description in Arabic."),

  pdf_file: z
    .string()
    .max(255)
    .optional()
    .nullable(),
 opening_date: z.date({message: "Please select a opening date for the tender."}).nullable(),

  closing_date: z
    .date({
      message: "Please select a closing date for the tender.",
    }),
}).refine(
  (data) =>
    !data.opening_date || data.closing_date > data.opening_date,
  {
    message: "The closing date should be later than the opening date.",
    path: ["closing_date"],
  }
);