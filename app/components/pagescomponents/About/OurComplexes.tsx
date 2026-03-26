"use client";
import React, { useState } from 'react';
import { ArrowUpRight, BarChart } from 'lucide-react';
import { useLocale } from "next-intl";
import Link from 'next/link';
import type { translatedParkingsGetPayload } from "@/types/index";
import { Button1 } from '@/components/ui/Button1';

interface Props {
  complexdata: translatedParkingsGetPayload[];
}

export default function RoyalOffsetHero({ complexdata }: Props) {
  const [active, setActive] = useState<number | null>(null);
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const cardCount = complexdata.length;

  const getContainerStyles = () => {
    if (cardCount >= 6) return "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-12";
    return "flex flex-col md:flex-row items-center justify-center gap-6 lg:gap-8";
  };

  const getCardStyles = (idx: number) => {
    if (cardCount >= 6) return "w-full h-[550px]";
    const baseWidth = active === idx ? 'md:flex-[1.5]' : active === null ? 'md:flex-1' : 'md:flex-[0.8]';
    let offset = "";

    switch (cardCount) {
      case 2:
        offset = idx === 0 ? "md:-translate-y-16" : "md:translate-y-16";
        break;
      case 3:
        if (idx === 1) offset = "md:-translate-y-12";
        break;
      case 4:
        offset = idx % 2 === 0 ? "md:-translate-y-8" : "md:translate-y-8";
        break;
      case 5:
        if (idx === 0 || idx === 4) offset = "md:translate-y-10";
        if (idx === 2) offset = "md:-translate-y-10";
        break;
    }
    return `${baseWidth} ${offset} min-w-[280px]`;
  };

  return (
    <section className="relative min-h-screen w-full bg-white flex flex-col items-center justify-start overflow-hidden border-b border-slate-900 py-32">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-10 w-full max-w-[1500px] px-10 mb-24 space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-[2px] bg-[#0c479a]"></div>
          <span className="text-[10px] font-black uppercase tracking-[0.5em] text-[#0c479a]">
            {isAr ? "اﻟﻤﻠﻜﻴﺔ اﻟﻌﻘﺎرﻳﺔ" : "Real Estate Ownership"}
          </span>
        </div>
         <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
    <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-slate-900">
      {isAr ? "مجمعاتنا" : "Our"} <br />
      <span className=" text-[#0c479a] ">
        {isAr ? "العقارية" : "Complexes"}
      </span>
    </h2>

    <p className="max-w-xs text-[11px] font-bold uppercase tracking-tight text-slate-400 leading-relaxed border-l-2 border-slate-100 pl-4">
      {isAr
        ? "تمتلك الشركة عددًا من المجمعات العقارية في العاصمة عمّان، من أبرزها مجمع البرج ومجمع الشابسوغ، والتي تُدار وفق أعلى المعايير المهنية."
        : "The company owns a number of real estate complexes in Amman, including Al Burj Complex and Al Shabsough Complex, managed according to the highest professional standards."}
    </p>
  </div>
      </div>

      {/* Cards Container */}
      <div className={`relative z-10 max-w-[1500px] w-full px-10 transition-all duration-700 ${getContainerStyles()}`}>
        {complexdata.map((item, idx) => (
         <Link href={`/about/${item.slug}`}
          key={item.id || idx}
            onMouseEnter={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
            className={`relative transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] group
              ${getCardStyles(idx)}
              ${active !== null && active !== idx ? 'grayscale opacity-40 scale-[0.97]' : 'grayscale-0 opacity-100 scale-100'}
            `}>
          
            {/* Main Card Design */}
            <div className="relative h-[550px] w-full overflow-hidden bg-slate-900 shadow-2xl border border-slate-100/10">
              
              {/* Background Image */}
              <div className="absolute inset-0 transition-transform duration-[2.5s] ease-out group-hover:scale-110">
                <img 
                  src={item.image!} 
                  alt={item.name}
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-30 transition-opacity duration-1000"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/40 to-transparent" />
              </div>

              {/* Card Index */}
              <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} bg-[#0c479a] text-white px-5 py-4 z-20`}>
                <span className="text-xs font-black tracking-widest leading-none">
                  {(idx + 1).toString().padStart(2, '0')}
                </span>
              </div>

              {/* Content Overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end z-10">
                <div className="space-y-5">
                  <div className="space-y-1">
                    <p className="text-[#0c479a] font-black text-[9px] tracking-[0.4em] uppercase">
                      Industrial Complex
                    </p>
                    <h3 className={`text-3xl md:text-4xl lg:text-5xl font-black text-white tracking-tighter leading-tight uppercase transition-transform duration-700 ${isAr ? 'group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`}>
                      {item.name}
                    </h3>
                  </div>

                  {/* Expandable Info */}
                  <div className={`overflow-hidden transition-all duration-700 ${active === idx || cardCount >= 6 ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'}`}>
                    <div className={`flex items-start gap-4 mb-6 text-white/50 border-[#0c479a] ${isAr ? 'border-r pr-4 text-right' : 'border-l pl-4 text-left'} text-[9px] font-bold uppercase tracking-[0.2em]`}>
                       <BarChart size={12} className="shrink-0 mt-0.5" /> 
                       <span className="line-clamp-2 leading-relaxed">
                         {item.description}
                       </span>
                    </div>
                    
                    <Link href={`/about/${item.slug}`}>
                      <Button1 className="flex items-center gap-3  px-6 py-3 font-black text-[9px] border-[#0c479a] uppercase tracking-[0.3em] hover:bg-[#0c479a] hover:text-white transition-all duration-500">
                        {isAr ? "عرض التفاصيل" : "see more"} 
                        <ArrowUpRight size={14}  />
                      </Button1>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Animated Bottom Line */}
              <div className={`absolute bottom-0 ${isAr ? 'right-0' : 'left-0'} h-1 bg-[#0c479a] transition-all duration-1000 ${active === idx ? 'w-full' : 'w-0'}`} />
            </div>
         </Link>
        ))}
      </div>
    </section>
  );
}