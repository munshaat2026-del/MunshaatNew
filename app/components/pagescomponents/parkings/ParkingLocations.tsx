import { MapPin, Activity, Target } from "lucide-react";

interface ParkingLocationsProps {
  primaryColor: string;
}

export default function ParkingLocations({
  primaryColor,
}: ParkingLocationsProps) {
  const locations = [
    { name: "Olaya Financial District", code: "Z-01", status: "High" },
    { name: "King Fahd Road Central", code: "Z-02", status: "Medium" },
    { name: "Diplomatic Quarter Hub", code: "Z-03", status: "Low" },
    { name: "East Business Park", code: "Z-04", status: "High" },
  ];

  return (
    <section className="py-40 px-6 md:px-16 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-24 items-stretch border-t border-slate-100">
      
      {/* Left Side: Technical Directory */}
      <div className="space-y-12 flex flex-col justify-center">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
             <div className="w-10 h-[1px]" style={{ backgroundColor: primaryColor }}></div>
             <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Regional Deployment</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black uppercase tracking-tighter leading-none">
            STRATEGIC <br />
            <span className="text-transparent" style={{ WebkitTextStroke: `1.5px ${primaryColor}` }}>RIYADH HUBS.</span>
          </h2>
        </div>

        <div className="space-y-0 border-t border-slate-100">
          {locations.map((loc, i) => (
            <div
              key={i}
              className="group flex items-center justify-between p-8 border-b border-slate-100 hover:bg-slate-50 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="flex items-center gap-6 relative z-10">
                <span className="text-[10px] font-black text-slate-300 group-hover:text-[#0c479a] transition-colors">{loc.code}</span>
                <span className="font-black text-sm uppercase tracking-widest text-slate-800">{loc.name}</span>
              </div>
              <div className="flex items-center gap-4 relative z-10">
                 <div className="flex flex-col items-end">
                    <span className="text-[8px] font-black uppercase text-slate-300">Load Factor</span>
                    <span className={`text-[10px] font-black uppercase ${loc.status === 'High' ? 'text-orange-500' : 'text-green-500'}`}>{loc.status}</span>
                 </div>
                 <Target size={16} className="text-slate-200 group-hover:text-[#0c479a] transition-colors" />
              </div>
              {/* Hover Accent */}
              <div className="absolute left-0 top-0 w-1 h-full bg-[#0c479a] -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Visual Data Block */}
      <div className="relative group min-h-[500px] border border-slate-200 p-4">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src="https://images.unsplash.com/photo-1526626392875-f1c04628c040?q=80&w=2070"
            className="w-full h-full object-cover grayscale opacity-80 group-hover:scale-105 transition-transform duration-1000"
            alt="Facility Map"
          />
          {/* Technical Grid Overlay */}
          <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#000_1px,transparent_1px)] bg-[size:20px_20px]"></div>
          <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-700"></div>
        </div>

        {/* Data Floating Elements */}
        <div className="absolute top-10 left-10 bg-white p-6 border border-slate-100 shadow-2xl z-10 space-y-4">
           <div className="flex items-center gap-2">
              <Activity size={14} className="text-[#0c479a] animate-pulse" />
              <p className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">Live Telemetry</p>
           </div>
           <div className="space-y-1">
              <p className="text-3xl font-black text-slate-900 leading-none tracking-tighter italic">84.2%</p>
              <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">Network Occupancy</p>
           </div>
           <div className="w-full bg-slate-100 h-[2px]">
              <div className="bg-[#0c479a] h-full" style={{ width: '84%' }}></div>
           </div>
        </div>

        {/* Dynamic Coordinate Tag */}
        <div className="absolute bottom-10 right-10 bg-slate-900 text-white p-4 z-10 hidden md:block border-l-4 border-[#0c479a]">
           <p className="text-[8px] font-black uppercase tracking-[0.4em] opacity-60">Master Plan Ref</p>
           <p className="text-[10px] font-black uppercase tracking-widest">RM_INFRA_KSA_26</p>
        </div>
      </div>
    </section>
  );
}