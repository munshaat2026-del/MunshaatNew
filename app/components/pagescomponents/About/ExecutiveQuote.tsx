import { Quote } from "lucide-react";
import { Locale } from "@/types";
import {directorStatement} from "@/app/data/aboutdata"


interface ExecutiveQuoteProps {
  primaryColor: string;
  locale: Locale;
}

export default function ExecutiveStatement({ primaryColor, locale }: ExecutiveQuoteProps) {
  const data = directorStatement[locale].quoteSection;
  const isAr = locale === "ar";

  return (
    <section className="py-24 px-6 md:px-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto relative group">
        {/* Main Card Container */}
        <div 
          className={`relative bg-[#0a0f1a] border border-white/10 flex flex-col ${
            isAr ? "md:flex-row-reverse text-right" : "md:flex-row text-left"
          } items-stretch shadow-2xl transition-all duration-500`}
        >
          
          {/* Background Textures */}
          <div className="absolute inset-0 opacity-10 pointer-events-none bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:45px_45px]"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.02)_0%,transparent_50%)]"></div>

          {/* Left/Right Sidebar: The Seal & Tag */}
          <div
            className={`w-full md:w-[30%] p-12 md:p-16 flex flex-col items-center justify-between border-b md:border-b-0 ${
              isAr ? "md:border-l" : "md:border-r"
            } border-white/10 relative overflow-hidden`}
          >
            {/* Tag & Icon */}
            <div className="relative z-10 flex flex-col items-center space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-[1px] bg-slate-600"></div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  {data.tag}
                </span>
              </div>

              {/* Architectural Frame */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 border border-white/20 rotate-45 group-hover:rotate-90 transition-transform duration-1000"></div>
                <div className="relative z-10 bg-[#0a0f1a] p-3">
                  <Quote 
                    size={32} 
                    style={{ color: primaryColor }} 
                    className={`${isAr ? "rotate-180" : ""} transition-transform duration-500 group-hover:scale-110`}
                  />
                </div>
              </div>
            </div>

            {/* Signature Block (Desktop) */}
            <div className="hidden md:block relative z-10 text-center w-full">
              <div className="w-12 h-[1px] bg-white/20 mx-auto mb-6"></div>
              <h4 className="text-lg font-bold text-white mb-1">{data.name}</h4>
              <p className="text-[10px] font-medium uppercase tracking-widest text-slate-500">
                {data.role}
              </p>
            </div>
          </div>

          {/* Main Content Column */}
          <div className="w-full md:w-[70%] p-12 md:p-20 relative z-10">
            {/* Decorative Corner */}
            <div className={`absolute top-0 ${isAr ? "left-0" : "right-0"} w-24 h-24 opacity-10`}>
              <div className={`absolute top-8 ${isAr ? "left-8" : "right-8"} w-px h-16 bg-white`}></div>
              <div className={`absolute top-8 ${isAr ? "left-8" : "right-8"} h-px w-16 bg-white`}></div>
            </div>

            <div className="max-w-4xl space-y-10">
              {/* Headline */}
              <h2 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[1.1]">
                {data.headline}
              </h2>

              {/* Dynamic Paragraphs */}
              <div className="space-y-6">
                {data.paragraphs.map((text, index) => (
                  <p 
                    key={index}
                    className={`${
                      index === 0 
                      ? "text-xl md:text-2xl text-white/90 leading-relaxed font-medium" 
                      : "text-base md:text-lg text-slate-400 leading-relaxed font-light"
                    }`}
                  >
                    {text}
                  </p>
                ))}
              </div>

              {/* Signature Block (Mobile Only) */}
              <div className="md:hidden pt-8 border-t border-white/10">
                <h4 className="text-xl font-bold text-white">{data.name}</h4>
                <p className="text-xs font-medium uppercase tracking-widest text-slate-500 mt-1">
                  {data.role}
                </p>
              </div>
            </div>
          </div>

          {/* Animated Accent Border */}
          <div 
            className="absolute top-0 left-0 w-full h-[3px] scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-center"
            style={{ backgroundColor: primaryColor }}
          ></div>
        </div>
      </div>
    </section>
  );
}