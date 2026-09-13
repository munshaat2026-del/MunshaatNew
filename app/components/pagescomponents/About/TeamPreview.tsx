"use client";

import { Locale, TranslatedMembers } from "@/types";
import { aboutdata } from "@/app/data/aboutdata";

interface TeamPreviewProps {
  primaryColor: string;
  locale: Locale;
  data: TranslatedMembers[];
}

export default function TeamPreview({
  primaryColor,
  locale,
  data,
}: TeamPreviewProps) {
  const aboutData = aboutdata[locale].teamSection;
  const isAr = locale === "ar";

  if (data.length === 1) {
    const member = data[0];

    return (
      <section
        dir={isAr ? "rtl" : "ltr"}
        className="py-20 px-6 md:px-12 bg-[#fcfcfc] border-b border-slate-100 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          {/* --- Standardized Header Section --- */}
          <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-2xl">
              <div className="mb-4 flex items-center gap-3">
                <span
                  className="h-0.5 w-10"
                  style={{ backgroundColor: primaryColor }}
                />
                <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                  {isAr ? "الفريق التنفيذي" : "Executive"}
                </span>
              </div>
              <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
                {aboutData.titlePart1}
                <br />
                <span style={{ color: primaryColor }}>
                  {aboutData.titlePart2}
                </span>
              </h2>
            </div>
          </div>

          <div className="max-w-2xl mx-auto group relative flex flex-col sm:flex-row bg-white border border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
            <div className="sm:w-[40%] aspect-4/5 overflow-hidden relative">
              <img
                src={member.image ?? ""}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                alt={member.name ?? "Member"}
              />
            </div>

            <div
              className={`sm:w-[60%] p-6 md:p-8 flex flex-col justify-center border-t sm:border-t-0 border-slate-100 ${
                isAr ? "sm:border-r" : "sm:border-l"
              }`}
            >
              <h3 className="text-lg md:text-xl font-black text-slate-900 tracking-tight transition-colors duration-300">
                {member.name}
              </h3>

              <p className="text-[10px] font-bold text-slate-400 tracking-widest mt-1.5 ">
                {member.position}
              </p>

              <div className="mt-5 w-10 h-px bg-slate-200" />
            </div>

            <div
              className="absolute bottom-0 left-0 w-full h-1"
              style={{ backgroundColor: primaryColor }}
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 px-6 md:px-12 bg-[#fcfcfc] border-b border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto">
        {/* --- Standardized Header Section --- */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-0.5 w-10"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                {isAr ? "الفريق التنفيذي" : "Executive"}
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {aboutData.titlePart1}
              <br />
              <span style={{ color: primaryColor }}>
                {aboutData.titlePart2}
              </span>
            </h2>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6 lg:gap-8">
          {data.map((member, i) => (
            <div key={i} className="group w-full sm:w-70">
              <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:-translate-y-1 group-hover:shadow-[0_15px_35px_rgba(15,23,42,0.12)]">
                <div className="aspect-4/5 overflow-hidden">
                  <img
                    src={member.image ?? ""}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    alt={member.name ?? "Member"}
                  />
                </div>

                <div className="px-5 py-4 bg-white border-t border-slate-100">
                  <h4 className="text-sm font-black text-slate-900 tracking-tight group-hover:text-[#0c479a] transition-colors duration-300">
                    {member.name}
                  </h4>

                  <p className="text-[9px] font-bold text-slate-400 tracking-widest mt-1.5 uppercase">
                    {member.position}
                  </p>
                </div>

                <div
                  className="absolute bottom-0 left-0 w-full h-1"
                  style={{ backgroundColor: primaryColor }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
