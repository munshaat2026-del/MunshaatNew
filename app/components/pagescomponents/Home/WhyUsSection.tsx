"use client";

import React from "react";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";
import Image1 from "@/public/aboutImage.avif";
import Image2 from "@/public/parkingsIamge.avif";

interface WhyUsSectionProps {
  primaryColor: string;
}

export default function WhyUsSection({ primaryColor }: WhyUsSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].whyUs;
  const isAr = locale === "ar";

  return (
    <section className="pt-16 md:pt-24 pb-20 md:pb-32 px-6 md:px-16 bg-white border-b border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
        <div className="flex-1 space-y-8 md:space-y-12 w-full">
          <div className="space-y-4">
            <div className="h-0.5 w-10 bg-slate-300" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight tracking-tight text-slate-900">
              {data.titleLine1} <br />
              <span style={{ color: primaryColor || "#0c479a" }}>
                {data.titleLine2}
              </span>
            </h2>
          </div>

          <div className="space-y-6 md:space-y-8">
            {data.points.map((point, i) => (
              <div key={i} className="flex items-start gap-4 md:gap-5">
                <div
                  className="w-10 h-10 md:w-11 md:h-11 shrink-0 border border-slate-200 flex items-center justify-center text-slate-900"
                  style={{ color: primaryColor || "#0c479a" }}
                >
                  <CheckCircle2 size={20} strokeWidth={2} className="no-flip" />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-sm md:text-base text-slate-900 tracking-wide">
                    {point.t}
                  </h4>
                  <p className="text-slate-600 text-xs md:text-sm font-medium leading-relaxed max-w-md">
                    {point.d}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex-1 w-full">
          <div className="relative w-full h-[390px] sm:h-[470px] lg:h-[520px]">
            <div
              className={`absolute top-0 ${
                isAr ? "right-0" : "left-0"
              } w-[58%] sm:w-[56%] h-[74%] bg-slate-100 shadow-md overflow-hidden z-10`}
            >
              <Image
                src={Image1}
                alt="Commercial and office spaces"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 60vw, 30vw"
                priority
              />
            </div>

            <div
              className={`absolute bottom-0 ${
                isAr ? "left-0" : "right-0"
              } w-[74%] sm:w-[70%] aspect-[16/10] bg-slate-200 shadow-xl overflow-hidden z-20`}
            >
              <Image
                src={Image2}
                alt="Parking facilities"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 75vw, 35vw"
              />
            </div>

           
          </div>
        </div>
      </div>
    </section>
  );
}
