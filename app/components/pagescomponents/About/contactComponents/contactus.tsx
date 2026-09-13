"use client";

import { Phone, Mail, MapPin } from "lucide-react";
import { aboutdata } from "@/app/data/aboutdata";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { createContactSchema } from "@/app/server/email/emailSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "./BasicInfo";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ContactFormValues = z.infer<ReturnType<typeof createContactSchema>>;

interface Props {
  locale: "en" | "ar";
  action: (
    data: ContactFormValues,
  ) => Promise<{ success: boolean; message: string }>;
}

export default function ContactSection({ locale, action }: Props) {
  const primaryColor = "#0c479a";
  const router = useRouter();
  const isAr = locale === "ar";
  const data = aboutdata[locale].contact;

  const method = useForm<ContactFormValues>({
    resolver: zodResolver(createContactSchema(locale)),
  });

  const iconMap: Record<string, any> = {
    address: MapPin,
    phone: Phone,
    email: Mail,
  };

  const { handleSubmit } = method;

  const onSubmit: SubmitHandler<ContactFormValues> = async (formData) => {
    try {
      const result = await action(formData);
      if (result.success) {
        toast.success(result.message);
        router.replace("/about");
        return;
      }
      toast.error(result.message);
    } catch {
      toast.error(
        locale === "en" ? "Error sending email" : "خطأ في إرسال البريد",
      );
    }
  };

  return (
    <FormProvider {...method}>
      <section
        className="bg-[#f1f5fa] text-slate-900 py-20 md:py-32 overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-0.5 w-10"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  {data.header.tag}
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                {data.header.title1}
                <br />
                <span style={{ color: primaryColor }}>
                  {data.header.title2}
                </span>
              </h2>
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 ">
            {/* LEFT */}
            <div
              className={`lg:col-span-5 border-slate-100 ${
                isAr ? "lg:border-l" : "lg:border-r"
              }`}
            >
              <div className="p-8 md:p-12 space-y-12">
                <div className="space-y-8 w-full">
                  {data.info.map((item, i) => {
                    const Icon = iconMap[item.key] || MapPin;

                    let href = "#";
                    if (item.key === "phone") {
                      href = `tel:${item.value!.replace(/[^0-9+]/g, "")}`;
                    } else if (item.key === "email") {
                      href = `mailto:${item.value}`;
                    } else if (item.key === "address") {
                      href = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(item.value!)}`;
                    }

                    return (
                      <div
                        key={i}
                        className="flex items-center gap-5 group w-full"
                      >
                        {/* Icon Box */}
                        <div
                          className="w-10 h-10 shrink-0 flex items-center justify-center border border-slate-100 transition-all duration-500 group-hover:text-white cursor-pointer"
                          style={{
                            color: primaryColor,
                          }}
                          ref={(el) => {
                            if (el) {
                              el.onmouseenter = () =>
                                (el.style.backgroundColor = primaryColor);
                              el.onmouseleave = () =>
                                (el.style.backgroundColor = "");
                            }
                          }}
                        >
                          <Icon size={18} strokeWidth={1.5} />
                        </div>

                        {/* Text Container */}
                        <div className={isAr ? "text-right" : "text-left"}>
                          <h4 className="font-black text-[9px] text-slate-300 mb-1 uppercase tracking-widest">
                            {item.label}
                          </h4>

                          {/* Clickable Link wrapped around the value */}
                          <a
                            href={href}
                            target={item.key === "address" ? "_blank" : "_self"}
                            rel={
                              item.key === "address"
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="font-black text-sm text-slate-800 tracking-tight transition-colors duration-300 hover:opacity-60 block cursor-pointer"
                          >
                            <bdi>{item.value}</bdi>
                          </a>
                        </div>
                      </div>
                    );
                  })}
                </div>
                {/* Hours Box */}
                <div className="p-8 bg-white space-y-6 shadow-md">
                  <h3 className="text-[10px] font-black tracking-widest text-[#58708f] uppercase">
                    {data.hours.title}
                  </h3>

                  <div className="space-y-3">
                    {data.hours.rows.map((row, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-[#c9d9ee] pb-2 last:border-0"
                      >
                        <span className="text-[9px] font-black tracking-widest text-[#58708f] uppercase">
                          {row.day}
                        </span>

                        <span
                          className={`text-[10px] font-black tracking-widest ${
                            row.alert ? "text-red-500" : "text-[#12345b]"
                          }`}
                        >
                          {row.time}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="lg:col-span-7 p-8 md:p-16 bg-white border ">
              <form onSubmit={handleSubmit(onSubmit)}>
                <BasicInfo locale={locale} />
              </form>
            </div>
          </div>
        </div>
      </section>
    </FormProvider>
  );
}
