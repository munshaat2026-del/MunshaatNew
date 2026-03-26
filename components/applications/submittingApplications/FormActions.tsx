"use client";

import { useFormContext } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Send, XCircle } from "lucide-react";

interface Props {
  locale: "en" | "ar";
}

function FormActions({ locale }: Props) {
  const isArabic = locale === "ar";
  const {
    formState: { isDirty, isSubmitting },
  } = useFormContext();
  const router = useRouter();

  return (
    <div className="mt-10 md:mt-20  space-y-4 md:space-y-6">
      {/* Submit Button */}
      <button
        type="submit"
        disabled={!isDirty || isSubmitting}
        className="
          relative rounded-md scale-105 overflow-hidden group
          w-full py-4 md:py-6 
          bg-[#0c479a] text-white 
          font-black uppercase  text-[12px] 
          flex items-center justify-center gap-3 md:gap-4 
          transition-all duration-500
          hover: hover:shadow-[0_20px_40px_rgba(12,71,154,0.3)]
          active:scale-[0.98] 
          disabled:opacity-50 disabled:grayscale disabled:
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
              <span>
                {isArabic ? "تنفيذ تقديم الطلب" : "Execute Submission"}
              </span>

              <Send
                size={18}
                className={`transition-transform duration-500  group-hover:-translate-x-2 group-hover:-translate-y-1`}
              />
            </>
          )}
        </div>
      </button>

      {/* Cancel Button */}
      <button
        disabled={isSubmitting}
        type="button"
        onClick={() => router.back()}
        className="
          w-full py-3 md:py-4 
          text-slate-400 hover:text-red-600 
          font-black uppercase  text-[10px] md:text-[11px] 
          flex items-center justify-center gap-2 md:gap-3 
          transition-all duration-300 group
        "
      >
        <XCircle
          size={16}
          className="transition-transform duration-500 group-hover:rotate-90 group-hover:scale-110"
        />
        <span className="relative">
          {isArabic ? "رجوع" : "Back"}
          <span className="absolute bottom-0 left-0 w-0 h-px bg-red-600 transition-all duration-300 group-hover:w-full" />
        </span>
      </button>
    </div>
  );
}

export default FormActions;
