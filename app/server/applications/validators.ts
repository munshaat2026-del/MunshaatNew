import { z } from "zod";

export const applicantSchema = (isArabic: boolean) =>
  z.object({
    id: z.string().uuid().optional(),

    full_name: z
      .string()
      .min(15, isArabic ? "يجب أن يحتوي الاسم الكامل على 15 أحرف على الأقل" : "Full name must be at least 15 characters")
      .max(255, isArabic ? "الاسم الكامل لا يمكن أن يتجاوز 255 حرفًا" : "Full name cannot exceed 255 characters"),

    email: z
        .string()
        .email(isArabic ? "البريد الإلكتروني غير صالح" : "Invalid email address"),

    address: z
      .string()
      .min(5, isArabic ? "يجب أن يحتوي العنوان على 5 أحرف على الأقل" : "Address must be at least 5 characters"),

    city: z
      .string({message:isArabic ? "يجب أن تحتوي المدينة على حرفين على الأقل" : "City must be at least 2 characters"})
      .min(2, isArabic ? "يجب أن تحتوي المدينة على حرفين على الأقل" : "City must be at least 2 characters"),

    marital_status: z
      .string({message:isArabic ? "يرجى اختيار الحالة الاجتماعية" : "Please select marital status"})
      .min(3, isArabic ? "يرجى اختيار الحالة الاجتماعية" : "Please select marital status"),

    major: z
      .string()
      .min(2, isArabic ? "يجب أن يحتوي التخصص على 2 أحرف على الأقل" : "Major must be at least 2 characters"),

    date_of_birth: z
      
      .date({ message: isArabic ? "يرجى اختيار تاريخ ميلاد صالح" : "Please select a valid date of birth" }),

   phone_number: z
  .string()
  .regex(
    /^07\d{8}$/,
    isArabic
      ? "رقم الهاتف يجب أن يكون 10 أرقام ويبدأ بـ 07"
      : "Phone number must be 10 digits and start with 07"
  ),

   national_number: z
  .string({
    message: isArabic ? "الرقم الوطني مطلوب" : "National number is required",
  })
  .min(5, isArabic ? "الرقم الوطني غير صالح" : "National number must be valid")
  .max(50, isArabic ? "الرقم الوطني طويل جدًا" : "National number is too long"),

nationality: z
  .string()
  .min(2, isArabic ? "الجنسية مطلوبة" : "Nationality is required",),

place_of_birth: z
  .string({message:isArabic ? "مكان الميلاد مطلوب" : "Place of birth is required"})
  .min(2, isArabic ? "مكان الميلاد مطلوب" : "Place of birth is required"),
 

    cv: z
      .string({message:isArabic ? "يرجى رفع السيرة الذاتية" : "Please upload a CV"})
      .min(1, isArabic ? "يرجى رفع السيرة الذاتية" : "Please upload a CV"),

    career_id: z
      .string()
      .uuid({ message: isArabic ? "معرف الوظيفة غير صالح" : "Invalid career ID" }),

    is_shown: z.boolean().optional(),
  });

// TypeScript type
export type ApplicantInput = z.infer<ReturnType<typeof applicantSchema>>;