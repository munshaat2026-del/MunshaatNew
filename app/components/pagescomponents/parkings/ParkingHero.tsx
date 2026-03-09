"use client";

import React from 'react';
import { Zap, ChevronRight, ChevronLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { parkingdata } from "@/app/data/parkingdata";

interface ParkingHeroProps {
  primaryColor: string;
}

export default function ParkingHero({ primaryColor }: ParkingHeroProps) {
  const locale = useLocale() as "en" | "ar";
  const data = parkingdata[locale].parkingHero;
  const isAr = locale === "ar";

  return (
    <header className="relative h-[85vh] flex items-center justify-center text-center px-6 overflow-hidden bg-[#0a0f1a]">
      {/* Background Image with Technical Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070"
          className="w-full h-full object-cover opacity-30 grayscale contrast-125 scale-105"
          alt="Parking Facility"
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,#ffffff05_50%,transparent_51%)] bg-[size:100%_4px] pointer-events-none"></div>
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]/80"></div>
      </div>

      {/* Technical Metadata Corner Elements */}
      <div className={`absolute top-24 ${isAr ? 'right-10 text-right' : 'left-10 text-left'} hidden lg:block space-y-1 opacity-40`}>
        <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">{data.statusLabel}</p>
        <p className="text-[10px] font-black text-green-500 uppercase tracking-widest italic">{data.statusValue}</p>
      </div>
      
      <div className={`absolute bottom-10 ${isAr ? 'left-10 text-left' : 'right-10 text-right'} hidden lg:block space-y-1 opacity-40`}>
        <p className="text-[8px] font-black text-white uppercase tracking-[0.4em]">{data.assetRef}</p>
        <p className="text-[10px] font-black text-white uppercase tracking-widest">{data.assetCode}</p>
      </div>

      <div className="relative z-10 max-w-5xl space-y-12">
        {/* Sharp Badge */}
        <div className="inline-flex items-center gap-3 border border-white/10 bg-black/40 backdrop-blur-md px-6 py-2">
          <Zap size={14} className="animate-pulse" style={{ color: primaryColor }} />
          <span className="text-white text-[9px] font-black uppercase tracking-[0.5em]">
            {data.badge}
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="text-6xl md:text-[9vw] font-black text-white leading-[0.85] uppercase tracking-tighter">
          {data.titleLine1} <br />
          <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>
            {data.titleLine2}
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-8">
          <p className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-[0.25em] leading-relaxed italic">
            {data.desc}
          </p>
          
          {/* Action Blocks */}
          <div className={`flex flex-col sm:flex-row gap-0 justify-center border border-white/10 p-2 bg-white/5 backdrop-blur-sm ${isAr ? 'sm:flex-row-reverse' : ''}`}>
            <button className="bg-white text-slate-900 px-12 py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-[#0c479a] hover:text-white transition-all duration-500 flex items-center justify-center gap-2">
              {data.ctaPrimary} {isAr ? <ChevronLeft size={14} /> : <ChevronRight size={14} />}
            </button>
            <button className="border border-white/10 text-white px-12 py-5 font-black text-[10px] uppercase tracking-[0.3em] hover:bg-white/10 transition-all">
              {data.ctaSecondary}
            </button>
          </div>
        </div>
      </div>

      {/* Architectural Axis Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#0c479a] to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-[#0c479a] to-transparent"></div>
    </header>
  );
}