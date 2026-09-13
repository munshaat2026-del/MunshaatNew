import { Locale } from "@/types";
import { ClipboardList } from "lucide-react";

function HeaderSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <div
      className="border-b border-[#c9d9ee] bg-[#e8f0fb] px-6 py-7 md:px-10"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <div className="flex items-center gap-4">
        {/* Icon Container */}
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#d5e3f5] text-[#0c479a] shadow-sm">
          <ClipboardList className="h-6 w-6" />
        </div>

        {/* Text Container */}
        <div>
          {/* Overline */}
          <p className="mb-1 text-[10px] font-black tracking-[0.2em] text-[#0c479a] uppercase">
            {isArabic ? "الطلبات" : "Inquiries"}
          </p>

          {/* Title */}
          <h1 className="text-xl font-black tracking-tight text-[#12345b] md:text-2xl">
            {isArabic ? "تقديم طلب" : "Inquiry Submission"}
          </h1>

          {/* Subtitle */}
          <p className="mt-1 text-xs font-medium text-[#58708f]">
            {isArabic
              ? "أدخل تفاصيل طلبك أدناه"
              : "Enter your request details below"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
