"use client";

import { Target, Globe, ShieldCheck, Eye } from "lucide-react";
import { aboutdata } from "@/app/data/aboutdata";
import { Locale } from "@/types";

interface CoreValuesProps {
  primaryColor: string;
  locale: Locale;
}

export default function CoreValues({ primaryColor, locale }: CoreValuesProps) {
  const data = aboutdata[locale].coreValues;
  const isAr = locale === "ar";

  const icons = [Target, Eye, ShieldCheck];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="overflow-hidden bg-white px-6 py-16 md:px-10 md:py-24 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-8 md:mb-16 md:flex-row md:items-end">
          <div className="max-w-3xl">
            {/* Tag */}
            <div className="mb-5 flex items-center gap-3">
              <span
                className="h-0.5 w-10"
                style={{ backgroundColor: primaryColor }}
              />

              <span
                className="text-[10px] font-bold uppercase tracking-[0.25em]"
                style={{ color: primaryColor }}
              ></span>
            </div>

            {/* Title */}
            <h2 className="text-4xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {data.titleLine1}
              <br />
              <span style={{ color: primaryColor }}>{data.titleLine2}</span>
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-sm font-medium leading-7 text-slate-500 md:text-[15px]">
              {data.desc}
            </p>
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
          {data.items.map((val, i) => {
            const Icon = icons[i];
            const isValues = i === 2;

            return (
              <div
                key={i}
                className={`group relative overflow-hidden p-6 md:p-8 lg:p-10 ${
                  isValues ? "md:col-span-2" : ""
                }`}
              >
                {/* Background */}
                <div
                  className="absolute inset-0 opacity-[0.035] transition-opacity duration-500 group-hover:opacity-[0.07]"
                  style={{ backgroundColor: primaryColor }}
                />

                {/* Border */}
                <div
                  className="absolute inset-0 border opacity-20 transition-opacity duration-500 group-hover:opacity-40"
                  style={{ borderColor: primaryColor }}
                />

                {/* Top */}
                <div className="relative z-10 flex items-start justify-between">
                  <div className="relative flex h-12 w-12 items-center justify-center">
                    <div
                      className="absolute inset-0 rounded-sm opacity-15"
                      style={{ backgroundColor: primaryColor }}
                    />

                    <Icon
                      size={22}
                      style={{ color: primaryColor }}
                      className="relative z-10"
                    />
                  </div>

                  <span
                    className="text-[10px] font-black tracking-[0.2em] opacity-40"
                    style={{ color: primaryColor }}
                  >
                    0{i + 1}
                  </span>
                </div>

                {/* Content */}
                <div className="relative z-10 mt-8">
                  <h3 className="text-xl font-black  tracking-tight text-slate-950 md:text-2xl">
                    {val.t}
                  </h3>

                  <p className="mt-4 max-w-5xl whitespace-pre-line text-[13px] font-medium leading-7 text-slate-600 md:text-[14px]">
                    {val.d}
                  </p>

                  {/* Values */}
                  {"points" in val && val.points && (
                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
                      {val.points.map((point, index) => (
                        <div
                          key={index}
                          className="border-t pt-4"
                          style={{ borderColor: `${primaryColor}40` }}
                        >
                          <div className="mb-2 flex items-center gap-2">
                            <span
                              className="h-1.5 w-1.5 rounded-full"
                              style={{ backgroundColor: primaryColor }}
                            />

                            <h4
                              className="text-xs font-black  tracking-wide"
                              style={{ color: primaryColor }}
                            >
                              {point.label}
                            </h4>
                          </div>

                          <p className="text-[12px] font-medium leading-6 text-slate-600">
                            {point.text}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom accent */}
                <div
                  className={`absolute bottom-0 h-1 w-20 transition-all duration-500 group-hover:w-full ${
                    isAr ? "right-0" : "left-0"
                  }`}
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
