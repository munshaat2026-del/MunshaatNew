"use client"

import React, { useState, useEffect } from "react"
import { Menu, X, ChevronRight } from "lucide-react"
import LanguageSwitcher from "./language-switcher"
import Logo from "@/public/logo.png"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl" 
import Link from "next/link" 

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const t = useTranslations("Navbar") 
  const locale = useLocale() 
  
  const primaryColor = "#0c479a"

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
  }, [pathname])

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
    { name: t("offices"), href: "/offices" },
    { name: t("stores"), href: "/stores" },
    { name: t("depot"), href: "/depot" },
    { name: t("parkings"), href: "/parkings" },
  ]

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          scrolled
            ? "bg-white/95 backdrop-blur shadow-sm py-3"
            : "bg-white py-5"
        }`}
        dir={locale === "ar" ? "rtl" : "ltr"}
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
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative text-xs font-bold uppercase tracking-widest transition-colors
                  ${pathname === link.href || pathname === `/${locale}${link.href}` 
                    ? "text-slate-900" 
                    : "text-slate-500 hover:text-slate-900"}`}
                >
                  {link.name}
                  {(pathname === link.href || pathname === `/${locale}${link.href}`) && (
                    <span
                      className="absolute left-0 -bottom-2 w-full h-[2px]"
                      style={{ backgroundColor: primaryColor }}
                    />
                  )}
                </Link>
              ))}
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
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-300 ease-out lg:hidden ${
          isOpen ? "translate-x-0" : (locale === "ar" ? "-translate-x-full" : "translate-x-full")
        } ${!isOpen && "invisible pointer-events-none"}`}
        dir={locale === "ar" ? "rtl" : "ltr"}
      >
        <div className="absolute inset-0 overflow-y-auto flex flex-col">
          <div className="p-8 flex flex-col min-h-full">
            
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

            {/* Links */}
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-2xl font-bold flex justify-between items-center py-2 transition-colors ${
                    pathname === link.href || pathname === `/${locale}${link.href}` 
                      ? "text-[#0c479a]" 
                      : "text-gray-800"
                  }`}
                >
                  {link.name}
                  <ChevronRight size={22} className={`opacity-50 ${locale === "ar" ? "rotate-180" : ""}`} />
                </Link>
              ))}
            </div>

            {/* Bottom */}
            <div className="mt-auto pt-10 pb-10 border-t flex items-center justify-between flex-shrink-0">
              <span className="text-sm text-gray-500 uppercase tracking-widest font-semibold">
                {t("language")}
              </span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}