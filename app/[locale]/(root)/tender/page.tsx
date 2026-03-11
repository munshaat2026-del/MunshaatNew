"use client";
import React from "react";
import { 
  FileText, 
  Calendar, 
  Download, 
  Clock, 
  ShieldCheck,
  Building2,
  FileCheck2,
  Scale,
  Info,
  ArrowLeft,
  ArrowRight
} from "lucide-react";
import { useParams } from "next/navigation";
import Link from "next/link";

export default function SingleTenderPage() {
  const params = useParams();
  const locale = params?.locale || "ar";
  const isAr = locale === "ar";

  const t = {
    ar: {
      ref: "TND-2026-X88",
      name: "إنشاء وتطوير مستودعات التخزين المبرد - المنطقة المركزية",
      status: "عطاء نشط",
      openDate: "10 مارس 2026",
      closeDate: "25 أبريل 2026",
      sections: {
        overview: "نظرة عامة على المشروع",
        technical: "المواصفات الفنية",
        legal: "الشروط والضمانات",
        download: "تحميل الوثائق"
      },
      description: "يهدف المشروع إلى بناء مجمع مستودعات ذكي بمساحة 15,000 متر مربع، مجهز بأنظمة عزل حراري متطورة للحفاظ على درجات حرارة بين -20 و +5 مئوية. يتضمن العمل توريد وتركيب أنظمة طاقة هجينة وتقنيات مراقبة ذكية.",
      specs: "يجب الالتزام بكود البناء الصناعي السعودي، وتوفير ضمانات لا تقل عن 10 سنوات للهيكل و5 سنوات للأنظمة الميكانيكية. يشترط تقديم جدول زمني دقيق لا يتجاوز 18 شهراً للتنفيذ.",
      legalNote: "يتطلب التقديم ضماناً بنكياً بنسبة 2% من قيمة العرض، سارٍ لمدة 90 يوماً. للمجموعة الحق في قبول أو رفض العطاءات وفقاً للمعايير الفنية والمالية المعتمدة.",
      cta: "تحميل كراسة الشروط (PDF)",
      footer: "مجموعة منشآت الصناعية © 2026"
    },
    en: {
      ref: "TND-2026-X88",
      name: "Cold Storage Warehouse Development - Central Zone",
      status: "Active Tender",
      openDate: "March 10, 2026",
      closeDate: "April 25, 2026",
      sections: {
        overview: "Project Overview",
        technical: "Technical Specifications",
        legal: "Terms & Guarantees",
        download: "Download Documents"
      },
      description: "Construction of a 15,000 sqm smart warehouse complex featuring advanced thermal insulation (-20°C to +5°C). Scope includes hybrid energy systems and intelligent monitoring solutions.",
      specs: "Compliance with Industrial Building Codes is mandatory. Structure warranty: 10 years, Mechanical: 5 years. Maximum execution timeline: 18 months from awarding.",
      legalNote: "A 2% tender bond is required, valid for 90 days. Munshaat Group reserves the right to evaluate and select bids based on internal technical and financial criteria.",
      cta: "Download Specifications (PDF)",
      footer: "Munshaat Industrial Group © 2026"
    }
  }[isAr ? "ar" : "en"];

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      <main className="max-w-5xl mx-auto px-6 py-24">
        
        {/* Header: Ref & Status */}
        <div className="flex items-center justify-between mb-12 pb-6 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <span className="text-[11px] font-bold bg-slate-900 text-white px-3 py-1 uppercase tracking-wider">
              {t.ref}
            </span>
            <span className="text-[11px] font-bold border border-slate-200 px-3 py-1 uppercase text-slate-500 flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
              {t.status}
            </span>
          </div>
          <Link href={`/${locale}/tenders`} className="text-sm font-bold flex items-center gap-2 hover:text-[#0c479a] transition-colors">
            {isAr ? <ArrowRight size={18}/> : <ArrowLeft size={18}/>}
            {isAr ? "العودة" : "Back"}
          </Link>
        </div>

        {/* Title Section */}
        <section className="mb-16">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight mb-6">
            {t.name}
          </h1>
          <div className="w-20 h-1.5 bg-[#0c479a]"></div>
        </section>

        {/* Info Grid: Dates & Type */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="bg-slate-50 p-6 border-l-4 border-slate-900">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{isAr ? "تاريخ الطرح" : "Open Date"}</p>
            <p className="text-xl font-bold">{t.openDate}</p>
          </div>
          <div className="bg-slate-50 p-6 border-l-4 border-red-600">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{isAr ? "آخر موعد" : "Deadline"}</p>
            <p className="text-xl font-bold text-red-600">{t.closeDate}</p>
          </div>
          <div className="bg-slate-50 p-6 border-l-4 border-[#0c479a]">
            <p className="text-[10px] font-black uppercase text-slate-400 mb-2 tracking-widest">{isAr ? "نوع العقد" : "Contract Type"}</p>
            <p className="text-xl font-bold uppercase">EPC Contract</p>
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
                {t.description}
              </p>
            </div>

            {/* Technical Specs */}
            <div>
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-[#0c479a] mb-6">
                <Building2 size={18} /> {t.sections.technical}
              </h3>
              <p className="text-lg text-slate-700 leading-relaxed font-medium">
                {t.specs}
              </p>
            </div>

            {/* Legal Note */}
            <div className="p-8 bg-slate-50 border border-slate-200">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-widest text-slate-400 mb-4">
                <Scale size={18} /> {t.sections.legal}
              </h3>
              <p className="text-sm font-bold text-slate-600 leading-relaxed uppercase">
                {t.legalNote}
              </p>
            </div>
          </div>

          {/* Sidebar Action */}
          <div className="lg:col-span-4">
            <div className="sticky top-10 border-2 border-slate-900 p-8 bg-white">
              <div className="flex items-center gap-2 mb-6">
                <FileText size={20} className="text-[#0c479a]" />
                <h4 className="font-black uppercase text-sm tracking-widest">{t.sections.download}</h4>
              </div>
              <p className="text-[10px] font-bold text-slate-400 uppercase mb-8 leading-loose">
                {isAr ? "تحميل الملف الكامل يشمل المخططات الهندسية وجداول الكميات المعتمدة." : "Download the full package including engineering drawings and approved BOQs."}
              </p>
              <a 
                href="/tender-package.pdf" 
                download
                className="flex items-center justify-between w-full bg-slate-900 text-white px-6 py-4 font-black uppercase text-[11px] tracking-widest hover:bg-[#0c479a] transition-all"
              >
                {t.cta}
                <Download size={16} />
              </a>
              <div className="mt-8 pt-6 border-t border-slate-100 flex items-center gap-3 text-slate-300">
                <ShieldCheck size={16} />
                <span className="text-[9px] font-bold uppercase tracking-[0.2em]">Verified Documentation</span>
              </div>
            </div>
          </div>
        </div>

      </main>

      <footer className="py-12 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">
          {t.footer}
        </p>
      </footer>

    </div>
  );
}