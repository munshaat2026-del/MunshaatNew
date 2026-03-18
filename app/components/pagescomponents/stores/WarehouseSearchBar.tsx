import { Search } from "lucide-react";

interface WarehouseSearchBarProps {
  primaryColor: string;
}

export default function WarehouseSearchBar({ primaryColor }: WarehouseSearchBarProps) {
  return (
    <section className="sticky top-0 z-40 bg-white border-b border-slate-100 py-4 px-6 md:px-16 shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-10">
           <div className="hidden md:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Total Managed Capacity</p>
              <p className="text-xl font-black  ">85,000+ SQM</p>
           </div>
           <div className="hidden md:block">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Occupancy Rate</p>
              <p className="text-xl font-black  " style={{ color: primaryColor }}>92%</p>
           </div>
        </div>
        
        <div className="flex gap-3 w-full md:w-auto">
           <div className="relative flex-1 md:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
              <input type="text" placeholder="Filter by area or type..." className="w-full bg-slate-50 border border-slate-100 pl-12 pr-4 py-3 rounded-lg text-sm font-bold outline-none focus:border-[#2383c9]" />
           </div>
           <button className="bg-slate-900 text-white px-8 py-3 rounded-lg font-black text-[10px] uppercase tracking-[0.2em]">Inquire</button>
        </div>
      </div>
    </section>
  );
}