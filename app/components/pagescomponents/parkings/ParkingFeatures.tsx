
import {
  Cpu,          
  ShieldCheck,  
  MapPin,       
  ParkingCircle 
} from "lucide-react";
import { parkingdata } from "@/app/data/parkingdata";
import { Locale } from "@/types";

interface ParkingFeaturesProps {
  primaryColor: string;
  locale:Locale
}

export default function ParkingFeatures({
  primaryColor,
  locale
}: ParkingFeaturesProps) {
  const data = parkingdata[locale].parkingFeatures;
  const isAr = locale === "ar";

const icons = [Cpu, ShieldCheck, MapPin, ParkingCircle];
  return (
    <section className="py-32 px-6 md:px-16 max-w-7xl mx-auto bg-white border-b border-slate-100">
      {/* Header Info */}
      <div
        className={`mb-16 flex items-center gap-4 ${isAr ? "flex-row-reverse" : ""}`}
      >
        <div
          className="w-12 h-0.5"
          style={{ backgroundColor: primaryColor }}
        ></div>
        <span className="text-[10px] font-black uppercase  text-slate-400">
          {data.meta}
        </span>
      </div>

      {/* Features Grid */}
      <div
        className={`grid grid-cols-1 md:grid-cols-4 gap-0 border-t border-slate-100 ${isAr ? "border-r" : "border-l"}`}
      >
        {data.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className={`group p-10 border-b border-slate-100 hover:bg-slate-50 transition-all duration-500 relative overflow-hidden ${isAr ? "border-l" : "border-r"}`}
            >
              <div className="space-y-8 relative z-10">
                {/* Icon */}
                <div
                  className="w-14 h-14 flex  items-center justify-center border border-slate-100 bg-white group-hover:border-slate-900 transition-all duration-500 shadow-sm"
                  style={{ color: primaryColor }}
                >
                  <Icon className="no-flip" size={22} strokeWidth={1.5} />
                </div>

                {/* Text Content */}
                <div
                  className={`space-y-3 ${isAr ? "text-right" : "text-left"}`}
                >
                  <h4 className="font-black text-base uppercase tracking-tighter text-slate-900">
                    {item.title}
                  </h4>

                  <p className="text-slate-400 text-[11px] font-bold  tracking-widest leading-loose">
                    {item.desc}
                  </p>
                </div>

                {/* Visual Accent */}
                <div className="w-0 h-px bg-slate-900 group-hover:w-full transition-all duration-700 opacity-20"></div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
