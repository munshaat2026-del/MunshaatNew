import { z } from "zod";

export const RealEstatesTypeEnum = z.enum(["office", "store", "depot"] as const);
export const PricePeriodEnum = z.enum(["yearly", "monthly"] as const);
// Image schema
export const RealEstateImageSchema = z.object({
  id: z.string().uuid({ message: "Invalid image ID." }).optional(),
  image_url: z.string().url({ message: "Image must be a valid URL." }),
});

// Real estate form schema
export const RealEstateSchema = z.object({
  slug: z
    .string()
    .min(1, { message: "Slug is required." })
    .max(255, { message: "Slug cannot exceed 255 characters." }),
  name_en: z
    .string()
    .min(1, { message: "Name (English) is required." })
    .max(255, { message: "Name (English) cannot exceed 255 characters." }),
  name_ar: z
    .string()
    .min(1, { message: "Name (Arabic) is required." })
    .max(255, { message: "Name (Arabic) cannot exceed 255 characters." }),
  description_en: z
    .string()
    .min(1, { message: "Description (English) is required." }),
  description_ar: z
    .string()
    .min(1, { message: "Description (Arabic) is required." }),
  real_estates_type: RealEstatesTypeEnum,
  price: z
    .number({ message: "Price must be a number." })
    .int({ message: "Price must be an integer." })
    .optional(),
  price_period: PricePeriodEnum.optional(),
  address_en: z
    .string()
    .min(1, { message: "Address (English) is required." }),
  address_ar: z
    .string()
    .min(1, { message: "Address (Arabic) is required." }),
  location_link: z
    .string()
    .url({ message: "Location must be a valid URL." })
    .optional(),
  floor_number: z
    .number({ message: "Floor number must be a number." })
    .int({ message: "Floor number must be an integer." })
    .optional(),
  size_sqm: z
    .number({ message: "Size must be a number." })
    .int({ message: "Size must be an integer." }),
  is_available: z
    .boolean({ message: "Availability must be true or false." })
    .default(true)
    .optional(),
  cover_image: z
    .string()
    .url({ message: "Cover image must be a valid URL." }),
  features_en: z
    .array(z.string({ message: "Feature (EN) must be a string." }))
    .optional(),
    features_ar: z
    .array(z.string({ message: "Feature (AR) must be a string." }))
    .optional(),
  real_estates_images: z
    .array(RealEstateImageSchema, {
      message: "Images must be an array of valid images.",
    })
    .optional()
    .nullable(),
});