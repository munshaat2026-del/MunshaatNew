import { z } from "zod";

export const requestSchema = (isArabic: boolean) =>
  z
    .object({
      name: z
        .string()
        .min(2, isArabic ? "يجب أن يحتوي الاسم على حرفين على الأقل" : "Name must be at least 2 characters")
        .max(255),

     phone_number: z
  .string()
  .regex(
    /^07\d{8}$/,
    isArabic
      ? "رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 07"
      : "Phone number must be 10 digits and start with 07"
  ),

      email: z
        .string()
        .email(isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email address")
        .optional()
        .or(z.literal("")),

      plan: z.enum(["monthly", "yearly"]).default("monthly").optional(),

      real_estate_id: z.string().uuid(),
    })
      
    
  