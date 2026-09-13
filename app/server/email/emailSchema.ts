import { z } from "zod";

type Lang = "en" | "ar";

export const createContactSchema = (lang: Lang) => {
  const msg = {
    name: {
      min: {
        en: "Name must be at least 2 characters",
        ar: "الاسم يجب أن يحتوي على حرفين على الأقل",
      },
      max: {
        en: "Name is too long",
        ar: "الاسم طويل جدًا",
      },
    },
    email: {
      invalid: {
        en: "Invalid email address",
        ar: "البريد الإلكتروني غير صالح",
      },
    },
    subject: {
      min: {
        en: "Subject must be at least 3 characters",
        ar: "الموضوع يجب أن يحتوي على 3 أحرف على الأقل",
      },
      max: {
        en: "Subject is too long",
        ar: "الموضوع طويل جدًا",
      },
    },
    messageEn: {
      min: {
        en: "message must be at least 10 characters",
        ar: "الرسالة يجب أن تحتوي على 10 أحرف على الأقل",
      },
      max: {
        en: "Enlish message is too long",
        ar: "الرسالة طويلة جدًا",
      },
    },
    phoneNumber: {
      length: {
        en: "Phone number must be exactly 10 digits",
        ar: "يجب أن يحتوي رقم الهاتف على 10 أرقام",
      },
      invalid: {
        en: "Must be a valid number",
        ar: "يجب أن يكون رقماً صالحاً",
      },
    },
  };

  return z.object({
    name: z.string().min(2, msg.name.min[lang]).max(100, msg.name.max[lang]),

    email: z.string().email(msg.email.invalid[lang]),

    subject: z
      .string()
      .min(3, msg.subject.min[lang])
      .max(150, msg.subject.max[lang]),

    message: z
      .string()
      .min(10, msg.messageEn.min[lang])
      .max(2000, msg.messageEn.max[lang]),
    phoneNumber: z
      .string()
      .regex(/^\d+$/, msg.phoneNumber.invalid[lang])
      .length(10, msg.phoneNumber.length[lang])
      
  });
};
