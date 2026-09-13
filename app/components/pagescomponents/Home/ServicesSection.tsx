"use client";

import { Store, Building2, Car, Settings,ChartNoAxesCombined } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";

interface ServicesSectionProps {
  primaryColor: string;
}

export default function ServicesSection({
  primaryColor,
}: ServicesSectionProps) {
  const locale = useLocale() as "en" | "ar";
  const data = homedata[locale].servicesSection;
  const isAr = locale === "ar";

  const icons = [Store, Building2, Car, ChartNoAxesCombined];

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 md:py-20 px-4 lg:px-10 overflow-hidden bg-[#e8f0fb]"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-0.5 w-10"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-[#58708f]">
                {data.tag}
              </span>
            </div>

            <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-[#12345b] md:text-5xl lg:text-6xl">
              {data.titleLine1}
              <br />
              <span style={{ color: primaryColor }}>{data.titleLine2}</span>
            </h2>
          </div>
        </div>

        {/* --- 2x2 Grid Section --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {data.items.slice(0, 4).map((item, i) => {
            const Icon = icons[i];

            return (
              <div
                key={i}
                className="group relative p-6 md:p-8 min-h-64 border border-[#c9d9ee] bg-white hover:border-[#a8c5eb] transition-all duration-500 overflow-hidden shadow-sm hover:shadow-[0_20px_40px_rgba(12,71,154,0.08)]"
              >
                <div
                  className={`absolute top-0 ${
                    isAr ? "right-0" : "left-0"
                  } w-1.5 h-full transition-opacity duration-500 opacity-80 group-hover:opacity-100`}
                  style={{ backgroundColor: primaryColor }}
                />

                <div className="flex justify-between items-start mb-8 relative z-10">
                  <div className="w-14 h-14 flex items-center justify-center bg-[#d5e3f5] rounded-xl group-hover:scale-110 transition-transform duration-500">
                    <Icon
                      size={40}
                      strokeWidth={1.5}
                      style={{ color: primaryColor }}
                    />
                  </div>

                  <span className="text-[12px] font-black uppercase tracking-widest text-[#c9d9ee] group-hover:text-[#58708f] transition-colors duration-500">
                    0{i + 1}
                  </span>
                </div>

                <div className="relative z-10">
                  <h3
                    className={`text-xl md:text-2xl font-black  tracking-tight mb-4 text-[#12345b] transition-transform duration-500 ${
                      isAr
                        ? "group-hover:-translate-x-2"
                        : "group-hover:translate-x-2"
                    }`}
                  >
                    {item.t}
                  </h3>

                  <p className="text-[#58708f] text-[12px] md:text-[13px] font-medium tracking-wide leading-relaxed max-w-lg">
                    {item.d}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
