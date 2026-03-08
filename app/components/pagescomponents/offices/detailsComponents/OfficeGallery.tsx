"use client";
import { useState } from "react";

interface GalleryProps {
  images: (string | null)[];
  locale: "en" | "ar";
}

export const OfficeGallery = ({ images, locale }: GalleryProps) => {
  const validImages = images.filter((img): img is string => img !== null);
  const [activeImage, setActiveImage] = useState(0);
  const isAr = locale === "ar";

  if (validImages.length === 0) return null;

  return (
    <div
      className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-20 bg-slate-100 p-2 border border-slate-200"
      dir="ltr"
    >
      <div className="md:col-span-9 relative group overflow-hidden bg-white">
        <img
          src={validImages[activeImage]}
          className="w-full h-150 object-cover transition-all duration-1000"
          alt="Office View"
        />

        <div
          className={`absolute bottom-6 ${
            isAr ? "right-6" : "left-6"
          } bg-white p-4 border border-slate-200 shadow-2xl`}
        >
          <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">
            {isAr
              ? `العرض الرئيسي 0${activeImage + 1}`
              : `Master View 0${activeImage + 1}`}
          </p>
        </div>
      </div>

      <div className="md:col-span-3 grid grid-cols-4 md:grid-cols-1 gap-2">
        {validImages.map((img, idx) => (
          <div
            key={idx}
            onClick={() => setActiveImage(idx)}
            className={`relative cursor-pointer overflow-hidden border-2 transition-all ${
              activeImage === idx ? "border-[#0c479a]" : "border-transparent"
            }`}
          >
            <img
              src={img}
              className="w-full h-full md:h-36.5 object-cover"
              alt="Thumbnail"
            />
          </div>
        ))}
      </div>
    </div>
  );
};