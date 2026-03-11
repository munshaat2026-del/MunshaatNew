"use client";

import React from 'react';
import { Globe, Clock, Trophy, Target } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";

interface StatsSectionProps {
  primaryColor: string;
}

export default function StatsSection({ primaryColor }: StatsSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].stats;
  const isAr = locale === "ar";

  const icons = [Globe, Clock, Trophy, Target];

  return (
    <section className="py-32 bg-white px-6 md:px-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        <div className={`mb-16 flex items-center justify-between border-b border-slate-900 pb-8`}>
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#0c479a] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                {data.analytics}
              </span>
           </div>
           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest hidden md:block italic">
             {data.verified}
           </span>
        </div>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 ${isAr ? 'border-r' : 'border-l'} border-slate-900`}>
          {data.items.map((stat, i) => {
            const Icon = icons[i];
            return (
              <div 
                key={i} 
                className={`group p-10 border-b border-slate-900 hover:bg-slate-50 transition-all duration-700 relative overflow-hidden ${isAr ? 'border-l' : 'border-r'}`}
              >
                <span className={`absolute top-4 ${isAr ? 'left-6' : 'right-6'} text-[8px] font-black text-slate-200 group-hover:text-[#0c479a] transition-colors uppercase tracking-widest`}>
                  {stat.code}
                </span>

                <div className="space-y-8 relative z-10">
                  <div 
                    className="w-10 h-10 flex items-center transition-transform group-hover:scale-110" 
                    style={{ color: primaryColor }}
                  >
                    <Icon size={20} strokeWidth={2.5} />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-5xl font-black tracking-tighter  leading-none group-hover:translate-x-2 transition-transform duration-500">
                      {stat.val}
                    </h4>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-slate-900 transition-colors">
                      {stat.lab}
                    </p>
                  </div>
                </div>

                <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:10px_10px]"></div>
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-end gap-12">
            <div className={`flex flex-col ${isAr ? 'items-start' : 'items-end'}`}>
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">
                  {data.updateFreq}
                </span>
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">
                  {data.sync}
                </span>
            </div>
            <div className={`flex flex-col ${isAr ? 'items-start' : 'items-end'}`}>
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">
                  {data.tierLabel}
                </span>
                <span className="text-[9px] font-black text-[#0c479a] uppercase tracking-widest italic">
                  {data.tierValue}
                </span>
            </div>
        </div>
      </div>
    </section>
  );
}