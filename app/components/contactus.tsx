"use client";

import {
  Phone,
  Mail,
  MapPin,
  Send,
  Linkedin,
  Twitter,
  Instagram,
} from "lucide-react";
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { createContactSchema } from "@/app/server/email/emailSchema";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import BasicInfo from "./pagescomponents/contactComponents/BasicInfo";
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

  const iconMap: any = {
    address: MapPin,
    phone: Phone,
    email: Mail,
  };

  const { handleSubmit } = method;

  const onSubmit: SubmitHandler<ContactFormValues> = async (data) => {
    try {
      const result = await action(data);
      if (result.success) {
        toast.success(result.message);
        router.replace("/about");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(
        locale === "en" ? "Error sending email" : "خطأ في إرسال البريد",
      );
    }
  };

  return (
    <FormProvider {...method}>
      <section
        className="bg-white text-slate-900 py-24 md:py-32 overflow-hidden"
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          {/* Header */}
          <div className="mb-20 space-y-4">
            <div className="inline-flex items-center gap-2">
              <div className="w-2 h-2 bg-[#0c479a]"></div>

              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                {data.header.tag}
              </span>
            </div>

            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">
              {data.header.title1}{" "}
              <span className="text-[#0c479a]">{data.header.title2}</span>
            </h2>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 shadow-2xl shadow-slate-200/50">
            {/* LEFT */}
            <div
              className={`lg:col-span-5 border-slate-100 ${isAr ? "lg:border-l" : "lg:border-r"}`}
            >
              <div className="p-8 md:p-12 space-y-12">
                
                <div className="space-y-8">
                  {data.info.map((item, i) => {
                    const Icon = iconMap[item.key];

                    return (
                      <div key={i} className="flex gap-5 group">
                        <div
                          className="w-10 h-10 shrink-0 flex items-center justify-center border border-slate-100 group-hover:bg-[#0c479a] group-hover:text-white transition-all duration-500"
                          style={{ color: primaryColor }}
                        >
                          <Icon size={18} strokeWidth={1.5} />
                        </div>

                        <div>
                          <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-slate-300 mb-1">
                            {item.label}
                          </h4>

                          <p className="font-black text-sm text-slate-800 uppercase tracking-tight">
                            {item.value}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Hours */}
                <div className="bg-slate-950 p-8 text-white space-y-6">
                  <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
                    {data.hours.title}
                  </h3>

                  <div className="space-y-3">
                    {data.hours.rows.map((row, i) => (
                      <div
                        key={i}
                        className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0"
                      >
                        <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">
                          {row.day}
                        </span>

                        <span
                          className={`text-[10px] font-black uppercase tracking-widest ${row.alert ? "text-red-500" : "text-white"}`}
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
            <div className="lg:col-span-7 p-8 md:p-16 bg-slate-50/50">
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
