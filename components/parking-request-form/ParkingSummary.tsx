"use client";
import { MapPin, Info, Car} from 'lucide-react';
import { type TranslatedParkings } from "@/types/index";

interface ParkingSummaryProps {
  data: TranslatedParkings;
  locale: "en" | "ar";
}

const ParkingSummary = ({ data, locale }: ParkingSummaryProps) => {
  const isArabic = locale === "ar";
  const labels = {
    specs: isArabic ? "بيانات المواقف // تخصيص الأصول" : "Parking Data // Asset Allocation",
    zone: isArabic ? "نطاق الموقف" : "Parking Zone",
    status: isArabic ? "حالة الخدمة" : "Service Status",
    active: isArabic ? "نشط" : "ACTIVE",
    location: isArabic ? "العنوان" : "Addrees",
    description: isArabic ? "الوصف": "Description",
  };

  return (
    <div className="h-full border-l border-slate-100 rtl:border-l-0 rtl:border-r">
      {/* Asset Image Header */}
      <div className="relative h-64 overflow-hidden border-b border-slate-900 bg-slate-100">
        {data.image ? (
          <img 
            src={data.image} 
            alt="Parking Preview" 
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-slate-300">
            <Car size={48} strokeWidth={1} />
          </div>
        )}
        <div className="absolute inset-0 bg-slate-900/20"></div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-linear-to-t from-slate-950 text-white">
          <p className="text-[8px] font-black uppercase tracking-[0.4em] text-[#0c479a] mb-1">
            {labels.specs}
          </p>
          <h2 className="text-xl font-black uppercase   tracking-tight">
            {data.name}
          </h2>
        </div>
      </div>

      <div className="p-8 space-y-10">       

        {/* Description Block */}
        {(data.description) && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-[#0c479a]">
              <Info size={14} />
              <h4 className="text-[9px] font-black uppercase tracking-[0.3em]">{labels.description}</h4>
            </div>
            <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase tracking-wide border-l-2 border-slate-200 pl-4 rtl:border-l-0 rtl:border-r-2 rtl:pr-4  ">
              {data.description}
            </p>
          </div>
        )}

        {/* Location Footer */}
        <div className="bg-slate-950 py-6 px-1 md:px-6 text-white border-l-4 border-[#0c479a]">
          <div className="flex items-start gap-4">
            <MapPin size={18} className="text-[#0c479a] mt-1 shrink-0" />
            <div>
              <h4 className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mb-2">
                {labels.location}
              </h4>
              <p className="text-[10px] font-black uppercase leading-tight tracking-tighter  ">
                {data.address}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParkingSummary;