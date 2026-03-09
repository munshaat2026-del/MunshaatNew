"use client";
import React, { useState } from 'react';
import { Plus, ArrowUpRight, BarChart } from 'lucide-react';
import { useLocale } from "next-intl";
import { aboutdata } from "@/app/data/aboutdata";

export default function RoyalOffsetHero() {
  const [active, setActive] = useState<number | null>(null);
  const locale = useLocale() as "en" | "ar";
  const data = aboutdata[locale].portfolio;
  const isAr = locale === "ar";

  return (
    <section className="relative min-h-[100vh] w-full bg-white flex flex-col items-center justify-center overflow-hidden border-b border-slate-900 py-24">
      
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:50px_50px]"></div>

      <div className="relative z-20 mb-32 text-center space-y-4">
        <div className="flex items-center justify-center gap-6 mb-2">
          <div className="h-[2px] w-12 bg-[#0c479a]"></div>
          <span className="text-slate-400 text-[10px] font-black uppercase tracking-[0.6em]">
            {data.tag}
          </span>
          <div className="h-[2px] w-12 bg-[#0c479a]"></div>
        </div>
        <h2 className="text-5xl md:text-8xl font-black text-slate-900 tracking-tighter uppercase italic leading-none">
          {data.titleLine1} <br />
          <span className="text-transparent" style={{ WebkitTextStroke: "1.5px #0c479a" }}>
            {data.titleLine2}
          </span>
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl w-full px-6 flex flex-col md:flex-row items-center justify-center gap-12">
        
        {data.assets.map((item, idx) => (
          <div
            key={idx}
            onMouseEnter={() => setActive(idx)}
            onMouseLeave={() => setActive(null)}
            className={`relative transition-all duration-[1000ms] ease-[cubic-bezier(0.19,1,0.22,1)] 
              ${item.offset} 
              ${active === idx ? 'md:w-[550px]' : active === null ? 'md:w-[450px]' : 'md:w-[350px] grayscale opacity-40'}
            `}
          >
            <div className="relative h-[600px] w-full overflow-hidden bg-slate-900 group shadow-2xl">
              
              <div className="absolute inset-0 transition-transform duration-[2.5s] ease-out group-hover:scale-110">
                <img 
                  src={item.image} 
                  className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-1000"
                  alt={item.title}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
              </div>

              <div className={`absolute top-0 ${isAr ? 'right-0' : 'left-0'} bg-[#0c479a] text-white p-6 z-20`}>
                <span className="text-sm font-black tracking-widest leading-none">{item.id}</span>
              </div>

              <div className="absolute inset-0 p-12 flex flex-col justify-between z-10">
                <div className={`flex ${isAr ? 'justify-start' : 'justify-end'}`}>
                   <div className="w-12 h-12 border border-white/30 flex items-center justify-center text-white group-hover:bg-[#0c479a] group-hover:border-[#0c479a] transition-all duration-500">
                      <Plus size={20} className="group-hover:rotate-180 transition-transform duration-700" />
                   </div>
                </div>

                <div className="space-y-6">
                  <div className="space-y-2">
                    <p className="text-[#0c479a] font-black text-[10px] tracking-[0.5em] uppercase">
                      {item.subtitle}
                    </p>
                    <h3 className={`text-5xl md:text-6xl font-black text-white tracking-tighter leading-none italic uppercase transition-transform duration-700 ${isAr ? 'group-hover:-translate-x-3' : 'group-hover:translate-x-3'}`}>
                      {item.title}
                    </h3>
                  </div>

                  <div className={`overflow-hidden transition-all duration-1000 ${active === idx ? 'max-h-40 opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                    <div className={`flex items-center gap-8 mb-8 text-white/40 border-[#0c479a] ${isAr ? 'border-r pr-6' : 'border-l pl-6'} text-[10px] font-bold uppercase tracking-widest`}>
                       <div className="flex items-center gap-2 italic">
                         <BarChart size={12} /> {data.tier}
                       </div>
                    </div>
                    
                    <button className="flex items-center gap-4 bg-white text-slate-900 px-10 py-5 font-black text-[10px] uppercase tracking-[0.4em] hover:bg-[#0c479a] hover:text-white transition-all duration-500">
                      {data.analyze} <ArrowUpRight size={16} className={isAr ? "rotate-[-90deg]" : ""} />
                    </button>
                  </div>
                </div>
              </div>

              <div className={`absolute bottom-0 ${isAr ? 'right-0' : 'left-0'} h-1 bg-[#0c479a] transition-all duration-1000 ${active === idx ? 'w-full' : 'w-0'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className={`absolute bottom-10 ${isAr ? 'left-10' : 'right-10'} hidden lg:block opacity-20`}>
         <div className={`${isAr ? 'rotate-[-90deg] origin-bottom-left' : 'rotate-90 origin-bottom-right'}`}>
            <p className="text-[9px] font-black tracking-[1em] uppercase text-slate-900">
              {data.indicator}
            </p>
         </div>
      </div>
    </section>
  );
}