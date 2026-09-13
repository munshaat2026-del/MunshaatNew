"use client";

import {
  Mail,
  Phone,
  MapPin,
  Linkedin,
  Instagram,
  ArrowUpRight,
  Facebook,
} from "lucide-react";
import Logo from "@/public/logo.png";
import Image from "next/image";
import Link from "next/link";
import { useTranslations, useLocale } from "next-intl";

export function Footer() {
  const primaryColor = "#0c479a";
  const t = useTranslations("Navbar");
  const locale = useLocale();
  const isAr = locale === "ar";
  const currentYear = new Date().getFullYear();
  const nurembergUrl = process.env.NEXT_PUBLIC_NUREMBERG_URL;

  const address = isAr
    ? process.env.NEXT_PUBLIC_ADDRESS_LINE_AR
    : process.env.NEXT_PUBLIC_ADDRESS_LINE_EN;

  //commented for now
  /*
  const navLinks = [
    { name: t("offices"), href: "/offices" },
    { name: t("stores"), href: "/stores" },
    { name: t("depot"), href: "/depot" },
    { name: t("parkings"), href: "/parkings" },
  ];
  */

  const navLinks = [
    { name: t("aboutUs"), href: "/about" },
    { name: t("ourComplexes"), href: "/about#our-complexes" },
    { name: t("ourTeam"), href: "/about#board-of-directors" },
    { name: t("ourClients"), href: "/about#our-clients" },
  ];

  const navLinks2 = [
    { name: t("about"), href: "/about" },
    { name: t("tenders"), href: "/tender" },
    { name: t("career"), href: "/career" },
    { name: t("contact"), href: "/about#contact" },
  ];

  return (
    <footer
      className="bg-[#0a0f1a] text-white pt-12 pb-8 px-6 md:px-16 relative overflow-hidden"
      dir={isAr ? "rtl" : "ltr"}
    >
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-4 items-start">
          <div className="lg:col-span-4 space-y-4 lg:space-y-6">
            <div className="flex items-center gap-4">
              <Image
                alt="REEAC Logo"
                width={200}
                height={200}
                src={Logo}
                className="h-24 w-auto object-contain"
              />
            </div>


            {/* <div className="flex border border-white/5 w-fit bg-white/2">
              {[
                {
                  Icon: Linkedin,
                  href: process.env.NEXT_PUBLIC_LINKEDIN_URL || "#",
                },
                {
                  Icon: Facebook,
                  href: process.env.NEXT_PUBLIC_TWITTER_URL || "#",
                },
                {
                  Icon: Instagram,
                  href: process.env.NEXT_PUBLIC_FACEBOOK_URL || "#",
                },
              ].map(({ Icon, href }, i) => (
                <Link
                  key={i}
                  href={href}
                  className="w-10 h-10 flex items-center justify-center border-r border-white/5 hover:bg-white hover:text-slate-950 transition-all last:border-r-0"
                >
                  <Icon className="no-flip" size={16} />
                </Link>
              ))}
            </div>*/}
          </div>

          <div className="lg:col-span-2 space-y-4 lg:space-y-6">
            <h4 className="text-[10px] font-black text-[#0c479a]">
              {isAr ? "نبذة عنا" : "About Us"}
            </h4>

            <ul className="space-y-3">
              {navLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[12px] font-black tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={11}
                      className="opacity-0 group-hover:opacity-100 transition-all"
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-6 hidden lg:grid">
            <h4 className="text-[10px] font-black text-[#0c479a]">
              {isAr ? "روابط مهمة" : "Important links"}
            </h4>

            <ul className="space-y-3">
              {navLinks2.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-[12px] font-black tracking-widest text-slate-500 hover:text-white transition-colors flex items-center gap-1 group"
                  >
                    {item.name}
                    <ArrowUpRight
                      size={11}
                      className={`opacity-0 group-hover:opacity-100 transition-all ${
                        isAr ? "x-rotate-90" : ""
                      }`}
                    />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-4 space-y-4 lg:space-y-6">
            <h4 className="text-[10px] font-black text-[#0c479a]">
              {isAr ? "المقر الرئيسي" : "Headquarters"}
            </h4>

            <div className="space-y-4">
              <div className="flex items-start gap-3 group">
                <MapPin
                  size={17}
                  className="text-slate-700 no-flip group-hover:text-white transition-colors shrink-0"
                />

                <span className="text-[12px] font-black tracking-widest text-slate-500 leading-tight group-hover:text-slate-300">
                  {address}
                </span>
              </div>

              <div className="flex items-center gap-3 group">
                <Phone
                  size={17}
                  className="text-slate-700 no-flip group-hover:text-white transition-colors shrink-0"
                />

                <a
                  href={`tel:${process.env.NEXT_PUBLIC_PHONE}`}
                  dir="ltr"
                  className="text-[12px] font-black tracking-widest text-slate-500 group-hover:text-slate-300"
                >
                  {process.env.NEXT_PUBLIC_PHONE}
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <Phone
                  size={17}
                  className="text-slate-700 no-flip group-hover:text-white transition-colors shrink-0"
                />

                <a
                  href={`tel:${process.env.NEXT_PUBLIC_LAND_NUMBER}`}
                  dir="ltr"
                  className="text-[12px] font-black tracking-widest text-slate-500 group-hover:text-slate-300"
                >
                  {process.env.NEXT_PUBLIC_LAND_NUMBER}
                </a>
              </div>

              <div className="flex items-center gap-3 group">
                <Mail
                  size={17}
                  className="text-slate-700 no-flip group-hover:text-white transition-colors shrink-0"
                />

                <a
                  href={`mailto:${process.env.NEXT_PUBLIC_EMAIL}`}
                  className="text-[12px] font-black tracking-widest text-slate-500 group-hover:text-slate-300"
                >
                  {process.env.NEXT_PUBLIC_EMAIL}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Updated formatting to guarantee centered text */}
        <div className="flex justify-center text-center pt-7 mt-6 border-t border-white/10 w-full">
          <p className="text-sm text-white/80 wrap-break-word">
            {isAr ? (
              <>
                © {currentYear} Reeac. جميع الحقوق محفوظة. تم الإنشاء بواسطة{" "}
                <Link
                  href={nurembergUrl!}
                  target="_blank"
                  className="underline hover:text-[#0c479a] transition-colors"
                >
                  Nuremberg Group
                </Link>
              </>
            ) : (
              <>
                © {currentYear} Reeac. All rights reserved. Made by{" "}
                <Link
                  href={nurembergUrl!}
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
  );
}
