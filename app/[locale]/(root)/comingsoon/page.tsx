"use client";
import React from "react";
import { Hammer, Timer, Mail, ArrowLeft } from "lucide-react";
import { useParams } from "next/navigation";

export default function ComingSoonPage() {
  const params = useParams();
  const locale = params?.locale || "ar";
  const isAr = locale === "ar";

  const content = {
    ar: {
      title: "نعمل على تطوير شيء استثنائي",
      subtitle: "قريباً | الموقع تحت الإنشاء",
      description: "نحن في مجموعة منشآت الصناعية نقوم حالياً بتحديث منصتنا الرقمية لنقدم لكم تجربة مستخدم تليق بمعاييرنا العالمية. انتظرونا قريباً لإطلاق حلولنا الصناعية المتكاملة.",
      placeholder: "أدخل بريدك الإلكتروني ليصلك إشعار عند الإطلاق",
      button: "اشترك الآن",
      back: "العودة للرئيسية"
    },
    en: {
      title: "Building Something Extraordinary",
      subtitle: "Coming Soon | Under Construction",
      description: "At Munshaat Industrial Group, we are currently upgrading our digital platform to provide an experience that matches our global standards. Stay tuned for the launch of our integrated industrial solutions.",
      placeholder: "Enter your email to get notified",
      button: "Notify Me",
      back: "Back to Home"
    }
  }[isAr ? "ar" : "en"];

  return (
    <div className={`min-h-screen bg-white text-slate-900 font-sans flex flex-col ${isAr ? 'text-right' : 'text-left'}`} dir={isAr ? 'rtl' : 'ltr'}>
      
      {/* 1. Top Section: Decoration & Back Link */}
      <nav className="p-8 flex justify-between items-center">
        <div className="flex gap-1">
          <div className="w-8 h-1.5 bg-[#0c479a]"></div>
          <div className="w-8 h-1.5 bg-black"></div>
        </div>
        <button className="text-xs font-black uppercase tracking-widest flex items-center gap-2 hover:text-[#0c479a] transition-colors">
          {isAr ? <ArrowLeft size={16} className="rotate-180" /> : <ArrowLeft size={16} />}
          {content.back}
        </button>
      </nav>

      <main className="flex-1 flex flex-col lg:flex-row">
        
        {/* 2. Left Side: Content */}
        <div className="lg:w-1/2 p-8 md:p-20 flex flex-col justify-center space-y-10">
          <div className="space-y-4">
            <span className="inline-flex items-center gap-2 text-[#0c479a] text-[11px] font-black uppercase tracking-[0.4em]">
              <Timer size={16} />
              {content.subtitle}
            </span>
            <h1 className="text-4xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter uppercase">
              {content.title}
            </h1>
          </div>

          <p className="text-lg text-slate-500 leading-relaxed max-w-xl font-medium">
            {content.description}
          </p>

          {/* Email Subscription */}
          <div className="max-w-md space-y-4">
            <div className="flex border-2 border-black group focus-within:border-[#0c479a] transition-colors">
              <input 
                type="email" 
                placeholder={content.placeholder}
                className="flex-1 p-4 text-sm outline-none bg-transparent"
              />
              <button className="bg-black text-white px-8 py-4 text-xs font-black uppercase tracking-widest hover:bg-[#0c479a] transition-all flex items-center gap-2">
                <Mail size={16} />
                <span className="hidden md:inline">{content.button}</span>
              </button>
            </div>
          </div>

          {/* Progress Indicator */}
          <div className="space-y-2 pt-10">
            <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>{isAr ? "نسبة الإنجاز" : "Development Progress"}</span>
              <span>85%</span>
            </div>
            <div className="w-full h-1 bg-slate-100 relative">
              <div className="absolute top-0 right-0 h-full w-[85%] bg-[#0c479a]"></div>
            </div>
          </div>
        </div>

        {/* 3. Right Side: Image with Overlay */}
        <div className="lg:w-1/2 relative min-h-[400px] bg-slate-100 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
            alt="Industrial Progress" 
            className="absolute inset-0 w-full h-full object-cover grayscale brightness-50"
          />
          <div className="absolute inset-0 bg-[#0c479a]/10 mix-blend-multiply"></div>
          
          {/* Floating Element */}
          <div className="absolute bottom-12 left-12 right-12 bg-white/10 backdrop-blur-md border border-white/20 p-8 text-white">
            <Hammer size={32} className="mb-4 text-[#0c479a]" />
            <h4 className="text-xl font-bold mb-2">{isAr ? "دقة في التنفيذ" : "Precision in Execution"}</h4>
            <p className="text-sm text-slate-200 font-medium">
              {isAr ? "نطبق أعلى معايير الجودة في كل تفاصيل منصتنا الجديدة." : "We apply the highest quality standards in every detail of our new platform."}
            </p>
          </div>
        </div>

      </main>

      {/* 4. Simple Footer */}
      <footer className="p-8 border-t border-slate-100 text-center">
        <p className="text-[10px] font-bold text-slate-300 uppercase tracking-[0.8em]">
          MUNSHAAT INDUSTRIAL GROUP • 2026
        </p>
      </footer>

    </div>
  );
}