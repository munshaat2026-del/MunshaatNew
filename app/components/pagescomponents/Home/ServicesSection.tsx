"use client";

import {
  Building2,
  Car,
  Users,
  Store,
  Settings,
  FileText,
} from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";

interface ServicesSectionProps {
  primaryColor: string;
}

export default function ServicesSection({
  primaryColor,
}: ServicesSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].servicesSection;
  const isAr = locale === "ar";

  const icons = [Store, Building2, Car, Settings, FileText, Users];

  return (
    <section className="py-40 px-6 md:px-20 bg-white">
      <div className="max-w-7xl mx-auto mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-slate-400">
            <span className="text-[10px] font-black uppercase">
              {data.tag}
            </span>
            <div className="h-px w-12 bg-slate-300" />
          </div>

          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
            {data.titleLine1} <br />
            <span className="text-[#0c479a]">{data.titleLine2}</span>
          </h2>
        </div>

        <p className="text-slate-500 font-bold text-[10px] max-w-xs leading-loose pb-2 border-b border-slate-200">
          {data.description}
        </p>
      </div>

      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ${
          isAr ? "border-r" : "border-l"
        } border-slate-200`}
      >
        {data.items.map((item, i) => {
          const Icon = icons[i];

          return (
            <div
              key={i}
              className={`group p-12 min-h-[320px] bg-slate-50 border border-slate-200 transition-all duration-500 hover:bg-slate-100 hover:border-slate-300 relative overflow-hidden ${
                isAr ? "border-l" : "border-r"
              }`}
            >
              <div
                className={`absolute top-0 ${
                  isAr ? "right-0" : "left-0"
                } w-1 h-full transition-all duration-500`}
                style={{ backgroundColor: primaryColor }}
              />

              <div className="flex justify-between items-start mb-12">
                <div
                  className="w-14 h-14 flex items-center justify-center bg-white border border-slate-200 shadow-sm group-hover:shadow-md group-hover:border-[#0c479a]/30 transition-all duration-500"
                  style={{ color: primaryColor }}
                >
                  <Icon size={28} strokeWidth={1.5} />
                </div>

                <span className="text-[10px] font-black text-slate-300 group-hover:text-slate-500 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <h3
                className={`text-lg font-black uppercase tracking-tight mb-4 text-slate-900 transition-transform duration-500 ${
                  isAr
                    ? "group-hover:-translate-x-2"
                    : "group-hover:translate-x-2"
                }`}
              >
                {item.t}
              </h3>

              <p className="text-slate-500 text-[11px] font-bold tracking-widest leading-relaxed mb-8">
                {item.d}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
