"use client";

import React from 'react';
import { Target, Globe, ShieldCheck } from "lucide-react";
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";

interface CoreValuesProps {
  primaryColor: string;
}

export default function CoreValues({ primaryColor }: CoreValuesProps) {
  const locale = useLocale() as "en" | "ar";
  const data = aboutdata[locale].coreValues;
  const isAr = locale === "ar";

  const icons = [Target, Globe, ShieldCheck];
  const gridConfigs = [
    "md:col-span-2 md:row-span-1",
    "md:col-span-1 md:row-span-2",
    "md:col-span-2 md:row-span-1"
  ];

  return (
    <section className="py-40 px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-[#0c479a]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                {data.tag}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
              {data.titleLine1} <br />
              <span className="text-[#0c479a]">
                {data.titleLine2}
              </span>
            </h2>
          </div>
          <p className={`text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] leading-loose border-slate-100 ${isAr ? 'border-r-2 pr-6' : 'border-l-2 pl-6'}`}>
            {data.desc}
          </p>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-slate-100 auto-rows-[280px] ${isAr ? 'border-r' : 'border-l'}`}>
          {data.items.map((val, i) => {
            const Icon = icons[i];
            return (
              <div 
                key={i} 
                className={`group relative p-10 transition-all duration-700 flex flex-col justify-between 
                bg-white border-b border-slate-100 hover:bg-slate-50 ${isAr ? 'border-l' : 'border-r'} ${gridConfigs[i]}`}
              >
                <div className="flex justify-between items-start">
                  <div 
                    className="w-10 h-10 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 group-hover:bg-white transition-all duration-500"
                    style={{ color: primaryColor }}
                  >
                    <Icon size={20} strokeWidth={1.5} />
                  </div>
                  <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                   {i + 1}
                  </span>
                </div>

                <div className="relative z-10 space-y-4">
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#0c479a] transition-colors">
                    {val.t}
                  </h3>
                  <p className="text-slate-400 leading-relaxed font-bold text-[11px] uppercase tracking-widest max-w-md group-hover:text-slate-600 transition-colors">
                    {val.d}
                  </p>
                </div>

                <div 
                  className={`absolute top-0 ${isAr ? 'left-0 rotate-[-90deg]' : 'right-0'} w-0 h-0 border-t-[15px] border-r-[15px] border-transparent group-hover:border-t-[#0c479a] group-hover:border-r-[#0c479a] transition-all duration-500`}
                />
                
                <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
              </div>
            )
          })}
        </div>

      </div>
    </section>
  );
}