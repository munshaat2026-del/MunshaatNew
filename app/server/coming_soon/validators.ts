import { z } from "zod";

export const comingSoonSchema = z.object({
  id: z.string().uuid().optional(),

  title_en: z
    .string()
    .min(3, { message: "English title must be at least 3 characters." })
    .max(255, { message: "English title cannot exceed 255 characters." }),

  title_ar: z
    .string()
    .min(3, { message: "Arabic title must be at least 3 characters." })
    .max(255, { message: "Arabic title cannot exceed 255 characters." }),

  description_en: z
    .string()
    .min(10, { message: "English description must be at least 10 characters." }),

  description_ar: z
    .string()
    .min(10, { message: "Arabic description must be at least 10 characters." }),

  image: z
    .string()
    .min(1, { message: "Please upload an image." })
    .url({ message: "Invalid image URL." }),

  estimated_date: z
    .date({
      message: "Please select a valid estimated date.",
    })
    .optional()
    .nullable(),
    completion_rate:z.number({message:"Completion Rate Is Required"}).nullable()
});