import { Locale } from "@/types";
import { ClipboardList } from "lucide-react";

function HeaderSection({ locale }: { locale: Locale }) {
  const isArabic = locale === "ar";

  return (
    <div
      className="bg-slate-950 p-6 md:p-12 text-white border-b-4 border-[#0c479a] relative overflow-hidden"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. BACKGROUND WATERMARK - Positioned dynamically */}
      <div
        className={`absolute top-0 ${isArabic ? "left-0" : "right-0"} p-2 md:p-4 opacity-10 pointer-events-none transition-all duration-500`}
      >
        <ClipboardList
          size={160}
          className={`md:w-40 w-25 ${isArabic ? "-scale-x-100" : ""}`}
        />
      </div>

      {/* 2. CONTENT CONTAINER */}
      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8">
        {/* SMALLER ICON BOX - Responsive sizing */}
        <div className="p-3 md:p-5 bg-[#0c479a]/20 border border-[#0c479a]/40 backdrop-blur-md shrink-0">
          <ClipboardList className="text-[#0c479a] w-6 h-6 md:w-10 md:h-10" />
        </div>

        {/* TEXT CONTENT */}
        <div className="space-y-1 md:space-y-3">
     

          <h1 className="text-2xl md:text-5xl font-black uppercase tracking-tighter   leading-[0.9]">
            {isArabic ? "تقديم" : "Inquiry"}{" "}
            <span className="text-[#0c479a] block md:inline">
              {isArabic ? "طلب " : "Submission."}
            </span>
          </h1>
        </div>
      </div>
    </div>
  );
}

export default HeaderSection;
