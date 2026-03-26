"use client";

import React from "react";
import {
  BarChart,
  Zap,
  Building2,
  Car,
  ShieldCheck,
  Users,
  ArrowUpRight,
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
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[10px] font-black uppercase ">
              {data.tag}
            </span>
            <div className="h-[1px] w-12 bg-slate-200"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            {data.titleLine1} <br />
            <span className="text-[#0c479a]">{data.titleLine2}</span>
          </h2>
        </div>
        <p className="text-slate-400 font-bold text-[10px] uppercase  max-w-xs leading-loose pb-2 border-b border-slate-100">
          {data.description}
        </p>
      </div>

      <div
        className={`max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t ${isAr ? "border-r" : "border-l"} border-slate-100`}
      >
        {data.items.map((item, i) => {
          const Icon = icons[i];
          return (
            <div
              key={i}
              className={`group p-12 border-b border-slate-100 transition-all duration-500 hover:bg-slate-50 relative overflow-hidden ${isAr ? "border-l" : "border-r"}`}
            >
              <div
                className={`absolute top-0 ${isAr ? "right-0" : "left-0"} w-1 h-0 group-hover:h-full transition-all duration-500`}
                style={{ backgroundColor: primaryColor }}
              />

              <div className="flex justify-between items-start mb-12">
                <div
                  className="w-12 h-12 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 transition-colors duration-500"
                  style={{ color: primaryColor }}
                >
                  <Icon size={24} strokeWidth={1.5} />
                </div>
                <span className="text-[10px] font-black text-slate-200 group-hover:text-slate-900 transition-colors">
                  0{i + 1}
                </span>
              </div>

              <h3
                className={`text-lg font-black uppercase tracking-tight mb-4 transition-transform duration-500 ${isAr ? "group-hover:-translate-x-2" : "group-hover:translate-x-2"}`}
              >
                {item.t}
              </h3>

              <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8">
                {item.d}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
