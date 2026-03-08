import { z } from "zod";

export const ParkingSchema = z.object({
  id: z.string().uuid({ message: "Invalid parking ID." }).optional(),

  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .max(255, { message: "Slug cannot exceed 255 characters." }),

  name_en: z
    .string()
    .min(1, { message: "Parking name (English) is required." }),

  name_ar: z
    .string()
    .min(1, { message: "Parking name (Arabic) is required." }),

  description_en: z
    .string()
    .nullable()
    .optional(),

  description_ar: z
    .string()
    .nullable()
    .optional(),

  address_en: z
    .string()
    .min(1, { message: "Address (English) is required." }),

  address_ar: z
    .string()
    .min(1, { message: "Address (Arabic) is required." }),

  location_link: z
    .string()
    .url({ message: "Location link must be a valid URL." })
    .nullable()
    .optional(),

  image: z
    .string()
    .url({ message: "Image must be a valid URL." })
    .nullable()
    .optional(),

  total_spots: z
    .number({ message: "Total parking spots must be a number." })
    .int({ message: "Total parking spots must be a whole number." })
    .positive({ message: "Total parking spots must be greater than 0." })
    .nullable()
    .optional(),

  price_monthly: z
    .number({ message: "Monthly price must be a number." })
    .int({ message: "Monthly price must be a whole number." })
    .nonnegative({ message: "Monthly price cannot be negative." })
    .nullable()
    .optional(),

  price_yearly: z
    .number({ message: "Yearly price must be a number." })
    .int({ message: "Yearly price must be a whole number." })
    .nonnegative({ message: "Yearly price cannot be negative." })
    .nullable()
    .optional(),
});