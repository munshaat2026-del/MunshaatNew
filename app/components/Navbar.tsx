"use client";

import React, { useEffect, useState } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import LanguageSwitcher from "./language-switcher";
import Logo from "@/public/logo.png";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Link from "next/link";

type SimpleLink = {
  name: string;
  href: string;
  sectionId?: string;
  isDropdown?: false;
};

type DropdownLink = {
  name: string;
  isDropdown: true;
  items: Array<{
    name: string;
    href?: string;
    sectionId?: string;
    isDropdown?: true;
    items?: Array<{
      name: string;
      href: string;
      sectionId?: string;
    }>;
  }>;
};

type NavLink = SimpleLink | DropdownLink;

export default function Navbar({
  isComingSoon,
}: {
  isComingSoon: boolean;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openMobileDropdown, setOpenMobileDropdown] = useState<string | null>(
    null,
  );

  const pathname = usePathname();
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const primaryColor = "#0c479a";
  const isAr = locale === "ar";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    setIsOpen(false);
    setOpenMobileDropdown(null);
  }, [pathname]);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (!element) return;

    const rect = element.getBoundingClientRect();
    const absoluteTop = rect.top + window.scrollY;
    const target =
      absoluteTop - window.innerHeight / 2 + element.offsetHeight / 2;

    window.scrollTo({
      top: Math.max(0, target),
      behavior: "smooth",
    });

    window.history.pushState(null, "", `#${id}`);
  };

  const handleSectionClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    id?: string,
  ) => {
    if (!id) return;

    const currentPath = window.location.pathname;
    const aboutPath = `/${locale}/about`;

    if (currentPath === aboutPath || currentPath === "/about") {
      e.preventDefault();
      scrollToSection(id);
      setIsOpen(false);
    }
  };

  const navLinks: NavLink[] = [
    { name: t("home"), href: "/" },
    {
      name: t("about"),
      isDropdown: true,
      items: [
        {
          name: t("aboutUs") || "About Us",
          href: "/about#about-us",
          sectionId: "about-us",
        },
        {
          name: t("ourComplexes") || "Our Complexes",
          href: "/about#our-complexes",
          sectionId: "our-complexes",
        },
        {
          name: t("ourTeam") || "Our Team",
          isDropdown: true,
          items: [
            {
              name: t("executiveManagement") || "Executive Management",
              href: "/about#executive-management",
              sectionId: "executive-management",
            },
            {
              name: t("boardOfDirectors") || "Board of Directors",
              href: "/about#board-of-directors",
              sectionId: "board-of-directors",
            },
          ],
        },
        {
          name: t("ourClients") || "Our Clients",
          href: "/about#our-clients",
          sectionId: "our-clients",
        },
      ],
    },
    {
      name: t("realEstates"),
      isDropdown: true,
      items: [
        { name: t("stores"), href: "/stores" },
        { name: t("depot"), href: "/depot" },
        { name: t("offices"), href: "/offices" },
      ],
    },
    { name: t("parkings"), href: "/parkings" },
    { name: t("tenders"), href: "/tender" },
    { name: t("careers"), href: "/career" },
    ...(isComingSoon
      ? [{ name: t("comingSoon"), href: "/comingsoon" } as SimpleLink]
      : []),
  ];

  const isLinkActive = (href: string) =>
    pathname === href || pathname === `/${locale}${href}`;

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-white/90 backdrop-blur-md shadow-sm py-3"
            : "bg-white py-5"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-16">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src={Logo}
                alt="REEAC logo"
                width={42}
                height={42}
                className="transition-transform duration-500 group-hover:scale-105"
              />
              <h1 className="text-xl font-black tracking-tighter text-black">
                RE<span style={{ color: primaryColor }}>EAC</span>
              </h1>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.isDropdown) {
                  return (
                    <div key={link.name} className="relative group py-2">
                      <button className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.15em] text-slate-800 hover:text-slate-900">
                        {link.name}
                        <ChevronDown
                          size={12}
                          className="opacity-70 transition-transform duration-300 group-hover:rotate-180"
                        />
                      </button>

                      <div className="absolute top-full inset-s-0 w-48 mt-2 bg-white border border-slate-100 shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 z-50">
                        {link.items.map((subItem) => {
                          if (subItem.isDropdown) {
                            return (
                              <div
                                key={subItem.name}
                                className="relative group/team"
                              >
                                <div className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-black hover:text-[#0c479a] flex items-center justify-between cursor-pointer">
                                  <span>{subItem.name}</span>
                                  <ChevronDown
                                    size={11}
                                    className={`opacity-50 ${
                                      isAr ? "rotate-90" : "-rotate-90"
                                    }`}
                                  />
                                </div>

                                <div
                                  className={`absolute top-0 w-52 bg-white border border-slate-100 shadow-xl opacity-0 invisible transition-all duration-300 group-hover/team:opacity-100 group-hover/team:visible ${
                                    isAr
                                      ? "right-full translate-x-2 group-hover/team:translate-x-0"
                                      : "left-full -translate-x-2 group-hover/team:translate-x-0"
                                  }`}
                                >
                                  {subItem.items?.map((teamItem) => (
                                    <Link
                                      key={teamItem.name}
                                      href={teamItem.href}
                                      onClick={(e) =>
                                        handleSectionClick(
                                          e,
                                          teamItem.sectionId,
                                        )
                                      }
                                      className="px-5 py-3 text-[10px] font-bold tracking-widest text-black hover:text-white hover:bg-[#0c479a] block transition-all"
                                    >
                                      {teamItem.name}
                                    </Link>
                                  ))}
                                </div>
                              </div>
                            );
                          }

                          if (!subItem.href) return null;

                          return (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={(e) =>
                                handleSectionClick(
                                  e,
                                  subItem.sectionId,
                                )
                              }
                              className="px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-black hover:text-white hover:bg-[#0c479a] block transition-all"
                            >
                              {subItem.name}
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                  );
                }

                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`relative text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
                      isLinkActive(link.href)
                        ? "text-slate-900"
                        : "text-slate-800 hover:text-slate-900"
                    }`}
                  >
                    {link.name}
                    {isLinkActive(link.href) && (
                      <span
                        className="absolute left-0 -bottom-1 w-full h-[1.5px]"
                        style={{ backgroundColor: primaryColor }}
                      />
                    )}
                  </Link>
                );
              })}

              <div className="ms-4 pl-4 border-s border-slate-100">
                <LanguageSwitcher />
              </div>
            </div>

            <button
              onClick={() => setIsOpen(true)}
              className="lg:hidden p-2 hover:bg-slate-50 rounded-full"
            >
              <Menu className="text-black" size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-white z-[100] transform transition-transform duration-500 lg:hidden ${
          isOpen
            ? "translate-x-0"
            : isAr
              ? "-translate-x-full"
              : "translate-x-full"
        }`}
        dir={isAr ? "rtl" : "ltr"}
      >
        <div className="p-8 flex flex-col h-full overflow-y-auto">
          <div className="flex items-center justify-between mb-10">
            <div className="flex items-center gap-2">
              <Image src={Logo} alt="logo" width={45} height={45} />
              <span className="text-xl font-black text-black tracking-tighter">
                RE<span style={{ color: primaryColor }}>EAC</span>
              </span>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-2 bg-slate-50 rounded-full"
            >
              <X size={20} className="text-black" />
            </button>
          </div>

          <div className="flex flex-col">
            {navLinks.map((link) => {
              if (link.isDropdown) {
                const isOpenDropdown =
                  openMobileDropdown === link.name;

                return (
                  <div
                    key={link.name}
                    className="border-b border-slate-50"
                  >
                    <button
                      onClick={() =>
                        setOpenMobileDropdown(
                          isOpenDropdown ? null : link.name,
                        )
                      }
                      className="w-full text-lg font-bold flex justify-between items-center py-5 text-slate-800"
                    >
                      {link.name}
                      <ChevronDown
                        size={18}
                        className={`opacity-40 transition-transform ${
                          isOpenDropdown ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    <div
                      className={`flex flex-col overflow-hidden transition-all duration-300 ${
                        isOpenDropdown
                          ? "max-h-[600px] pb-4"
                          : "max-h-0"
                      }`}
                    >
                      {link.items.map((subItem) => {
                        if (subItem.isDropdown) {
                          const isTeamOpen =
                            openMobileDropdown === subItem.name;

                          return (
                            <div
                              key={subItem.name}
                              className="border-s border-slate-100 ms-4"
                            >
                              <button
                                onClick={() =>
                                  setOpenMobileDropdown(
                                    isTeamOpen
                                      ? link.name
                                      : subItem.name,
                                  )
                                }
                                className="w-full py-3 px-4 text-sm font-medium text-slate-600 flex items-center justify-between"
                              >
                                {subItem.name}
                                <ChevronDown
                                  size={16}
                                  className={`opacity-40 transition-transform ${
                                    isTeamOpen ? "rotate-180" : ""
                                  }`}
                                />
                              </button>

                              <div
                                className={`flex flex-col overflow-hidden transition-all duration-300 ${
                                  isTeamOpen
                                    ? "max-h-40 pb-2"
                                    : "max-h-0"
                                }`}
                              >
                                {subItem.items?.map((teamItem) => (
                                  <Link
                                    key={teamItem.name}
                                    href={teamItem.href}
                                    onClick={(e) => {
                                      handleSectionClick(
                                        e,
                                        teamItem.sectionId,
                                      );
                                    }}
                                    className="py-3 px-8 text-sm font-medium text-slate-500 hover:text-[#0c479a]"
                                  >
                                    {teamItem.name}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          );
                        }

                        if (!subItem.href) return null;

                        return (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            onClick={(e) => {
                              handleSectionClick(
                                e,
                                subItem.sectionId,
                              );
                              setIsOpen(false);
                            }}
                            className="py-3 px-4 text-sm font-medium text-slate-500 border-s-2 border-slate-100 hover:border-[#0c479a] hover:text-[#0c479a]"
                          >
                            {subItem.name}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                );
              }

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`text-lg font-bold py-5 border-b border-slate-50 ${
                    isLinkActive(link.href)
                      ? "text-[#0c479a]"
                      : "text-slate-800"
                  }`}
                >
                  {link.name}
                </Link>
              );
            })}
          </div>

          <div className="mt-auto pt-8 border-t border-slate-50 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">
              {t("language")}
            </span>
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </>
  );
}
