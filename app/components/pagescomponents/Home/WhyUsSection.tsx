"use client";

import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";

interface WhyUsSectionProps {
  primaryColor: string;
}

export default function WhyUsSection({ primaryColor }: WhyUsSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].whyUs;
  const isAr = locale === "ar";

  return (
    <section className="py-40 px-6 md:px-20 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-start gap-24">
        {/* Left Side: Editorial Content */}
        <div className="flex-1 space-y-16">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-slate-300">
              <span className="text-[10px] font-black uppercase ">
                {data.tag}
              </span>
              <div className="h-[1px] w-12 bg-slate-200"></div>
            </div>
            <h2 className="text-6xl font-black  leading-[0.85] tracking-tighter text-slate-900">
              {data.titleLine1} <br />
              <span className="text-[#0c479a]">{data.titleLine2}</span>
            </h2>
          </div>

          <div className="space-y-12">
            {data.points.map((point, i) => (
              <div key={i} className={`flex gap-8 group`}>
                <div
                  className="w-12 h-12 shrink-0 border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover:bg-slate-900 group-hover:text-white"
                  style={{ color: primaryColor }}
                >
                  <CheckCircle2
                    className="no-flip"
                    size={20}
                    strokeWidth={1.5}
                  />
                </div>
                <div className="space-y-2">
                  <h4 className="font-black text-[13px] uppercase tracking-widest text-slate-900">
                    {point.t}
                  </h4>
                  <p className="text-slate-400 text-[11px] font-bold  tracking-tight leading-relaxed max-w-sm">
                    {point.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Geometric Image Composition */}
        <div className="flex-1 w-full relative">
          <div className="grid grid-cols-12 grid-rows-6 h-[600px] gap-0">
            {/* Image 1: Tall & Sharp */}
            <div
              className={`col-span-7 row-span-5 bg-slate-100 z-10 overflow-hidden shadow-2xl ${isAr ? "border-l-4" : "border-r-4"} border-white`}
            >
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070"
                className="h-full w-full object-cover transition-all duration-1000"
                alt="Property Structure"
              />
            </div>

            {/* Image 2: Wide & Offset */}
            <div
              className={`${isAr ? "col-end-9 col-span-8" : "col-start-5 col-span-8"} row-start-3 row-span-4 bg-slate-200 border-t-4 border-white overflow-hidden shadow-2xl`}
            >
              <img
                src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?q=80&w=2070"
                className="h-full w-full object-cover transition-all duration-1000"
                alt="Operational Strategy"
              />
            </div>
          </div>

          {/* Decorative Technical Label */}
          <div
            className={`absolute -bottom-8 ${isAr ? "-right-8" : "-left-8"} bg-black text-white px-8 py-4 text-[9px] font-black uppercase  z-20`}
          >
            {data.label}
          </div>
        </div>
      </div>
    </section>
  );
}
