import React from 'react';
import { Building2, Mail, Phone, MapPin, Linkedin, Twitter, Instagram, ArrowUpRight } from 'lucide-react';
import Logo from "@/public/logo.png"
import Image from 'next/image';

export function Footer() {
  const primaryColor = "#0c479a";

  return (
    <footer className="bg-[#0a0f1a] text-white pt-32 pb-12 px-6 md:px-16 relative overflow-hidden">
      {/* خلفية هندسية خفيفة جداً */}
      <div className="absolute top-0 right-0 w-full h-full opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', size: '50px 50px', backgroundSize: '100px 100px' }}></div>
      </div>
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-16 lg:gap-8">
          
          {/* 1. Brand Identity (Strong & Bold) */}
          <div className="lg:col-span-4 space-y-10">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 flex items-center justify-center text-white shrink-0">
  <Image 
        alt='Royal Manage Logo' 
        width={60} 
        height={60} 
        src={Logo} 
        className="object-contain group-hover:scale-110 transition-transform duration-500" 
      />              </div>
              <span className="text-3xl font-black uppercase tracking-tighter italic leading-none">
                Royal<span className="text-slate-500 not-italic">Manage</span>
              </span>
            </div>
            
            <p className="text-slate-500 font-bold text-xs uppercase tracking-widest leading-loose max-w-sm">
              Institutional-grade facility management and operational excellence for Saudi Arabia's premier real estate assets.
            </p>

            <div className="flex gap-0 border border-white/10 w-fit">
              {[Linkedin, Twitter, Instagram].map((Icon, i) => (
                <a key={i} href="#" className="w-12 h-12 flex items-center justify-center border-r border-white/10 hover:bg-white hover:text-slate-950 transition-all last:border-r-0">
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* 2. Navigation (Clean List) */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">Navigation</h4>
            <ul className="space-y-4">
              {['Home', 'About', 'Offices', 'Retail', 'Logistics'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors flex items-center gap-2 group">
                    {item} <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all -translate-y-1" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 3. Assistance (Clean List) */}
          <div className="lg:col-span-2 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">Assistance</h4>
            <ul className="space-y-4">
              {['Help Center', 'Privacy', 'Terms', 'Support'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* 4. HQ Contact (Technical Box) */}
          <div className="lg:col-span-4 space-y-10">
            <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0c479a]">Headquarters</h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <MapPin size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 leading-relaxed">
                  King Fahd Road, KAFD Tower 4,<br />Riyadh, Saudi Arabia
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <Phone size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  +966 11 000 0000
                </span>
              </div>
              <div className="flex items-center gap-4 group">
                <Mail size={18} className="text-slate-600 group-hover:text-white transition-colors shrink-0" />
                <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                  info@royalmanage.sa
                </span>
              </div>
            </div>

            {/* Newsletter - Sharp Design */}
            <div className="pt-4">
              <div className="flex border border-white/10 p-1">
                <input 
                  type="text" 
                  placeholder="Updates via email" 
                  className="bg-transparent px-4 py-3 text-[10px] font-black uppercase tracking-widest outline-none flex-1" 
                />
                <button 
                  className="px-8 py-3 text-[10px] font-black uppercase tracking-[0.2em] text-white transition-all hover:bg-white hover:text-black" 
                  style={{ backgroundColor: primaryColor }}
                >
                  Join
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar (Minimalist) */}
        <div className="mt-32 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex flex-col gap-2">
            <p className="text-[9px] font-black text-slate-700 uppercase tracking-[0.6em]">
              © 2026 ROYAL OPERATIONS GROUP.
            </p>
          </div>
          
          <div className="flex gap-12">
            {['Security Audit', 'System Status', 'KSA Vision 2030'].map((status) => (
              <span key={status} className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-700 hover:text-white cursor-pointer transition-colors">
                {status}
              </span>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}