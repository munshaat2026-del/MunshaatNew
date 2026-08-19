import React from "react";
import { aboutdata } from "@/app/data/aboutdata";
import AboutImage from "@/public/aboutImage.jpeg";
import { Locale } from "@/types";

interface AboutHeroProps {
  primaryColor: string;
  locale: Locale;
}

export default function AboutHero({
  primaryColor,
  locale,
}: AboutHeroProps) {
  const data = aboutdata[locale].aboutHero;
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="relative min-h-[500px] overflow-hidden bg-slate-950"
    >
      <img
        src={AboutImage.src}
        alt={data.titleLine1}
        className="absolute inset-0 h-full w-full object-cover object-center"
      />

      <div
        className={`absolute inset-0 ${
          isAr
            ? "bg-gradient-to-l from-slate-950/90 via-slate-950/65 to-slate-950/20"
            : "bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/20"
        }`}
      />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-7xl items-center px-6 py-20 md:px-10 lg:px-16">
        <div className="max-w-2xl">
          <div className="mb-5 flex items-center gap-3">
            <span
              className="h-[2px] w-12"
              style={{ backgroundColor: primaryColor }}
            />

            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-white/70">
              {data.tag}
            </span>
          </div>

          <h1 className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-white md:text-6xl lg:text-7xl">
            {data.titleLine1}
            <br />
            <span style={{ color: primaryColor }}>
              {data.titleLine2}
            </span>
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

      <div
        className="absolute bottom-0 left-0 h-1 w-32"
        style={{ backgroundColor: primaryColor }}
      />
    </section>
  );
}
