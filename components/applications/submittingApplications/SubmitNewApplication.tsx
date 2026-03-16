"use client";

import { ApplicationCreateInput, TransalatedCareer } from "@/types";
import { useForm, SubmitHandler, FormProvider } from "react-hook-form";
import { applicantSchema } from "@/app/server/applications/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";
import { Info, ShieldCheck, Briefcase, FileText } from "lucide-react";
import { useRouter } from "next/navigation";
import BasicInfo from "./BasicInfo";
import MediaSection from "./MediaSection";
import SpecsAndStatus from "./SpecsAndStatus";
import FormActions from "./FormActions";
import { cn } from "@/lib/utils";
import FormHeaderSection from "./FormHeaderSection";

type ApplicationFormValue = z.infer<ReturnType<typeof applicantSchema>>;

interface Props {
  career: TransalatedCareer;
  action: (data: ApplicationCreateInput) => Promise<{ success: boolean; status: number; message: string }>;
  locale: "en" | "ar";
}

function NewApplicationForm({ action, locale, career }: Props) {
  const isArabic = locale === "ar";
  const router = useRouter();
  
  const methods = useForm<ApplicationFormValue>({
    resolver: zodResolver(applicantSchema(isArabic)),
    defaultValues: {
      career_id: career.id || "",
    }
  });

  const onSubmit: SubmitHandler<ApplicationFormValue> = async (data) => {
    try {
      const result = await action(data);
      if (result.status === 201) {
        toast.success(isArabic ? "تم استلام طلبك بنجاح" : "Application Received", {
          style: {
            background: "#0c479a",
            color: "#fff",
            borderRadius: "12px",
            fontFamily: "sans-serif"
          },
        });
        router.replace("/");
        return;
      }
      toast.error(result.message);
    } catch (error) {
      toast.error(isArabic ? "خطأ في النظام" : "System Error");
    }
  };

  return (
    <FormProvider {...methods}>
      <div className="min-h-screen bg-slate-50/50 py-20 px-4 md:px-6 font-sans">
        <div
          className="max-w-6xl mx-auto mt-10 bg-white rounded-[2.5rem] shadow-[0_32px_64px_-12px_rgba(0,0,0,0.08)] border border-slate-200/60 overflow-hidden"
          dir={isArabic ? "rtl" : "ltr"}
        >
          {/* 1. Header Section - Matching Parking Request Style */}
          <FormHeaderSection locale={locale} careerName={career.position}/>

          {/* 2. Form Body - Two Column HUD Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* Left side: Main inputs */}
            <div className="lg:col-span-10 p-8 md:p-14 border-e border-slate-100">
              <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-16">
                
                {/* Section 01: Personal */}
                <div className="space-y-10">
                  <SectionHeader 
                    number="01" 
                    title={isArabic ? "البيانات الشخصية" : "Personal Information"} 
                    isArabic={isArabic} 
                  />
                  <BasicInfo locale={locale} />
                </div>

                {/* Section 02: Qualifications */}
                <div className="space-y-10">
                 
                  <SpecsAndStatus locale={locale} />
                </div>

                {/* Section 03: Media */}
                <div className="space-y-10">
                  <SectionHeader 
                    number="02" 
                    title={isArabic ? "الملفات الرقمية" : "Digital Assets"} 
                    isArabic={isArabic} 
                  />
                  <MediaSection locale={locale} />
                </div>

                <div className=" border-t border-slate-100">
                  <FormActions locale={locale} />
                </div>
              </form>
            </div>

          </div>
        </div>
      </div>
    </FormProvider>
  );
}

/* Helper Components to maintain consistent style */

function SectionHeader({ number, title, isArabic }: { number: string, title: string, isArabic: boolean }) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-[#0c479a] text-xl font-black opacity-20 tracking-tighter">
        {number}
      </div>
      <h3 className="text-xs font-black text-slate-900 uppercase tracking-[0.25em]">
        {title}
      </h3>
      <div className="flex-1 h-px bg-slate-100" />
    </div>
  );
}



export default NewApplicationForm;