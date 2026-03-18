"use client"

import React from "react"
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowUpRight } from "lucide-react"
import Logo from "@/public/logo.png"
import Image from "next/image"
import Link from "next/link"
import { useTranslations, useLocale } from "next-intl"

export function Footer() {
  const primaryColor = "#0c479a"
  const t = useTranslations("Navbar")
  const locale = useLocale()
  const isAr = locale === "ar"
  const currentYear = new Date().getFullYear()
  const nurembergUrl = "https://nuremberg-group.com"

  const navLinks = [
    { name: t("offices"), href: "/offices" },
    { name: t("stores"), href: "/stores" },
    { name: t("depot"), href: "/depot" },
    { name: t("parkings"), href: "/parkings" }
  ]

  const navLinks2 = [
    { name: t("about"), href: "/about" },
    { name: t("tenders"), href: "/tender" },
    { name: t("career"), href: "/career" },
    { name: t("comingSoon"), href: "/comingSoon" }
  ]

  return (
    <footer
      className="bg-[#0a0f1a] text-white pt-16 pb-8 px-6 md:px-16 relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px"
          }}
        ></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-4 items-start">
          
          {/* Logo */}
          <div className="lg:col-span-4 space-y-6">
            <div className="flex items-center gap-4">
              <Image alt="REEAC Logo" width={42} height={42} src={Logo} className="object-contain" />
              <span className="text-2xl font-black uppercase tracking-tighter leading-none">
                RE<span style={{ color: primaryColor }}>EAC</span>
              </span>
            </div>

            <p className="text-white font-bold text-[15px] uppercase tracking-widest leading-relaxed max-w-sm">
              {isAr
                ? "شركة المنشآت والمجمعات العقارية"
                : "real estate establishments and complexes company"}
            </p>

            <div className="flex border border-white/5 w-fit bg-white/[0.02]">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <Link
                  key={i}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border-r border-white/5 hover:bg-white hover:text-slate-950 transition-all last:border-r-0"
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>

          {/* Services */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
              {isAr ? "الخدمات" : "Services"}
            </h4>

            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={10}
                      className={`opacity-0 group-hover:opacity-100 transition-all ${
                        isAr ? "rotate-[-90deg]" : ""
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Important links */}
          <div className="lg:col-span-2 space-y-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
              {isAr ? "روابط مهمة" : "Important links"}
            </h4>

            <ul className="space-y-3">
              {navLinks2.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={10}
                      className={`opacity-0 group-hover:opacity-100 transition-all ${
                        isAr ? "rotate-[-90deg]" : ""
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-4 space-y-6">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0c479a]">
              {isAr ? "المقر الرئيسي" : "Headquarters"}
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin size={16} className="text-slate-700 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 leading-tight group-hover:text-slate-300">
                  King Abudlah Road
                  <br />
                  Amman, Jordan
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <Phone size={16} className="text-slate-700 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300">
                  +966 11 000 0000
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <Mail size={16} className="text-slate-700 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-500 group-hover:text-slate-300">
                  info@reeac.sa
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="text-center pt-10 mt-10 border-t border-white/10">
          <p className="text-sm text-white/80 break-words">
            {isAr ? (
              <>
                © {currentYear} REEAC. جميع الحقوق محفوظة. تم الإنشاء بواسطة{" "}
                <Link
                  href={nurembergUrl}
                  target="_blank"
                  className="underline hover:text-[#0c479a] transition-colors"
                >
                  Nuremberg Group
                </Link>
              </>
            ) : (
              <>
                © {currentYear} REEAC. All rights reserved. Made by{" "}
                <Link
                  href={nurembergUrl}
                  target="_blank"
                  className="underline hover:text-[#0c479a] transition-colors"
                >
                  Nuremberg Group
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}