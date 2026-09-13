"use client";

import { Locale, TranslatedMembers } from "@/types";

interface TeamRosterProps {
  primaryColor: string;
  locale: Locale;
  data: TranslatedMembers[];
}

export default function TeamRoster({
  primaryColor,
  locale,
  data,
}: TeamRosterProps) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="py-20 px-6 md:px-12 bg-[#f1f5fa] border-b border-slate-100 overflow-hidden"
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
            </div>
            <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {isAr ? "هيئة" : "Board of"}
              <br />
              <span style={{ color: primaryColor }}>
                {isAr ? "المديرين" : "Directors"}
              </span>
            </h2>
          </div>
        </div>

        {/* --- Grid Section --- */}
        <div
          dir="ltr"
          className="grid grid-cols-1 gap-6 pt-8 sm:grid-cols-2 md:grid-cols-3 lg:gap-8"
        >
          {data.map((member, i) => {
            if (!member) return null;

            const positionClass =
              data.length >= 3
                ? i === 0
                  ? "md:col-start-2 md:row-start-1 md:-translate-y-8"
                  : i === 2
                    ? "md:col-start-3 md:row-start-1"
                    : i === 1
                      ? "md:col-start-1 md:row-start-1"
                      : ""
                : "";

            return (
              <div
                key={member.id ?? i}
                dir={isAr ? "rtl" : "ltr"}
                className={`group ${positionClass}`}
              >
                <div className="relative overflow-hidden bg-white border border-slate-200 shadow-[0_8px_25px_rgba(15,23,42,0.06)] transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-[0_20px_40px_rgba(15,23,42,0.12)]">
                  <div className="relative aspect-4/5 overflow-hidden">
                    <img
                      src={member.image ?? ""}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      alt={member.name ?? "Member"}
                    />

                    <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                  </div>

                  <div className="flex flex-col items-center border-t border-slate-100 bg-white px-6 py-5 text-center">
                    <h4 className="text-sm font-black tracking-tight text-slate-900 transition-colors duration-300 md:text-base">
                      {member.name}
                    </h4>

                    <p className="mt-1.5 text-[10px] font-bold tracking-widest text-slate-500">
                      {member.position}
                    </p>
                  </div>

                  <div
                    className="absolute bottom-0 left-0 h-1 w-full transition-all duration-300 group-hover:h-2"
                    style={{ backgroundColor: primaryColor }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
