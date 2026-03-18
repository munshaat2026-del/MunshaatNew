"use client";

import React from "react";
import { 
  Briefcase,
  ShieldCheck,
  Plus,
  ArrowRight,
  ArrowLeft,
  FileText,
  UserCheck
} from "lucide-react";
import { notFound } from "next/navigation";
import { Locale, TransalatedCareer } from "@/types";
import { cn } from "@/lib/utils";
import ApplyNowButton from "./ApplyNowButton";

interface Props {
  locale: Locale;
  job: TransalatedCareer;
}

export default function SingleJobPage({ locale, job }: Props) {
  const isArabic = locale === "ar";

  if (!job) return notFound();

  return (
    <div 
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0c479a] selection:text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      <main className="max-w-7xl mx-auto px-6 py-24">
        
        {/* 1. Technical Header */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-px bg-[#0c479a]"></div>
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#0c479a]">
              {isArabic ? "تفاصيل الوظيفة" : "Job Details"}
            </span>
          </div>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-tight">
                {job.position}
              </h1>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 bg-slate-50 border border-slate-100 px-3 py-1.5">
                  <UserCheck size={14} className="text-[#0c479a]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                    {job.experience}
                  </span>
                </div>
                <div className="text-[10px] font-semibold text-slate-500 bg-slate-50 border border-slate-100 px-3 py-1.5 uppercase tracking-widest">
                   {job.role}
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* 2. Hero Image */}
        <div className="relative group mb-20">
          <div className="absolute -inset-2 border border-slate-100 pointer-events-none"></div>
          <div className="relative aspect-video md:aspect-[21/9] overflow-hidden bg-slate-100 border border-slate-200">
            <img 
              src={job.image} 
              alt={job.position}
              className="w-full h-full object-cover transition-transform duration-[2s] group-hover:scale-105"
            />
          </div>
        </div>

        {/* 3. Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
          
          {/* Main Content */}
          <div className="lg:col-span-7 space-y-20">
            
            {/* Description Section */}
            <section className="space-y-6">
              <div className="flex items-center gap-3">
                <FileText size={16} className="text-[#0c479a]" />
                <h3 className="text-[11px] font-bold uppercase tracking-[0.2em] text-slate-400">
                  {isArabic ? "عن الوظيفة" : "Job Overview"}
                </h3>
              </div>
              <p className="text-lg md:text-xl text-slate-700 leading-relaxed font-semibold">
                {job.description}
              </p>
            </section>

            {/* Requirements Section */}
            <section className="bg-slate-900 text-white p-8 md:p-12 relative overflow-hidden rounded-sm">
       

              <h3 className="text-[10px] font-bold uppercase tracking-[0.4em] text-slate-500 mb-10">
                02. {isArabic ? "المتطلبات" : "Requirements"}
              </h3>
              
              <div className="space-y-0">
                {job.requirements.map((req: string, index: number) => (
                  <div 
                    key={index} 
                    className="group flex items-center gap-6 py-6 border-b border-white/5 last:border-0"
                  >
                    <span className="text-2xl font-black text-slate-800 group-hover:text-[#0c479a] transition-colors duration-500">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <p className="text-sm md:text-base font-medium tracking-wide">
                      {req}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* 4. Sidebar */}
          <aside className="lg:col-span-5  lg:sticky lg:top-32">
             <ApplyNowButton  locale={locale} careerId={job.id}/>

          </aside>
         
        </div>
      </main>

    </div>
  );
}