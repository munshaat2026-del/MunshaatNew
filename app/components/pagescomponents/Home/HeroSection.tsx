"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Warehouse, Building2, Car } from "lucide-react";
import { useLocale } from "next-intl";
import { homedata } from "@/app/data/homedata";
import alburg from "@/public/alburg.jpg";
import header from "@/public/header.jpeg";
import garage from "@/public/garage.jpeg";
import VideoSection from "./VideoSection";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function ArabianPremiumEmpire({
  videoUrl,
}: {
  videoUrl?: string | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const bannerImgRef = useRef<HTMLImageElement>(null);
  const locale = useLocale() as "en" | "ar";
  const isAr = locale === "ar";
  const data = homedata[locale];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const bannerTl = gsap.timeline({
        repeat: -1,
        yoyo: true,
        defaults: {
          duration: 4,
          ease: "sine.inOut",
        },
      });

      bannerTl
        .to(bannerImgRef.current, {
          scale: 1.1,
          x: -20,
          y: -10,
        })
        .to(bannerImgRef.current, {
          scale: 1.15,
          x: 20,
          y: 10,
        })
        .to(bannerImgRef.current, {
          scale: 1.2,
          x: 0,
          y: -20,
        })
        .to(bannerImgRef.current, {
          scale: 1.1,
          x: 0,
          y: 0,
        });

      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out",
      });

      const assemblyTl = gsap.timeline({
        paused: true,
        defaults: {
          ease: "power3.out",
        },
      });

      assemblyTl
        .from(".part-left", {
          xPercent: isAr ? 100 : -100,
          opacity: 0,
          duration: 1.5,
        })
        .from(
          ".part-right",
          {
            xPercent: isAr ? -100 : 100,
            opacity: 0,
            duration: 1.5,
          },
          "-=1.2",
        )
        .from(
          ".part-top",
          {
            yPercent: -100,
            opacity: 0,
            duration: 1.2,
          },
          "-=1",
        )
        .to(
          ".building-title",
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "expo.out",
          },
          "-=0.5",
        );

      ScrollTrigger.create({
        trigger: ".assembly-section",
        start: "top 75%",
        once: true,
        onEnter: () => assemblyTl.play(),
      });
    }, containerRef);

    return () => ctx.revert();
  }, [isAr]);

  const icons = [Car, Warehouse, Building2];

  return (
    <div
      ref={containerRef}
      className="relative z-0 bg-white text-slate-900 overflow-x-hidden font-sans"
    >
      <div className="relative z-0">
        <VideoSection videoUrl={videoUrl} locale={locale} />
      </div>

      <section className="assembly-section relative z-0 min-h-screen bg-white flex items-center justify-center overflow-hidden border-y border-slate-100">
        <div className="relative z-0 w-full mt-20 max-w-6xl h-[85vh]">
          <div className="part-top absolute top-0 left-0 w-full h-[45%] z-20 overflow-hidden border-b-4 border-white shadow-2xl">
            <div
              className={`absolute top-0 ${
                isAr ? "right-0" : "left-0"
              } z-30 bg-black text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.warehouseTitle}
            </div>

            <Image
              ref={bannerImgRef}
              src={header.src}
              className="w-full h-full object-cover"
              alt="Warehouse"
              fill
            />
          </div>

          <div
            className={`part-left absolute bottom-0 ${
              isAr ? "right-0" : "left-0"
            } w-[49.8%] h-[54%] z-10 overflow-hidden border-white shadow-2xl ${
              isAr ? "border-l-4" : "border-r-4"
            }`}
          >
            <div
              className={`absolute bottom-0 ${
                isAr ? "right-0" : "left-0"
              } z-20 bg-[#0c479a] text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.officeTitle}
            </div>

            <Image
              src={alburg.src}
              className="w-full h-full object-cover"
              alt="Offices"
              fill
            />
          </div>

          <div
            className={`part-right absolute bottom-0 ${
              isAr ? "left-0" : "right-0"
            } w-[49.8%] h-[54%] z-0 overflow-hidden shadow-2xl`}
          >
            <div
              className={`absolute bottom-0 ${
                isAr ? "left-0" : "right-0"
              } z-10 bg-slate-900 text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest`}
            >
              {data.logisticsTitle}
            </div>

            <Image
              src={garage.src}
              className="w-full h-full object-cover"
              alt="Logistics"
              fill
            />
          </div>

          <div className="building-title absolute inset-0 z-30 flex items-center justify-center opacity-0 translate-y-10 pointer-events-none">
            <h2 className="text-7xl md:text-[10vw] font-black text-white mix-blend-difference tracking-tighter uppercase leading-none text-center">
              {data.futureReadyLine1}
              <br />
              {data.futureReadyLine2}
            </h2>
          </div>
        </div>
      </section>

     <section className="relative z-0 py-32 px-6 md:px-20 max-w-7xl mx-auto">
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    {data.services.map((item, idx) => {
      const Icon = icons[idx];

      return (
        <div
          key={idx}
          className="group relative min-h-[400px] overflow-hidden rounded-none bg-slate-900 p-10 md:p-12 transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_30px_70px_rgba(15,23,42,0.25)]"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-slate-800/40 via-transparent to-[#0c479a]/20" />

          <div className="absolute top-8 left-8 flex h-14 w-14 items-center justify-center border border-white/10 bg-white/5">
            <span className="text-sm font-black text-white/50">
              0{idx + 1}
            </span>
          </div>

          <div
            className={`absolute ${
              isAr ? "left-8" : "right-8"
            } top-8 transition-all duration-700 group-hover:scale-110 group-hover:-rotate-6`}
          >
            <Icon
              size={125}
              strokeWidth={1}
              className="text-[#0c479a]/40 group-hover:text-[#0c479a]/70 transition-colors duration-500"
            />
          </div>

          <div className="relative z-10 flex h-full flex-col justify-end">
            <div className="mb-5 h-1 w-12 bg-[#0c479a] transition-all duration-500 group-hover:w-24" />

            <h3 className="mb-4 text-2xl md:text-3xl font-black uppercase tracking-tight text-white">
              {item.title}
            </h3>

            <p className="max-w-md text-sm font-medium leading-7 text-slate-400">
              {item.desc}
            </p>

            <div className="mt-8 h-px w-8 bg-white/20 transition-all duration-500 group-hover:w-14 group-hover:bg-[#0c479a]" />
          </div>
        </div>
      );
    })}
  </div>
</section>

    </div>
  );
}
