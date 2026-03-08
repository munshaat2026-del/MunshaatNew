import { Target, Globe, ShieldCheck, LucideIcon } from "lucide-react";

interface CoreValuesProps {
  primaryColor: string;
}

interface ValueItem {
  t: string;
  d: string;
  i: LucideIcon;
  gridClass: string;
}

export default function CoreValues({ primaryColor }: CoreValuesProps) {
  const values: ValueItem[] = [
    { 
      t: "The Mission", 
      d: "To maximize the operational life and financial yield of iconic real estate assets through smart management.", 
      i: Target,
      gridClass: "md:col-span-2 md:row-span-1" 
    },
    { 
      t: "The Vision", 
      d: "To be the kingdom's first choice for institutional-grade facility administration by 2030.", 
      i: Globe,
      gridClass: "md:col-span-1 md:row-span-2" 
    },
    { 
      t: "Our Culture", 
      d: "A commitment to transparency, safety, and relentless technical innovation.", 
      i: ShieldCheck,
      gridClass: "md:col-span-2 md:row-span-1" 
    },
  ];

  return (
    <section className="py-40 px-6 bg-white border-b border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section - Sharp & Direct */}
        <div className="mb-20 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-[1px] bg-[#0c479a]"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Strategic DNA</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-slate-900 uppercase leading-[0.9]">
              FOUNDATIONS OF <br />
              <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>EXCELLENCE.</span>
            </h2>
          </div>
          <p className="text-slate-400 text-[10px] font-bold uppercase tracking-[0.2em] max-w-[240px] leading-loose border-l-2 border-slate-100 pl-6">
            Architecting the future of asset management in Saudi Arabia.
          </p>
        </div>

        {/* Sharp Bento Grid Container */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border-t border-l border-slate-100 auto-rows-[280px]">
          {values.map((val, i) => (
            <div 
              key={i} 
              className={`group relative p-10 transition-all duration-700 flex flex-col justify-between 
              bg-white border-r border-b border-slate-100 hover:bg-slate-50 ${val.gridClass}`}
            >
              {/* Top Section: Technical ID */}
              <div className="flex justify-between items-start">
                <div 
                  className="w-10 h-10 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 group-hover:bg-white transition-all duration-500"
                  style={{ color: primaryColor }}
                >
                  <val.i size={20} strokeWidth={1.5} />
                </div>
                <span className="text-[9px] font-black text-slate-300 uppercase tracking-[0.3em]">
                  PROTOCOL_0{i + 1}
                </span>
              </div>

              {/* Bottom Section: Content */}
              <div className="relative z-10 space-y-4">
                <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter group-hover:text-[#0c479a] transition-colors">
                  {val.t}
                </h3>
                <p className="text-slate-400 leading-relaxed font-bold text-[11px] uppercase tracking-widest max-w-md group-hover:text-slate-600 transition-colors">
                  {val.d}
                </p>
              </div>

              {/* Square Hover Accent */}
              <div 
                className="absolute top-0 right-0 w-0 h-0 border-t-[15px] border-r-[15px] border-transparent group-hover:border-t-[#0c479a] group-hover:border-r-[#0c479a] transition-all duration-500"
              />
              
              {/* Background Grid Pattern on Hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-[0.03] pointer-events-none transition-opacity bg-[linear-gradient(#000_1px,transparent_1px),linear-gradient(90deg,#000_1px,transparent_1px)] bg-[size:20px_20px]" />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}