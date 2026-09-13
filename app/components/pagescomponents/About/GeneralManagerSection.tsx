"use client";

import Image from "next/image";
import { Quote } from "lucide-react";
import { Locale, TranslatedMembers } from "@/types";

interface GeneralManagerSectionProps {
  primaryColor: string;
  locale: Locale;
  member: TranslatedMembers;
  data: {
    tag: string;
    headline: string;
    paragraphs: string[];
    name: string;
    role: string;
  };
}

export default function GeneralManagerSection({
  primaryColor,
  locale,
  member,
  data,
}: GeneralManagerSectionProps) {
  const isAr = locale === "ar";

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      id="executive-management"
      className="overflow-hidden border-b  border-slate-100 bg-[#f1f5fa] px-6 py-20 md:px-12 md:py-28 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        {/* Section Header */}
        <div className="mb-12 md:mb-16">
          <div className="mb-4 flex items-center gap-3">
            <span
              className="h-0.5 w-10"
              style={{ backgroundColor: primaryColor }}
            />
          </div>

          <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
            {isAr ? "الإدارة" : "Executive"}
            <br />
            <span style={{ color: primaryColor }}>
              {isAr ? "التنفيذية" : "Management"}
            </span>
          </h2>
        </div>

        {/* Main Content */}
        <div
          className={`relative overflow-hidden border border-slate-200 bg-[#0a0f1a] shadow-[0_20px_50px_rgba(15,23,42,0.10)] ${
            isAr ? "md:flex-row-reverse" : "md:flex-row"
          } flex flex-col`}
        >
          {/* Background Grid */}
          <div className="pointer-events-none absolute inset-0 opacity-[0.06]">
            <div className="absolute inset-0 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-size-[45px_45px]" />
          </div>

          {/* Image / Identity */}
          <div
            className={`relative w-full md:w-[36%] ${
              isAr ? "md:border-l" : "md:border-r"
            } border-white/10`}
          >
            <div className="relative aspect-4/5 min-h-115 overflow-hidden md:aspect-auto md:h-full">
              <Image
                src={member.image ?? ""}
                alt={member.name ?? "General Manager"}
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-[#0a0f1a] via-transparent to-transparent" />

              {/* Number */}
              <span
                className={`absolute top-6 ${
                  isAr ? "left-6" : "right-6"
                } text-[10px] font-black tracking-[0.2em] text-white/40`}
              >
                01
              </span>

              {/* Identity */}
              <div className="absolute bottom-0 left-0 w-full p-6 md:p-8">
                <div
                  className="mb-5 h-1 w-12"
                  style={{ backgroundColor: primaryColor }}
                />

                <h3 className="text-2xl font-black tracking-tight text-white md:text-3xl">
                  {member.name}
                </h3>

                <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-white/50">
                  {member.position}
                </p>
              </div>
            </div>
          </div>

          {/* Statement */}
          <div className="relative flex w-full flex-col justify-between p-7 md:w-[64%] md:p-12 lg:p-16">
            {/* Quote Icon */}
            <div className="mb-10">
              <div className="relative flex h-16 w-16 items-center justify-center">
                <div className="absolute inset-0 rotate-45 border border-white/20" />

                <div className="relative z-10 bg-[#0a0f1a] p-2">
                  <Quote
                    size={28}
                    style={{ color: primaryColor }}
                    className={isAr ? "rotate-180" : ""}
                  />
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-3xl">
              <h3 className="text-3xl font-black uppercase leading-tight tracking-tight text-white md:text-4xl lg:text-5xl">
                {data.headline}
              </h3>

              <div className="mt-8 space-y-6">
                {data.paragraphs.map((text, index) => (
                  <p
                    key={index}
                    className={
                      index === 0
                        ? "text-lg font-medium leading-8 text-white/90 md:text-xl"
                        : "text-sm font-light leading-7 text-slate-400 md:text-base"
                    }
                  >
                    {text}
                  </p>
                ))}
              </div>
            </div>

            {/* Bottom Signature */}
            <div className="relative z-10 mt-12 border-t border-white/10 pt-6">
              <div className="flex items-end justify-between gap-6">
                <div>
                  <h4 className="text-base font-bold text-white md:text-lg">
                    {data.name}
                  </h4>

                  <p className="mt-1 text-[9px] font-medium uppercase tracking-[0.2em] text-slate-500">
                    {data.role}
                  </p>
                </div>

                <span
                  className="hidden text-[9px] font-black uppercase tracking-[0.25em] md:block"
                  style={{ color: primaryColor }}
                >
                  {isAr ? "كلمة المدير العام" : "Executive Statement"}
                </span>
              </div>
            </div>

            {/* Decorative Corner */}
            <div
              className={`absolute top-0 ${
                isAr ? "left-0" : "right-0"
              } h-24 w-24 opacity-10`}
            >
              <div
                className={`absolute top-8 ${
                  isAr ? "left-8" : "right-8"
                } h-16 w-px bg-white`}
              />

              <div
                className={`absolute top-8 ${
                  isAr ? "left-8" : "right-8"
                } h-px w-16 bg-white`}
              />
            </div>
          </div>

          {/* Accent Line */}
          <div
            className="absolute bottom-0 left-0 h-1 w-full"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
      </div>
    </section>
  );
}
