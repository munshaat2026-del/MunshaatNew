"use client";

import React from 'react';
import { Activity, Target } from "lucide-react";
import { useLocale } from "next-intl";
import { parkingdata } from "@/app/data/parkingdata";

interface ParkingLocationsProps {
  primaryColor: string;
}

export default function ParkingLocations({ primaryColor }: ParkingLocationsProps) {
  const locale = useLocale() as "en" | "ar";
  const data = parkingdata[locale].parkingLocations;
  const isAr = locale === "ar";

  return (
    <section className={`py-40 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch border-t border-slate-100 ${isAr ? 'direction-rtl' : ''}`}>
      
      {/* Left/Right Side: Technical Directory */}
      <div className={`space-y-12 flex flex-col justify-center ${isAr ? 'order-1 lg:order-2 text-right' : 'order-1 text-left'}`}>
        <div className="space-y-4">
          <div className={`flex items-center gap-3 ${isAr ? 'flex-row-reverse' : ''}`}>
             <div className="w-10 h-[1px]" style={{ backgroundColor: primaryColor }}></div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">{data.tag}</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            {data.titleLine1} <br />
            <span className="text-[#0c479a]">{data.titleLine2}</span>
          </h2>
        </div>

        <div className="space-y-0 border-t border-slate-100">
          {data.locations.map((loc, i) => (
            <div
              key={i}
              className={`group flex items-center justify-between p-8 border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden ${isAr ? 'flex-row-reverse' : ''}`}
            >
              <div className={`flex items-center gap-6 relative z-10 ${isAr ? 'flex-row-reverse' : ''}`}>
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#0c479a] transition-colors">{loc.code}</span>
                <span className="font-black text-sm uppercase tracking-widest text-slate-800">{loc.name}</span>
              </div>
              <div className={`flex items-center gap-4 relative z-10 ${isAr ? 'flex-row-reverse' : ''}`}>
                 <div className={`flex flex-col ${isAr ? 'items-start text-left' : 'items-end text-right'}`}>
                    <span className="text-[8px] font-black uppercase text-slate-300">{data.loadFactor}</span>
                    <span className={`text-[10px] font-black uppercase ${loc.status === 'High' || loc.status === 'مرتفع' ? 'text-orange-500' : 'text-green-500'}`}>{loc.status}</span>
                 </div>
                 <Target size={16} className="text-slate-200 group-hover:text-[#0c479a] transition-colors" />
              </div>
              {/* Hover Accent - Line appears from the logical start */}
              <div className={`absolute ${isAr ? 'right-0' : 'left-0'} top-0 w-1 h-full bg-[#0c479a] ${isAr ? 'translate-x-full' : '-translate-x-full'} group-hover:translate-x-0 transition-transform duration-500`}></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right/Left Side: Visual Data Block */}
      <div className={`relative group min-h-[500px] border border-slate-200 p-4 ${isAr ? 'order-2 lg:order-1' : 'order-2'}`}>
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7b/Jordan_Gate_23-5-2009_%281%29.JPG/500px-Jordan_Gate_23-5-2009_%281%29.JPG"
            className="w-full h-full object-cover  group-hover:scale-105 transition-transform duration-1000"
            alt="Facility Map"
          />
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>

        {/* Floating Telemetry Card */}
        <div className={`absolute top-10 ${isAr ? 'right-10' : 'left-10'} bg-white p-6 border border-slate-100 shadow-2xl z-10 space-y-4 text-start`}>
           <div className={`flex items-center gap-2 ${isAr ? 'flex-row-reverse' : ''}`}>
              <Activity size={14} className="text-[#0c479a] animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">{data.telemetryTag}</p>
           </div>
           <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 leading-none tracking-tighter ">84.2%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">{data.occupancyLabel}</p>
           </div>
           <div className="w-full bg-slate-100 h-[2px]">
              <div className="bg-[#0c479a] h-full" style={{ width: '84%' }}></div>
           </div>
        </div>

        {/* Dynamic Coordinate Tag */}
        <div className={`absolute bottom-10 ${isAr ? 'left-10 border-r-4' : 'right-10 border-l-4'} bg-slate-900 text-white p-4 z-10 hidden md:block border-[#0c479a]`}>
           <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-60">{data.planRef}</p>
           <p className="text-[10px] font-black uppercase tracking-widest">{data.planCode}</p>
        </div>
      </div>
    </section>
  );
}