import { CheckCircle2, ShieldCheck, HardHat, Zap } from "lucide-react";

interface WarehouseServicesProps {
  primaryColor: string;
}

export default function WarehouseServices({ primaryColor }: WarehouseServicesProps) {
  const features = [
    { title: "WMS Support", desc: "Integrated digital ecosystem", Icon: Zap },
    { title: "Fire Suppression", desc: "Advanced hazard control", Icon: ShieldCheck },
    { title: "Heavy-Load Flooring", desc: "70kN/sqm industrial grade", Icon: HardHat },
    { title: "Fleet Parking", desc: "Dedicated logistics units", Icon: CheckCircle2 }
  ];

  return (
    <section className="bg-white py-32 px-6 md:px-16 border-y border-slate-100">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        
        {/* Left Side: Content & Technical Specs */}
        <div className="space-y-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3 text-[#0c479a]">
              <div className="w-8 h-[2px] bg-[#0c479a]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em]">Infrastructure Suite</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9]">
              LOGISTICS <br /> 
              <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>BACKBONE.</span>
            </h2>
            <p className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-loose max-w-lg">
              Beyond space, we provide high-specification assets built to international industrial standards. Optimized for 24/7 high-frequency fleet operations.
            </p>
          </div>

          {/* Features Matrix: Sharp Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 border-t border-l border-slate-100">
            {features.map((feature, i) => (
              <div key={i} className="group p-8 border-r border-b border-slate-100 transition-colors hover:bg-slate-50">
                <feature.Icon size={20} className="mb-4 text-slate-300 group-hover:text-[#0c479a] transition-colors" />
                <h4 className="font-black text-[11px] uppercase tracking-widest text-slate-900">{feature.title}</h4>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tight mt-1">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Architectural Image Frame */}
        <div className="relative pt-12 lg:pt-0">
          <div className="aspect-[4/5] overflow-hidden bg-slate-100 border border-slate-100 relative shadow-2xl">
            <img 
              src="https://www.robertsonbuildings.com/wp-content/uploads/2021/07/atp-full.png" 
              className="w-full h-full object-cover transition-all duration-1000 scale-105 group-hover:scale-100" 
              alt="Logistics Operation" 
            />
            
            {/* Overlay Technical Badge */}
            <div 
              className="absolute bottom-0 right-0 p-12 text-white" 
              style={{ backgroundColor: primaryColor }}
            >
              <div className="space-y-2">
                <p className="text-6xl font-black tracking-tighter leading-none uppercase  ">24/7</p>
                <p className="text-[9px] font-black uppercase tracking-[0.3em] opacity-80 border-t border-white/20 pt-4">
                  OPERATIONAL ACCESS PROTOCOL
                </p>
              </div>
            </div>
          </div>

          {/* Accent Line */}
          <div className="absolute -top-6 -right-6 w-32 h-32 border-t-2 border-r-2 border-slate-100 pointer-events-none"></div>
        </div>

      </div>
    </section>
  );
}