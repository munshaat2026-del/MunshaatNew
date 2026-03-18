"use client";

import { Briefcase, ArrowUpRight, SearchX, Layers } from "lucide-react";
import Link from "next/link";
import { Locale, TransalatedCareer } from "@/types/index";
import { cn } from "@/lib/utils";

interface Props {
  careers: TransalatedCareer[] | null;
  locale: Locale;
}

export default function CareersPage({ careers, locale }: Props) {
  const isArabic = locale === "ar";

  return (
    <div 
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0c479a] selection:text-white" 
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Header Section - Minimalist Industrial */}
      <section className="relative pt-40 pb-24 px-6 border-b border-slate-100 bg-slate-50/30 overflow-hidden">
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-px bg-[#0c479a]"></div>
            <span className="text-[11px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
              {isArabic ? "فرص استراتيجية" : "Strategic_Openings"}
            </span>
          </div>
          
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
            {isArabic ? "المسارات" : "Career"}<br />
            <span className="text-slate-200">{isArabic ? "المهنية" : "Pathways"}</span>
          </h1>
          
          <p className="max-w-2xl text-slate-500 font-bold text-xl leading-relaxed uppercase tracking-tight">
            {isArabic
              ? "نحن نستقطب الكفاءات لبناء الجيل القادم من البنية التحتية الصناعية."
              : "Recruiting elite talent to engineer the next generation of industrial infrastructure."}
          </p>
        </div>
      </section>

      {/* 2. Jobs Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {careers && careers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {careers.map((job) => (
              <Link
                key={job.id}
                href={`/${locale}/career/${job.slug}`}
                className="group relative bg-white border border-slate-200 hover:border-[#0c479a] transition-all duration-700 flex flex-col h-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
              >
                {/* Job Image with Experience Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={job.image}
                    alt={job.position}
                    className="w-full h-full object-cover grayscale-[50%] group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />
                  
                  {/* Floating Experience Badge (Repositioned) */}
                  <div className={cn(
                    "absolute top-0 bg-[#0c479a] text-white px-5 py-2 flex items-center gap-2",
                    isArabic ? "left-0" : "right-0"
                  )}>
                    <Layers size={12} className="opacity-70" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">
                      {job.experience}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="py-10 px-3.5 md:px-8 flex flex-col flex-grow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-slate-300 text-[9px] font-black uppercase tracking-[0.3em] mb-3">
                      <Briefcase size={10} />
                      {isArabic ? "المسمى الوظيفي" : "POSITION_TITLE"}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-[#0c479a] transition-colors duration-500">
                      {job.position}
                    </h3>
                  </div>

                  <p className="text-[13px] text-slate-400 leading-relaxed font-bold uppercase tracking-tight mb-8 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Requirements Matrix */}
                  <div className="flex flex-wrap gap-1.5 mb-10">
                    {job.requirements.map((req, i) => (
                      <span
                        key={i}
                        className="text-[8px] font-black uppercase bg-slate-50 border border-slate-100 px-2.5 py-1 text-slate-400 group-hover:border-slate-200 transition-colors"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer - Pinned to bottom */}
                  <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between group-hover:border-[#0c479a]/20 transition-colors">
                    <div className="flex items-center gap-3 text-[11px] font-black  tracking-[0.3em] text-[#0c479a] group-hover:gap-5 transition-all">
                      {isArabic ? "استعراض التفاصيل" : "View Details"}
                      <ArrowUpRight size={16} className={"transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1"} />
                    </div>
                    
                    {/* Minimalist ID Indicator */}
                    <div className="text-[12px] font-bold text-slate-400 border-b-[1px] border-b-[#0c479a]  tracking-widest">
                      {job.role}
                    </div>
                  </div>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#0c479a] group-hover:h-full transition-all duration-700"></div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-slate-100 rounded-[3rem] text-center">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-8 border border-slate-100">
              <SearchX size={32} className="text-slate-200" />
            </div>
            <h3 className="text-xs font-black uppercase tracking-[0.5em] text-slate-300">
              {isArabic ? "لا توجد شواغر حالية" : "No_Active_Vacancies"}
            </h3>
          </div>
        )}
      </section>

  
    </div>
  );
}