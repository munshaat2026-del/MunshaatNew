"use client";

import { Locale } from "@/types";
import { Volume2, VolumeX, LoaderCircle } from "lucide-react";
import { homedata } from "@/app/data/homedata";
import React, { useRef, useState } from "react";

interface VideoSectionProps {
  videoUrl?: string | null;
  posterUrl?: string;
  locale: Locale;
}

export default function VideoSection({
  videoUrl,
  posterUrl,
  locale,
}: VideoSectionProps) {
  const data = homedata[locale];
  const videoRef = useRef<HTMLVideoElement>(null);

  const [soundOn, setSoundOn] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);

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
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-slate-900 md:h-screen">
      {videoUrl && (
        <>
          <video
            ref={videoRef}
            src={videoUrl}
            poster={posterUrl}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            onCanPlay={() => setVideoLoaded(true)}
            className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
              videoLoaded ? "opacity-100" : "opacity-0"
            }`}
          />

          {!videoLoaded && (
            <div className="absolute inset-0 z-10 flex items-center justify-center">
              {posterUrl && (
                <img
                  src={posterUrl}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover"
                />
              )}

              <div className="relative z-10 flex flex-col items-center gap-3 text-white">
                <LoaderCircle
                  size={36}
                  strokeWidth={2}
                  className="animate-spin"
                />

                <span className="text-sm font-medium tracking-wide">
                  Loading...
                </span>
              </div>
            </div>
          )}
        </>
      )}

      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/30 via-black/50 to-black/80" />

      {videoUrl && (
        <button
          onClick={toggleSound}
          aria-label={soundOn ? "Mute video" : "Unmute video"}
          className={`absolute right-6 top-6 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/30 bg-black/30 text-white backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-[#0c479a] md:right-8 md:top-8 ${
            locale === "ar" ? "rotate-180" : ""
          }`}
        >
          {soundOn ? <Volume2 size={22} /> : <VolumeX size={22} />}
        </button>
      )}
    </section>
  );
}