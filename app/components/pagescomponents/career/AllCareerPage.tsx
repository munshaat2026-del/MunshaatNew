"use client";

import { Briefcase, ArrowUpRight, SearchX, Layers } from "lucide-react";
import Link from "next/link";
import { Locale, TransalatedCareer } from "@/types/index";
import { cn } from "@/lib/utils";

interface Props {
  careers: TransalatedCareer[] | null;
  locale: Locale;
}

export default function CareersPage({ careers, locale }: Props) {
  const isArabic = locale === "ar";

  return (
    <div
      className="min-h-screen bg-white text-slate-900 font-sans selection:bg-[#0c479a] selection:text-white"
      dir={isArabic ? "rtl" : "ltr"}
    >
      {/* 1. Header Section - Minimalist Industrial */}
      <section className="relative pt-30 pb-16 px-6 border-b border-slate-100 bg-slate-50/30 overflow-hidden">
        {/* Subtle Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]" />

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex items-center gap-2 ">
            <div className="w-16 h-px bg-[#0c479a]"></div>
          </div>
          <h1 className="text-7xl md:text-9xl font-black uppercase tracking-tighter leading-[0.85] mb-10">
            {isArabic ? " انضم إلى " : "Join Our"}
            <br />
            <span className="text-[#0c479a]">
              {isArabic ? "فريقنا" : "Team"}
            </span>
          </h1>

          <div
            className={cn(
              "relative max-w-4xl",
              isArabic ? "pr-6 md:pr-8 border-r-2" : "pl-6 md:pl-8 border-l-2",
            )}
            style={{
              borderColor: "#0c479a",
            }}
          >
            {/* Intro */}
            <p
              className={cn(
                "text-base md:text-lg lg:text-xl text-slate-600 leading-loose font-medium tracking-tight",
                isArabic ? "text-right" : "text-left",
              )}
            >
              {isArabic
                ? "في شركة المنشآت والمجمعات العقارية، نؤمن بأن الكفاءات البشرية هي الأساس في تحقيق النجاح واستدامة التطور."
                : "At Al-Manasha'at and Real Estate Complexes Company, we believe that human talent is the foundation of success and sustainable growth."}
            </p>

            {/* Supporting Content */}
            <div
              className={cn(
                "mt-6 grid gap-6 md:grid-cols-2",
                isArabic ? "text-right" : "text-left",
              )}
            >
              <p className="text-sm md:text-base text-slate-500 leading-8 font-medium">
                {isArabic
                  ? "لذلك نحرص على استقطاب أصحاب الخبرات والمهارات المتميزة، وتوفير بيئة عمل محفزة تتيح لأفراد فريقنا تطوير قدراتهم والمساهمة بفاعلية في تحقيق أهداف الشركة."
                  : "We are committed to attracting individuals with outstanding expertise and skills, while providing a motivating work environment that enables our team members to develop their capabilities and contribute effectively to achieving the company’s objectives."}
              </p>

              <p className="text-sm md:text-base text-slate-500 leading-8 font-medium">
                {isArabic
                  ? "نسعى إلى بناء فريق عمل متكامل يجمع بين الخبرة والكفاءة والطموح، ويشارك في تطوير أعمال الشركة والارتقاء بمستوى الخدمات المقدمة لعملائنا وشركائنا."
                  : "We strive to build an integrated team that brings together experience, competence, and ambition, contributing to the development of our business and the continuous enhancement of the services we provide to our clients and partners."}
              </p>
            </div>

            {/* Small Label */}
            <div
              className={cn(
                "mt-8 flex items-center gap-3 text-[9px] font-black uppercase tracking-[0.25em] text-slate-400",
                isArabic ? "justify-start" : "justify-start",
              )}
            ></div>
          </div>
        </div>
      </section>

      {/* 2. Jobs Grid */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {careers && careers.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {careers.map((job) => (
              <Link
                key={job.id}
                href={`/${locale}/career/${job.slug}`}
                className="group relative bg-white border border-slate-200 hover:border-[#0c479a] transition-all duration-700 flex flex-col h-full shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)]"
              >
                {/* Job Image with Experience Badge */}
                <div className="relative aspect-16/10 overflow-hidden bg-slate-100 shrink-0">
                  <img
                    src={job.image}
                    alt={job.position}
                    className="w-full h-full object-cover grayscale-50 group-hover:grayscale-0 transition-all duration-1000 group-hover:scale-105"
                  />

                  {/* Floating Experience Badge (Repositioned) */}
                  <div
                    className={cn(
                      "absolute top-0 bg-[#0c479a] text-white px-5 py-2 flex items-center gap-2",
                      isArabic ? "left-0" : "right-0",
                    )}
                  >
                    <Layers size={12} className="opacity-70" />
                    <span className="text-[7px] md:text-[8px] font-black uppercase tracking-widest">
                      {job.experience}
                    </span>
                  </div>
                </div>

                {/* Content Area */}
                <div className="py-10 px-3.5 md:px-8 flex flex-col grow">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 text-slate-300 text-[9px] font-black uppercase  mb-3">
                      <Briefcase size={10} />
                      {isArabic ? "المسمى الوظيفي" : "POSITION_TITLE"}
                    </div>
                    <h3 className="text-2xl font-black uppercase tracking-tighter leading-none group-hover:text-[#0c479a] transition-colors duration-500">
                      {job.position}
                    </h3>
                  </div>

                  <p className="text-[13px] text-slate-400 leading-relaxed font-bold  tracking-tight mb-8 line-clamp-3">
                    {job.description}
                  </p>

                  {/* Requirements Matrix */}
                  <div className="flex flex-wrap gap-1.5 mb-10">
                    {job.requirements.map((req, i) => (
                      <span
                        key={i}
                        className="text-[8px] font-black  bg-slate-50 border border-slate-100 px-2.5 py-1 text-slate-400 group-hover:border-slate-200 transition-colors"
                      >
                        {req}
                      </span>
                    ))}
                  </div>

                  {/* Action Footer - Pinned to bottom */}
                  <div className="mt-auto pt-8 border-t border-slate-100 flex items-center justify-between group-hover:border-[#0c479a]/20 transition-colors">
                    <div className="flex items-center gap-3 text-[11px] font-black   text-[#0c479a] group-hover:gap-5 transition-all">
                      {isArabic ? "استعراض التفاصيل" : "View Details"}
                      <ArrowUpRight
                        size={16}
                        className={
                          "transition-transform duration-500 group-hover:translate-x-1"
                        }
                      />
                    </div>

                    {/* Minimalist ID Indicator */}
                    <div className="text-[12px] font-bold text-slate-400  tracking-widest">
                      {job.role}
                    </div>
                  </div>
                </div>

                {/* Hover Accent Line */}
                <div className="absolute top-0 left-0 w-1 h-0 bg-[#0c479a] group-hover:h-full transition-all duration-700"></div>
              </Link>
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-50/50 px-6 py-24 md:px-12 md:py-28 flex flex-col items-center justify-center">
            {/* Decorative Element */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full border border-[#0c479a]/5" />
            <div className="pointer-events-none absolute -bottom-24 -left-20 h-64 w-64 rounded-full border border-[#0c479a]/5" />

            <div className="relative z-10 flex flex-col items-center justify-center text-center">
              {/* Icon */}
              <div className="mb-7 flex h-16 w-16 items-center justify-center rounded-full border border-[#0c479a]/10 bg-[#0c479a]/5 text-[#0c479a] mx-auto">
                <SearchX size={26} strokeWidth={1.5} />
              </div>

              {/* Label */}
              <div className="mb-4 flex items-center justify-center gap-3">
                <span className="h-px w-8 bg-[#0c479a]" />

                <span className="text-[9px] font-black uppercase tracking-[0.25em] text-slate-400">
                  {isArabic ? "الفرص الوظيفية" : "CAREER OPPORTUNITIES"}
                </span>

                <span className="h-px w-8 bg-[#0c479a]" />
              </div>

              {/* Title */}
              <h3 className="w-full text-center text-2xl font-black tracking-tight text-slate-900 md:text-3xl">
                {isArabic
                  ? "لا توجد شواغر متاحة حاليًا"
                  : "No Current Vacancies"}
              </h3>

              {/* Description */}
              <p className="mt-5 max-w-xl mx-auto text-justify text-sm font-medium leading-8 text-slate-500 md:text-base">
                {isArabic
                  ? "لا توجد لدينا فرص وظيفية متاحة في الوقت الحالي، ونرحب بكم بمتابعة صفحة الوظائف للاطلاع على الفرص القادمة والانضمام إلى فريقنا."
                  : "We currently have no open positions. We invite you to check our careers page regularly for upcoming opportunities to join our team."}
              </p>
            </div>
          </div>
        )}
      </section>
    </div>
  );
}
