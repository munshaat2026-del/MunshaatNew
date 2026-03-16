import { z } from "zod";

export const requestSchema = (isArabic: boolean) =>
  z.object({
    name: z
      .string()
      .min(
        2,
        isArabic
          ? "يجب أن يحتوي الاسم على حرفين على الأقل"
          : "Name must be at least 2 characters",
      )
      .max(255),

    phone_number: z
      .string()
      .regex(
        /^07\d{8}$/,
        isArabic
          ? "رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 07"
          : "Phone number must be 10 digits and start with 07",
      ),

    email: z
      .string()
      .email(isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email address"),
    plan: z.enum(["monthly", "yearly"], {
      message: isArabic ? "يرجى اختيار خطة" : "Plan is required",
    }),
    parking_id: z
      .string({
        message: isArabic ? "يرجى اختيار موقف" : "Parking is required",
      })
      .uuid({ message: isArabic ? "يرجى اختيار موقف" : "Parking is required" }),
    license_image: z
      .string()
      .min(1, isArabic ? "صورة الرخصة مطلوبة" : "License image is required"),

    identity_image: z
      .string()
      .min(1, isArabic ? "صورة الهوية مطلوبة" : "Identity image is required"),
  });
