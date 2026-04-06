"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Warehouse, Building2, Car, Layout, MoveUpRight } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";
import { useRouter } from "next/navigation";
import { Button1 } from "@/components/ui/Button1";
import Banner from "@/public/banner.jpg";
import alburg from "@/public/alburg.jpg";
import header from "@/public/header.jpeg";

import garage from "@/public/garage.jpeg";

gsap.registerPlugin(ScrollTrigger);

export default function ArabianPremiumEmpire() {
  const containerRef = useRef(null);
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const data = homedata[locale];
  const router = useRouter();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(".hero-zoom-img", {
        scale: 1.1,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true,
      });

      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      });

      const assemblyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".assembly-section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
        },
      });

      assemblyTl
        .from(".part-left", {
          xPercent: isAr ? 100 : -100,
          opacity: 0,
          duration: 2,
        })
        .from(
          ".part-right",
          { xPercent: isAr ? -100 : 100, opacity: 0, duration: 2 },
          "-=2",
        )
        .from(
          ".part-top",
          { yPercent: -100, opacity: 0, duration: 1.5 },
          "-=1.5",
        )
        .to(".building-title", { opacity: 1, y: 0, duration: 0.5 });
    }, containerRef);

    return () => ctx.revert();
  }, [isAr]);

  const icons = [Car, Warehouse, Building2];

  return (
    <div
      ref={containerRef}
      className="bg-white text-slate-900 overflow-x-hidden font-sans"
    >
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img
            src={Banner.src}
            className="hero-zoom-img w-full h-full object-cover opacity-40 transition-all duration-1000"
            alt="Facade"
          />
          <div className="absolute inset-0  from-transparent to-white"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <h1 className="hero-fade text-[12vw] centert  md:text-[8vw] font-black leading-[1.2] tracking-[-0.05em] uppercase text-white">
            {data.prime} <br />
            <span className="text-[#0c479a]">{data.assets}</span>
          </h1>

          <div className="hero-fade mt-16 flex flex-wrap justify-center gap-0">
            <Button1
              onClick={() => {
                router.push("/about");
              }}
              className="group bg-[#0c479a] text-white px-12 py-6 font-black text-[20px] uppercase  flex items-center gap-4 transition-all hover:bg-black"
            >
              {data.aboutUs} <MoveUpRight size={20} />
            </Button1>
          </div>
        </div>
      </section>

      <section className="assembly-section relative h-screen bg-white flex items-center justify-center overflow-hidden border-y border-slate-100">
        <div className="relative w-full mt-20 max-w-6xl h-[85vh]">
          <div className="part-top absolute top-0 w-full h-[45%] z-30 overflow-hidden border-b-4 border-white shadow-2xl">
            <div
              className={`absolute top-0 ${isAr ? "right-0" : "left-0"} z-40 bg-black text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.warehouseTitle}
            </div>
            <img
              src={header.src}
              className="w-full h-full object-cover"
              alt="Warehouse"
            />
          </div>

          <div
            className={`part-left absolute bottom-0 ${isAr ? "right-0" : "left-0"} w-[49.8%] h-[54%] z-20 overflow-hidden border-white shadow-2xl ${isAr ? "border-l-4" : "border-r-4"}`}
          >
            <div
              className={`absolute bottom-0 ${isAr ? "right-0" : "left-0"} z-40 bg-[#0c479a] text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.officeTitle}
            </div>
            <img
              src={alburg.src}
              className="w-full h-full object-cover"
              alt="Offices"
            />
          </div>

          <div
            className={`part-right absolute bottom-0 ${isAr ? "left-0" : "right-0"} w-[49.8%] h-[54%] z-10 overflow-hidden shadow-2xl`}
          >
            <div
              className={`absolute bottom-0 ${isAr ? "left-0" : "right-0"} z-40 bg-slate-900 text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.logisticsTitle}
            </div>
            <img
              src={garage.src}
              className="w-full h-full object-cover"
              alt="Logistics"
            />
          </div>

          <div className="building-title absolute inset-0 z-50 flex items-center justify-center opacity-0 translate-y-10 pointer-events-none">
            <h2 className="text-7xl md:text-[10vw] font-black text-white mix-blend-difference tracking-tighter uppercase leading-none text-center">
              {data.futureReadyLine1}
              <br />
              {data.futureReadyLine2}
            </h2>
          </div>
        </div>
      </section>

      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100">
          {data.services.map((item, idx) => {
            const Icon = icons[idx];
            return (
              <div
                key={idx}
                className={`p-12 space-y-6 border-slate-100 hover:bg-slate-50 transition-colors group ${isAr ? "border-l last:border-l-0" : "border-r last:border-r-0"}`}
              >
                <Icon
                  className="text-slate-300 group-hover:text-[#0c479a] transition-colors"
                  size={32}
                  strokeWidth={1.5}
                />
                <div className="space-y-3">
                  <h3 className="text-xl font-black uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-sm font-medium leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
