import { Maximize, BarChart3, MapPin, ArrowUpRight } from "lucide-react";

interface WarehouseUnit {
  id: number;
  title: string;
  location: string;
  area: string;
  height: string;
  type: string;
  status: string;
  image: string;
}

interface WarehouseGridProps {
  primaryColor: string;
  facilities: WarehouseUnit[];
}

export default function WarehouseGrid({ primaryColor, facilities }: WarehouseGridProps) {
  return (
    <section className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Grid 3 Columns - متوازن وبسيط */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {facilities.map((hub) => (
            <div key={hub.id} className="group cursor-pointer">
              
              {/* 1. Image: Sharp & Clean */}
              <div className="relative aspect-[4/3] overflow-hidden bg-slate-100 mb-6 shadow-sm border border-slate-50">
                <img 
                  src={hub.image} 
                  className="w-full h-full object-cover group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-in-out" 
                  alt={hub.title} 
                />
                {/* Badge: Simple Solid Color */}
                <div className="absolute top-0 left-0 px-4 py-2 text-[10px] font-black uppercase tracking-widest text-white" style={{ backgroundColor: primaryColor }}>
                  {hub.status}
                </div>
              </div>

              {/* 2. Content: Direct & Bold */}
              <div className="space-y-4 px-2">
                <div className="flex justify-between items-start gap-4">
                  <h3 className="text-xl font-bold text-slate-900 leading-tight uppercase tracking-tight">
                    {hub.title}
                  </h3>
                  <ArrowUpRight size={20} className="text-slate-300 group-hover:text-slate-900 transition-colors shrink-0" />
                </div>

                <div className="flex items-center gap-1.5 text-slate-400">
                  <MapPin size={14} style={{ color: primaryColor }} />
                  <span className="text-[11px] font-bold uppercase tracking-widest">{hub.location}</span>
                </div>

                {/* 3. Specs: High Contrast */}
                <div className="flex items-center gap-8 pt-4 border-t border-slate-100">
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Area</span>
                    <span className="text-lg font-black text-slate-900 tracking-tighter">{hub.area}</span>
                  </div>
                  <div className="flex flex-col gap-0.5">
                    <span className="text-[9px] font-black uppercase text-slate-300 tracking-widest">Height</span>
                    <span className="text-lg font-black text-slate-900 tracking-tighter">{hub.height}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}