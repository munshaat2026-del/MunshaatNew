import { ArrowLeft, ArrowRight, FileX2 } from "lucide-react";
import Link from "next/link";
import { Locale } from "@/types";

export default function EmptyTenders({ locale }: { locale: Locale }) {
  const isAr = locale === "ar";

  const content = {
    title: isAr ? "لا توجد عطاءات نشطة" : "No Active Tenders",
    description: isAr
      ? "كافة المشاريع الحالية في مرحلة التنفيذ. يرجى مراجعة المنصة لاحقاً للحصول على فرص طرح جديدة."
      : "All current projects are in the execution phase. Please check the platform later for new procurement opportunities.",
    status: isAr ? "حالة النظام: خامل" : "System Status: Idle",
    cta: isAr ? "العودة للرئيسية" : "Back to Home",
  };

  return (
    <div
      className="min-h-[60vh] mt-20 flex flex-col items-center justify-center px-6 py-20"
      dir={isAr ? "rtl" : "ltr"}
    >
      {/* Technical Status Badge */}

      <div className="text-center max-w-lg">
        {/* Large Minimalist Icon */}
        <div className="relative inline-block mb-10">
          <div className="absolute inset-0 bg-slate-50 scale-150 rounded-full blur-3xl opacity-50" />
          <FileX2
            size={64}
            strokeWidth={1}
            className="relative text-slate-200 mx-auto"
          />
        </div>

        <h2 className="text-4xl font-black text-slate-900 tracking-tighter uppercase mb-6 leading-none">
          {content.title}
        </h2>

        <p className="text-slate-500 font-medium text-lg leading-relaxed mb-12">
          {content.description}
        </p>

        <Link
          href={`/${locale}`}
          className="inline-flex items-center gap-3 bg-slate-900 text-white px-10 py-5 text-[10px] font-bold uppercase  hover:bg-[#0c479a] transition-all"
        >
          {isAr ? <ArrowRight size={16} /> : <ArrowLeft size={16} />}
          {content.cta}
        </Link>
      </div>

      {/* Industrial Reference Detail */}
      <div className="mt-24 pt-8 border-t border-slate-100 w-full max-w-7xl flex justify-between items-center opacity-30">
        <span className="text-[8px] font-bold uppercase tracking-widest text-slate-400">
          Procurement Gateway v2.6
        </span>
        <div className="flex gap-1">
          {[1, 2, 3].map((i) => (
            <div key={i} className="w-1 h-1 bg-slate-400" />
          ))}
        </div>
      </div>
    </div>
  );
}
