"use client";

import React from 'react';
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";

export default function LogosSection() {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].logos;

  return (
    <section className="py-16 border-b border-slate-50 bg-slate-50/50">
      <div className="max-w-7xl mx-auto px-6">
        <p className="text-center text-slate-400 font-bold uppercase text-[10px] tracking-[0.5em] mb-12">
          {data.title}
        </p>

        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-24 opacity-40 grayscale">
          {data.brands.map((brand, index) => (
            <div key={index} className="text-2xl font-black uppercase tracking-tighter">
              {brand}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}