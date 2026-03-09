"use client"

import React from 'react';
import { 
  Phone, Mail, MapPin, Send, 
  Linkedin, Twitter, Instagram, Globe 
} from 'lucide-react';
import { useTranslations, useLocale } from "next-intl";

export default function ContactSection() {
  const primaryColor = "#0c479a";
  const locale = useLocale();
  const isAr = locale === "ar";

  return (
    <section className="bg-white text-slate-900 py-24 md:py-32 overflow-hidden" dir={isAr ? "rtl" : "ltr"}>
      <div className="max-w-7xl mx-auto px-6 md:px-16">
        
        {/* 1. Header Area - Integrated */}
        <div className="mb-20 space-y-4">
          <div className="inline-flex items-center gap-2">
            <div className="w-2 h-2 bg-[#0c479a]"></div>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">
              {isAr ? "اتصال مباشر" : "Direct Communication"}
            </span>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter text-slate-900 leading-none">
            {isAr ? "دعنا" : "LET'S"} <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>
              {isAr ? "نتواصل" : "CONNECT."}
            </span>
          </h2>
        </div>

        {/* 2. Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0 border border-slate-100 shadow-2xl shadow-slate-200/50">
          
          {/* Left: Information Column */}
          <div className={`lg:col-span-5 border-slate-100 ${isAr ? "lg:border-l" : "lg:border-r"}`}>
            <div className="p-8 md:p-12 space-y-12">
              <div className="space-y-10">
                <h3 className="text-2xl font-black uppercase tracking-tighter leading-tight">
                  {isAr ? <>المقر<br />العملياتي</> : <>Operational <br /> Headquarters</>}
                </h3>
                
                <div className="space-y-8">
                  {[
                    { Icon: MapPin, label: isAr ? "مكتب الرياض" : "Riyadh Office", val: isAr ? "مركز الملك عبدالله المالي، الرياض" : "KAFD, Tower 4, Riyadh, KSA" },
                    { Icon: Phone, label: isAr ? "الخط المباشر" : "Direct Line", val: "+966 11 234 5678" },
                    { Icon: Mail, label: isAr ? "الاستفسارات الرسمية" : "Official Inquiry", val: "ops@royalmanage.sa" }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-5 group">
                      <div className="w-10 h-10 shrink-0 flex items-center justify-center border border-slate-100 group-hover:bg-[#0c479a] group-hover:text-white transition-all duration-500" style={{ color: primaryColor }}>
                        <item.Icon size={18} strokeWidth={1.5} />
                      </div>
                      <div>
                        <h4 className="font-black text-[9px] uppercase tracking-[0.3em] text-slate-300 mb-1">{item.label}</h4>
                        <p className="font-black text-sm text-slate-800 uppercase tracking-tight">{item.val}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Business Hours Block */}
              <div className="bg-slate-950 p-8 text-white space-y-6">
                <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
                  {isAr ? "ساعات العمل" : "Operating Hours"}
                </h3>
                <div className="space-y-3">
                  {[
                    { day: isAr ? "الأحد - الخميس" : "Sun - Thu", time: "08:00 - 18:00" },
                    { day: isAr ? "الجمعة" : "Friday", time: isAr ? "مغلق" : "Closed", alert: true },
                    { day: isAr ? "السبت" : "Saturday", time: isAr ? "دعم فقط" : "Support Only" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-white/5 pb-2 last:border-0">
                      <span className="text-[9px] font-black uppercase tracking-widest text-slate-500">{row.day}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest ${row.alert ? 'text-red-500' : 'text-white'}`}>{row.time}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Contact Form Column */}
          <div className="lg:col-span-7 p-8 md:p-16 bg-slate-50/50">
            <form className="space-y-10" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">{isAr ? "الاسم الكامل" : "Full Name"}</label>
                  <input type="text" placeholder={isAr ? "الاسم" : "IDENTITY"} className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200 rounded-none" />
                </div>
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">{isAr ? "الشركة" : "Company"}</label>
                  <input type="text" placeholder={isAr ? "المنشأة" : "ORGANIZATION"} className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200 rounded-none" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">{isAr ? "البريد الإلكتروني" : "Business Email"}</label>
                  <input type="email" placeholder="OFFICIAL EMAIL" className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all placeholder:text-slate-200 rounded-none" />
                </div>
                <div className="group space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">{isAr ? "القسم" : "Department"}</label>
                  <select className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all cursor-pointer appearance-none rounded-none">
                    <option>{isAr ? "إدارة الأصول" : "ASSET MANAGEMENT"}</option>
                    <option>{isAr ? "استفسارات التأجير" : "LEASING INQUIRIES"}</option>
                    <option>{isAr ? "خدمات المواقف" : "PARKING SERVICES"}</option>
                  </select>
                </div>
              </div>

              <div className="group space-y-2">
                <label className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400 group-focus-within:text-[#0c479a] transition-colors">{isAr ? "نص الرسالة" : "Message Protocol"}</label>
                <textarea rows={3} placeholder="..." className="w-full bg-transparent border-b border-slate-200 py-3 text-sm font-black uppercase tracking-tighter outline-none focus:border-[#0c479a] transition-all resize-none placeholder:text-slate-200 rounded-none"></textarea>
              </div>

              <button 
                className="w-full py-5 bg-[#0c479a] text-white font-black uppercase tracking-[0.4em] text-[10px] flex items-center justify-center gap-4 transition-all hover:bg-black group active:scale-[0.98]"
              >
                {isAr ? "إرسال البيانات" : "Submit Protocol"} 
                <Send size={14} className={`${isAr ? "rotate-180" : ""} group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform`} />
              </button>
            </form>
          </div>
        </div>

        {/* 3. Small Social Section - Integrated */}
        <div className="mt-16 flex justify-between items-center border-t border-slate-50 pt-8">
          <span className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-300">
            {isAr ? "التواجد العالمي" : "Global Presence"}
          </span>
          <div className="flex gap-8 text-slate-300">
            {[Linkedin, Twitter, Instagram].map((Icon, i) => (
              <Icon key={i} size={18} className="hover:text-[#0c479a] cursor-pointer transition-colors" strokeWidth={1.5} />
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}