"use client"

import React, { useState } from 'react';
import { 
  Maximize2, MapPin, Tag, Building2, CheckCircle2, 
  ArrowRight, Construction, Box, Phone, Ruler, Zap, Wind
} from 'lucide-react';

const EmptyRetailUnit = () => {
  const [activeImg, setActiveImg] = useState(0);
  const primaryColor = "#0c479a";

  const images = [
    "https://images.unsplash.com/photo-1513530534585-c7b1394c6d51?auto=format&fit=crop&w=1200&q=80", 
    "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80",  
    "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",  
  ];

  const specs = [
    { label: "Net Area", value: "215 SQM", icon: <Ruler size={18} /> },
    { label: "Level", value: "Ground 00", icon: <Building2 size={18} /> },
    { label: "Rate", value: "$45/SQM", icon: <Tag size={18} /> },
    { label: "Type", value: "Corner Shell", icon: <MapPin size={18} /> },
  ];

  return (
    <div className="min-h-screen bg-white text-slate-900 mt-20 font-sans px-4 py-16 border-t border-slate-100" dir="ltr">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Header - Technical ID Style */}
        <div className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-8 border-b border-slate-100 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-[#0c479a]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Inventory ID: G-104</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              RETAIL <span className="text-transparent" style={{ WebkitTextStroke: '1px #0c479a' }}>SHELL & CORE</span>
            </h1>
          </div>
          <div className="bg-slate-900 text-white p-6 md:p-10 shrink-0">
             <p className="text-[10px] font-black uppercase tracking-[0.3em] opacity-60 mb-2">Availability Status</p>
             <p className="text-xl font-black uppercase tracking-widest ">Immediate Lease</p>
          </div>
        </div>

        {/* 2. Gallery - Architectural Grid */}
        <div className="grid grid-cols-12 gap-0 border border-slate-100 mb-20 shadow-2xl">
          <div className="col-span-12 md:col-span-9 border-r border-slate-100 relative group">
            <img src={images[activeImg]} className="w-full h-[600px] object-cover grayscale group-hover:grayscale-0 transition-all duration-700" alt="Main View" />
            <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-md px-4 py-2 text-[9px] font-black uppercase tracking-widest border border-slate-100">
               Exterior Perspective 0{activeImg + 1}
            </div>
          </div>
          <div className="col-span-12 md:col-span-3 flex md:flex-col">
            {images.map((img, i) => (
              <div 
                key={i} 
                onClick={() => setActiveImg(i)}
                className={`flex-1 h-32 relative cursor-pointer overflow-hidden border-b border-slate-100 last:border-0 transition-all ${activeImg === i ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`}
              >
                <img src={img} className="w-full h-full object-cover" alt="thumb" />
                {activeImg === i && <div className="absolute inset-0 border-l-4 border-[#0c479a]"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 3. Technical Specs & Infrastructure */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Specs Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-0 border border-slate-100">
              {specs.map((spec, i) => (
                <div key={i} className="p-8 border-r last:border-r-0 border-slate-100 hover:bg-slate-50 transition-colors">
                  <div className="text-[#0c479a] mb-6">{spec.icon}</div>
                  <p className="text-[9px] font-black text-slate-300 uppercase tracking-[0.2em] mb-1">{spec.label}</p>
                  <p className="font-black text-sm uppercase tracking-tight">{spec.value}</p>
                </div>
              ))}
            </div>

            {/* Details Section */}
            <section className="space-y-10">
              <div className="flex items-center gap-4">
                <h2 className="text-2xl font-black uppercase tracking-tighter">Unit Infrastructure</h2>
                <div className="flex-1 h-[1px] bg-slate-100"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6">
                {[
                  { t: "Ceiling Height", d: "4.5m Clear Height Floor-to-Slab" },
                  { t: "Power Supply", d: "3-Phase / 60kW Independent Capacity" },
                  { t: "HVAC Provision", d: "Dedicated DX & Fresh Air intake Points" },
                  { t: "Logistics Access", d: "Direct Loading Bay & Service Corridor" },
                  { t: "Gas Line", d: "Pre-installed for F&B Operations" },
                  { t: "Frontage", d: "15m Continuous Structural Glazing" }
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col gap-2 pb-6 border-b border-slate-50">
                    <div className="flex items-center gap-2">
                       <div className="w-1.5 h-1.5 bg-[#0c479a]"></div>
                       <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{item.t}</span>
                    </div>
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-tight pl-3">{item.d}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Logistics Block */}
            <section className="bg-slate-50 p-12 border-l-4 border-[#0c479a]">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div className="space-y-4">
                     <Zap size={20} className="text-[#0c479a]" />
                     <h4 className="text-xs font-black uppercase tracking-[0.2em]">Electrical Sub-Station</h4>
                     <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">Direct connection to the building's main distribution frame with smart sub-metering enabled.</p>
                  </div>
                  <div className="space-y-4">
                     <Wind size={20} className="text-[#0c479a]" />
                     <h4 className="text-xs font-black uppercase tracking-[0.2em]">Exhaust Protocol</h4>
                     <p className="text-[11px] font-bold text-slate-500 leading-relaxed uppercase">High-velocity kitchen extract system points provided for heavy F&B requirements.</p>
                  </div>
               </div>
            </section>
          </div>

          {/* 4. Lease Sidebar - Institutional Style */}
          <div className="lg:col-span-4">
            <div className="border border-slate-900 sticky top-28 bg-white overflow-hidden">
              <div className="p-10 space-y-10">
                <div className="space-y-2">
                  <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-400">Annual Operational Lease</p>
                  <h3 className="text-5xl font-black text-slate-900 tracking-tighter ">$9,675.00</h3>
                </div>
                
                <div className="space-y-6">
                  {[
                    { l: "Service Charges", v: "INC. IN LEASE" },
                    { l: "Fit-out Grace Period", v: "60 DAYS" },
                    { l: "Security Deposit", v: "$1,500.00" }
                  ].map((row, i) => (
                    <div key={i} className="flex justify-between items-center border-b border-slate-100 pb-3">
                      <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{row.l}</span>
                      <span className="text-[10px] font-black text-slate-900 uppercase">{row.v}</span>
                    </div>
                  ))}
                </div>

                <button 
                  className="w-full py-6 bg-[#0c479a] text-white text-[10px] font-black uppercase tracking-[0.4em] hover:bg-slate-900 transition-all flex items-center justify-center gap-4 group"
                >
                  Initiate Inquiry <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </button>
                
                <div className="pt-8 border-t border-slate-100 flex items-center gap-6">
                  <div className="w-12 h-12 border border-slate-100 flex items-center justify-center">
                    <Phone size={18} className="text-slate-300" />
                  </div>
                  <div>
                    <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Leasing Protocol Lead</p>
                    <p className="text-sm font-black text-slate-900 uppercase tracking-tight">+962 7X XXX XXXX</p>
                  </div>
                </div>
              </div>
              
              {/* Technical Footnote */}
              <div className="bg-slate-50 p-4 border-t border-slate-100">
                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-tighter text-center ">
                   All fit-out designs must be submitted for RM Engineering approval prior to commencement.
                 </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default EmptyRetailUnit;