"use client"

import React, { useState, useEffect } from "react"
import { Menu, X, ChevronDown } from "lucide-react"
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
    document.body.style.overflow = isOpen ? "hidden" : ""
  }, [isOpen])

  useEffect(() => {
    setIsOpen(false)
    setMobileEstateOpen(false) 
  }, [pathname])

  const navLinks = [
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
    ...(isComingSoon ? [{ name: t("comingSoon"), href: "/comingsoon" }] : [])
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out ${
          scrolled ? "bg-white/90 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image src={Logo} alt="REEAC logo" width={42} height={42} className="transition-transform duration-500 group-hover:scale-105" />
              <h1 className="text-xl font-black  tracking-tighter text-black">
                Re<span style={{ color: primaryColor }}>eac</span>
              </h1>
            </Link>

            {/* Desktop Menu */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href || pathname === `/${locale}${link.href}`;

                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-500 hover:text-slate-900 transition-colors">
                        {link.name}
                        <ChevronDown size={12} className="transition-transform duration-300 group-hover:rotate-180 opacity-70" />
                      </button>
                      <div className="absolute top-full start-0 w-44 mt-2 bg-white border border-slate-100 shadow-xl opacity-0 translate-y-2 invisible group-hover:opacity-100 group-hover:translate-y-0 group-hover:visible transition-all duration-300 z-50">
                        {link.items?.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-slate-500 hover:text-white hover:bg-[#0c479a] block transition-all"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href!}
                    className={`relative text-[11px] font-bold uppercase tracking-[0.15em] transition-colors
                    ${isActive ? "text-slate-900" : "text-slate-500 hover:text-slate-900"}`}
                  >
                    {link.name}
                    {isActive && (
                      <span className="absolute left-0 -bottom-1 w-full h-[1.5px]" style={{ backgroundColor: primaryColor }} />
                    )}
                  </Link>
                )
              })}
              <div className="ms-4 pl-4 border-s border-slate-100">
                <LanguageSwitcher />
              </div>
            </div>

            {/* Mobile Toggle */}
            <button onClick={() => setIsOpen(true)} className="lg:hidden p-2 hover:bg-slate-50 rounded-full transition-colors">
              <Menu className="text-black" size={24} />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-500 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : (isAr ? "-translate-x-full" : "translate-x-full")
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="logo" width={45} height={45} />
              <span className="text-xl font-black text-black uppercase tracking-tighter">RE<span style={{ color: primaryColor }}>EAC</span></span>
            </div>
            <button onClick={() => setIsOpen(false)} className="p-2 bg-slate-50 rounded-full">
              <X size={20} className="text-black" />
            </button>
          </div>

          <div className="flex flex-col">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || pathname === `/${locale}${link.href}`;

              if (link.isDropdown) {
                return (
                  <div key={link.name} className="border-b border-slate-50">
                    <button 
                      onClick={() => setMobileEstateOpen(!mobileEstateOpen)}
                      className="w-full text-lg font-bold flex justify-between items-center py-5 text-slate-800"
                    >
                      {link.name}
                      <ChevronDown size={18} className={`transition-transform duration-300 opacity-40 ${mobileEstateOpen ? "rotate-180" : ""}`} />
                    </button>
                    <div className={`flex flex-col overflow-hidden transition-all duration-300 ${mobileEstateOpen ? "max-h-60 pb-4" : "max-h-0"}`}>
                      {link.items?.map((subItem) => (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="py-3 px-4 text-sm font-medium text-slate-500 border-s-2 border-slate-100 hover:border-[#0c479a] hover:text-[#0c479a] transition-all"
                        >
                          {subItem.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )
              }

              return (
                <Link
                  key={link.name}
                  href={link.href!}
                  className={`text-lg font-bold py-5 border-b border-slate-50 transition-colors ${
                    isActive ? "text-[#0c479a]" : "text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              )
            })}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">{t("language")}</span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  )
}