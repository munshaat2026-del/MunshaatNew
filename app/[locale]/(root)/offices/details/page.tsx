"use client"

import React, { useState } from 'react';
import { 
  CheckCircle, Wifi, Coffee, Shield, Monitor, 
  Maximize, Users, MapPin, Calendar, ArrowRight,
  Info, Activity
} from 'lucide-react';

const OfficeBookingPage = () => {
  const [activeImage, setActiveImage] = useState(0);
  const primaryColor = "#0c479a";

  const images = [
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
    "https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80"
  ];

  const features = [
    { icon: <Wifi size={18} />, label: "Fiber-Optic" },
    { icon: <Shield size={18} />, label: "24/7 Security" },
    { icon: <Coffee size={18} />, label: "Coffee Lounge" },
    { icon: <Monitor size={18} />, label: "Smart Tools" },
    { icon: <Maximize size={18} />, label: "45 sqm Area" },
    { icon: <Users size={18} />, label: "6 Persons" },
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans text-slate-900" dir="ltr">
      <div className="max-w-7xl mx-auto">
        
        {/* 1. Technical Header */}
        <header className="mb-16 border-b border-slate-900 pb-10 flex flex-col md:flex-row justify-between items-end gap-6">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-[#0c479a]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Asset Specification // Unit 1204</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
              Premium <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>Executive Suite.</span>
            </h1>
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={14} style={{ color: primaryColor }} /> 
              Skyline Business Tower // Financial District, Level 12
            </p>
          </div>
          <div className="text-right hidden md:block">
             <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Global Availability</p>
             <p className="text-xl font-black text-green-600 uppercase italic">Operational</p>
          </div>
        </header>

        {/* 2. Image Gallery - Industrial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-2 mb-20 bg-slate-100 p-2 border border-slate-200">
          <div className="md:col-span-9 relative group overflow-hidden bg-white">
            <img 
              src={images[activeImage]} 
              className="w-full h-[600px] object-cover  transition-all duration-1000" 
              alt="Main Office View" 
            />
            <div className="absolute bottom-6 left-6 bg-white p-4 border border-slate-200 shadow-2xl">
               <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Master View 0{activeImage + 1}</p>
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-4 md:grid-cols-1 gap-2">
            {images.map((img, idx) => (
              <div 
                key={idx}
                onClick={() => setActiveImage(idx)}
                className={`relative cursor-pointer overflow-hidden border-2 transition-all ${activeImage === idx ? 'border-[#0c479a]' : 'border-transparent'}`}
              >
                <img src={img} className="w-full h-full md:h-[146px] object-cover " alt={`Thumbnail ${idx}`} />
                {activeImage === idx && <div className="absolute inset-0 bg-[#0c479a]/10"></div>}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* 3. Main Details Area */}
          <div className="lg:col-span-8 space-y-20">
            
            {/* Description Block */}
            <section className="space-y-6">
              <div className="flex items-center gap-4 text-[#0c479a]">
                <Info size={18} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Unit Description</h2>
              </div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-[0.15em] leading-[2.2] max-w-3xl border-l-2 border-slate-100 pl-8">
                Designed for high-performance leadership. This executive suite integrates state-of-the-art ergonomic architecture with breathtaking panoramic city views. Features include soundproof glass partitions, reception connectivity, and direct access to shared executive boardrooms.
              </p>
            </section>

            {/* Key Amenities - Grid */}
            <section className="space-y-10">
              <div className="flex items-center gap-4 text-[#0c479a]">
                <Activity size={18} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Infrastructure Amenities</h2>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-0 border-t border-l border-slate-100">
                {features.map((f, i) => (
                  <div key={i} className="flex flex-col gap-4 p-8 border-r border-b border-slate-100 hover:bg-slate-50 transition-colors">
                    <div className="text-[#0c479a]">{f.icon}</div>
                    <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">{f.label}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Technical Specifications Table */}
            <section className="space-y-10">
              <div className="flex items-center gap-4 text-[#0c479a]">
                <CheckCircle size={18} />
                <h2 className="text-[10px] font-black uppercase tracking-[0.4em]">Technical Inventory</h2>
              </div>
              <div className="border border-slate-900 overflow-hidden bg-white">
                <table className="w-full text-left border-collapse">
                  <tbody>
                    {[
                      ["Power Supply", "Dual Circuit / UPS Backup"],
                      ["Climate Control", "Smart HVAC Individual Control"],
                      ["Internet Speed", "1 Gbps Symmetrical Link"],
                      ["Flooring", "Acoustic Commercial Grade"]
                    ].map(([label, val], idx) => (
                      <tr key={idx} className="border-b border-slate-100 last:border-0 hover:bg-slate-50 transition-colors">
                        <td className="px-8 py-6 text-[9px] font-black text-slate-400 uppercase tracking-widest w-1/3 bg-slate-50/50">{label}</td>
                        <td className="px-8 py-6 text-[10px] font-black text-slate-900 uppercase tracking-widest italic">{val}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </div>

          {/* 4. Booking Sidebar - The "Terminal" */}
          <div className="lg:col-span-4">
            <div className="bg-[#0a0f1a] p-10 border-l-4 border-[#0c479a] sticky top-32 space-y-10 shadow-2xl relative overflow-hidden">
              {/* Background Grid */}
              <div className="absolute inset-0 opacity-5 bg-[linear-gradient(#fff_1px,transparent_1px),linear-gradient(90deg,#fff_1px,transparent_1px)] bg-[size:20px_20px]"></div>

              <div className="relative z-10 space-y-2">
                <p className="text-[8px] font-black text-slate-500 uppercase tracking-widest">Financial Summary</p>
                <div className="flex items-baseline gap-2 text-white italic">
                  <span className="text-4xl font-black tracking-tighter">$1,250</span>
                  <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">/ MONTHLY</span>
                </div>
              </div>

              <div className="relative z-10 space-y-6">
                <div>
                  <label className="block text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] mb-3">Protocol Duration</label>
                  <select className="w-full p-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#0c479a] transition-colors appearance-none cursor-pointer">
                    <option className="bg-slate-900">06 Months [STANDARD]</option>
                    <option className="bg-slate-900">12 Months [DISCOUNT 10%]</option>
                    <option className="bg-slate-900">24 Months [FREE MONTH]</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[8px] font-black uppercase text-slate-500 tracking-[0.3em] mb-3">Commencement Date</label>
                  <input type="date" className="w-full p-4 bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-widest outline-none focus:border-[#0c479a] transition-colors appearance-none" />
                </div>

                <div className="pt-8 border-t border-white/10 space-y-4">
                  <div className="flex justify-between">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Operational Fee</span>
                    <span className="text-[9px] font-black text-white">$0.00</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">Initial Investment</span>
                    <span className="text-xl font-black text-[#0c479a] italic">$1,250.00</span>
                  </div>
                </div>

                <button className="w-full bg-[#0c479a] hover:bg-white hover:text-black text-white font-black py-6 text-[10px] uppercase tracking-[0.5em] transition-all flex items-center justify-center gap-4 group">
                  Confirm Booking Protocol
                  <ArrowRight size={16} className="group-hover:translate-x-2 transition-transform" />
                </button>
                <p className="text-center text-[7px] font-black text-slate-600 uppercase tracking-[0.3em]">
                  Institutional tax invoice generated upon validation.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default OfficeBookingPage;