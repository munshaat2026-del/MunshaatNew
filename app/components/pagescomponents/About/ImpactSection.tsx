"use client";

import React from 'react';
import { ArrowRight, BarChart3, Binary, ArrowLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";

interface ImpactSectionProps {
  primaryColor: string;
}

export default function ImpactSection({ primaryColor }: ImpactSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = aboutdata[locale].impact;
  const isAr = locale === "ar";

  return (
    <section className="py-40 px-6 md:px-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background Architectural Accent */}
      <div className={`absolute top-0 ${isAr ? 'left-0 skew-x-12 -translate-x-20' : 'right-0 -skew-x-12 translate-x-20'} w-1/3 h-full bg-slate-50/50 pointer-events-none`}></div>

      <div className={`max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 relative z-10`}>
        
        {/* Left Side: Performance Metrics */}
        <div className="flex-1 space-y-16">
          <div className="space-y-4">
            <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
              <BarChart3 size={16} style={{ color: primaryColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
                {data.tag}
              </span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none ">
              {data.titleLine1} <span className="text-[#0c479a]" >{data.titleLine2}</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {data.stats.map(([num, label], i) => (
              <div key={i} className={`group relative pt-8 border-t border-slate-100 hover:border-slate-900 transition-colors duration-500`}>
                <span className={`absolute top-2 ${isAr ? 'right-0' : 'left-0'} text-[8px] font-black text-slate-300 uppercase tracking-widest`}>
                  Data_Ref_0{i + 1}
                </span>
                
                <div className="flex items-baseline gap-2">
                   <p className={`text-5xl font-black tracking-tighter  transition-transform duration-500 ${isAr ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                    {num}
                   </p>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 group-hover:text-slate-900 transition-colors">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Heritage & Action */}
        <div className={`flex-1 flex flex-col justify-center space-y-10 ${isAr ? 'lg:pr-16 border-r pr-6' : 'lg:pl-16 border-l pl-6'} border-slate-100`}>
          <div className="space-y-6">
            <div className={`flex items-center gap-2 text-slate-300 ${isAr ? 'flex-row-reverse' : ''}`}>
                <Binary size={14} />
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">
                  {data.heritageTag}
                </h3>
            </div>

            <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-[0.15em] leading-[2.2] ">
              {data.heritageDesc}
            </p>
          </div>

          <div className="pt-10">
            <button
              className="group flex items-center gap-6 p-6 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 w-full md:w-fit"
            >
              <span className="font-black text-[10px] uppercase tracking-[0.4em]">
                {data.cta}
              </span>
              <div className="w-10 h-[1px] bg-slate-900 group-hover:bg-white group-hover:w-16 transition-all"></div>
              {isAr ? <ArrowLeft size={18} className="group-hover:-translate-x-2 transition-transform" /> : <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />}
            </button>
            
            <p className="mt-6 text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">
              {data.fileInfo}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}