import React from "react";
import { aboutdata } from "@/app/data/aboutdata";
import AboutImage from "@/public/banner.avif";
import { Locale } from "@/types";
import Image from "next/image";

interface AboutHeroProps {
  primaryColor: string;
  locale: Locale;
}

export default function AboutHero({ primaryColor, locale }: AboutHeroProps) {
  const data = aboutdata[locale].aboutHero;
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-screen overflow-hidden bg-slate-900"
    >
      {/* Background Image */}
      <Image
        src={AboutImage}
        alt={data.titleLine1}
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
        
      />

      {/* Overlay */}
      <div
        className={`absolute inset-0 ${
          isAr
            ? "bg-linear-to-l from-slate-950/95 via-slate-950/65 to-slate-950/20"
            : "bg-linear-to-r from-slate-950/95 via-slate-950/65 to-slate-950/20"
        }`}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-0.5 w-12"
              style={{ backgroundColor: primaryColor }}
            />

            
          </div>

          <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
            {data.titleLine1}
            <br />
            <span style={{ color: primaryColor }}>{data.titleLine2}</span>
          </h1>

          <p className="mt-7 max-w-lg text-sm font-medium leading-7 text-white/70 md:text-base">
            {data.description}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <span
              className="h-1 w-12"
              style={{ backgroundColor: primaryColor }}
            />

            <span className="text-[9px] font-black uppercase tracking-[0.2em] text-white/70">
              {data.est}
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Accent */}
      <div
        className="absolute bottom-0 left-0 h-1 w-32"
        style={{ backgroundColor: primaryColor }}
      />
    </section>
  );
}
