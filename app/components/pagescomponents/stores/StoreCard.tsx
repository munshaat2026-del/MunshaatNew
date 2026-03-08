import { MapPin, Maximize2, ShoppingBag, ArrowUpRight } from "lucide-react";
import { type TranslatedRaelEstate } from "@/types/index";

interface StoreCardProps {
  office: TranslatedRaelEstate; // Keeping the prop name 'office' to avoid breaking the parent map for now
  primaryColor: string;
  locale?: "en" | "ar";
}

export default function StoreCard({
  office,
  primaryColor,
  locale = "en",
}: StoreCardProps) {
  const isArabic = locale === "ar";

  // Fixed period mapping
  const getPeriodLabel = (period: string | null) => {
    if (period === "monthly") return isArabic ? "شهري" : "Monthly";
    return isArabic ? "سنوي" : "Yearly";
  };

  return (
    <div className="group cursor-pointer bg-white" dir={isArabic ? "rtl" : "ltr"}>
      {/* 1. Image Section */}
      <div className="relative aspect-4/3 overflow-hidden bg-slate-100 mb-6 border border-slate-50 shadow-sm">
        <img
          src={office.cover_image}
          className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-in-out"
          alt={office.name}
        />

        {/* Status Badge: Swaps sides based on locale */}
        <div
          className={`absolute top-0 ${isArabic ? "right-0" : "left-0"} px-4 py-2 text-[9px] font-black uppercase tracking-[0.2em] text-white z-10`}
          style={{ backgroundColor: primaryColor }}
        >
          {isArabic ? "متاح" : "Available"}
        </div>

        <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors duration-500" />
      </div>

      {/* 2. Content Section */}
      <div className="space-y-4 px-1">
        <div className="flex justify-between items-start gap-4">
          <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-none">
            {office.name}
          </h3>
          <ArrowUpRight
            size={20}
            className={`text-slate-300 group-hover:text-slate-900 transition-colors shrink-0 ${isArabic ? "-rotate-90" : ""}`}
          />
        </div>

        <div className="flex items-center gap-1.5 text-slate-400">
          <MapPin size={14} style={{ color: primaryColor }} />
          <span className="text-[10px] font-black uppercase tracking-widest truncate">
            {office.address}
          </span>
        </div>

        {/* 3. Tech Specs Grid */}
        <div className="grid grid-cols-2 gap-4 pt-5 border-t border-slate-100">
          {/* Area Spec */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <Maximize2 size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isArabic ? "المساحة" : "Area Size"}
              </span>
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tighter">
              {office.size_sqm} <span className="text-xs">{isArabic ? "م²" : "sqm"}</span>
            </span>
          </div>

          {/* Price Spec */}
          <div className="flex flex-col gap-1">
            <div className="flex items-center gap-2 text-slate-500">
              <ShoppingBag size={12} />
              <span className="text-[9px] font-black uppercase tracking-widest">
                {isArabic ? "السعر" : "Price"} / {getPeriodLabel(office.price_period)}
              </span>
            </div>
            <span className="text-lg font-black text-slate-900 tracking-tighter truncate">
              {office.price?.toLocaleString()} <span className="text-xs">{isArabic ? "د.أ" : "JOD"}</span>
            </span>
          </div>
        </div>

        {/* 4. Action Hint */}
        <div className="pt-2 flex items-center">
          <span
            className={`text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-300 transform ${
              isArabic ? "translate-x-2.5 group-hover:translate-x-0" : "-translate-x-2.5 group-hover:translate-x-0"
            }`}
            style={{ color: primaryColor }}
          >
            {isArabic ? "عرض التفاصيل" : "View Details"}
          </span>
        </div>
      </div>
    </div>
  );
}