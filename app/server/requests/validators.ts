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

      real_estate_id: z.string().uuid().nullable().optional(),
      parking_id: z.string().uuid().nullable().optional(),

      request_type: z
        .enum(["parkings", "real_estates"])
        .default("parkings")
        .optional(),
    })
    .refine(
      (data) =>
        (data.real_estate_id && !data.parking_id) ||
        (!data.real_estate_id && data.parking_id),
      {
        message: isArabic
          ? "يجب إدخال أحد المعرفين فقط: العقار أو الموقف"
          : "Exactly one of real_estate_id or parking_id must be provided",
        path: ["real_estate_id"],
      }
    )
    .refine(
      (data) =>
        (data.request_type === "real_estates" && data.real_estate_id) ||
        (data.request_type === "parkings" && data.parking_id),
      {
        message: isArabic
          ? "نوع الطلب يجب أن يتطابق مع المعرف المرسل"
          : "request_type must match the provided ID",
        path: ["request_type"],
      }
    );