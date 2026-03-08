import { Globe, Clock, Trophy, Target, LucideIcon } from "lucide-react";

interface StatsSectionProps {
  primaryColor: string;
}

interface StatItem {
  val: string;
  lab: string;
  icon: LucideIcon;
  code: string;
}

export default function StatsSection({ primaryColor }: StatsSectionProps) {
  const stats: StatItem[] = [
    { val: "15M+", lab: "Managed SQ.FT", icon: Globe, code: "SYS-01" },
    { val: "24/7", lab: "Support Coverage", icon: Clock, code: "SYS-02" },
    { val: "98%", lab: "Tenant Satisfaction", icon: Trophy, code: "SYS-03" },
    { val: "30%", lab: "Energy Saved", icon: Target, code: "SYS-04" },
  ];

  return (
    <section className="py-32 bg-white px-6 md:px-16 border-t border-slate-100">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Metadata */}
        <div className="mb-16 flex items-center justify-between border-b border-slate-900 pb-8">
           <div className="flex items-center gap-4">
              <div className="w-2 h-2 bg-[#0c479a] animate-pulse"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Live Asset Analytics // R-2026</span>
           </div>
           <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest hidden md:block italic">
             Data Verified by Royal Manage Infrastructure Dept.
           </span>
        </div>

        {/* Stats Grid - Technical Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-l border-slate-900">
          {stats.map((stat, i) => (
            <div 
              key={i} 
              className="group p-10 border-r border-b border-slate-900 hover:bg-slate-50 transition-all duration-700 relative overflow-hidden"
            >
              {/* Technical Code Accent */}
              <span className="absolute top-4 right-6 text-[8px] font-black text-slate-200 group-hover:text-[#0c479a] transition-colors uppercase tracking-widest">
                {stat.code}
              </span>

              <div className="space-y-8 relative z-10">
                {/* Icon - Industrial Style */}
                <div 
                  className="w-10 h-10 flex items-center justify-start transition-transform group-hover:scale-110" 
                  style={{ color: primaryColor }}
                >
                  <stat.icon size={20} strokeWidth={2.5} />
                </div>

                <div className="space-y-2">
                  <h4 className="text-5xl font-black tracking-tighter italic leading-none group-hover:translate-x-2 transition-transform duration-500">
                    {stat.val}
                  </h4>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] group-hover:text-slate-900 transition-colors">
                    {stat.lab}
                  </p>
                </div>
              </div>

              {/* Hover Blueprint Background - تأثير مخطط هندسي عند التحويم */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity duration-700 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:10px_10px]"></div>
            </div>
          ))}
        </div>

        {/* Bottom Protocol Info */}
        <div className="mt-8 flex justify-end gap-12">
            <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Update Frequency</span>
                <span className="text-[9px] font-black text-slate-900 uppercase tracking-widest">Real-Time Sync</span>
            </div>
            <div className="flex flex-col items-end">
                <span className="text-[7px] font-black text-slate-300 uppercase tracking-widest leading-none mb-1">Operational Tier</span>
                <span className="text-[9px] font-black text-[#0c479a] uppercase tracking-widest italic">Institutional Class-A</span>
            </div>
        </div>
      </div>
    </section>
  );
}