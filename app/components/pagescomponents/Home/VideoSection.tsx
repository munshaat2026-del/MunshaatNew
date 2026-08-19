import { Locale } from "@/types";
import { MoveUpRight } from "lucide-react";
import Link from "next/link";
import { homedata } from "@/app/data/homedata";
import React from "react";

interface VideoSectionProps {
  videoUrl?: string | null;
  locale: Locale;
}

export default function VideoSection({ videoUrl, locale }: VideoSectionProps) {
  const data = homedata[locale];
  console.log("videoUrl: ", videoUrl);

  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      {videoUrl ? (
        <video
          key={videoUrl}
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          className="absolute top-0 left-0 w-full h-full object-cover z-0"
        />
      ) : (
        <div className="absolute top-0 left-0 w-full h-full bg-slate-900 z-0" />
      )}

      {/* Cinematic Gradient Overlay - Better contrast for text */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

      {/* Hero Content */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mt-12 md:mt-0">
        {/* Premium Typography */}
        <h1 className="hero-fade mb-10 flex flex-col items-center">
          <span className="text-[16vw] md:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-xl">
            {data.prime}
          </span>
          {/* Custom drop shadow added here to ensure the dark blue pops against the dark overlay */}
          <span className="text-[16vw] md:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-tighter uppercase text-[#0c479a] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {data.assets}
          </span>
        </h1>

        {/* Sleek Native Button */}
        <Link href={"/about"} className="inline-block">
          <button className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-full bg-[#0c479a] border-2 border-[#0c479a] px-8 md:px-10 py-4 text-[16px] md:text-[18px] font-bold uppercase tracking-widest text-white transition-all duration-300 ease-out hover:bg-white hover:text-[#0c479a] hover:border-white hover:shadow-[0_0_40px_rgba(12,71,154,0.5)]">
            <span>{data.aboutUs}</span>
            <MoveUpRight
              size={22}
              strokeWidth={2.5}
              className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1"
            />
          </button>
        </Link>
      </div>
    </section>
  );
}
