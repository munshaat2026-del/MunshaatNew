"use client";

import { Locale } from "@/types";
import { MoveUpRight, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import { homedata } from "@/app/data/homedata";
import React, { useRef, useState } from "react";

interface VideoSectionProps {
  videoUrl?: string | null;
  locale: Locale;
}

export default function VideoSection({ videoUrl, locale }: VideoSectionProps) {
  const data = homedata[locale];
  const videoRef = useRef<HTMLVideoElement>(null);
  const [soundOn, setSoundOn] = useState(false);

  const toggleSound = async () => {
    const video = videoRef.current;
    if (!video) return;

    try {
      if (video.muted) {
        video.muted = false;
        await video.play();
        setSoundOn(true);
      } else {
        video.muted = true;
        setSoundOn(false);
      }
    } catch {
      video.muted = true;
      setSoundOn(false);
    }
  };

  return (
    <section className="relative w-full h-[80vh] md:h-screen flex items-center justify-center overflow-hidden">
      {videoUrl ? (
        <video
          ref={videoRef}
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

      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/80 z-10" />

      <button
        onClick={toggleSound}
        aria-label={soundOn ? "Mute video" : "Unmute video"}
        className="absolute top-6 right-6 md:top-8 md:right-8 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0c479a]"
      >
        {soundOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
      </button>

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 max-w-5xl mt-12 md:mt-0">
        <h1 className="hero-fade mb-10 flex flex-col items-center">
          <span className="text-[16vw] md:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-tighter uppercase text-white drop-shadow-xl">
            {data.prime}
          </span>
          <span className="text-[16vw] md:text-[10vw] lg:text-[8.5vw] font-black leading-[0.85] tracking-tighter uppercase text-[#0c479a] drop-shadow-[0_4px_30px_rgba(0,0,0,0.8)]">
            {data.assets}
          </span>
        </h1>


      </div>
    </section>
  );
}
