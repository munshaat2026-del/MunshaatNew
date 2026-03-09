"use client";

import React from 'react';
import { ArrowUpRight, ArrowUpLeft } from "lucide-react";
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";

interface TeamPreviewProps {
  primaryColor: string;
}

export default function TeamPreview({ primaryColor }: TeamPreviewProps) {
  const locale = useLocale() as "en" | "ar";
  const data = aboutdata[locale].teamSection;
  const isAr = locale === "ar";

  // روابط الصور ثابتة لأنها لا تتغير بتغير اللغة
  const images = [
    "https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=400&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=400&h=500&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=400&h=500&auto=format&fit=crop"
  ];

  return (
    <section className="py-24 px-6 bg-[#fcfcfc]">
      <div className="max-w-7xl mx-auto">
        
        {/* Header - Minimalist */}
        <div className={`mb-20 flex flex-col md:flex-row md:items-end justify-between gap-6 ${isAr ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
          <div className="space-y-4">
            <div className={`h-1 w-12 ${isAr ? 'mr-0 ml-auto md:ml-0 md:mr-0' : ''}`} style={{ backgroundColor: primaryColor }}></div>
            <h2 className="text-4xl md:text-5xl font-black text-slate-900 uppercase tracking-tighter">
              {data.titlePart1} <span className="font-light italic text-slate-400">&</span> {data.titlePart2}
            </h2>
          </div>
          <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.4em]">
            {data.tag}
          </p>
        </div>

        {/* The Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {data.members.map((member, i) => (
            <div key={i} className="group relative cursor-pointer">
              
              {/* Image Box */}
              <div className="relative aspect-[4/5] overflow-hidden bg-slate-200">
                <img
                  src={images[i]}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 grayscale hover:grayscale-0"
                  alt={member.name}
                />
                
                {/* Floating Arrow Badge */}
                <div 
                  className={`absolute top-0 ${isAr ? 'left-0' : 'right-0'} w-12 h-12 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300`}
                  style={{ backgroundColor: primaryColor }}
                >
                  {isAr ? <ArrowUpLeft size={20} /> : <ArrowUpRight size={20} />}
                </div>
              </div>

              {/* The Inset Card */}
              <div className={`relative -mt-12 mx-4 p-6 bg-white shadow-[0_10px_30px_rgba(0,0,0,0.04)] border border-slate-50 transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-xl ${isAr ? 'text-right' : 'text-left'}`}>
                <h4 className="text-lg font-black text-slate-900 uppercase tracking-tight">
                  {member.name}
                </h4>
                <div className={`flex items-center gap-2 mt-1 ${isAr ? 'flex-row-reverse' : ''}`}>
                  <div className="w-4 h-[2px]" style={{ backgroundColor: primaryColor }}></div>
                  <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest">
                    {member.role}
                  </p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}