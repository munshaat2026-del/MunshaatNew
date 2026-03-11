"use client"

import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import Logo from "@/public/logo.png"
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const primaryColor = "#0c479a";
  const t = useTranslations("Navbar");
  const locale = useLocale();

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("offices"), href: "/offices" },
    { name: t("stores"), href: "/stores" },
    { name: t("depot"), href: "/depot" },
    { name: t("parkings"), href: "/parkings" },
    { name: t("career"), href: "/career" },
  ];

  return (
    <footer className="bg-[#0a0f1a] text-white pt-24 pb-12 px-6 md:px-16 relative overflow-hidden" dir={locale === "ar" ? "rtl" : "ltr"}>
      {/* خلفية هندسية خفيفة */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '100px 100px' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* 1. Brand Identity */}
          <div className="lg:col-span-5 space-y-8">
            <div className="flex items-center gap-4">
              <Image 
                alt='REEAC Logo' 
                width={50} 
                height={50} 
                src={Logo} 
                className="object-contain" 
              />
              <span className="text-3xl font-black uppercase tracking-tighter leading-none">
                RE<span style={{ color: primaryColor }}>EAC</span>
              </span>
            </div>
            
            <p className="text-slate-500 font-bold text-[10px] uppercase tracking-widest leading-loose max-w-sm">
              {locale === "ar" 
                ? "إدارة مرافق من الدرجة المؤسسية وتميز تشغيلي لأصول العقارات الرائدة في المملكة العربية السعودية."
                : "Institutional-grade facility management and operational excellence for Saudi Arabia's premier real estate assets."}
            </p>

            <div className="flex gap-0 border border-white/10 w-fit">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center border-r border-white/10 hover:bg-white hover:text-slate-950 transition-all last:border-r-0">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation */}
          <div className="lg:col-span-3 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
              {locale === "ar" ? "التنقل" : "Navigation"}
            </h4>
            <ul className="space-y-4">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link href={item.href} className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    {item.name} 
                    <ArrowUpRight size={12} className={`opacity-0 group-hover:opacity-100 transition-all -translate-y-1 ${locale === "ar" ? "rotate-[-90deg]" : ""}`} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. HQ Contact */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
               {locale === "ar" ? "المقر الرئيسي" : "Headquarters"}
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">
                  King Fahd Road, KAFD Tower 4,<br />Riyadh, Saudi Arabia
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <Phone size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  +966 11 000 0000
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <Mail size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  info@reeac.sa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.6em]">
            © 2026 REEAC OPERATIONS GROUP.
          </p>
          
          <div className="flex gap-8 md:gap-12">
            {['Security Audit', 'System Status', 'KSA Vision 2030'].map((status) => (
              <span key={status} className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700 hover:text-white cursor-pointer transition-colors">
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}