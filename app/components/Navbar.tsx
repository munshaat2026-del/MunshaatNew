"use client"

import React, { useState, useEffect } from "react"
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import Logo from "@/public/logo.png"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl" 
import Link from "next/link" 

export default function Navbar({isComingSoon}:{isComingSoon:Boolean}) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [mobileEstateOpen, setMobileEstateOpen] = useState(false) 
  const pathname = usePathname()
  const t = useTranslations("Navbar") 
  const locale = useLocale() 
  
  const primaryColor = "#0c479a"
  const isAr = locale === "ar"

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
    setMobileEstateOpen(false) 
  }, [pathname])

  const navLinks = isComingSoon ?[
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { 
      name: t("realEstates"), 
      isDropdown: true,
      items: [
        { name: t("stores"), href: "/stores" },
        { name: t("depot"), href: "/depot" },
        { name: t("offices"), href: "/offices" },
      ]
    },
    { name: t("parkings"), href: "/parkings" },
    
    { name: t("tenders"), href: "/tender" }, 
    { name: t("careers"), href: "/career" },
    { name: t("comingSoon"), href: "/comingsoon" }, 
  ]:[
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { 
      name: t("realEstates"), 
      isDropdown: true,
      items: [
        { name: t("stores"), href: "/stores" },
        { name: t("depot"), href: "/depot" },
        { name: t("offices"), href: "/offices" },
      ]
    },
    { name: t("parkings"), href: "/parkings" },
    
    { name: t("tenders"), href: "/tender" }, 
    { name: t("careers"), href: "/career" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-sm py-3"
            : "bg-white py-5"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between">
            {/* Logo & Company Name */}
            <Link href="/" className="flex items-center gap-3">
              <Image src={Logo} alt="REEAC logo" width={50} height={50} />
              <h1 className="text-2xl font-black uppercase tracking-tighter text-black">
                RE<span style={{ color: primaryColor }}>EAC</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname === `/${locale}${link.href}`;

                // Render Dropdown
                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <button className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-slate-500 hover:text-slate-900 transition-colors">
                        {link.name}
                        <ChevronDown size={14} className="transition-transform duration-300 group-hover:rotate-180" />
                      </button>
                      
                      {/* Dropdown Menu - uses 'start-0' for RTL/LTR support */}
                      <div className="absolute top-full start-0 w-48 mt-2 bg-white border border-slate-100 shadow-[0_10px_40px_-10px_rgba(0,0,0,0.1)] opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 flex flex-col z-50">
                        {link.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-5 py-3.5 text-[10px] font-black uppercase tracking-widest text-slate-500 hover:text-[#0c479a] hover:bg-slate-50 border-b border-slate-50 last:border-none transition-colors"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                // Render Normal Link
                return (
                  <Link
                    key={link.name}
                    href={link.href!}
                    className={`relative text-xs font-bold uppercase tracking-widest transition-colors
                    ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    {link.name}
                    {isActive && (
                      <span
                        className="absolute left-0 -bottom-2 w-full h-[2px]"
                        style={{ backgroundColor: primaryColor }}
                      />
                    )}
                  </Link>
                )
              })}
              <div className="hidden md:block">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Toggle */}
            <div className="flex items-center gap-4 lg:hidden">
              <button onClick={() => setIsOpen(true)} className="p-2">
                <Menu className="text-black" size={26} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ease-out lg:hidden overflow-hidden flex flex-col ${
          isOpen ? "translate-x-0" : (isAr ? "-translate-x-full" : "translate-x-full")
        } ${!isOpen && "invisible pointer-events-none"}`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          
          <div className="flex items-center justify-between mb-12 flex-shrink-0">
            <div className="flex items-center gap-3">
              <Image src={Logo} alt="logo" width={60} height={60} />
              <span className="text-2xl font-black uppercase tracking-tighter text-black">
                 RE<span style={{ color: primaryColor }}>EAC</span>
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="border p-3 rounded-md active:bg-gray-50"
            >
              <X size={22} className="text-black" />
            </button>
          </div>

          {/* Mobile Links */}
          <div className="flex flex-col gap-6">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `/${locale}${link.href}`;

              // Mobile Dropdown/Accordion
              if (link.isDropdown) {
                return (
                  <div key={link.name} className="flex flex-col border-b border-slate-100 pb-2 last:border-none">
                    <button 
                      onClick={() => setMobileEstateOpen(!mobileEstateOpen)}
                      className="text-2xl font-bold flex justify-between items-center py-2 text-gray-800"
                    >
                      {link.name}
                      <ChevronDown size={22} className={`transition-transform duration-300 ${mobileEstateOpen ? "rotate-180" : ""}`} />
                    </button>
                    
                    {/* Accordion Content */}
                    <div className={`flex flex-col gap-4 overflow-hidden transition-all duration-300 ${mobileEstateOpen ? "max-h-64 mt-4 mb-2 opacity-100" : "max-h-0 opacity-0"}`}>
                      {link.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="text-lg font-bold text-slate-500 flex items-center gap-3 transition-colors hover:text-[#0c479a]"
                        >
                          <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: primaryColor }} />
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              // Normal Mobile Link
              return (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={`text-2xl font-bold flex justify-between items-center py-2 transition-colors border-b border-slate-100 pb-4 last:border-none ${
                    isActive ? "text-[#0c479a]" : "text-gray-800"
                  }`}
                >
                  {link.name}
                  <ChevronRight size={22} className={`opacity-30 ${isAr ? "rotate-180" : ""}`} />
                </Link>
              )
            })}
          </div>

          {/* Bottom */}
          <div className="mt-auto pt-10 flex items-center justify-between flex-shrink-0">
            <span className="text-[10px] text-gray-400 uppercase tracking-widest font-black">
              {t("language")}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}