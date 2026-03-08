import {
  BarChart,
  Zap,
  Building2,
  Car,
  ShieldCheck,
  Users,
  LucideIcon,
  ArrowUpRight,
} from "lucide-react";

interface ServicesSectionProps {
  primaryColor: string;
}

interface ServiceItem {
  t: string;
  d: string;
  i: LucideIcon;
}

export default function ServicesSection({ primaryColor }: ServicesSectionProps) {
  const services: ServiceItem[] = [
    { t: "Asset Strategy", d: "Long-term value creation through data-driven operational planning.", i: BarChart },
    { t: "MEP Engineering", d: "High-precision maintenance for all technical and mechanical systems.", i: Zap },
    { t: "Commercial Ops", d: "End-to-end management of retail and administrative environments.", i: Building2 },
    { t: "Access Control", d: "Next-gen parking solutions and visitor management systems.", i: Car },
    { t: "Safety Mesh", d: "Advanced surveillance and on-site asset protection protocols.", i: ShieldCheck },
    { t: "Client Success", d: "Dedicated relationship managers for seamless tenant communication.", i: Users },
  ];

  return (
    <section className="py-40 px-6 md:px-20 bg-white">
      {/* Header Section - Editorial Style */}
      <div className="max-w-7xl mx-auto mb-32 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-6">
          <div className="flex items-center gap-3 text-slate-300">
            <span className="text-[10px] font-black uppercase tracking-[0.5em]">Capabilities</span>
            <div className="h-[1px] w-12 bg-slate-200"></div>
          </div>
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
            CORE <br />
            <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>COMPETENCIES.</span>
          </h2>
        </div>
        <p className="text-slate-400 font-bold text-[10px] uppercase tracking-[0.2em] max-w-xs leading-loose pb-2 border-b border-slate-100">
          Precision-engineered management solutions for institutional real estate assets.
        </p>
      </div>

      {/* Services Grid - Technical Matrix */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-100">
        {services.map((item, i) => (
          <div
            key={i}
            className="group p-12 border-r border-b border-slate-100 transition-all duration-500 hover:bg-slate-50 relative overflow-hidden"
          >
            {/* Hover Accent */}
            <div 
              className="absolute top-0 left-0 w-1 h-0 group-hover:h-full transition-all duration-500"
              style={{ backgroundColor: primaryColor }}
            />

            <div className="flex justify-between items-start mb-12">
              <div 
                className="w-12 h-12 flex items-center justify-center border border-slate-100 group-hover:border-slate-900 transition-colors duration-500"
                style={{ color: primaryColor }}
              >
                <item.i size={24} strokeWidth={1.5} />
              </div>
              <span className="text-[10px] font-black text-slate-200 group-hover:text-slate-900 transition-colors">
                0{i + 1}
              </span>
            </div>

            <h3 className="text-lg font-black uppercase tracking-tight mb-4 group-hover:translate-x-2 transition-transform duration-500">
              {item.t}
            </h3>

            <p className="text-slate-400 text-[11px] font-bold uppercase tracking-widest leading-relaxed mb-8">
              {item.d}
            </p>

            <a href="#" className="inline-flex items-center gap-2 text-[9px] font-black uppercase tracking-[0.3em] opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
              Explore Protocol <ArrowUpRight size={14} />
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}