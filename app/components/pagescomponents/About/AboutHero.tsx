"use client";

import React from 'react';
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";
import AboutImage from "@/public/aboutImage.jpeg"

interface AboutHeroProps {
  primaryColor: string;
}

export default function AboutHero({ primaryColor }: AboutHeroProps) {
  const locale = useLocale() as "en" | "ar";
  const data = aboutdata[locale].aboutHero;
  const isAr = locale === "ar";

  return (
    <section className="relative py-40 px-6 md:px-20 overflow-hidden bg-white border-b border-slate-100">
      {/* Decorative Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:40px_40px]"></div>
      
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch gap-0 border border-slate-100">
        
        {/* Left Content Block */}
        <div className={`flex-1 p-12 md:p-20 space-y-10 relative z-10 ${isAr ? 'border-l' : 'border-r'} border-slate-100`}>
          <div className="flex items-center gap-3 text-slate-300">
            <div className="w-12 h-[1px] bg-[#0c479a]"></div>
            <span className="font-black text-[10px] uppercase tracking-[0.5em]">{data.tag}</span>
          </div>

          <h1 className="text-6xl md:text-[7vw] font-black uppercase tracking-tighter leading-[0.85] text-slate-900">
            {data.titleLine1} <br />
            <span className="text-[#0c479a]" >
              {data.titleLine2}
            </span>
          </h1>

          <div className="space-y-6 pt-8">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.2em] leading-loose max-w-md">
              {data.description}
            </p>
            <div className="flex gap-4 items-center">
                <div className="h-[2px] w-20 bg-[#0c479a]"></div>
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">
                  {data.est}
                </span>
            </div>
          </div>
        </div>

        {/* Right Image Block */}
        <div className="flex-1 relative bg-slate-50 min-h-[500px]">
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={AboutImage.src}
              className="w-full h-full object-cover transition-all duration-1000 scale-105"
              alt="Corporate Environment"
            />
          </div>
          
          {/* Overlay Tag */}
          <div 
            className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} p-8 text-white z-20 whitespace-pre-line text-center`}
            style={{ backgroundColor: primaryColor }}
          >
            <p className="text-[10px] font-black uppercase tracking-[0.4em] leading-normal">
              {data.overlayTag}
            </p>
          </div>

          {/* Bottom Accent */}
          <div className={`absolute bottom-12 ${isAr ? '-right-12' : '-left-12'} bg-white p-10 hidden xl:block border border-slate-100 shadow-2xl z-30`}>
              <p className="text-4xl font-black tracking-tighter text-slate-900">100%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-400 mt-2">
                {data.precisionLabel}
              </p>
          </div>
        </div>
      </div>
    </section>
  );
}