"use client";

import React from "react";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

export type Client = {
  id: string | undefined;
  name: string;
  logo: string;
};

interface OurClientsProps {
  locale: "en" | "ar";
  clients: Client[];
}

export default function OurClients({ locale, clients }: OurClientsProps) {
  const isAr = locale === "ar";
  const primaryColor = "#0c479a";

  return (
    <section className="py-6 px-6 bg-transparent border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        
        {/* Technical Header */}
        <div className={`mb-16 flex flex-col gap-2 ${isAr ? 'items-end text-right' : 'items-start text-left'}`}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-[2px]" style={{ backgroundColor: primaryColor }} />
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
              {isAr ? "شركاء النجاح" : "Success Partners"}
            </span>
          </div>
          <h3 className="text-3xl md:text-4xl font-black text-slate-900 uppercase tracking-tighter">
            {isAr ? "عملائنا" : "Our Clients"}
          </h3>
        </div>

        {/* Shadcn Carousel Implementation */}
        <div className="relative w-full" dir={isAr ? "rtl" : "ltr"}>
          
          {/* Gradient Edge Masks: These signal more content is "around the corner" */}
          
          <Carousel
            opts={{
              align: "start",
              loop: true,
              direction: isAr ? "rtl" : "ltr",
            }}
            plugins={[
              Autoplay({
                delay: 2000,
                stopOnMouseEnter: false,
              }),
            ]}
            className="w-full"
          >
            <CarouselContent className="-ml-8 md:-ml-12">
              {clients.map((client) => (
                <CarouselItem 
                  key={client.id} 
                  /* Responsive logic: 2 on mobile, 3 on tablet, 5 on desktop */
                  className="pl-8 md:pl-12 basis-1/2 sm:basis-1/3 lg:basis-1/2"
                >
                  <div className="group flex flex-col items-center justify-center transition-all duration-500 cursor-grab active:cursor-grabbing">
                    
                    {/* Logo Container: Transparent bg */}
                    <div className="relative w-full  flex items-center justify-center   group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110  duration-700 ">
                      <img 
                        src={client.logo} 
                        alt={client.name} 
                        className="max-w-full max-h-full object-contain p-2 "
                      />
                    </div>

                    {/* Name Under Image */}
                    <div className="mt-6 flex flex-col items-center gap-2">
                       <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 group-hover:text-slate-900 transition-colors">
                        {client.name}
                       </p>
                       {/* Animated underline indicator */}
                       <div 
                        className="h-[2px] w-0 group-hover:w-6 transition-all duration-500"
                        style={{ backgroundColor: primaryColor }}
                       />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Visual Scroll Indicator: The "Progress Bar" cue */}
          <div className="mt-16 flex justify-center items-center gap-2 opacity-30">
             <div className="w-12 h-[1px] bg-slate-400" />
             <div className="flex gap-1.5">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${i === 0 ? 'bg-slate-900 scale-125' : 'bg-slate-300'}`} />
                ))}
             </div>
             <div className="w-12 h-[1px] bg-slate-400" />
          </div>
        </div>

        {/* Roster Footer Info */}
        <div className={`mt-12 flex items-center gap-4 ${isAr ? 'flex-row-reverse' : ''}`}>
           <div className="h-px flex-1 bg-slate-100" />
           <p className="text-[8px] font-bold text-slate-300 uppercase tracking-[0.5em]">
             Trusted by Global Leaders
           </p>
           <div className="h-px flex-1 bg-slate-100" />
        </div>

      </div>
    </section>
  );
}