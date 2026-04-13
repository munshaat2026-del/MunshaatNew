
import { useLocale } from "next-intl";
import { parkingdata } from "@/app/data/parkingdata";
import { Locale } from "@/types";

interface ParkingHeroProps {
  primaryColor: string;
  locale:Locale
}

export default function ParkingHero({ primaryColor ,locale}: ParkingHeroProps) {
  const data = parkingdata[locale].parkingHero;

  return (
    <header className="relative h-[85vh] flex items-center justify-start text-center px-6 overflow-hidden bg-[#0a0f1a]">
      {/* Background Image with Technical Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1506521781263-d8422e82f27a?q=80&w=2070"
          className="w-full h-full object-cover opacity-30 grayscale contrast-125 scale-105"
          alt="Parking Facility"
        />
        {/* Scanline Effect */}
        <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_49%,#ffffff05_50%,transparent_51%)] bg-[size:100%_4px] pointer-events-none"></div>
        {/* Vignette Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1a] via-transparent to-[#0a0f1a]/80"></div>
      </div>

   
   

      <div className="relative z-10 max-w-5xl space-y-4">
        {/* Sharp Badge */}
       
        {/* Hero Title */}
        <h1 className="text-6xl md:text-[8vw] font-black text-white  uppercase tracking-tighter">
          {data.titleLine1} <br />
          <span className="text-[#0c479a]" >
            {data.titleLine2}
          </span>
        </h1>

        <div className="max-w-2xl mx-auto space-y-0">
          <p className="text-slate-400 text-xs md:text-sm font-bold  tracking-[0.25em] leading-relaxed  ">
            {data.desc}
          </p>
          
       
        </div>
      </div>

      {/* Architectural Axis Lines */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-[#0c479a] to-transparent"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-t from-[#0c479a] to-transparent"></div>
    </header>
  );
}