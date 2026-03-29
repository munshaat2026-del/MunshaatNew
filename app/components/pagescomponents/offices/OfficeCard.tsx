import { MapPin, Maximize2, Briefcase, ArrowUpRight } from "lucide-react";
import { type TranslatedRaelEstate } from "@/types/index";

interface OfficeCardProps {
  office: TranslatedRaelEstate;
  primaryColor: string;
  locale?: "en" | "ar"; // new prop to switch language
}

export default function OfficeCard({
  office,
  primaryColor,
  locale = "en",
}: OfficeCardProps) {
  const isArabic = locale === "ar";

  const pricePeriods = [
    { value: "monthly", en: "Monthly", ar: "شهري" },
    { value: "yearly", en: "Yearly", ar: "سنوي" },
  ];

  return (
    <div className="group cursor-pointer bg-white">
      {/* 1. Image Section: Sharp & Professional */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 mb-6 border border-slate-50 shadow-sm">
        <img
          src={office.cover_image}
          className="w-full h-full object-cover  group-hover:scale-105 transition-all duration-700 ease-in-out"
          alt={office.name}
        />

        {/* Status Badge: Solid Primary Color */}
        <div
          className="absolute top-0 left-0 px-4 py-2 text-[9px] font-black uppercase  text-white z-10"
          style={{ backgroundColor: primaryColor }}
        >
          {isArabic ? "متاح" : "Available"}
        </div>

        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* 2. Content Section: Bold & Minimalist */}
      <div className="space-y-4 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            {office.name}
          </h3>
          <ArrowUpRight
            size={20}
            className="text-slate-300 group-hover:text-slate-900 transition-colors shrink-0"
          />
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin size={14} style={{ color: primaryColor }} />
          <span className="text-[10px] font-black  tracking-widest">
            {office.address}
          </span>
        </div>

        {/* 3. Tech Specs: High Contrast Data Grid */}
        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <Maximize2 size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isArabic ? "مساحة الطابق" : "Floor Area"}
              </span>
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tighter">
              {office.size_sqm}{" "}
              <span className="text-xs">{isArabic ? "متر مربع" : "sqm"}</span>
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <Briefcase size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isArabic
                  ? `السعر/${office.price_period === "monthly" ? "شهري" : "monthly"}`
                  : `Price/${office.price_period === "yearly" ? "سنوي" : "yearly"}`}
              </span>
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tighter truncate">
              {office.price}{" "}
              <span className="text-xs">{isArabic ? "أ.د" : "JOD"}</span>
            </span>
          </div>
        </div>

        {/* 4. Action Hint: Modern & Subtle */}
        <div className="pt-2 flex items-center justify-between">
          <span
            className="text-[9px] font-black uppercase  opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2.5 group-hover:translate-x-0"
            style={{ color: primaryColor }}
          >
            {isArabic ? "عرض التفاصيل" : "View Details"}
          </span>
        </div>
      </div>
    </div>
  );
}
