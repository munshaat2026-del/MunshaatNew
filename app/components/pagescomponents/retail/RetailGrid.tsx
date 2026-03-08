import { MapPin, ArrowUpRight, Maximize2, Users, Activity } from "lucide-react";

interface RetailUnit {
  id: number;
  name: string;
  mall: string;
  location: string;
  size: string;
  traffic: string;
  category: string;
  image: string;
}

interface RetailGridProps {
  primaryColor: string;
  units: RetailUnit[];
}

export default function RetailGrid({ primaryColor, units }: RetailGridProps) {
  return (
    <main className="py-32 px-6 bg-white max-w-7xl mx-auto border-x border-slate-50">
      
      {/* Layout Header - Technical Metadata */}
      <div className="mb-20 flex flex-col md:flex-row justify-between items-end gap-6 border-b border-slate-900 pb-10">
        <div className="space-y-2">
          <p className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Database / Retail_Assets_2026</p>
          <h2 className="text-4xl font-black uppercase tracking-tighter italic">Available Inventory.</h2>
        </div>
        <div className="flex gap-8">
           <div className="text-right">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Total Units</p>
              <p className="text-xl font-black leading-none">{units.length}</p>
           </div>
           <div className="text-right border-l border-slate-100 pl-8">
              <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Global Status</p>
              <p className="text-xl font-black leading-none text-green-600 uppercase italic">Operational</p>
           </div>
        </div>
      </div>

      {/* Grid: 3 Columns - Border Connected */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0 border-t border-l border-slate-100">
        {units.map((unit) => (
          <div 
            key={unit.id} 
            className="group cursor-pointer p-8 border-r border-b border-slate-100 transition-all duration-500 hover:bg-slate-50 relative overflow-hidden"
          >
            {/* 1. Image Block: Framed & Industrial */}
            <div className="relative aspect-[4/5] overflow-hidden bg-slate-100 mb-8 border border-slate-200">
              <img 
                src={unit.image} 
                className="w-full h-full object-cover group-hover:scale-100 scale-110 transition-all duration-1000 ease-in-out" 
                alt={unit.name} 
              />
              
              {/* Corner Tag: Technical Code */}
              <div 
                className="absolute top-0 right-0 px-3 py-1 text-[8px] font-black uppercase tracking-widest text-white z-20"
                style={{ backgroundColor: primaryColor }}
              >
                RM_REF_{unit.id}0
              </div>

              {/* Status Overlay: Sharp Box */}
              <div className="absolute bottom-0 left-0 bg-white p-4 pr-6 border-t border-r border-slate-200">
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Asset Location</p>
                 <p className="text-[10px] font-black uppercase tracking-tight text-slate-900 leading-none">{unit.mall}</p>
              </div>
            </div>

            {/* 2. Content: The Label Style */}
            <div className="space-y-6">
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <span className="text-[9px] font-black text-[#0c479a] uppercase tracking-[0.2em] border-b-2 border-[#0c479a]/20">
                    {unit.category}
                  </span>
                  <h3 className="text-2xl font-black text-slate-900 uppercase tracking-tighter leading-none pt-2">
                    {unit.name}
                  </h3>
                </div>
                <div className="w-10 h-10 border border-slate-100 flex items-center justify-center group-hover:border-slate-900 group-hover:bg-slate-900 group-hover:text-white transition-all duration-500">
                   <ArrowUpRight size={18} strokeWidth={1.5} />
                </div>
              </div>

              {/* 3. Specs: Linear Data Layout */}
              <div className="space-y-4 pt-6 border-t border-slate-100">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Maximize2 size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Dimension</span>
                  </div>
                  <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{unit.size}</span>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <Activity size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Flow Index</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-slate-900 uppercase tracking-tight">{unit.traffic}</span>
                    <div className="w-1 h-1 bg-green-500 group-hover:animate-ping" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-slate-300">
                    <MapPin size={12} />
                    <span className="text-[9px] font-black uppercase tracking-widest">Internal Pos</span>
                  </div>
                  <span className="text-xs font-black text-slate-500 uppercase tracking-tight italic">{unit.location}</span>
                </div>
              </div>

              {/* 4. Technical ID Footer */}
              <div className="pt-4 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-2 group-hover:translate-y-0">
                 <p className="text-[8px] font-black text-slate-300 uppercase tracking-[0.3em]">Protocol_ID // R-10{unit.id}</p>
                 <span className="text-[9px] font-black uppercase tracking-widest" style={{ color: primaryColor }}>Get Spec Sheet →</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}