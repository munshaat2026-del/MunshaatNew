"use client";

import { useFormContext } from "react-hook-form";
import { Send } from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

function FormActions({ locale }: Props) {
  const isArabic = locale === "ar";
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();

  return (
    <div className="mt-6 md:mt-10  space-y-4 md:space-y-6">
      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="
          relative rounded-md scale-105 overflow-hidden group
          w-full py-4 md:py-6 
          bg-[#0c479a] text-white 
          font-black uppercase tracking-[0.5em] text-[12px] 
          flex items-center justify-center gap-3 md:gap-4 
          transition-all duration-500
          hover:tracking-[0.7em] hover:shadow-[0_20px_40px_rgba(12,71,154,0.3)]
          active:scale-[0.98] 
          disabled:opacity-50 disabled:grayscale disabled:tracking-[0.5em]
        "
      >
        {/* Background Slide Effect - Logic remains same for both */}
        <div className="absolute inset-0 bg-black translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />

        <div className="relative z-10 flex items-center gap-3">
          {isSubmitting ? (
            <span className="animate-pulse">
              {isArabic ? "جاري المعالجة..." : "Processing..."}
            </span>
          ) : (
            <>
              {/* Icon Logic: Positioned based on Locale, Animation based on RTL */}
              <span>
                {isArabic ? "تنفيذ تقديم الطلب" : "Execute Submission"}
              </span>
              {isArabic && (
                <Send
                  size={18}
                  className="transition-transform duration-500 group-hover:-translate-x-2 group-hover:-translate-y-1 rotate-270"
                />
              )}

              {!isArabic && (
                <Send
                  size={18}
                  className="transition-transform duration-500 group-hover:translate-x-2 group-hover:-translate-y-1"
                />
              )}
            </>
          )}
        </div>
      </button>
    </div>
  );
}

export default FormActions;
