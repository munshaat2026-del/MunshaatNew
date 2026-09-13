"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Locale, TranslatedClients } from "@/types";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Link from "next/link";

interface InitiativePartnersProps {
  locale: Locale;
  clients: TranslatedClients[];
}

export default function InitiativePartners({
  locale,
  clients,
}: InitiativePartnersProps) {
  const primaryColor = "#0c479a";
  const autoplay = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true }),
  );
  const isAr = locale === "ar";
  const carouselRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!carouselRef.current) return;
    const items = carouselRef.current.querySelectorAll(".partner-item");

    gsap.set(items, { opacity: 0, y: 20 });

    gsap.to(items, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      stagger: 0.1,
    });
  }, [clients]);

  return (
    <section
      dir={isAr ? "rtl" : "ltr"}
      className="bg-white py-20 md:py-24 border-t border-slate-100 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6">
        {/* --- Standardized Header Section --- */}
        <div className="mb-16 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span
                className="h-0.5 w-10"
                style={{ backgroundColor: primaryColor }}
              />
              <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400">
                {isAr ? "الشبكة والتعاون" : "Network & Alliances"}
              </span>
            </div>
            <h2 className="text-3xl font-black uppercase leading-[0.9] tracking-tight text-slate-950 md:text-5xl lg:text-6xl">
              {isAr ? "أبرز" : "Our Key"}
              <br />
              <span style={{ color: primaryColor }}>
                {isAr ? "شركاؤنا" : "Partners"}
              </span>
            </h2>
          </div>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
            direction: isAr ? "rtl" : "ltr",
          }}
          plugins={[autoplay.current]}
          className="w-full relative group"
        >
          <CarouselContent ref={carouselRef} className="-ml-4 md:-ml-8">
            {clients.map((partner, index) => (
              <CarouselItem
                key={index}
                className="partner-item pl-4 md:pl-8 basis-1/2 sm:basis-1/3 lg:basis-1/3"
              >
                <Link
                  href={partner.websiteUrl || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/item flex flex-col items-center cursor-pointer"
                >
                  <div className="relative w-full aspect-square bg-white border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover/item:border-slate-300 group-hover/item:shadow-xl group-hover/item:-translate-y-1">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-2/3 h-2/3 object-contain group-hover/item:opacity-100 transition-all duration-700"
                    />

                    <div
                      className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover/item:opacity-100 transition-all duration-500"
                      style={{ borderColor: primaryColor }}
                    />
                  </div>

                  <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-slate-900 transition-colors">
                      {partner.name}
                    </span>
                    <div
                      className="h-px w-4 transition-all duration-500 group-hover/item:w-8"
                      style={{ backgroundColor: undefined }}
                    />
                    <div
                      className="h-px w-4 group-hover/item:w-8 transition-all duration-500"
                      style={{
                        // Dynamically change line color on hover using primaryColor
                        backgroundColor: "var(--line-color, #e2e8f0)",
                      }}
                      ref={(el) => {
                        if (el) {
                          el.onmouseenter = () =>
                            (el.style.backgroundColor = primaryColor);
                          el.onmouseleave = () =>
                            (el.style.backgroundColor = "");
                        }
                      }}
                    />
                  </div>
                </Link>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="mt-16 flex items-center gap-4 opacity-20">
          <div className="h-px flex-1 bg-slate-400" />
          <div className="text-[8px] font-black text-slate-500 uppercase tracking-widest">
            {isAr ? "سجل الشركاء المعتمد" : "Verified Partners Log"}
          </div>
          <div className="h-px flex-1 bg-slate-400" />
        </div>
      </div>
    </section>
  );
}
