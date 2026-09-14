"use client";

import { Locale } from "@/types";
import { Volume2, VolumeX, LoaderCircle } from "lucide-react";
import { homedata } from "@/app/data/homedata";
import React, { useEffect, useRef, useState } from "react";

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
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    setVideoLoaded(false);
    setVideoError(false);
    setSoundOn(false);
  }, [videoUrl]);

  const markVideoAsLoaded = () => {
    setVideoLoaded(true);
    setVideoError(false);
  };

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
    } catch (err) {
      console.error("Unable to unmute/play video:", err);

      video.muted = true;
      setSoundOn(false);
    }
  };

  const showVideo = Boolean(videoUrl) && !videoError;

  return (
    <section className="relative flex h-[80vh] w-full items-center justify-center overflow-hidden bg-slate-900 md:h-screen">
      {showVideo && (
        <video
          key={videoUrl}
          ref={videoRef}
          src={videoUrl!}
          poster={posterUrl}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          disablePictureInPicture
          disableRemotePlayback
          onLoadedData={markVideoAsLoaded}
          onCanPlay={markVideoAsLoaded}
          onPlaying={markVideoAsLoaded}
          onError={(e) => {
            console.error("Hero video failed to load:", videoUrl, e);
            setVideoError(true);
          }}
          className={`absolute inset-0 z-0 h-full w-full object-cover transition-opacity duration-700 ${
            videoLoaded ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {(!videoLoaded || !videoUrl || videoError) && (
        <div
          dir="ltr"
          className="absolute inset-0 z-[5] flex items-center justify-center bg-slate-900"
        >
          {posterUrl && (
            <img
              src={posterUrl}
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
            />
          )}

          {showVideo && !videoLoaded && (
            <div
              dir="ltr"
              className="relative z-10 h-9 w-9"
            >
              <LoaderCircle
                size={36}
                className="video-loader-spin h-9 w-9 text-white/80"
              />
            </div>
          )}
        </div>
      )}

      <div className="absolute inset-0 z-10 bg-linear-to-b from-black/30 via-black/50 to-black/80" />

      {showVideo && (
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
