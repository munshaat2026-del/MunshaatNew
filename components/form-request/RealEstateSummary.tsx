"use client";
import { MapPin, Maximize2, Layers, Info } from "lucide-react";
import { type RealEstateGetPayloadPartially } from "@/types/index";

interface RealEstateSummaryProps {
  data: RealEstateGetPayloadPartially;
  locale: "en" | "ar";
}

const RealEstateSummary = ({ data, locale }: RealEstateSummaryProps) => {
  const isArabic = locale === "ar";
  const primaryColor = "#0c479a";

  const labels = {
    specs: isArabic
      ? "مواصفات الأصول // البيانات الفنية"
      : "Asset Specs // Technical Data",
    dimension: isArabic ? "المساحة التشغيلية" : "Operational Area",
    level: isArabic ? "رقم الطابق" : "Floor Protocol",
    location: isArabic ? "الموقع الجغرافي" : "Geographic Location",
    description: isArabic ? "الوصف الفني" : "Technical Brief",
  };

  return (
    <div className="h-full border-l border-slate-100 rtl:border-l-0 rtl:border-r">
      {/* 1. Asset Image Header */}
      <div className="relative h-64 overflow-hidden border-b border-slate-900">
        <img
          src={data.cover_image}
          alt="Asset Preview"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-slate-950 text-white">
          <p className="text-[8px] font-black uppercase  text-[#0c479a] mb-1">
            {labels.specs}
          </p>
          <h2 className="text-xl font-black uppercase   tracking-tight">
            {isArabic ? data.name_ar : data.name_en}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-10">
        {/* 2. Quick Specs Grid */}
        <div className="grid grid-cols-2 border border-slate-200">
          {/* Dimension */}
          <div
            className={`p-4 border-b border-slate-200 bg-white ${
              isArabic ? "border-l" : "border-r"
            }`}
          >
            <div className={`flex items-center gap-2 mb-2 `}>
              <Maximize2 size={12} className="text-[#0c479a]" />
              <span
                className={`text-[8px] font-black uppercase text-slate-400 tracking-widest ${isArabic ? "text-right" : "text-left"}`}
              >
                {labels.dimension}
              </span>
            </div>
            <p
              className={`font-black text-sm   text-[#0c479a] ${isArabic ? "text-right" : "text-left"}`}
            >
              {data.size_sqm} {isArabic ? "متر²" : "SQM"}
            </p>
          </div>

          {/* Level */}
          <div className="p-4 border-b border-slate-200 bg-white">
            <div className={`flex items-center gap-2 mb-2 `}>
              <Layers size={12} className="text-[#0c479a]" />
              <span
                className={`text-[8px] font-black uppercase text-slate-400 tracking-widest ${isArabic ? "text-right" : "text-left"}`}
              >
                {labels.level}
              </span>
            </div>
            <p
              className={`font-black text-sm   text-[#0c479a] ${isArabic ? "text-right" : "text-left"}`}
            >
              {isArabic
                ? `طابق - ${data.floor_number || "00"}`
                : `L - ${data.floor_number || "00"}`}
            </p>
          </div>
        </div>

        {/* 3. Description Block */}
        <div className="space-y-4">
          <div className="flex items-center gap-2 text-[#0c479a]">
            <Info size={14} />
            <h4 className="text-[9px] font-black uppercase ">
              {labels.description}
            </h4>
          </div>
          <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pr-4  ">
            {isArabic ? data.description_ar : data.description_en}
          </p>
        </div>

        {/* 4. Location Footer */}
        <div className="bg-slate-950 p-6 text-white border-l-4 border-[#0c479a]">
          <div className="flex items-start gap-4">
            <MapPin size={18} className="text-[#0c479a] mt-1 shrink-0" />
            <div>
              <h4 className="text-[8px] font-black uppercase  text-slate-500 mb-2">
                {labels.location}
              </h4>
              <p className="text-[10px] font-black uppercase leading-tight tracking-tighter  ">
                {isArabic ? data.address_ar : data.address_en}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RealEstateSummary;
