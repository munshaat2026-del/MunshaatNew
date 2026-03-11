"use client"

import React, { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations, useLocale } from "next-intl"
import { Menu, ChevronRight } from "lucide-react"

// Shadcn UI Components
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetDescription,
} from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"

import LanguageSwitcher from "./language-switcher"
import Logo from "@/public/logo.png"
import { cn } from "@/lib/utils"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [isOpen, setIsOpen] = useState(false) // للتحكم في إغلاق المنيو
  const pathname = usePathname()
  const t = useTranslations("Navbar")
  const locale = useLocale()
  
  const primaryColor = "#0c479a"

  // تغيير الخلفية عند التمرير
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // إغلاق المنيو عند تغيير المسار (Pathname)
  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  const navLinks = [
    { name: t("home"), href: "/" },
    { name: t("about"), href: "/about" },
  ]

  const dropdownItems = [
    { name: t("offices"), href: "/offices" },
    { name: t("stores"), href: "/stores" },
    { name: t("depot"), href: "/depot" },
    { name: t("parkings"), href: "/parkings" },
  ]

  const isActive = (href: string) => 
    pathname === href || pathname === `/${locale}${href}`

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 w-full z-[100] transition-all duration-300 ease-in-out",
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm py-3" : "bg-white py-5"
      )}
      dir={locale === "ar" ? "rtl" : "ltr"}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0">
          <Image src={Logo} alt="REEAC logo" width={45} height={45} priority className="w-auto h-auto" />
          <h1 className="text-2xl font-black uppercase tracking-tighter text-black">
            RE<span style={{ color: primaryColor }}>EAC</span>
          </h1>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex items-center gap-2">
          <NavigationMenu>
            <NavigationMenuList className="gap-1">
              {navLinks.map((link) => (
                <NavigationMenuItem key={link.name}>
                  <NavigationMenuLink asChild>
                    <Link
                      href={link.href}
                      className={cn(
                        navigationMenuTriggerStyle(),
                        "bg-transparent text-[11px] font-bold uppercase tracking-widest",
                        isActive(link.href) ? "text-black" : "text-slate-500 hover:text-black"
                      )}
                    >
                      {link.name}
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="bg-transparent text-[11px] font-bold uppercase tracking-widest text-slate-500 hover:text-black">
                  {t("services") || "Services"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[220px] gap-1 p-3 bg-white">
                    {dropdownItems.map((item) => (
                      <li key={item.name}>
                        <NavigationMenuLink asChild>
                          <Link
                            href={item.href}
                            className={cn(
                              "block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-slate-50 text-sm font-semibold",
                              isActive(item.href) ? "text-[#0c479a] bg-slate-50" : "text-slate-600"
                            )}
                          >
                            {item.name}
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
            {/* لضمان تموضع القائمة المنسدلة بشكل صحيح */}
            <div className="absolute top-full left-0 flex justify-center">
               <NavigationMenuViewport />
            </div>
          </NavigationMenu>
          
          <div className="ms-6">
            <LanguageSwitcher />
          </div>
        </div>

        {/* Mobile Menu */}
        <div className="lg:hidden">
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-transparent p-0">
                <Menu size={28} className="text-black" />
              </Button>
            </SheetTrigger>
            <SheetContent 
              side={locale === "ar" ? "right" : "left"} 
              className="w-full p-0 flex flex-col border-none"
            >
              <div className="p-8 flex flex-col h-full" dir={locale === "ar" ? "rtl" : "ltr"}>
                
                <SheetHeader className="mb-10 text-left">
                  <div className="flex items-center justify-between w-full">
                    <div className="flex items-center gap-3">
                      <Image src={Logo} alt="logo" width={55} height={55} />
                      <SheetTitle className="text-2xl font-black uppercase tracking-tighter">
                        RE<span style={{ color: primaryColor }}>EAC</span>
                      </SheetTitle>
                    </div>
                  </div>
                  <SheetDescription className="sr-only">
                    Mobile navigation menu for REEAC
                  </SheetDescription>
                </SheetHeader>

                <div className="flex flex-col gap-6 overflow-y-auto">
                  {navLinks.map((link) => (
                    <Link 
                      key={link.name} 
                      href={link.href} 
                      className={cn(
                        "text-2xl font-bold border-b border-gray-50 pb-2 transition-colors",
                        isActive(link.href) ? "text-[#0c479a]" : "text-gray-800"
                      )}
                    >
                      {link.name}
                    </Link>
                  ))}

                  <div className="pt-2">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-6">
                      {t("services") || "Services"}
                    </p>
                    <div className="flex flex-col gap-6 ps-2">
                      {dropdownItems.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={cn(
                            "text-xl font-bold flex justify-between items-center",
                            isActive(item.href) ? "text-[#0c479a]" : "text-gray-600"
                          )}
                        >
                          {item.name}
                          <ChevronRight size={20} className={cn("opacity-30", locale === "ar" && "rotate-180")} />
                        </Link>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-10 pb-6 border-t flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                    {t("language")}
                  </span>
                  <LanguageSwitcher />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}