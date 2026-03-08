"use client";
import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Warehouse, Building2, Truck, Layout, MoveUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function ArabianPremiumEmpire() {
  const containerRef = useRef(null);
  const primaryColor = "#0c479a";

  useEffect(() => {
    const ctx = gsap.context(() => {
      
      // 1. HERO ANIMATION
      gsap.to(".hero-zoom-img", {
        scale: 1.1,
        duration: 20,
        ease: "none",
        repeat: -1,
        yoyo: true
      });

      gsap.from(".hero-fade", {
        y: 30,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15,
        ease: "expo.out"
      });

      // 2. THE ASSEMBLY (Sharp Transitions)
      const assemblyTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".assembly-section",
          start: "top top",
          end: "+=200%",
          pin: true,
          scrub: 0.5,
        }
      });

      assemblyTl
        .from(".part-left", { xPercent: -100, opacity: 0, duration: 2 })
        .from(".part-right", { xPercent: 100, opacity: 0, duration: 2 }, "-=2")
        .from(".part-top", { yPercent: -100, opacity: 0, duration: 1.5 }, "-=1.5")
        .to(".building-title", { opacity: 1, y: 0, duration: 0.5 });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="bg-white text-slate-900 overflow-x-hidden font-sans">
      
      {/* --- 1. HERO SECTION (Sharp & Bold) --- */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-900">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1574362848149-11496d93a7c7?q=80&w=2072" 
            className="hero-zoom-img w-full h-full object-cover opacity-60  transition-all duration-1000" 
            alt="Facade"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-white"></div>
        </div>

        <div className="relative z-10 text-center px-6">
          <div className="hero-fade inline-flex items-center gap-3 px-4 py-1 border border-white/20 bg-white/5 backdrop-blur-sm mb-10">
            <Layout className="text-white" size={12} />
            <span className="text-[9px] font-black text-white uppercase tracking-[0.5em]">Industrial Intelligence</span>
          </div>
          
          <h1 className="hero-fade text-[12vw] md:text-[8vw] font-black leading-[0.8] tracking-[ -0.05em] uppercase text-white">
            PRIME <br />
            <span className="text-transparent" style={{ WebkitTextStroke: '1.5px #fff' }}>ASSETS.</span>
          </h1>

          <div className="hero-fade mt-16 flex flex-wrap justify-center gap-0">
            <button 
              className="group bg-[#0c479a] text-white px-12 py-6 font-black text-[10px] uppercase tracking-[0.3em] flex items-center gap-4 transition-all hover:bg-black"
            >
              Request Portfolio <MoveUpRight size={16} />
            </button>
            <button className="bg-white text-slate-900 px-12 py-6 font-black text-[10px] uppercase tracking-[0.3em] border border-slate-100 hover:bg-slate-50 transition-all">
              Virtual Tour
            </button>
          </div>
        </div>
      </section>

      {/* --- 2. THE ASSEMBLY (Zero Radius / Sharp Edges) --- */}
      <section className="assembly-section relative h-screen bg-white flex items-center justify-center overflow-hidden border-y border-slate-100">
        <div className="relative w-full mt-24 max-w-6xl h-[70vh]">
          
          {/* Top Block */}
          <div className="part-top absolute top-0 w-full h-[35%] z-30 overflow-hidden border-b-4 border-white shadow-2xl">
            <div className="absolute top-0 left-0 z-40 bg-black text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              High-Spec Warehouses
            </div>
            <img src="https://plus.unsplash.com/premium_photo-1676357174991-9dba7713d397?q=80&w=1172" 
                 className="w-full h-full object-cover transition-all duration-700" alt="Warehouse" />
          </div>

          {/* Left Block */}
          <div className="part-left absolute bottom-0 left-0 w-[49.8%] h-[64%] z-20 overflow-hidden border-r-4 border-white shadow-2xl">
            <div className="absolute bottom-0 left-0 z-40 bg-[#0c479a] text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              Executive Offices
            </div>
            <img src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=2070" 
                 className="w-full h-full object-cover transition-all duration-700" alt="Offices" />
          </div>

          {/* Right Block */}
          <div className="part-right absolute bottom-0 right-0 w-[49.8%] h-[64%] z-10 overflow-hidden shadow-2xl">
            <div className="absolute bottom-0 right-0 z-40 bg-slate-900 text-white px-6 py-2 text-[9px] font-black uppercase tracking-widest">
              Smart Logistics
            </div>
            <img src="https://images.unsplash.com/photo-1578575437130-527eed3abbec?q=80&w=2070" 
                 className="w-full h-full object-cover transition-all duration-700" alt="Logistics" />
          </div>

          {/* Title Overlay */}
          <div className="building-title absolute inset-0 z-50 flex items-center justify-center opacity-0 translate-y-10 pointer-events-none">
             <h2 className="text-7xl md:text-[10vw] font-black text-white mix-blend-difference tracking-tighter uppercase leading-none text-center">
               FUTURE<br/>READY
             </h2>
          </div>
        </div>
      </section>

      {/* --- 3. SERVICES (Grid Style) --- */}
      <section className="py-32 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-slate-100">
          {[
            { Icon: Warehouse, title: "Storage", desc: "Thermal insulation & high-clearance." },
            { Icon: Building2, title: "Corporate", desc: "Flexible, premium office headquarters." },
            { Icon: Truck, title: "Logistics", desc: "Strategic bays for fleet operations." }
          ].map((item, idx) => (
            <div key={idx} className="p-12 space-y-6 border-r last:border-r-0 border-slate-100 hover:bg-slate-50 transition-colors group">
              <item.Icon className="text-slate-300 group-hover:text-[#0c479a] transition-colors" size={32} strokeWidth={1.5} />
              <div className="space-y-3">
                <h3 className="text-xl font-black uppercase tracking-tight">{item.title}</h3>
                <p className="text-slate-400 text-sm font-medium leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}