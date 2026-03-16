import React from "react";
import { MapPin, Navigation, Warehouse, ArrowLeft } from "lucide-react";
import { Locale } from "@/types";
import { notFound } from "next/navigation";
import { getParkingBySlugByLocale } from "@/app/server/parkings/services";
import Link from "next/link";
import Image from "next/image";

interface Props {
  params: Promise<{ slug: string; locale: Locale }>;
}

export default async function page({ params }: Props) {
  const { locale, slug } = await params;
  
  const response = await (await getParkingBySlugByLocale(slug, locale))();
  const complexdata = response?.data;

  if (!complexdata) return notFound();

  const isAr = locale === "ar";

  return (
    <div className={`min-h-screen bg-white text-black ${isAr ? 'font-sans underline-offset-4' : 'font-sans'}`}>
      
      {/* 1. Navigation Bar */}
      <nav className="border-b border-black px-6 py-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 font-black uppercase text-[11px] tracking-tighter">
          <ArrowLeft size={16} className={isAr ? "rotate-180" : ""} />
          {isAr ? "العودة للقائمة" : "Back to List"}
        </Link>
        <div className="font-mono text-[10px] border border-black px-2 py-1">
          ID: {slug.toUpperCase()}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-6 py-16">
        
        {/* 2. Title & Location Row */}
        <div className="border-l-4 border-[#0c479a] pl-6 mb-12">
          <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter mb-4">
            {complexdata.name}
          </h1>
          <div className="flex items-center gap-2 text-slate-500 font-bold uppercase text-xs tracking-widest">
            <MapPin size={14} />
            {complexdata.address}
          </div>
        </div>

        {/* 3. Main Asset Image */}
        <div className="relative w-full aspect-video md:aspect-21/9 bg-slate-100 mb-16 overflow-hidden border border-slate-200">
          {complexdata.image ? (
            <Image 
              fill
              src={complexdata.image} 
              alt={complexdata.name}
              className="object-cover"
              priority
            />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
              <Warehouse size={64} strokeWidth={1} />
              <span className="text-[10px] font-bold mt-4 uppercase">Asset Image Missing</span>
            </div>
          )}
        </div>

        {/* 4. Information Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 border-t border-slate-100 pt-12">
          
          {/* Detailed Description */}
          <div className="md:col-span-2">
            <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
              {isAr ? "الوصف التفصيلي" : "Asset Description"}
            </h3>
            <p className="text-xl text-slate-700 leading-relaxed font-medium">
              {complexdata.description}
            </p>
          </div>

          {/* Location & CTA */}
          <div className="space-y-8">
            <div className="bg-slate-50 p-8 border border-slate-100">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 mb-4">
                {isAr ? "الموقع" : "Coordinates"}
              </h3>
              <p className="text-sm font-bold mb-8">{complexdata.address}</p>
              
              <Link href={complexdata.location_link || "#"} target="_blank">
                <button className="w-full bg-black text-white py-4 px-6 font-black uppercase text-[11px] tracking-widest flex items-center justify-between hover:bg-[#0c479a] transition-colors">
                  {isAr ? "فتح الخرائط" : "Open Navigation"}
                  <Navigation size={16} />
                </button>
              </Link>
            </div>
          </div>

        </div>
      </main>

     
    </div>
  );
}