import { ArrowRight, BarChart3, Binary } from "lucide-react";

interface ImpactSectionProps {
  primaryColor: string;
}

export default function ImpactSection({ primaryColor }: ImpactSectionProps) {
  const stats = [
    ["12+", "Years of Service"],
    ["200+", "Expert Staff"],
    ["500k", "Square Meters"],
    ["15+", "Prime Assets"],
  ];

  return (
    <section className="py-40 px-6 md:px-20 bg-white border-b border-slate-100 relative overflow-hidden">
      {/* Background Architectural Accent */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50/50 -skew-x-12 translate-x-20 pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 relative z-10">
        
        {/* Left Side: Performance Metrics */}
        <div className="flex-1 space-y-16">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <BarChart3 size={16} style={{ color: primaryColor }} />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Performance Metrics</span>
            </div>
            <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none italic">
              OUR <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>IMPACT.</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
            {stats.map(([num, label], i) => (
              <div key={i} className="group relative pt-8 border-t border-slate-100 hover:border-slate-900 transition-colors duration-500">
                {/* Index Number */}
                <span className="absolute top-2 left-0 text-[8px] font-black text-slate-300 uppercase tracking-widest">Data_Ref_0{i + 1}</span>
                
                <div className="flex items-baseline gap-2">
                   <p className="text-5xl font-black tracking-tighter italic group-hover:translate-x-2 transition-transform duration-500">
                    {num}
                   </p>
                </div>
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] mt-3 group-hover:text-slate-900 transition-colors">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side: Heritage & Action */}
        <div className="flex-1 flex flex-col justify-center space-y-10 lg:pl-16 border-l border-slate-100">
          <div className="space-y-6">
            <div className="flex items-center gap-2 text-slate-300">
               <Binary size={14} />
               <h3 className="text-[10px] font-black uppercase tracking-[0.4em]">
                 Institutional Heritage
               </h3>
            </div>

            <p className="text-slate-500 text-sm md:text-base font-bold uppercase tracking-[0.15em] leading-[2.2] italic">
              Established as a strategic response to the growing need for 
              institutional-grade asset management in the Kingdom, 
              we have evolved into a full-scale operational partner for 
              Vision 2030 initiatives.
            </p>
          </div>

          <div className="pt-10">
            <button
              className="group flex items-center gap-6 p-6 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all duration-500 w-full md:w-fit"
            >
              <span className="font-black text-[10px] uppercase tracking-[0.4em]">
                Download Company Profile
              </span>
              <div className="w-10 h-[1px] bg-slate-900 group-hover:bg-white group-hover:w-16 transition-all"></div>
              <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
            </button>
            
            <p className="mt-6 text-[8px] font-black text-slate-300 uppercase tracking-[0.4em]">
              * PDF Format // 12.4 MB Revision 2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}