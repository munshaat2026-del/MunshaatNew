import { FileText, Download, Info, ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Locale, TranslatedTender } from "@/types";
interface Props {
  data: TranslatedTender;
  locale: Locale;
}
export default function MainTenderPage({ data, locale }: Props) {
  const isAr = locale === "ar";
  const formatDate = (date: Date | null) => {
    if (!date) return "";
    return date.toLocaleDateString(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const t = {
    ar: {
      status: "عطاء نشط",
      sections: {
        overview: "نظرة عامة على العطاء",
        technical: "المواصفات الفنية",
        legal: "الشروط والضمانات",
        download: "تحميل الوثائق",
      },
      cta: "تحميل الملف (PDF)",
    },
    en: {
      status: "Active Tender",
      sections: {
        overview: "Tender Overview",
        technical: "Technical Specifications",
        legal: "Terms & Guarantees",
        download: "Download Documents",
      },
      cta: "Download The File (PDF)",
    },
  }[isAr ? "ar" : "en"];

  return (
    <div
      className={`min-h-screen bg-white text-slate-900 font-sans ${isAr ? "text-right" : "text-left"}`}
      dir={isAr ? "rtl" : "ltr"}
    >
      <main className="max-w-7xl mx-auto px-6 pt-9">
        {/* Header: Ref & Status */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold border border-slate-200 px-3 py-1 uppercase text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {t.status}
            </span>
          </div>
       
        </div>

        {/* Title Section */}
        <section className="mb-16">
          <h1 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {data.name}
          </h1>
          <div className="w-20 h-1.5 bg-[#0c479a]"></div>
        </section>
        {/* Info Grid: Dates & Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-50 p-6 border-l-4 border-slate-900">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
              {isAr ? "تاريخ الطرح" : "Open Date"}
            </p>
            <p className="text-xl font-bold">
              {formatDate(new Date(data.opening_date!))}
            </p>
          </div>
          <div className="bg-slate-50 p-6 border-l-4 border-red-600">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">
              {isAr ? "آخر موعد" : "Deadline"}
            </p>
            <p className="text-xl font-bold text-red-600">
              {formatDate(new Date(data.closing_date))}
            </p>
          </div>
        </div>

        {/* Content Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20">
          <div className="lg:col-span-8 space-y-12">
            {/* Project Overview */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0c479a] mb-6">
                <Info size={18} /> {t.sections.overview}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                {data.description}
              </p>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 border-2 border-slate-900 py-8 px-5 md:px-8 bg-white">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={20} className="text-[#0c479a]" />
                <h4 className="font-black uppercase text-sm tracking-widest">
                  {t.sections.download}
                </h4>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-8 leading-loose">
                {isAr
                  ? "تحميل الملف الكامل الذي يحتوي على جميع تفاصيل العطاء."
                  : "Download the full file containing all tender details."}
              </p>
              <a
                href={data.pdf_file ?? ""}
                download
                className="flex items-center justify-between w-full bg-slate-900 text-white px-6 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-[#0c479a] transition-all"
              >
                {t.cta}
                <Download size={16} />
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
