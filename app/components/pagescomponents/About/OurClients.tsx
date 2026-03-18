"use client";

import * as React from "react";
import Autoplay from "embla-carousel-autoplay";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Locale, TranslatedClients } from "@/types";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

interface InitiativePartnersProps {
  locale: Locale;
  clients: TranslatedClients[];
}

export default function InitiativePartners({ locale, clients }: InitiativePartnersProps) {
  const primaryColor = "#0c479a";
  const autoplay = React.useRef(
    Autoplay({ delay: 3000, stopOnInteraction: true })
  );
  const isAr= locale==="ar"

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
    <section className="bg-white py-24 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* REEAC Styled Header */}
       <div className={`mb-16 flex flex-col gap-2`}>

  <h2 className="text-3xl md:text-4xl text-center font-black text-slate-900 uppercase tracking-tighter">
    {isAr ? "عملاؤنا" : "Our Clients"}
  </h2>
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
                <div className="group/item flex flex-col items-center">
                  {/* Sharp Technical Frame */}
                  <div className="relative w-full aspect-square bg-white border border-slate-100 flex items-center justify-center transition-all duration-500 group-hover/item:border-slate-300 group-hover/item:shadow-xl group-hover/item:-translate-y-1">
                    <img
                      src={partner.logo}
                      alt={partner.name}
                      className="w-2/3 h-2/3 object-contain   group-hover/item:opacity-100 transition-all duration-700"
                    />
                    
                    {/* Corner Accent visible on hover */}
                    <div 
                      className="absolute bottom-0 right-0 w-4 h-4 border-r-2 border-b-2 opacity-0 group-hover/item:opacity-100 transition-all duration-500"
                      style={{ borderColor: primaryColor }}
                    />
                  </div>

                  {/* Name Label */}
                  <div className="mt-6 flex flex-col items-center gap-2">
                    <span className="text-center text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover/item:text-slate-900 transition-colors">
                      {partner.name}
                    </span>
                    <div className="h-[1px] w-4 bg-slate-200 group-hover/item:w-8 group-hover/item:bg-[#0c479a] transition-all duration-500" />
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          {/* Industrial Styled Arrows - only visible on hover */}
          <div className="hidden md:block opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <CarouselPrevious 
              className={`absolute -left-12 top-1/2 border-slate-200 rounded-none w-10 h-10 hover:bg-black hover:text-white transition-all`} 
            />
            <CarouselNext 
              className={`absolute -right-12 top-1/2 border-slate-200 rounded-none w-10 h-10 hover:bg-black hover:text-white transition-all`} 
            />
          </div>
        </Carousel>

        {/* Technical Progress Bar Decoration */}
        <div className="mt-16 flex items-center gap-4 opacity-20">
           <div className="h-px flex-1 bg-slate-400" />
           <div className="text-[8px] font-black tracking-[0.4em] text-slate-500 uppercase">
             {isAr ? "سجل الشركاء المعتمد" : "Verified Partners Log"}
           </div>
           <div className="h-px flex-1 bg-slate-400" />
        </div>
      </div>
    </section>
  );
}