
"use client"
import React from "react";
import { Loader2 } from "lucide-react";

export default function Loading() {
  const primaryColor = "#0c479a";

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 overflow-hidden relative">
      {/* Dynamic Background Colors (نفس نمط صفحة 404) */}
      <div className="absolute inset-0 z-0">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] rounded-full bg-[#0c479a]/5 blur-[120px]" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] rounded-full bg-[#0c479a]/10 blur-[150px]" />
      </div>

      <div className="max-w-4xl w-full text-center relative z-10">
        
        {/* Static Background Text - كلمة LOADING خلفية شفافة */}
        <h1 
          className="text-[18vw] font-black leading-none tracking-tighter select-none pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap"
          style={{ 
            color: primaryColor,
            opacity: 0.04
          }}
        >
          LOADING
        </h1>

        <div className="flex flex-col items-center space-y-8">
          {/* Animated Spinner Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full border-4 border-slate-200 border-t-[#0c479a] animate-spin" />
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="w-2 h-2 bg-[#0c479a] rounded-full animate-ping" />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-5xl md:text-7xl font-black text-slate-900 uppercase tracking-tighter leading-none">
              Please <span style={{ color: primaryColor }}>Wait.</span>
            </h2>
            
            {/* Loading Progress Text */}
            <div className="flex flex-col items-center gap-2">
              <p className="text-slate-400 text-[10px] md:text-xs font-black uppercase tracking-[0.4em] animate-pulse">
                Synchronizing Asset Data...
              </p>
              
              {/* Minimal Progress Bar */}
              <div className="w-48 h-[2px] bg-slate-200 mt-2 overflow-hidden relative">
                <div 
                  className="absolute inset-0 bg-[#0c479a] transition-all duration-500 animate-shimmer"
                  style={{
                    width: '30%',
                    animation: 'loading-bar 2s infinite ease-in-out'
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Subtle UI Detail - نفس تفاصيل صفحة 404 */}
      <div className="absolute bottom-10 left-10 border-l border-slate-200 pl-4 hidden md:block">
        <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">
          System Protocol: 0x77_INIT_SESSION
        </p>
      </div>

      {/* CSS For Custom Animation */}
      <style jsx>{`
        @keyframes loading-bar {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(250%); }
        }
      `}</style>
    </div>
  );
}